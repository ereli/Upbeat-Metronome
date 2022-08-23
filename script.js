'use strict'
let bpm = 60
const bpmTopLimit = 300
const bpmBottomLimit = 35
let bpmDisplay = document.querySelector(".bpmDisplay").innerText
const tempoUpBtn = document.getElementById("tempoUp")
const tempoDownBtn = document.getElementById("tempoDown")
const playStopBtn = document.getElementById("onOff")

const updateDisplay = function () {
    document.querySelector(".bpmDisplay").innerText = bpm
}

const increaseTempo = function () {
    if (!(bpm < bpmTopLimit)) return
    bpm++
    updateDisplay()
}

const decreaseTempo = function () {
    if (!(bpm > bpmBottomLimit)) return
    bpm--
    updateDisplay()
}

const togglePlayStop = function () {
    if (playStopBtn.className === 'play') { playStopBtn.className = 'stop' } else { playStopBtn.className = 'play' }
}



const pressPlay = function () {
    togglePlayStop()
}



playStopBtn.addEventListener("click", function () { pressPlay() })