var popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "dadamda-popup");

var header = document.createElement("header");

var titleSpan = document.createElement("span");
titleSpan.setAttribute("id", "dadamda-title");
titleSpan.textContent = "스크랩북에 저장중입니다.";
header.appendChild(titleSpan);

var iconImg = document.createElement("img");
iconImg.setAttribute("id", "dadamda-icon");
iconImg.setAttribute("src", "https://dadamda-chrome-extention.s3.ap-northeast-2.amazonaws.com/src/dadamda-logo.jpeg");
header.appendChild(iconImg);

popupDiv.appendChild(header);

var loaderSection = document.createElement("section");
loaderSection.setAttribute("id", "dadamda-loader");

var loaderProgressBar = document.createElement("div");
loaderProgressBar.setAttribute("id", "dadamda-progress-bar");

var loaderProgressBarGauge = document.createElement("span");
loaderProgressBarGauge.setAttribute("id", "dadamda-progress-bar-gauge");

loaderProgressBar.appendChild(loaderProgressBarGauge);
loaderSection.appendChild(loaderProgressBar);

popupDiv.appendChild(loaderSection);

var contentDiv = document.createElement("div");
contentDiv.setAttribute("id", "dadamda-content");
popupDiv.appendChild(contentDiv);

var pElement = document.createElement("p");
pElement.setAttribute("id", "dadamda-text1");
pElement.textContent = "잠시만 기다려주세요!";
contentDiv.appendChild(pElement);

document.body.appendChild(popupDiv);