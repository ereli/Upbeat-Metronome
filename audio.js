const ctx = new (window.AudioContext || window.webkitAudioContext)();
    
// https://stackoverflow.com/questions/9709891/prevent-ios-mobile-safari-from-going-idle-auto-locking-sleeping/71316630#71316630
// create silent sound
let bufferSize = 2 * ctx.sampleRate, 
    emptyBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate), 
    output = emptyBuffer.getChannelData(0);

// fill buffer
for(let i = 0; i < bufferSize; i++) 
    output[i] = 0;

// create source node
let source = ctx.createBufferSource();
source.buffer = emptyBuffer;
source.loop = true;

// create destination node
let node = ctx.createMediaStreamDestination();
source.connect(node);

// dummy audio element
let audio = document.createElement("audio");
audio.style.display = "none";
document.body.appendChild(audio);

// set source and play
audio.srcObject = node.stream;
audio.play();

let click = new Audio("click3.wav");
let bpm = 60;
let interval = 0;
let isPlaying = false;
let timer = 0;

//play click sound when start button is clicked
function startMetronome() {
    isPlaying = true;
        click.play();
        timer = setInterval(playClick, (60 / bpm) * 1000);
}

    //stop click sound when stop button is clicked
function stopMetronome() {
    click.pause();
    click.currentTime = 0;
    isPlaying = false;
    clearInterval(timer);
}
//play click sound when timer is triggered
function playClick() {
    click.play();
    click.currentTime = 0;
}


//adjust bpm
function adjustBpm() {
    bpm = document.getElementById("bpm").value;
    if (isPlaying) {
        clearInterval(timer);
        timer = setInterval(playClick, (60 / bpm) * 1000);
        updateBpmDisplay()
        

    }
}

//update bpmDisplay when bpm is adjusted
function updateBpmDisplay() {
    document.getElementById("bpmDisplay").innerHTML = bpm;
}
