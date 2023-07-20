var title = document.getElementById("dadamda-title");
title.innerText = '이미 저장된 URL입니다.';

var loader = document.getElementById("dadamda-loader");
loader.style.display = 'none';

var content = document.getElementById("dadamda-content");
content.style.display = 'none';

setTimeout(() => {
  var element = document.getElementById("dadamda-popup");
  element.parentNode.removeChild(element);
}, 3000);
