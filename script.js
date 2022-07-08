const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
var numtitle = document.getElementById('title').innerHTML;
let songIndex = 0;
const colors = ['#b8d2e6', '#b0bef1', '#e1c2f1', '#fcd9f0', '#fbf2b8', '#ffd4db', '#ffd0be'];


// how to add music
const songs = [{
        coverPath: 'img/c(1).jpg',
        discPath: 'music/m(1).mp3',
    },
    {
        coverPath: 'img/c(2).jpg',
        discPath: 'music/m(2).mp3',
    },
    {
        coverPath: 'img/c(3).jpg',
        discPath: 'music/m(3).mp3',
    }
];


// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
    cover.src = song.coverPath;
    disc.src = song.discPath;
}

// Toggle play and pause
function playPauseMedia() {
    if (disc.paused) {
        disc.play();
    } else {
        disc.pause();
    }
}

// Update icon
function updatePlayPauseIcon() {
    if (disc.paused) {
        play.classList.remove('fa-pause');
        play.classList.add('fa-play');
    } else {
        play.classList.remove('fa-play');
        play.classList.add('fa-pause');
    }
}

// Update progress bar
function updateProgress() {
    progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

    let minutes = Math.floor(disc.currentTime / 60);
    let seconds = Math.floor(disc.currentTime % 60);
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
    progress.style.width = 0 + '%';
    timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
    numtitle = parseInt(numtitle)
    numtitle -= 1;
    document.getElementById('title').innerHTML = numtitle;
    if (numtitle === 0) {
        //how to add music
        numtitle = 3;
        document.getElementById('title').innerHTML = numtitle;
    }
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = 'radial-gradient(circle at 50% 0,#f0f0f0,rgba(255, 0, 0, 0) 70.71%),radial-gradient(circle at 6.7% 75%,' + color1 + ',rgba(0, 0, 255, 0) 70.71%),radial-gradient(circle at 93.3% 75%,' + color2 + ',rgba(0, 255, 0, 0) 70.71%) beige';
    if (songIndex === 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex = songIndex - 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow) {
        playPauseMedia();
    }
}


// Go to next song
function gotoNextSong(playImmediately) {
    numtitle = parseInt(numtitle)
    numtitle += 1;
    document.getElementById('title').innerHTML = numtitle;
    //how to add music
    if (numtitle === 4) {
        numtitle = 1;
        document.getElementById('title').innerHTML = numtitle;
    }
    const color1 = colors[Math.floor(Math.random() * colors.length)];
    const color2 = colors[Math.floor(Math.random() * colors.length)];
    document.body.style.background = 'radial-gradient(circle at 50% 0,#f0f0f0,rgba(255, 0, 0, 0) 70.71%),radial-gradient(circle at 6.7% 75%,' + color1 + ',rgba(0, 0, 255, 0) 70.71%),radial-gradient(circle at 93.3% 75%,' + color2 + ',rgba(0, 255, 0, 0) 70.71%) beige';
    if (songIndex === songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex = songIndex + 1;
    }

    const isDiscPlayingNow = !disc.paused;
    loadSong(songs[songIndex]);
    resetProgress();
    if (isDiscPlayingNow || playImmediately) {
        playPauseMedia();
    }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
    const totalWidth = this.clientWidth;
    const clickWidth = ev.offsetX;
    const clickWidthRatio = clickWidth / totalWidth;
    disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);