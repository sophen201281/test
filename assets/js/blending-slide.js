var number_of_images = 6; // Replace number of image here Image size 1920x1080
var images_folder = 'assets/img/slide';
var thisimage = '';
for (i = 1; i <= number_of_images; i++) {
    thisimage = images_folder + '/img' + ('0' + i.toString()).slice(-2) + ".jpg";
    document.getElementById('slideshow').style.backgroundImage = "url('" + thisimage; + "')";
    document.getElementById('filmstrip').innerHTML += "<img src='" + thisimage + "' onclick='show(" + i + ")'>"
    show(1);
}

function slide(x) {
    var currentimage = document.getElementById('slideshow').style.backgroundImage.split('.jpg');
    var i = parseInt(currentimage[0].slice(-2)) + x;
    i = i > number_of_images ? 1 : i;
    i = i < 1 ? number_of_images : i;
    show(i);
}

function show(i) {
    thisimage = images_folder + '/img' + ('0' + i.toString()).slice(-2) + ".jpg";
    document.getElementById('slideshow').style.backgroundImage = "url('" + thisimage; + "')"
    var filmstrip = document.getElementById("filmstrip");
    var thumbs = filmstrip.getElementsByTagName("img");
    for (x = 0; x < thumbs.length; x++) {
        if (x == i - 1) {
            thumbs[x].className = 'bordered';
        } else {
            thumbs[x].className = '';
        }
    }
}

