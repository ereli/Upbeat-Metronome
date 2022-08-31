'use strict'

const soundEffect = new Audio();
soundEffect.autoplay = true;

// onClick of first interaction on page before I need the sounds
// (This is a tiny MP3 file that is silent and extremely short - retrieved from https://bigsoundbank.com and then modified)
soundEffect.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV";




let bpm = 60
updateToneBpm()
const bpmTopLimit = 300
const bpmBottomLimit = 35
let bpmDisplay = document.querySelector(".bpmDisplay").innerText
const tempoUpBtn = document.getElementById("tempoUp")
const tempoDownBtn = document.getElementById("tempoDown")
const playStopBtn = document.getElementById("onOff")
const dot = document.getElementById("dot")
const metClick = new Tone.Player("click2.mp3").toMaster();


const updateDisplay = function () {
    document.querySelector(".bpmDisplay").innerText = bpm
}

const increaseTempo = function () {
    if (!(bpm < bpmTopLimit)) return
    bpm++
    updateDisplay()
    updateToneBpm()
    updateAnimationTempo()
}

const decreaseTempo = function () {
    if (!(bpm > bpmBottomLimit)) return
    bpm--
    updateDisplay()
    updateToneBpm()
    updateAnimationTempo()
}

const togglePlayStop = function () {
    if (playStopBtn.className === 'play') {
        playStopBtn.className = 'stop';
        dot.classList.add('animation');
        Tone.Transport.start();
    } else {
        playStopBtn.className = 'play';
        dot.classList.remove('animation');
        Tone.Transport.stop();
    }
}

playStopBtn.addEventListener('click', function () {
    soundEffect.play()
    pressPlay()
    updateAnimationTempo()
})


const pressPlay = function () {
    togglePlayStop()

}

function updateToneBpm() {
    Tone.Transport.bpm.value = bpm
    const toneBpm = Tone.Transport.bpm.value
    // console.log(toneBpm);
}


function updateAnimationTempo() {
    let secBpm = 60 / bpm / 2
    // console.log(secBpm);
    dot.style.animationDuration = `${secBpm}s`
}



//things that go on while playing metronome

// repeated event every 4th note
Tone.Transport.scheduleRepeat((time) => {
    // use the callback time to schedule events
    metClick.start(time)
    // console.log(time);

}, "4n");






