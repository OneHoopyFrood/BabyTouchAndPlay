
TouchAndPlay.Preloader = function (game) {
	this.ready = false;
};

TouchAndPlay.Preloader.prototype = {

	init: function () {
		this.ready = false;
	},

	preload: function () {
		// Images
		this.load.image('fishy', 'assets/images/fishy-80.png');

		// Sounds
		this.load.audio('bubbles', 'assets/audio/bubbles.mp3');

		// Settings
		this.game.stage.backgroundColor = "#47acff";
	},

	create: function () {
		var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Loading...', {
			font: '64px Modak', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);
	},

	update: function () {

		if (this.cache.isSoundDecoded('bubbles') && this.ready == false) {
			this.ready = true;
			this.state.start('MainMenu');
		}
	}

};
