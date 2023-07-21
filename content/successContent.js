var title = document.getElementById("dadamda-title");
title.innerText = '성공적으로 저장되었습니다.';

var loader = document.getElementById("dadamda-loader");
loader.style.display = 'none';

var content = document.getElementById("dadamda-content");
content.style.display = 'none';

setTimeout(() => {
  var element = document.getElementById("dadamda-popup");
  element.parentNode.removeChild(element);
}, 2000);
