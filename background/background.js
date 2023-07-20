const POST_SCRAP_URL = "http://localhost:8080/v1/scraps";
const TOKEN_URL = "http://localhost:8080/?token=";
const GOOGLE_LOGIN_URL = "http://localhost:8080/oauth2/authorization/google";

let newToken = null;

function contentScriptJS(tabId, file){
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: [`${file}`]
  });
}

function contentScriptCSS(tabId, file){
  chrome.scripting.insertCSS({
    target: { tabId: tabId },
    files: [`${file}`]
  })
}

chrome.action.onClicked.addListener(async (tab) => {
      chrome.storage.local.get('signedIn').then(async (result) => {
        if (result.signedIn) {
          contentScriptJS(tab.id, "content/content.js");
          contentScriptCSS(tab.id, "content/content.css");

          await chrome.storage.local.get('accessToken').then((result) => {
            newToken = result.accessToken;
          });

          const response = await postUrl(POST_SCRAP_URL, tab.url);

          if (response === "Success") {
            contentScriptJS(tab.id, "content/successContent.js");
          } else if (response === "BR002") {
            contentScriptJS(tab.id, "content/duplicatedScrap.js");
          } else if (response === "NF002" || response === "BR001") {
            googleLogin();
          } else {
            contentScriptJS(tab.id, "content/errorContent.js")
          }
        } else {
          googleLogin()
        }
      })
    }
)

function googleLogin() {
  chrome.tabs.create({ active: true, url: GOOGLE_LOGIN_URL });

  chrome.tabs.onUpdated.addListener(
      function authorizationHook(tabId, changeInfo, tab) {
        if (tab.url.startsWith(TOKEN_URL)) {

          const tabURL = tab.url;
          const token = tabURL.split('=')[1];

          chrome.storage.local.set({ 'accessToken': token });

          newToken = token;

          chrome.storage.local.set({ 'signedIn': true });

          chrome.tabs.onUpdated.removeListener(authorizationHook);
        }
      })
}

async function postUrl(postScrapURL, currentUrl) {
  let response = await fetch(postScrapURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-AUTH-TOKEN": newToken
    },
    body: JSON.stringify({
      pageUrl: `${currentUrl}`
    }),
  });
  console.log(response);

  if (response.status >= 300) {
    let responseJson = await response.json();
    let errorCode = await responseJson.resultCode;
    console.log(errorCode);
    return errorCode;
  }
  else {
    return "Success";
  }
}