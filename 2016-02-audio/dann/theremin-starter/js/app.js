var width = window.innerWidth
var height = window.innerHeight

var canvas = document.getElementById('canvas')
var canvasCtx = canvas.getContext('2d')
canvas.width = width
canvas.height = height

var maxf = 6000
var minf = 200

var initialf = 3000
var initialvol = 0.5

var CurX, CurY

var audioCtx = new AudioContext()

var osc  = audioCtx.createOscillator()
var gain = audioCtx.createGain()

osc.connect(gain)
gain.connect(audioCtx.destination)

osc.frequency.value = initialf
osc.start()

gain.gain.value = initialvol

document.onmousemove = updatePage

var mute = document.querySelector('.mute')
mute.onclick = function(e) {
  if(mute.dataset.muted === "true") {
    mute.innerHTML = "Mute"
    gain.connect(audioCtx.destination)
    mute.dataset.muted = "false"
  }
  else {
    gain.disconnect(audioCtx.destination)
    mute.innerHTML = "Unmute"
    mute.dataset.muted = "true"
  }
}



// we'll use these functions later
// write your code above to get started

function updatePage(e) {
  CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
  CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

  osc.frequency.value = Math.max(minf, maxf * CurX/width)
  gain.gain.value = CurY/height

  canvasDraw()
}

function canvasDraw() {
  rX = CurX;
  rY = CurY;
  rC = Math.floor(gain.gain.value*30);

  canvasCtx.globalAlpha = 0.2;

  for(i=1;i<=15;i=i+2) {
    canvasCtx.beginPath();
    canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gain.gain.value)*255) + ',' + Math.floor((osc.frequency.value/maxf)*255) + ')';
    canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
    canvasCtx.fill();
    canvasCtx.closePath();
  }
}

function random(min, max) {
  return Math.floor(min + Math.random()*(max-min))
}
