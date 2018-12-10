window.addEventListener('DOMContentLoaded', function() {
	
	'use strict';

//TIMER

//let deadline = '2018-12-09';
let deadline = new Date(Date.parse(new Date()) + 10 * 1000);

	function getTimeRemaining(endtime) {
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor(( t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);

			return {
				'total': t,
				'seconds' : seconds,
				'minutes' : minutes,
				'hours' : hours
			};
	}

	function setClock(id, endtime) {
		let timer = document.getElementById(id),
			seconds = timer.querySelector('.seconds'),
			minutes = timer.querySelector('.minutes'),
			hours = timer.querySelector('.hours'),
			timeInterval = setInterval(updateClock, 1000);

		function updateClock() {
			let t = getTimeRemaining(endtime);

			seconds.textContent = ('0' + t.seconds).slice(-2);
			minutes.textContent = ('0' + t.minutes).slice(-2);
			hours.textContent = ('0' + t.hours).slice(-2);

			if (t.total <= 0) {
				clearInterval(timeInterval);
				seconds.textContent = ('00');
				minutes.textContent = ('00');
				hours.textContent = ('00');
			}
		}
	}
	setClock('timer', deadline);
});
