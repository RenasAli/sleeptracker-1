const clock = document.querySelector(".clock"),
  hourHand = document.querySelector(".hour-hand"),
  minuteHand = document.querySelector(".minute-hand"),
  secondHand = document.querySelector(".second-hand")

function setClock() {
  const numbers = clock.querySelector(".numbers");
 
  for (let i = 1; i <= 12; i++) {
    numbers.innerHTML += `<div class="number" style="--i: ${i}"><span>${i}</span></div>`;
   
  }
  
  setInterval(setTime, 1000);
}

setClock();
function setTime() {
    const now = new Date();
    const today = now.getDay();
  
    const seconds = now.getSeconds();
    const secondsDegrees = (seconds / 60) * 360 + 180;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  
    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 180;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  
    const hours = now.getHours();
    const hoursDegrees = (hours / 12) * 360 + 180;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    
}  
