var title = document.getElementById("dadamda-title");
title.innerText = '저장에 실패했습니다.';

var content = document.getElementById("dadamda-content");
content.style.display = 'none';

var loader = document.getElementById("dadamda-loader");
loader.style.display = 'none';

setTimeout(() => {
  var element = document.getElementById("dadamda-popup");
  element.parentNode.removeChild(element);
}, 3000);
