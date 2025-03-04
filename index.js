const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const songTitle = document.getElementById("song-title");
const playButton = document.getElementById("playPause");
const albumCover = document.getElementById("album-cover");

let songs = [
    {
        src: "./Songs/A-Sky-Full-Of-Stars.mp3",
        title: "Sky Full of Stars",
        cover: "./Images/download.jpg"
    },
    {
        src: "./Songs/Shape-Of-You-Instrumental.mp3.crdownload",
        title: "Shape of You",
        cover: "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png"
    },
    {
        src: "./Songs/The-Weeknd-Blinding-Lights-(HipHopKit.com).mp3",
        title: "Blinding Lights",
        cover: "https://upload.wikimedia.org/wikipedia/en/e/e6/The_Weeknd_-_Blinding_Lights.png"
    }
    , {
        src: "./Songs/Alan-Walker-Faded-(RawPraise.ng).mp3",
        title: "Alan Walker Faded",
        cover: "https://www.rawpraise.ng/wp-content/uploads/2024/05/auto-draft-Mp3-Download-98.jpg.webp"
    }
    ,
    {
        src: "./Songs/ridonezz_sia-feat-sean-paul-cheap-thrills.mp3",
        title: "Cheap Thrills",
        cover: "https://c.saavncdn.com/906/Cheap-Thrills-English-2020-20221121210359-500x500.jpg"
    }
];
let currentSong = 0;

function loadSong() {
    audio.src = songs[currentSong].src;
    songTitle.textContent = songs[currentSong].title;
    albumCover.src = songs[currentSong].cover;

    audio.load(); // Only loads the song, doesn't play it automatically
    playButton.textContent = "▶"; // Make sure the play button shows 'play'
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong();
}

function prevSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong();
}

function randomSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSong);
    currentSong = randomIndex;
    loadSong();
}

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
    }
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

// Load the first song correctly
loadSong();

const timeDisplay = document.getElementById("time-display");

audio.addEventListener("timeupdate", () => {
    if (audio.duration) {
        progress.value = (audio.currentTime / audio.duration) * 100;
        updateTimeDisplay();
    }
});

function updateTimeDisplay() {
    let currentMinutes = Math.floor(audio.currentTime / 60);
    let currentSeconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);

    if (durationSeconds) { // Avoid NaN when duration is not loaded
        timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, "0")} / ${durationMinutes}:${durationSeconds.toString().padStart(2, "0")}`;
    }
}
