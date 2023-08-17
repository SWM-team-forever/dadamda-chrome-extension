var title = document.getElementById("dadamda-title");
title.innerText = '성공적으로 저장되었습니다.';

var loader = document.getElementById("dadamda-loader");
loader.style.display = 'none';

var content = document.getElementById("dadamda-content");
content.setAttribute("style", "margin-top: 0px; margin-bottom: 0px; padding-bottom: 0px; border-top: 2px solid #EFF1F3;");

var text1 = document.getElementById("dadamda-text1");
text1.setAttribute("style", "margin: 0px 0px 0px 0px; padding: 20px 0px 0px 0px;");
text1.innerText = '';

var dadamdaLink = document.createElement("a");
dadamdaLink.setAttribute("id", "dadamda-link");
dadamdaLink.setAttribute("href", "https://dadamda.me/scrap/list");
dadamdaLink.setAttribute("style", "color: #475467; font-weight: 400; flex: 2; display: flex; flex-direction: row; text-decoration: none;");

var shortcutIcon = document.createElement("img");
dadamdaLink.setAttribute("id", "dadamda-link-img");
let shortcutIconSrc = chrome.runtime.getURL('/assets/image/icon/shortcutIcon.svg');
shortcutIcon.setAttribute("src", shortcutIconSrc);
dadamdaLink.appendChild(shortcutIcon);

var dadamdaLink2 = document.createElement("p");
dadamdaLink2.setAttribute("id", "dadamda-link2");
dadamdaLink2.setAttribute("style", "margin: 0px 0px 0px 0px; padding-left: 2px; color: #475467; font-weight: 400");
dadamdaLink2.innerText = '스크랩북에서 바로 확인해보세요!';

dadamdaLink.appendChild(dadamdaLink2);

pElement.appendChild(dadamdaLink);

setTimeout(() => {
  var element = document.getElementById("dadamda-popup");
  element.parentNode.removeChild(element);
}, 2000);
