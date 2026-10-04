/* =========================================
NAVBAR
========================================= */

const navbar =
document.querySelector(".navbar");

window.addEventListener(
"scroll",
() => {


    if (window.scrollY > 40) {

        navbar.classList.add(
            "scrolled"
        );

    } else {

        navbar.classList.remove(
            "scrolled"
        );

    }

}


);

/* =========================================
ACTIVE NAV
========================================= */

const sections =
document.querySelectorAll("section");

const navLinks =
document.querySelectorAll(
".navbar nav a"
);

const sectionObserver =
new IntersectionObserver(
entries => {


        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach(link => {

                link.classList.remove(
                    "active"
                );

            });

            const active =
                document.querySelector(
                    `.navbar nav a[href="#${entry.target.id}"]`
                );

            if (active) {

                active.classList.add(
                    "active"
                );

            }

        });

    },
    {
        threshold: .35
    }
);


sections.forEach(section => {


sectionObserver.observe(section);


});

/* =========================================
PHOTO GALLERY
========================================= */

const galleryModal =
document.getElementById(
"galleryModal"
);

const galleryClose =
document.getElementById(
"galleryClose"
);

const galleryImage =
document.getElementById(
"galleryImage"
);

const galleryTitle =
document.getElementById(
"galleryTitle"
);

const galleryCategory =
document.getElementById(
"galleryCategory"
);

const galleryCounter =
document.getElementById(
"galleryCounter"
);

const galleryPrev =
document.getElementById(
"galleryPrev"
);

const galleryNext =
document.getElementById(
"galleryNext"
);

const galleryThumbnails =
document.getElementById(
"galleryThumbnails"
);

/*
FOTO UNTUK MUSIC
*/

const musicPhotos = [


"Screenshot 2026-10-03 182317.png",
"images/music2.jpg",
"images/music3.jpg",
"images/music4.jpg",
"images/music5.jpg"


];

/*
FOTO UNTUK MOVIES
*/

const moviePhotos = [


"fototoystory4.webp",
"images/movie2.jpg",
"images/movie3.jpg",
"images/movie4.jpg",
"images/movie5.jpg"


];

const galleries = {


music: {

    title:
        "Little Music Memories",

    category:
        "MUSIC",

    photos:
        musicPhotos

},

movies: {

    title:
        "Little Movie Memories",

    category:
        "MOVIES",

    photos:
        moviePhotos

}


};

let currentGallery =
null;

let currentGalleryIndex =
0;

/* =========================================
OPEN GALLERY
========================================= */

function openGallery(
galleryName
) {


const gallery =
    galleries[galleryName];

if (!gallery) {
    return;
}


currentGallery =
    gallery;

currentGalleryIndex =
    0;


galleryTitle.textContent =
    gallery.title;

galleryCategory.textContent =
    gallery.category;


buildThumbnails();

showGalleryImage();


galleryModal.classList.add(
    "open"
);

galleryModal.setAttribute(
    "aria-hidden",
    "false"
);

document.body.classList.add(
    "modal-open"
);


}

/* =========================================
CLOSE GALLERY
========================================= */

function closeGallery() {


galleryModal.classList.remove(
    "open"
);

galleryModal.setAttribute(
    "aria-hidden",
    "true"
);

document.body.classList.remove(
    "modal-open"
);

currentGallery =
    null;


}

/* =========================================
SHOW IMAGE
========================================= */

function showGalleryImage() {


if (!currentGallery) {
    return;
}


const photos =
    currentGallery.photos;


if (!photos.length) {
    return;
}


galleryImage.style.opacity =
    "0";


setTimeout(
    () => {

        galleryImage.src =
            photos[currentGalleryIndex];

        galleryImage.alt =
            `${currentGallery.category} photo ${currentGalleryIndex + 1}`;

        galleryImage.style.opacity =
            "1";

    },
    100
);


galleryCounter.textContent =
    `${currentGalleryIndex + 1} / ${photos.length}`;


updateThumbnails();


}

/* =========================================
BUILD THUMBNAILS
========================================= */

function buildThumbnails() {


galleryThumbnails.innerHTML =
    "";


if (!currentGallery) {
    return;
}


currentGallery.photos.forEach(
    (photo, index) => {

        const button =
            document.createElement(
                "button"
            );

        button.className =
            "gallery-thumb";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            `View photo ${index + 1}`
        );


        const image =
            document.createElement(
                "img"
            );


        image.src =
            photo;


        image.alt =
            "";


        button.appendChild(
            image
        );


        button.addEventListener(
            "click",
            () => {

                currentGalleryIndex =
                    index;

                showGalleryImage();

            }
        );


        galleryThumbnails.appendChild(
            button
        );

    }
);


}

