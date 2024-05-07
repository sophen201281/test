//to set by default is close the boxes
function closeBox() {
  $("button").css({ background: "pink" });
}

function removeID(url) {
  //look for a / followed by _, - or 0-9 characters,
  //and use $ to ensure it is the end of the string
  var reg = /\/[-\d_]+$/;

  if (reg.test(url)) {
    url = url.substr(0, url.lastIndexOf("/"));
  }
  return url;
}

//to show and hide the box cover the word or picture
jQuery(function($) {
  $("button").on("click", function() {
    if ($(this).hasClass("hide")) {
      $(this).css("background", "pink");
      $(this).removeClass("hide");

      $(this)
        .parent()
        .siblings()
        .children("button")
        .css("background", "pink");
      $(this)
        .parent()
        .siblings()
        .children("button")
        .removeClass("hide");
    } else {
      $(this).css("background", "none");
      $(this).addClass("hide");

      $(this)
        .parent()
        .siblings()
        .children("button")
        .css("background", "none");
      $(this)
        .parent()
        .siblings()
        .children("button")
        .addClass("hide");
    }
  });

  /*
  $('#back').on('click', function(e) {

  });
  var pageId = 0;
  window.onhashchange = function() {
    if (!window.innerDocClick) {
      console.log(pageId);
      currentPageId = parseInt(location.hash.substr(10, location.hash.length));
      console.log(currentPageId);
      if (pageId < currentPageId) {
        pageId = currentPageId;
      } else {
        window.location.href = window.location.pathname;
      }
    }
  };
  */
});
