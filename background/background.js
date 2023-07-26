const POST_SCRAP_URL = "http://localhost:8080/v1/scraps";
const TOKEN_URL = "http://localhost:8080/?token=";
const GOOGLE_LOGIN_URL = "http://localhost:8080/oauth2/authorization/google";
const POST_HIGHLIGHTS_URL = "http://localhost:8080/v1/scraps/highlights";
const LOGIN_URL = "https://dadamda-chrome-extention.s3.ap-northeast-2.amazonaws.com/src/login.html";

let newToken = null;

function contentScriptJS(tabId, file) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: [`${file}`]
  });
}

function contentScriptCSS(tabId, file) {
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: [`${file}`]
  })
}

function api(url, tab, data) {
  chrome.storage.local.get('signedIn').then(async (result) => {
    if (result.signedIn) {
      contentScriptJS(tab.id, "content/content.js");
      contentScriptCSS(tab.id, "content/content.css");

      await chrome.storage.local.get('accessToken').then((result) => {
        newToken = result.accessToken;
      });

      let response = await postAPI(url, data);

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
  api(POST_SCRAP_URL, tab, data);
})

function googleLogin() {
  chrome.windows.create({
    url: LOGIN_URL,
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

async function postAPI(url, data) {
  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": newToken
    },
    body: JSON.stringify(data)
  });

  if (response.status >= 300) {
    let responseJson = await response.json();
    return await responseJson.resultCode;
  }
  else {
    return "Success";
  }
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    title: "DaDamDa에 저장하기",
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
    data = {
      pageUrl: `${pageUrl}`,
      selectedText: `${selectedText}`
    }
  } else {
    data = {
      pageUrl: `${pageUrl}`,
      selectedImageUrl: `${selectedImageUrl}`
    }
  }

  chrome.tabs.query({ currentWindow: true, active: true }, async (tabs) =>
      api(POST_HIGHLIGHTS_URL, tabs[0], data)
  );
})