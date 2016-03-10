var audioctx = new AudioContext()

var notes = [300, 440, 800, 500, 600]
var noteInterval = 0.3

function playNote(freq, time) {
  var osc = audioctx.createOscillator()
  var gain = audioctx.createGain()

  osc.connect(gain)
  gain.connect(audioctx.destination)

  osc.frequency.value = freq
  osc.start()
  osc.stop(audioctx.currentTime + (time||0) + noteInterval)
}

var seq = setInterval(fun, noteInterval * 1000)

var counter = 0
function fun() {
  var current = counter % notes.length
  var freq = notes[current]
  playNote(freq)
  counter++
}
