var CountDown = require('../countdown.js');

var btn = document.querySelector('button');

var cd = new CountDown({
	second: 10,
	callback: function () {
		alert('done');
		btn.textContent = 'Restart';
	},
	tickCallback: function (second) {
		btn.textContent = second + ' s';
	}
});

cd.start();

btn.addEventListener('click', function () {
	if (cd.hasDone()) {
		btn.textContent = '10 s';
		cd.init();
		cd.start();
	}
});