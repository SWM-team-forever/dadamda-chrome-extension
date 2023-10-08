const googleLogin = jest.fn();
const contentScriptJS = jest.fn((tabId, path) => {return {tabId, path}});
const contentScriptCSS = jest.fn();
const postAPI = jest.fn();
postAPI.mockReturnValue("Success");

function handleScrapOrHighlightResponse(url, tab, data) {
  return chrome.storage.local.get('signedIn').then(async (result) => {
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
  it('handleScrapOrHighlightResponse', async () => {
    const url = 'https://www.google.com';
    const tab = { id: 123 };
    const data = "data";

    await handleScrapOrHighlightResponse(url, tab, data);
    expect(chrome.storage.local.get).toHaveBeenCalled();
  });
});

describe('success response test', () => {
  it('success test', async () => {
    const url = 'https://www.google.com';
    const tab = { id: 123 };
    const data = "data";

    await handleScrapOrHighlightResponse(url, tab, data);
    expect(postAPI(url, data)).toBe("Success");
  });
});
