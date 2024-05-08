document.addEventListener("DOMContentLoaded", function () {

  window.addEventListener('hashchange', function () {
    closeBox();
    const parts = window.location.pathname.substring(window.location.pathname.lastIndexOf('features') + 1);
    console.log(parts);
  });

  const features = document.getElementById('features');
  wowBook(features, {
    height: 460,
    width: 850,
    centeredWhenClosed: true,
    hardcovers: true,
    turnPageDuration: 1000,
    numberedPages: [1, -2],
    controls: {
      zoomIn: document.querySelector('#zoomin'),
      zoomOut: document.querySelector('#zoomout'),
      next: document.querySelector('#next'),
      back: document.querySelector('#back'),
      first: document.querySelector('#first'),
      last: document.querySelector('#last'),
      slideShow: document.querySelector('#slideshow'),
      flipSound: document.querySelector('#flipsound'),
      thumbnails: document.querySelector('#thumbs'),
      fullscreen: document.querySelector('#fullscreen')
    },
    scaleToFit: document.getElementById("container"),
    thumbnailsPosition: 'bottom',
    onFullscreenError: function () {
      const msg = "Fullscreen failed.";
      if (window !== window.parent) {
        msg = "The frame is blocking full screen mode. Click on 'remove frame' button above and try to go full screen again."
      }
      alert(msg);
    }
  });

  features.style.display = 'none';
  features.style.margin = 'auto';
  features.classList.add('fadeIn'); // Assuming you have a fadeIn class for animation (replace with your library)
  setTimeout(() => features.classList.remove('fadeIn'), 1000); // Simulate fadeIn effect after 1 second

  const cover = document.getElementById("cover");
  cover.addEventListener("click", function () {
    const book = wowBook(features);
    book.advance();
  });

  let book;

  function rebuildThumbnails() {
    const wowBookInstance = wowBook(features);
    wowBookInstance.destroyThumbnails();
    wowBookInstance.showThumbnails();
    const thumbsHolder = document.getElementById("thumbs_holder");
    thumbsHolder.style.marginTop = -thumbsHolder.offsetHeight / 2;
  }

  const thumbsPositionButtons = document.querySelectorAll("#thumbs_position button");
  thumbsPositionButtons.forEach(button => {
    button.addEventListener("click", function () {
      const position = button.textContent.toLowerCase();
      book.opts.thumbnailsParent = (button.dataset.customized) ? "#thumbs_holder" : "body";
      book.opts.thumbnailsPosition = position;
      rebuildThumbnails();
    });
  });

  const thumbAutomatic = document.getElementById("thumb_automatic");
  thumbAutomatic.addEventListener("click", function () {
    book.opts.thumbnailsSprite = null;
    book.opts.thumbnailWidth = null;
    rebuildThumbnails();
  });

  const thumbSprite = document.getElementById("thumb_sprite");
  thumbSprite.addEventListener("click", function () {
    book.opts.thumbnailsSprite = "images/thumbs.jpg";
    book.opts.thumbnailWidth = 136;
    rebuildThumbnails();
  });

  const thumbsSizeButtons = document.querySelectorAll("#thumbs_size button");
  thumbsSizeButtons.forEach(button => {
    button.addEventListener("click", function () {
      const factor = 0.02 * (button.index ? -1 : 1);
      book.opts.thumbnailScale += factor;
      rebuildThumbnails();
    });
  });

});
