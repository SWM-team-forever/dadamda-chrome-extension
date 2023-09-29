var shadowContent = document.getElementById("dadamda-shadow");

if (shadowContent != null) {
    shadowContent.remove();
} 

var shadowDiv = document.createElement("div");
shadowDiv.setAttribute("id", "dadamda-shadow");

var shadowRoot = shadowDiv.attachShadow({ mode: 'open' });

var shadowStyle = document.createElement('style');

shadowStyle.textContent = `
    @import url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css);

    #dadamda-popup{
        box-sizing: border-box;
        font-family: 'Pretendard';
        z-index: 100001212 !important;
        position: fixed !important;
        left: 80%;
        margin: 10px 0 20px 0;
        background: #fff;
        padding: 25px;
        border-radius: 15px;
        max-width: 380px;
        width: 100%;
        box-shadow: 0 10px 15px rgba(0,0,0,0.1);
        top: 80px;
        opacity: 1;
        pointer-events: auto;
        transform:translate(-50%, -50%) scale(1);
    }

    #dadamda-icon {
        width: 13%;
    }

    #dadamda-popup :is(header){
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #dadamda-popup header{
        padding-bottom: 15px;
    }

    #dadamda-title{
        font-size: 21px;
        font-weight: 700;
        color: #475467;
    }

    #dadamda-content {
        margin-left: 0px;
        margin-top: 0px; 
        margin-bottom: 0px; 
        padding-bottom: 0px; 
        border-top: 2px solid #EFF1F3;
    }

    #dadamda-text1 {
        margin: 0px 0px 0px 0px; 
        padding: 20px 0px 0px 0px;
        font-size: 16px;
        font-weight: 300;
        color: #98A2B3;
    }
`;

shadowRoot.appendChild(shadowStyle);

var popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "dadamda-popup");

var header = document.createElement("header");

var titleSpan = document.createElement("span");
titleSpan.setAttribute("id", "dadamda-title");
titleSpan.textContent = "성공적으로 저장되었습니다.";
header.appendChild(titleSpan);

var iconImg = document.createElement("img");
iconImg.setAttribute("id", "dadamda-icon");
var logoImgSrc = chrome.runtime.getURL('/assets/image/dadamda-logo128.png');
iconImg.setAttribute("src", logoImgSrc);
header.appendChild(iconImg);

popupDiv.appendChild(header);

var contentDiv = document.createElement("div");
contentDiv.setAttribute("id", "dadamda-content");
popupDiv.appendChild(contentDiv);

var pElement = document.createElement("p");
pElement.setAttribute("id", "dadamda-text1");
pElement.textContent = "";
contentDiv.appendChild(pElement);

var dadamdaLink = document.createElement("a");
dadamdaLink.setAttribute("id", "dadamda-link");
dadamdaLink.setAttribute("href", "https://dev.dadamda.me/scrap/list");
dadamdaLink.setAttribute("style", "color: #475467; font-weight: 400; flex: 2; display: flex; flex-direction: row; text-decoration: none;");

var shortcutIcon = document.createElement("img");
dadamdaLink.setAttribute("id", "dadamda-link-img");
var shortcutIconSrc = chrome.runtime.getURL('/assets/image/icon/shortcutIcon.svg');
shortcutIcon.setAttribute("src", shortcutIconSrc);
dadamdaLink.appendChild(shortcutIcon);

var dadamdaLink2 = document.createElement("p");
dadamdaLink2.setAttribute("id", "dadamda-link2");
dadamdaLink2.setAttribute("style", "margin: 0px 0px 0px 0px; padding-left: 2px; color: #475467; font-weight: 400");
dadamdaLink2.innerText = '스크랩북에서 바로 확인해보세요!';

dadamdaLink.appendChild(dadamdaLink2);

pElement.appendChild(dadamdaLink);

shadowRoot.appendChild(popupDiv);
document.body.appendChild(shadowDiv);

setTimeout(() => {
    var element = document.getElementById("dadamda-shadow");
    if(element != null) {
        element.remove();
    }
}, 4000);