/* =========================================
UPDATE THUMBNAILS
========================================= */

function updateThumbnails() {


const thumbnails =
    galleryThumbnails.querySelectorAll(
        ".gallery-thumb"
    );


thumbnails.forEach(
    (thumbnail, index) => {

        thumbnail.classList.toggle(
            "active",
            index === currentGalleryIndex
        );

    }
);


}

/* =========================================
NEXT GALLERY PHOTO
========================================= */

function nextGalleryPhoto() {


if (!currentGallery) {
    return;
}


currentGalleryIndex++;


if (
    currentGalleryIndex >=
    currentGallery.photos.length
) {

    currentGalleryIndex =
        0;

}


showGalleryImage();


}

/* =========================================
PREVIOUS GALLERY PHOTO
========================================= */

function previousGalleryPhoto() {


if (!currentGallery) {
    return;
}


currentGalleryIndex--;


if (currentGalleryIndex < 0) {

    currentGalleryIndex =
        currentGallery.photos.length - 1;

}


showGalleryImage();


}

/* =========================================
CARD CLICK
========================================= */

const galleryCards =
document.querySelectorAll(
".clickable-card"
);

galleryCards.forEach(
card => {


    card.addEventListener(
        "click",
        () => {

            const galleryName =
                card.dataset.gallery;

            openGallery(
                galleryName
            );

        }
    );

}


);

/* =========================================
GALLERY BUTTONS
========================================= */

galleryClose.addEventListener(
"click",
closeGallery
);

galleryPrev.addEventListener(
"click",
previousGalleryPhoto
);

galleryNext.addEventListener(
"click",
nextGalleryPhoto
);

/*
Klik background
untuk menutup.
*/

galleryModal
.querySelector(".gallery-overlay")
.addEventListener(
"click",
closeGallery
);

/* =========================================
GALLERY KEYBOARD
========================================= */

document.addEventListener(
"keydown",
event => {


    if (
        !galleryModal.classList.contains(
            "open"
        )
    ) {

        return;

    }


    if (
        event.key === "ArrowRight"
    ) {

        nextGalleryPhoto();

    }


    if (
        event.key === "ArrowLeft"
    ) {

        previousGalleryPhoto();

    }


    if (
        event.key === "Escape"
    ) {

        closeGallery();

    }

}


);

/* =========================================
GALLERY SWIPE
========================================= */

const galleryImageWrap =
document.querySelector(
".gallery-image-wrap"
);

let touchStartX = 0;
let touchStartY = 0;

galleryImageWrap.addEventListener(
"touchstart",
event => {


    const touch =
        event.changedTouches[0];

    touchStartX =
        touch.clientX;

    touchStartY =
        touch.clientY;

},
{
    passive: true
}


);

galleryImageWrap.addEventListener(
"touchend",
event => {


    const touch =
        event.changedTouches[0];

    const deltaX =
        touch.clientX -
        touchStartX;

    const deltaY =
        touch.clientY -
        touchStartY;


    if (
        Math.abs(deltaX) <
        50
    ) {

        return;

    }


    if (
        Math.abs(deltaX) <
        Math.abs(deltaY)
    ) {

        return;

    }


    if (deltaX < 0) {

        nextGalleryPhoto();

    } else {

        previousGalleryPhoto();

    }

},
{
    passive: true
}


);

/* =========================================
BOOK
========================================= */

const leftPhotos =
document.getElementById(
"leftPhotos"
);

const rightPhotos =
document.getElementById(
"rightPhotos"
);

const forwardSheet =
document.getElementById(
"forwardSheet"
);

const backwardSheet =
document.getElementById(
"backwardSheet"
);

const forwardFront =
document.getElementById(
"forwardFront"
);

const forwardBack =
document.getElementById(
"forwardBack"
);

const backwardFront =
document.getElementById(
"backwardFront"
);

const backwardBack =
document.getElementById(
"backwardBack"
);

const nextButton =
document.getElementById(
"nextBook"
);

const previousButton =
document.getElementById(
"prevBook"
);

const currentPageText =
document.getElementById(
"currentPage"
);

const totalPageText =
document.getElementById(
"totalPage"
);

/* =========================================
BOOK PAGE DATA
========================================= */

