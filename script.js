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
        console.log('here');
    }
}

playStopBtn.addEventListener('click', function () {
    pressPlay()
    updateAnimationTempo()
})

document.querySelector('.play')?.addEventListener('click', async () => {
    await Tone.Transport.start()
    console.log('audio is ready')
})

// document.querySelector('.stop')?.addEventListener('click', function () {
//     Tone.Transport.stop()
//     console.log('audio is stopped')
// })

const pressPlay = function () {
    // Tone.start()
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






//try
