ТАЙМЕР ОБРАТНОГО ОТСЧЕТА

1. Создаем HTML-структуру будущего таймера. Внутри  тега <div> помещаем каждую необходимую единицу времени в тег <span> и в дальнейшем будем обновлять только этот контент.

		<div id="timer">
			<span class="dates"></span>
			<span>:</span>
			<span class="hours"></span>
			<span>:</span>
			<span class="minutes"></span>
			<span>:</span>
			<span class="seconds"></span>
		</div>

2. Устанавливаем правильную дату окончания таймера. Строка может быть в любом из форматов, которые понимает метод Date.parse():
ISO 8601
let deadline = '2018-12-31';

короткий формат
let deadline = '31/12/2018';

длинный формат
let deadline = 'December 31 2018';

с точным временем и часовым поясом
let deadline="December 31 2018 00:00:00 GMT+0300";

в днях, часах, минутах, секундах 
let deadline = new Date(Date.parse(new Date()) + 10 * 24 * 60 * 60 * 1000); на 10 дней
let deadline = new Date(Date.parse(new Date()) + 10 * 60 * 60 * 1000); на 10 часов
let deadline = new Date(Date.parse(new Date()) + 10 * 60 * 1000); на 10 минут
let deadline = new Date(Date.parse(new Date()) + 10 * 1000); на 10 секунд

3. Высчитываем оставшееся время - пишем функцию (getTimeRemaining(endtime)), которая будет брать строку с временем окончания и считать разницу между этим временем и текущим. Переменная t хранит данные об оставшемся времени;
		function getTimeRemaining(endtime) {
			let t = Date.parse(endtime) - Date.parse(new Date())
		}

4. Метод Date.parse() позволяет сконвертировать строку со временем в значение в миллисекундах, поэтому мы переводим миллисекунды в дни, часы, минуты и секунды, а остаток округляем вниз до ближайшего целого значения, потому что нам нужны полные значения единиц времени, а не их фракции.
		let t = Date.parse(endtime) - Date.parse(new Date()),
			seconds = Math.floor((t / 1000) % 60),
			minutes = Math.floor(( t / 1000 / 60) % 60),
			hours = Math.floor((t / (1000 * 60 * 60)) % 24),
			days = Math.floor(t / (1000 * 60 * 60 * 24));

4. Возвращаем часы, минуты и секунды как многоразовый объект. Этот объект позволяет нам вызывать нашу функцию и получать любое из вычисленных значений.
		return {
			    'total': t,
			    'days': days,
			    'hours': hours,
			    'minutes': minutes,
			    'seconds': seconds
			  };

5. Для того, чтобы динамически отображались данные таймера, напишем функцию, которая принимает два параметра: id элемента, который содержит наши часы, и время счетчика. Также сделаем ссылку на все остальные элементы таймера. Добавляем еще одну переменную (timeInterval), которая будет запускать функцию updateClock каждую секунду.
		function setClock(id, endtime) {
			let timer = document.getElementById(id),
				seconds = timer.querySelector('.seconds'),
				minutes = timer.querySelector('.minutes'),
				hours = timer.querySelector('.hours'),
				days = timer.querySelector('.days'),
				timeInterval = setInterval(updateClock, 1000);
		}

6. Для того чтобы таймер обновлялся каждую секунду, внутри функции setClock прописываем еще одну функцию updateClock(), в которую через переменную t передаются все данные о времени из функции getTimeRemaining
		function updateClock() {
			let t = getTimeRemaining(endtime);
		}

7. Чтобы числа обновлялись, записываем полученные значения в переменные. 
		seconds.textContent = t.seconds;
		minutes.textContent = t.minutes;
		hours.textContent = t.hours;
		days.textContent = t.days;

Если нужны ведующие нули перед значениями, которые состоят из одной цифры, можно заменить код: 
		seconds.textContent = ('0' + t.seconds).slice(-2);
		minutes.textContent = ('0' + t.minutes).slice(-2);
		hours.textContent = ('0' + t.hours).slice(-2);

8. Останавливаем таймер по истечении нашего deadline (т.е. когда t.total <= 0). Чтобы далее таймер не показывал отрицательные значения единиц времени, передаем вместо них нули (получиться 00:00:00:00)

		if (t.total <= 0) {
				clearInterval(timeInterval);
				seconds.textContent = ('00');
				minutes.textContent = ('00');
				hours.textContent = ('00');
				days.textContent = ('00');
			}

Дополненительные возможности.
1. Бесконечный таймер — таймер все время будет выводить, что осталось 15 дней (можно указать любое время)
		let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);

2. Таймер с сообщением - после окончания времени таймер скрывается и выводится сообщение о том, что время истекло:
    - добавляем в HTML-файл блок с необходимым сообщением:
    	<div id="deadline-messadge">
  			Акция уже завершилась!
		</div>

	- в CSS-файле прописываем стили для сообщения:
			#deadline-messadge {
				display: none;
				font-size: 24px;
				font-style: italic;
			}

		и добавляем классы visible и hidden:
			#deadline-messadge.visible {
			  display: block;
			}

			#timer.hidden {
			  display: none;
			}

По истечении времени таймера, на сам таймер добавляется класс .hidden (скрывает таймер), а на сообщение об окончании времени - класс .visible (отображает сообщение). Выполнение функции прекращается вызовом оператора return true;

    if (t.total <= 0) {
       document.getElementById('timer').className = "hidden";
       document.getElementById('deadline-messadge').className = "visible";
       clearInterval(timeInterval);
       return true;
    }

3. Таймер обратного отсчета времени с рестартом - по окончании времени таймер не останавливается, не выводится сообщение, а начинается новый отсчет. В примере начальный deadline выставлен на 10 секунд (переводим секунды в миллисекунды - 10 * 1000):

let deadline = new Date(Date.parse(new Date()) + 10 * 1000); // таймер, который запускается первоначально

Меняем условия при обнулении таймера:
		 if (t.total <= 0) {
		    let deadline = new Date(Date.parse(new Date()) + 5 * 1000);// новый deadline при обнулении таймера; он может быть совсем другим, чем первоначальный.
		    clearInterval(timeInterval);
		    setClock('timer', deadline);
    	}