const pages = [


{
    photos: [
        "fotok2.jpeg",
        "fotok3.jpeg",
        "images/photo3.jpg"
    ],

    layout:
        "layout-1"
},


{
    photos: [
        "images/photo4.jpg",
        "images/photo5.jpg",
        "images/photo6.jpg"
    ],

    layout:
        "layout-2"
},


{
    photos: [
        "images/photo7.jpg",
        "images/photo8.jpg",
        "images/photo9.jpg"
    ],

    layout:
        "layout-3"
},


{
    photos: [
        "images/photo10.jpg",
        "images/photo11.jpg",
        "images/photo12.jpg"
    ],

    layout:
        "layout-4"
},


{
    photos: [
        "images/photo13.jpg",
        "images/photo14.jpg",
        "images/photo15.jpg"
    ],

    layout:
        "layout-5"
},


{
    photos: [
        "images/photo16.jpg",
        "images/photo17.jpg",
        "images/photo18.jpg"
    ],

    layout:
        "layout-1"
},


{
    photos: [
        "images/photo19.jpg",
        "images/photo20.jpg",
        "images/photo21.jpg"
    ],

    layout:
        "layout-3"
},


{
    photos: [
        "images/photo22.jpg",
        "images/photo23.jpg",
        "images/photo24.jpg"
    ],

    layout:
        "layout-2"
}


];

let currentIndex =
0;

let isAnimating =
false;

/* =========================================
RENDER PAGE
========================================= */

function renderPage(
container,
page
) {


container.innerHTML =
    "";

container.className =
    `photo-layout ${page.layout}`;


page.photos.forEach(
    photo => {

        const image =
            document.createElement(
                "img"
            );


        image.src =
            photo;


        image.alt =
            "Memory photo";


        container.appendChild(
            image
        );

    }
);


}

/* =========================================
UPDATE BOOK
========================================= */

function updateBook() {


renderPage(
    leftPhotos,
    pages[currentIndex]
);


if (
    pages[currentIndex + 1]
) {

    renderPage(
        rightPhotos,
        pages[currentIndex + 1]
    );

} else {

    rightPhotos.innerHTML =
        "";

    rightPhotos.className =
        "photo-layout";

}


currentPageText.textContent =
    currentIndex + 1;


totalPageText.textContent =
    pages.length;


previousButton.disabled =
    currentIndex === 0;


nextButton.disabled =
    currentIndex >=
    pages.length - 1;
}

/* =========================================
NEXT BOOK PAGE
========================================= */

function nextPage() {


if (isAnimating) {
    return;
}


if (
    currentIndex >=
    pages.length - 1
) {

    return;

}


isAnimating =
    true;


renderPage(
    forwardFront,
    pages[currentIndex + 1]
);


if (
    pages[currentIndex + 2]
) {

    renderPage(
        forwardBack,
        pages[currentIndex + 2]
    );

} else {

    forwardBack.innerHTML =
        "";

}


backwardSheet.className =
    "flip-sheet backward-sheet";


forwardSheet.className =
    "flip-sheet forward-sheet active";


void forwardSheet.offsetWidth;


forwardSheet.classList.add(
    "animating"
);


setTimeout(
    () => {

        currentIndex++;


        updateBook();


        forwardSheet.className =
            "flip-sheet forward-sheet";


        isAnimating =
            false;

    },
    1100
);


}

/* =========================================
PREVIOUS BOOK PAGE
========================================= */

function previousPage() {


if (isAnimating) {
    return;
}


if (currentIndex <= 0) {
    return;
}


isAnimating =
    true;


renderPage(
    backwardFront,
    pages[currentIndex]
);


renderPage(
    backwardBack,
    pages[currentIndex - 1]
);


forwardSheet.className =
    "flip-sheet forward-sheet";


backwardSheet.className =
    "flip-sheet backward-sheet active";


void backwardSheet.offsetWidth;


backwardSheet.classList.add(
    "animating"
);


setTimeout(
    () => {

        currentIndex--;


        updateBook();


        backwardSheet.className =
            "flip-sheet backward-sheet";


        isAnimating =
            false;

    },
    1100
);


}

/* =========================================
BOOK BUTTONS
========================================= */

nextButton.addEventListener(
"click",
nextPage
);

previousButton.addEventListener(
"click",
previousPage
);

/* =========================================
BOOK KEYBOARD
========================================= */

document.addEventListener(
"keydown",
event => {


    /*
        Kalau gallery sedang buka,
        keyboard dipakai gallery.
    */

    if (
        galleryModal.classList.contains(
            "open"
        )
    ) {

        return;

    }


    if (
        event.key === "ArrowRight"
    ) {

        nextPage();

    }


    if (
        event.key === "ArrowLeft"
    ) {

        previousPage();

    }

}


);

/* =========================================
INITIAL
========================================= */

updateBook();
