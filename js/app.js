document.addEventListener('DOMContentLoaded',function() {
	const holes = document.querySelectorAll('.hole');
	const scoreBoard = document.querySelector('#score');
	const playGame = document.querySelector('#play');
	const moles = document.querySelectorAll('.mole');
	let lastHole, timeUp = false, score = 0;
	const STOP_GAME_AFTER = 10; //seconds

	function randomTime(min,max) {
		return Math.round(Math.random() * (max - min) + min);
	}

	function randomHole(holes) {
		const hole = holes[Math.floor(Math.random() * holes.length)];
		if(hole === lastHole)
			return randomHole(holes);
		lastHole = hole;
		return  hole;
	}

	function peep() {
		const time = randomTime(200,1000);
		const hole = randomHole(holes);
		hole.classList.add('up');
		setTimeout(() => {
			hole.classList.remove('up');
			if (!timeUp)
				peep();
		}, time);
	}

	function startGame() {
		score = 0;
		scoreBoard.textContent = score;
		timeUp = false;
		peep();
		setTimeout(() => timeUp = true, STOP_GAME_AFTER * 1000);
	}

	function bonk(e) {
		if(!e.isTrusted)
			return; //dont cheat
		score++;
		this.classList.remove('up');
		scoreBoard.textContent = score;
	}

	moles.forEach(mole => mole.addEventListener('click',bonk));

	playGame.addEventListener('click', startGame);

});
