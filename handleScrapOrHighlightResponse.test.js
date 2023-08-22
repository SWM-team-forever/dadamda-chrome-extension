// import { handleScrapOrHighlightResponse } from "./background/background";

const googleLogin = jest.fn();
const contentScriptJS = jest.fn();
const contentScriptCSS = jest.fn();
const postAPI = jest.fn();

function handleScrapOrHighlightResponse(url, tab, data) {
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

describe('handleScrapOrHighlightResponse test', () => {
  it('handleScrapOrHighlightResponse', () => {
    const url = 'https://www.google.com';
    const tab = { id: 123 };
    const data = "data";

    handleScrapOrHighlightResponse(url, tab, data);
    expect(chrome.storage.local.get).toHaveBeenCalled();
  });
});