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
        font-size: 20px;
        font-weight: 700;
        color: #475467;
    }

    #dadamda-popup #dadamda-content{
        margin: 20px 0;
    }
`;

shadowRoot.appendChild(shadowStyle);

var popupDiv = document.createElement("div");
popupDiv.setAttribute("id", "dadamda-popup");

var header = document.createElement("header");

var titleSpan = document.createElement("span");
titleSpan.setAttribute("id", "dadamda-title");
titleSpan.textContent = "공백은 저장할 수 없습니다.";
header.appendChild(titleSpan);

var iconImg = document.createElement("img");
iconImg.setAttribute("id", "dadamda-icon");
var logoImgSrc = chrome.runtime.getURL('/assets/image/dadamda-logo128.png');
iconImg.setAttribute("src", logoImgSrc);
header.appendChild(iconImg);

popupDiv.appendChild(header);

shadowRoot.appendChild(popupDiv);

document.body.appendChild(shadowDiv);

setTimeout(() => {
    var element = document.getElementById("dadamda-shadow");
    if(element != null) {
        element.remove();
    }
}, 4000);
