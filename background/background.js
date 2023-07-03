const POST_SCRAP_URL = "http://localhost:8080/api/v1/product";
const TOKEN_URL = "http://localhost:8080/?token=";
const GOOGLE_LOGIN_URL = "http://localhost:8080/oauth2/authorization/google";

let newToken = null;

function getToken() {
  if (newToken === null) {
    if (chrome.storage.local.get('signedIn')) {
      chrome.storage.local.get(['accessToken'], (result) => {
        newToken = result.accessToken;
      });
    }
  }
}

async function postUrl(postScrapURL, currentUrl) {
  fetch(postScrapURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": newToken
    },
    body: JSON.stringify({
      url: `${currentUrl}`,
    }),
  }).then((response) => {
    console.log(response);
    if (response.status >= 300) { //token 기한이 만료된 경우
      chrome.storage.local.clear();
      setPopupHTML();
    }
  });
}

function scrap() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tab = tabs[0];
    const currentUrl = tab.url;
    postUrl(POST_SCRAP_URL, currentUrl);
  })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message === "google-login") {
    try {
      chrome.tabs.create({ active: true, url: GOOGLE_LOGIN_URL });

      chrome.tabs.onUpdated.addListener(function authorizationHook(tabId, changeInfo, tab) {
        if (tab.url.startsWith(TOKEN_URL)) {

          const tabURL = tab.url;
          const token = tabURL.split('=')[1];

          chrome.storage.local.set({ 'accessToken': token });

          chrome.storage.local.set({ 'signedIn': true });

          chrome.tabs.onUpdated.removeListener(authorizationHook);

          sendResponse("Success");

          setPopupHTML();
        } else {
          sendResponse("Fail");
        }
      });
    } catch {
      sendResponse("Fail");
    } finally {
      return true;
    }
  } else if (message === "save") {
    try {
      getToken();
      scrap();
      sendResponse("Success");
    } catch {
      sendResponse("Fail");
    } finally {
      return true;
    }
  }
})

function setPopupHTML() {
  if (chrome.storage.local.get('signedIn')) {
    chrome.action.setPopup({ popup: '/popup/popup.html' });
  } else {
    chrome.action.setPopup({ popup: '/popup/popupSignIn.html' });
  }
}