
BasicGame.Preloader = function (game) {

	this.background = null;
	this.fishy = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	init: function () {
		this.fishy = null;
		this.ready = false;
	},

	preload: function () {
		this.load.image('fishy', 'assets/images/fishy.png');
		this.load.audio('bg', 'assets/audio/bubbles.mp3');
	},

	create: function () {

	},
	update: function () {

		if (this.cache.isSoundDecoded('bg') && this.ready == false) {
			this.ready = true;
			this.state.start('Game');
		}
	}

};
