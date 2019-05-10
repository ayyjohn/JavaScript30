// get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

//methods
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

function updatePlayButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function turnOnRangeMovement() {
    this.addEventListener('mousemove', handleRangeUpdate);
}

function turnOffRangeMovement() {
    this.removeEventListener('mousemove', handleRangeUpdate);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleFullscreen() {
    if (!video.fullscreen) {
        video.requestFullscreen();
    }
}

// add event handlers
toggle.addEventListener('click', togglePlay);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousedown', turnOnRangeMovement));
ranges.forEach(range => range.addEventListener('mouseup', turnOffRangeMovement));

let mouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', e => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);

fullscreen.addEventListener('click', toggleFullscreen);