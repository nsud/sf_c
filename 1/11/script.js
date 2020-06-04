const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const start = document.querySelector('.start');

const restartd = document.querySelector('.restart-div');
const restart = document.querySelector('.restart');


let countSec = 0;
let countMin = 0;
let timeinterval = null;
let total = 0;

const update = () => {
if (minutes.value != '00'){
    countMin += minutes.value
};
if (seconds.value != '00'){
    countSec += seconds.value
};
}

const updateText = () =>{
  minutes.value = (0 + String(countMin)).slice(-2);
  seconds.value = (0 + String(countSec)).slice(-2);
}

updateText();

const countDown = () => {
    message.innerHTML = ""

    if (!timeinterval) {
      let total = seconds.value + minutes.value * 60;
      const timeinterval = setTimeout(countDown, 1000);

      if (total <= 0) {
        clearInterval(timeinterval);
        timer.style.display = 'none';
        message.innerHTML = '<p class="alert alert-primary" role="alert" >I am done...</p>'
        restart.style.display = "block";
      }
      if(countSec > 0) countSec--;
      else{
      if (countMin > 0) {
        countSec = 59;
        countMin--;
        }
      else{
        clearInterval(timeinterval)
        }
      }
      updateText();
    }
};



plus.addEventListener('click', () =>{
  if(countSec < 59) ++countSec;
  else{
  	countSec = 0;
  	++countMin;
  }
  updateText()
});

minus.addEventListener('click', () =>{
	if(countMin <= 0 && countSec===0){
  	countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
  	countSec = 59;
  	--countMin;
  }
  updateText();
});

start.addEventListener('click', () => {
      update();
      check(countSec)
      check(countMin)
	  countDown();
	  time = 0;
      updateText();
});

restart.addEventListener('click', () => {
    clearInterval(timeinterval)
    timeinterval = null;
    updateText();
    message.innerHTML = ''
    restart.style.display = 'none';
    timer.style.display = "block";
});