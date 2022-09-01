'use strict'

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
const myAudio = new Audio('click2.mp3')


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

}

playStopBtn.addEventListener('click', function () {
    pressPlay()
    updateAnimationTempo()
})



const pressPlay = function () {
    // toggle Play / Stop
    if (playStopBtn.className === 'play') {
        playStopBtn.className = 'stop';
        dot.classList.add('animation');
        Tone.Transport.start();
        console.log('test3');
    } else {
        playStopBtn.className = 'play';
        dot.classList.remove('animation');
        Tone.Transport.stop();
    }

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



// repeated event every 4th note
Tone.Transport.scheduleRepeat((time) => {

    metClick.start(time)
    console.log(time);
    // myAudio.play(time)

}, "4n");



//try
