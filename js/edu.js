 function erudaToggle() {
    const proccy = document.getElementById('iframeId');
    if (!proccy) return;

    const proccyWindow = proccy.contentWindow;
    const proccyDocument = proccy.contentDocument;

    if (!proccyWindow || !proccyDocument) return;

    if (proccyWindow.eruda?._isInit) {
      proccyWindow.eruda.destroy();
    } else {
      let script = proccyDocument.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/eruda';
      script.onload = function () {
        if (!proccyWindow) return;
        proccyWindow.eruda.init();
        proccyWindow.eruda.show();
      };
      proccyDocument.head.appendChild(script);
    }
  }

  function goFullscreen() {
    const iframe = document.getElementById('iframeId');
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen();
    }
  }

const searchIcon = document.querySelector('.bx-search');
const overlay = document.getElementById('searchOverlay');
const searchBar = document.getElementById('uv-address');
const closeBtn = document.getElementById('closeOverlayBtn');

function openSearch() {
  overlay.classList.add('show'); 
  searchBar.classList.add('visible'); 
  searchBar.focus();  
}

searchIcon.addEventListener('click', openSearch);

closeBtn.addEventListener('click', function() {
  overlay.classList.remove('show');
  searchBar.classList.remove('visible');
});

document.addEventListener('click', function (event) {

  if (overlay.classList.contains('show') && !overlay.contains(event.target) && event.target !== searchIcon) {
    overlay.classList.remove('show');
    searchBar.classList.remove('visible');
  }
});

overlay.addEventListener('click', function (event) {
  event.stopPropagation();  
});

searchBar.addEventListener('click', function (event) {
  event.stopPropagation();  
});
