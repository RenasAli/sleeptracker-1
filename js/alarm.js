const container = document.getElementById("container");



function showAlarmPage(container, display) {
  display(container);
}

function displayAlarmPage(container) {
  container.innerHTML = "";

  container.innerHTML += `
    <p>Hello</p>
  `;
}

const bedTimeBtn = document.getElementById("bedtime"),
 
 bedTimeModal = document.getElementById("edit-badtime-model"),
 closeModal = document.querySelector(".close-modal"),
 cancelModal = document.querySelector(".edit-alarm-cancel-btn"),
 inputedBedtimeMinutes = document.getElementById("bedtime-inputed-minutes"),
 inputedBedtimeHour = document.getElementById("bedtime-inputed-hour"),
 submitBedtimeBtn = document.getElementById("edit-bedtime-submite-btn"),
 bedtimeTimeDiv = document.getElementById("bedtime-time-div")
 ;


const wakeUpBtn = document.getElementById("wake-up"),
wakeUpModal = document.querySelector(".wake-up-modal"),
closeWakeUpModal = document.querySelector(".close-wake-up-model"),
cancelWakeModal = document.querySelector(".edit-wake-up-cancel-btn"),
inputedWakeUpMinutes = document.getElementById("wake-up-inputed-minutes"),
inputedWakeUpHour = document.getElementById("wake-up-inputed-hour"),
submitWakeUpBtn = document.getElementById("edit-wake-up-submite-btn"),
wakeUpTimeDiv = document.getElementById("wake-up-time-div")

;

// bedtime EventListener
bedTimeBtn.addEventListener('click', function() {
  console.log('You clicked the bedTimeBtn!');
  bedTimeModal.style.display = `flex`;
});

closeModal.addEventListener('click', function(){
  console.log('You clicked the closeModal!');
  bedTimeModal.style.display = `none`;
});

cancelModal.addEventListener('click', function(){
  console.log('You clicked the closeModal!');
  bedTimeModal.style.display = `none`;
});

submitBedtimeBtn.addEventListener('click', function(){
  console.log('You clicked the submitBedtimeBtn!');
  bedtimeTimeDiv.innerHTML = "";

  bedtimeTimeDiv.innerHTML +=`
  <p class="alarm-times">${inputedBedtimeHour.value}:${inputedBedtimeMinutes.value}</p>
  `;
  console.log(inputedBedtimeHour.value);
  bedTimeModal.style.display = `none`;
  
});

// wakeUp EventListener

wakeUpBtn.addEventListener('click', function() {
  console.log('You clicked the wakeUpBtn!');
  wakeUpModal.style.display = `flex`;
});

closeWakeUpModal.addEventListener('click', function(){
  console.log('You clicked the closeWakeUpModal!');
  wakeUpModal.style.display = `none`;
});

cancelWakeModal.addEventListener('click', function(){
  console.log('You clicked the cancelWakeModal!');
  wakeUpModal.style.display = `none`;
});

submitWakeUpBtn.addEventListener('click', function(){
  console.log('You clicked the submitWakeUpBtn!');
  wakeUpTimeDiv.innerHTML = "";

  wakeUpTimeDiv.innerHTML +=`
  <p class="alarm-times">${inputedWakeUpHour.value}:${inputedWakeUpMinutes.value}</p>
  `;
  
  wakeUpModal.style.display = `none`;
  
  notificationPermmission()
  startAlarmLoop()
});


//Bedtime functions

function setHourInBedtime(){
  inputedBedtimeHour.innerHTML = ""
  for(let hour = 0; hour <= 23 ; hour++){
     if (hour >= 0 && hour < 10) { 
      inputedBedtimeHour.innerHTML += `
        <option value="0${hour}" >0${hour}</option>
      `;
    }else {
      inputedBedtimeHour.innerHTML += `
        <option value="${hour}" >${hour}</option>
      `;
    }
  }
  
  
}
function setMinutesInBedtime(){
  inputedBedtimeMinutes.innerHTML = ""
  for(let minutes = 0; minutes <= 59 ; minutes++){

     if (minutes >= 0 && minutes < 10) { 
      inputedBedtimeMinutes.innerHTML += `
        <option value="0${minutes}" >0${minutes}</option>
      `;
     }else {
      inputedBedtimeMinutes.innerHTML += `
        <option value="${minutes}" >${minutes}</option>
      `;
     }
  }
  
  
}

//Wake Up functions

function setHourInWakeUp(){
  inputedWakeUpHour.innerHTML = ""
  for(let hour = 0; hour <= 23 ; hour++){
     if (hour >= 0 && hour < 10) { 
      inputedWakeUpHour.innerHTML += `
        <option value="0${hour}" >0${hour}</option>
      `;
    }else {
      inputedWakeUpHour.innerHTML += `
        <option value="${hour}" >${hour}</option>
      `;
    }
  }
  
  
}

function setMinutesInWakeUp(){
  inputedWakeUpMinutes.innerHTML = ""
  for(let minutes = 0; minutes <= 59 ; minutes++){

     if (minutes >= 0 && minutes < 10) { 
      inputedWakeUpMinutes.innerHTML += `
        <option value="${minutes}" >${minutes}</option>
      `;
     }else {
      inputedWakeUpMinutes.innerHTML += `
        <option value="${minutes}" >${minutes}</option>
      `;
     }
  }
  
  
}

// Alarm functions
let alarmLoop;

function alarmlogic(){
  const now = new Date();
  let minutes = now.getMinutes();
  let minutesString = minutes.toString();
  let hours = now.getHours();
  let hoursString = hours.toString();
  if(inputedWakeUpHour.value === hoursString && inputedWakeUpMinutes.value === minutesString){
    console.log("alarm on")
    
    playAlarm()
    showNotification();
    
    stopAlarmLoop()
  }
}


function startAlarmLoop() {
  
  alarmLoop = setInterval(alarmlogic, 1000);
  console.log("Alarm Loop started");

}


function stopAlarmLoop() {
  clearInterval(alarmLoop);
  console.log("Loop stopped");
  setTimeout(startAlarmLoop, 60000); 
}

const audioContext = new AudioContext();

function playAlarm() {
  const oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
  oscillator.start();
}

function stopAlarm() {
  
  audioContext.close();
}

function showNotification() {
  const notification = new Notification("Test Notification", {
    body: " hej",
    data: {hello: "world"}
    
})

  notification.addEventListener('close', e =>{
    stopAlarm();
    
  })
  navigator.serviceWorker.ready.then(function(registration) {
    registration.showNotification('Alarm', notification);
  });
  };

  
  

function notificationPermmission(){
  if ('Notification' in window) {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function(permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted');
        } else {
          console.error('Notification permission denied');
        }
      });
    }
  } else {
    console.error('Notification API is not supported');
  }
}





setMinutesInBedtime();
setHourInBedtime();
setHourInWakeUp();
setMinutesInWakeUp();

//showAlarmPage(container, displayAlarmPage);
