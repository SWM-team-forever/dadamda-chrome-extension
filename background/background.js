importScripts("/assets/api/apiUrl.js")

let newToken = null;

let currentScrapUrl = null;

function contentScriptJS(tabId, file) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: [`${file}`]
  });
}

function handleScrapResponse(url, tab, data) {
  chrome.storage.local.get('signedIn').then(async (result) => {
    if(data.pageUrl.length > 2083) {
      contentScriptJS(tab.id, "content/numberOfPageUrlExceededErrorContent.js");
      return;
    }
    if(currentScrapUrl == data.pageUrl) {
      contentScriptJS(tab.id, "content/duplicatedScrap.js");
      return;
    } else {
      if (result.signedIn) {
        contentScriptJS(tab.id, "content/content.js");

        await chrome.storage.local.get('accessToken').then((result) => {
          newToken = result.accessToken;
        });

        let response = await postAPI(url, tab, data);

        if (response === "Success") {
          contentScriptJS(tab.id, "content/successContent.js");
          currentScrapUrl = data.pageUrl;
        } else if (response === "BR002") {
          contentScriptJS(tab.id, "content/duplicatedScrap.js");
        } else if (response === "NF002" || response === "BR001") {
          googleLogin();
        } else {
          contentScriptJS(tab.id, "content/errorContent.js");
        }
      } else {
        googleLogin();
      }
    }
  })
}

function handleHighlightResponse(url, tab, data) {
  chrome.storage.local.get('signedIn').then(async (result) => {
    if(data.type === "text") {
      if(data.selectedText.length === 0) {
        contentScriptJS(tab.id, "content/whiteSpaceExistErrorContent.js");
        return;
      }
      if(data.selectedText.length > 1000) {
        contentScriptJS(tab.id, "content/numberOfCharactersExceededErrorContent.js");
        return;
      }
    } else {
      if(data.selectedImageUrl.length > 2083) {
        contentScriptJS(tab.id, "content/numberOfPageUrlExceededErrorContent.js");
        return;
      }
    }

    if (result.signedIn) {
      contentScriptJS(tab.id, "content/content.js");

      await chrome.storage.local.get('accessToken').then((result) => {
        newToken = result.accessToken;
      });

      let response = await postAPI(url, tab, data);

      if (response === "Success") {
        contentScriptJS(tab.id, "content/successContent.js");
      } else if (response === "BR002") {
        contentScriptJS(tab.id, "content/duplicatedScrap.js");
      } else if (response === "NF002" || response === "BR001") {
        googleLogin();
      } else {
        contentScriptJS(tab.id, "content/errorContent.js");
      }
    } else {
      googleLogin();
    }
  })
}

chrome.action.onClicked.addListener(async (tab) => {
  let data = {
    pageUrl: `${tab.url}`
  }
  handleScrapResponse(POST_SCRAP_URL, tab, data);
})

function googleLogin() {
  let loginUrl = chrome.runtime.getURL('/assets/login/login.html');
  chrome.windows.create({
    url: loginUrl,
    type: "popup",
    width: 350,
    height: 600
  }, (window) => {
    chrome.tabs.onUpdated.addListener(
        function authorizationHook(tabId, changeInfo, tab) {
          if (tab.url.startsWith(TOKEN_URL)) {
            const tabURL = tab.url;
            const token = tabURL.split('=')[1];

            chrome.storage.local.set({ 'accessToken': token });

            newToken = token;

            chrome.storage.local.set({ 'signedIn': true });

            chrome.windows.remove(window.id);

            chrome.tabs.onUpdated.removeListener(authorizationHook);
          }
        })
  })
}

async function postAPI(url, tab, data) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": newToken
    },
    body: JSON.stringify(data)
  }).catch(() => {
    return { status: 500, resultCode: "IS000" };
  });

  if (response.status === 200) {
    return "Success";
  } else if (response.status === 500) {
    return "IS000";
  } else {
    let responseJson = await response.json();
    return responseJson.resultCode;
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title:  "다담다에 저장하기",
    id: "Store",
    contexts: ["selection", "image"]
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  let pageUrl = info.pageUrl;
  let selectedImageUrl = info.srcUrl;
  let selectedText = info.selectionText;
  let data = null;

  if (selectedImageUrl === undefined) {
    if(selectedText === undefined) {
      selectedText = "";
    }
    data = {
      type: "text",
      pageUrl: `${pageUrl}`,
      selectedText: `${selectedText}`
    }
  } else {
    data = {
      type: "image",
      pageUrl: `${pageUrl}`,
      selectedImageUrl: `${selectedImageUrl}`
    }
  }

  chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) =>
    handleHighlightResponse(POST_HIGHLIGHTS_URL, tabs[0], data)
  );
})
