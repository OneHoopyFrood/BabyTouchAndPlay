
TouchAndPlay.Preloader = function (game) {
	this.ready = false;
};

TouchAndPlay.Preloader.prototype = {

	init: function () {
		this.ready = false;
	},

	preload: function () {
		// Images
		this.load.image('fishy', 'assets/images/fishy.png');

		// Sounds
		this.load.audio('bubbles', 'assets/audio/bubbles.mp3');

		// Settings
		this.game.stage.backgroundColor = "#47acff";
	},

	create: function () {

	},

	update: function () {

		if (this.cache.isSoundDecoded('bubbles') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
	}

};
