/* =========================================
   ELEMENTS
========================================= */

const openingScreen =
    document.getElementById("openingScreen");

const nameScreen =
    document.getElementById("nameScreen");

const invitationScreen =
    document.getElementById("invitationScreen");

const openButton =
    document.getElementById("openButton");

const continueButton =
    document.getElementById("continueButton");

const guestInput =
    document.getElementById("guestName");

const displayGuestName =
    document.getElementById("displayGuestName");

const finalGuestName =
    document.getElementById("finalGuestName");

const nameError =
    document.getElementById("nameError");


/* =========================================
   SCREEN SWITCH
========================================= */

function showScreen(screenToShow) {

    const screens = [
        openingScreen,
        nameScreen
    ];

    screens.forEach(screen => {

        screen.classList.remove("active");

    });

    setTimeout(() => {

        screenToShow.classList.add("active");

    }, 100);

}


/* =========================================
   OPEN INVITATION
========================================= */

openButton.addEventListener("click", () => {

    showScreen(nameScreen);

    setTimeout(() => {

        guestInput.focus();

    }, 700);

});


/* =========================================
   CONTINUE
========================================= */

function continueToInvitation() {

    const name =
        guestInput.value.trim();

    if (!name) {

        nameError.classList.add("show");

        guestInput.focus();

        return;
    }

    nameError.classList.remove("show");


    localStorage.setItem(
        "inshaGuestName",
        name
    );


    displayGuestName.textContent =
        name;

    finalGuestName.textContent =
        name;


    /*
        Hide opening/name screens
        and reveal the actual page.
    */

    openingScreen.classList.remove("active");

    nameScreen.classList.remove("active");

    invitationScreen.classList.add("active");
    startBackgroundMusic();


    /*
        Start reveal observer
    */

    setTimeout(() => {

        setupScrollReveal();

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

    }, 200);

}


continueButton.addEventListener(
    "click",
    continueToInvitation
);


/* =========================================
   ENTER KEY
========================================= */

guestInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            continueToInvitation();

        }

    }
);


/* =========================================
   SAVED NAME
========================================= */

const savedName =
    localStorage.getItem(
        "inshaGuestName"
    );

if (savedName) {

    guestInput.value =
        savedName;

}


/* =========================================
   SCROLL REVEAL
========================================= */

function setupScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );

    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.18
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================
   COUNTDOWN
========================================= */

// ================================
// BIRTHDAY COUNTDOWN
// ================================

const birthdayDate = new Date("October 10, 2026 19:30:00").getTime();

const countdownBox = document.getElementById("countdownBox");
const countdownTitle = document.getElementById("countdownTitle");
const countdownMessage = document.getElementById("countdownMessage");

function updateCountdown() {

    const now = new Date().getTime();
    const difference = birthdayDate - now;

    // Birthday hasn't arrived yet
    if (difference > 0) {

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        document.getElementById("days").textContent =
            String(days).padStart(2, "0");

        document.getElementById("hours").textContent =
            String(hours).padStart(2, "0");

        document.getElementById("minutes").textContent =
            String(minutes).padStart(2, "0");

        document.getElementById("seconds").textContent =
            String(seconds).padStart(2, "0");

        countdownTitle.textContent =
            "Until we celebrate Inshu! 🎀";

        countdownMessage.textContent = "";

        return;
    }

    // Birthday has arrived
    countdownBox.style.display = "none";

    countdownTitle.textContent =
        "TODAY IS THE DAY! 🎉🎂";

    countdownMessage.textContent =
        "Let's celebrate our little Inshu turning TWO! ❤️";
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================
   GOOGLE MAPS
========================================= */

const mapsButton =
    document.getElementById(
        "mapsButton"
    );

mapsButton.addEventListener(
    "click",
    () => {

        if (
            CONFIG.mapsLink &&
            CONFIG.mapsLink !== "#"
        ) {

            window.open(
                CONFIG.mapsLink,
                "_blank"
            );

        } else {

            alert(
                "Google Maps link will be added soon 📍"
            );

        }

    }
);
/* =========================================
   PHOTO VIEWER
========================================= */

const photoViewer =
    document.getElementById(
        "photoViewer"
    );

const viewerImage =
    document.getElementById(
        "viewerImage"
    );

const closeViewer =
    document.getElementById(
        "closeViewer"
    );

const viewerCounter =
    document.getElementById(
        "viewerCounter"
    );


const storyPhotos =
    document.querySelectorAll(
        ".story-photo img"
    );


let currentPhotoIndex = 0;


/* =========================================
   OPEN PHOTO
========================================= */

storyPhotos.forEach(
    (image, index) => {

        image.parentElement.addEventListener(
            "click",
            () => {

                currentPhotoIndex =
                    index;

                openPhoto(index);

            }
        );

    }
);


function openPhoto(index) {

    const image =
        storyPhotos[index];

    viewerImage.src =
        image.src;

    viewerCounter.textContent =
        `${index + 1} / ${storyPhotos.length}`;

    photoViewer.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE
========================================= */

function closePhotoViewer() {

    photoViewer.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "auto";

}


closeViewer.addEventListener(
    "click",
    closePhotoViewer
);


/* =========================================
   TAP OUTSIDE IMAGE
========================================= */

photoViewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            photoViewer
        ) {

            closePhotoViewer();

        }

    }
);


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            closePhotoViewer();

        }

    }
);


/* =========================================
   PHOTO SCROLL REVEAL
========================================= */

const photoObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "photo-visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


document
    .querySelectorAll(
        ".story-photo"
    )
    .forEach(
        (photo) => {

            photoObserver.observe(
                photo
            );

        }
    );
    
/* =========================================
   BACKGROUND MUSIC
========================================= */

const backgroundMusic = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
const musicIcon = document.getElementById("musicIcon");

let musicPlaying = false;

if (backgroundMusic) {
    backgroundMusic.volume = 0.35;
}

function startBackgroundMusic() {
    if (!backgroundMusic) return;

    backgroundMusic.play()
        .then(() => {
            musicPlaying = true;

            if (musicToggle) {
                musicToggle.classList.add("visible");
                musicToggle.classList.add("playing");
            }

            if (musicIcon) {
                musicIcon.textContent = "♫";
            }
        })
        .catch(() => {
            console.log("Music could not start automatically.");
        });
}

function toggleMusic() {
    if (!backgroundMusic) return;

    if (backgroundMusic.paused) {
        backgroundMusic.play()
            .then(() => {
                musicPlaying = true;
                musicToggle.classList.add("playing");
                musicIcon.textContent = "♫";
            });
    } else {
        backgroundMusic.pause();

        musicPlaying = false;
        musicToggle.classList.remove("playing");
        musicIcon.textContent = "🔇";
    }
}

if (musicToggle) {
    musicToggle.addEventListener("click", toggleMusic);
}