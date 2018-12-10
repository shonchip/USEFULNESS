	'use strict';
	
function startClock() {
	let date = new Date(),
        hour = date.getHours(),
		minute = date.getMinutes(),
		second = date.getSeconds();

	if (hour < 10) 
		hour = "0" + hour;
    if (minute < 10) 
    	minute  = "0" + minute;
    if (second < 10) 
    	second  = "0" + second;

	document.getElementById('time').innerHTML = hour + ':' + minute + ':' + second;
	let clock = setTimeout('startClock()',1000);
	};
startClock();

function changeDay() {
	let date = new Date(),
        hour = date.getHours(),
        title = document.querySelector('.clock-title'),
		time = document.querySelector('.time'),
		timer = document.querySelector('.timer');
	 
	if (hour >= 6 && hour < 22) {
		title.classList.remove('night');
		title.classList.add('day');
		title.innerHTML = "Have " + " a " + " good " + " day " + "!";
		time.classList.remove('evening');
		time.classList.add('morning');	
	}	

	if (hour < 6 || hour >= 22) { 
		title.classList.remove('day');
		title.classList.add('night');
		title.innerHTML = "Good " + " night " + "!";
		time.classList.remove('morning');
		time.classList.add('evening');
		timer.style.background = 'url(img/night.png)';
		timer.style.backgroundSize = 'cover';
	}
}	
changeDay();	

