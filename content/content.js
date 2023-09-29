if (document.getElementById("dadamda-shadow") == null) {
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

    #dadamda-popup #dadamda-content{
      margin: 20px 0;
    }

    #dadamda-text1 {
      font-size: 16px;
      font-weight: 300;
      color: #98A2B3;
    }

    #dadamda-loader {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    #dadamda-progress-bar {
      position: relative;
      width: 100%;
      height: 5px;
      border-radius: 100px;
      background-color: #F8FAFC;
      overflow: hidden;
    }

    #dadamda-progress-bar-gauge {
      position: absolute;
      height: 5px;
      border-radius: 15px;
      background-color: #B2CCFF;
      animation-name: loading-bar;
      animation-duration: 15s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-out;
    }

    @keyframes loading-bar {
      0% {
        width: 0;
        opacity: 1;
      }
      80% {
        width: 100%;
        opacity: 1;
      }
      100% {
        width: 100%;
        opacity: 0;
      }
    }
  `;

  shadowRoot.appendChild(shadowStyle);

  var popupDiv = document.createElement("div");
  popupDiv.setAttribute("id", "dadamda-popup");

  var header = document.createElement("header");

  var titleSpan = document.createElement("span");
  titleSpan.setAttribute("id", "dadamda-title");
  titleSpan.textContent = "스크랩북에 저장중입니다.";
  header.appendChild(titleSpan);

  var iconImg = document.createElement("img");
  iconImg.setAttribute("id", "dadamda-icon");
  var logoImgSrc = chrome.runtime.getURL('/assets/image/dadamda-logo128.png');
  iconImg.setAttribute("src", logoImgSrc);
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

  shadowRoot.appendChild(popupDiv);

  document.body.appendChild(shadowDiv);
}
