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
    }
}

playStopBtn.addEventListener('click', function () {
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






//try

(function () {

    // Check if the browser supports web audio. Safari wants a prefix.
    if ('AudioContext' in window || 'webkitAudioContext' in window) {

        //////////////////////////////////////////////////
        // Here's the part for just playing an audio file.
        //////////////////////////////////////////////////
        var play = function play(audioBuffer) {
            var source = context.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(context.destination);
            source.start();
        };

        var URL = 'click2.mp3';
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext(); // Make it crossbrowser
        var gainNode = context.createGain();
        gainNode.gain.value = 1; // set volume to 100%
        // var playButton = document.querySelector('#play');
        var yodelBuffer = void 0;

        // The Promise-based syntax for BaseAudioContext.decodeAudioData() is not supported in Safari(Webkit).
        window.fetch(URL)
            .then(response => response.arrayBuffer())
            .then(arrayBuffer => context.decodeAudioData(arrayBuffer,
                audioBuffer => {
                    yodelBuffer = audioBuffer;
                },
                error =>
                    console.error(error)
            ))

        playStopBtn.onclick = function () {
            return play(yodelBuffer);
        };

        // Play the file every 2 seconds. You won't hear it in iOS until the audio context is unlocked.
        // window.setInterval(function () {
        //     play(yodelBuffer);
        // }, 5000);


        //////////////////////////////////////////////////
        // Here's the part for unlocking the audio context, probably for iOS only
        //////////////////////////////////////////////////

        // From https://paulbakaus.com/tutorials/html5/web-audio-on-ios/
        // "The only way to unmute the Web Audio context is to call noteOn() right after a user interaction. This can be a click or any of the touch events (AFAIK – I only tested click and touchstart)."

        // var unmute = document.getElementById('unmute');
        playStopBtn.addEventListener('click', unlock);

        function unlock() {
            console.log("unlocking")
            // create empty buffer and play it
            var buffer = context.createBuffer(1, 1, 22050);
            var source = context.createBufferSource();
            source.buffer = buffer;
            source.connect(context.destination);

            // play the file. noteOn is the older version of start()
            source.start ? source.start(0) : source.noteOn(0);

            // by checking the play state after some time, we know if we're really unlocked
            setTimeout(function () {
                if ((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
                    // Hide the unmute button if the context is unlocked.
                    // unmute.style.display = "none";
                }
            }, 0);
        }

        // Try to unlock, so the unmute is hidden when not necessary (in most browsers).
        unlock();
    }
}
)();