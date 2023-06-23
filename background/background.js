importScripts("../assets/secrets/api.js");

chrome.action.onClicked.addListener(getCurrentTabUrl);

async function postURL(postScrapURL, currentURL){
  fetch(postScrapURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: `${currentURL}`
    }),
  }).then((response) => {
    console.log(response)
  });
}

async function scrap(currentURL){
  const postScrapURL = POST_URL_API;

  await postURL(postScrapURL, currentURL);

  await chrome.notifications.create('1', {
    title: "당신의 링크를 모두 '다담다'",
    message: '링크가 성공적으로 저장되었습니다!',
    iconUrl: '/assets/image/bookmark128.png',
    type: 'basic'
  });

  setTimeout(() =>chrome.notifications.clear('1'), 3000);
}

function getCurrentTabUrl() {
  chrome.tabs.query({active: true,currentWindow: true}, (tabs) => {
    let tab = tabs[0];
    let currentURL = tab.url;
    scrap(currentURL);
  })
}