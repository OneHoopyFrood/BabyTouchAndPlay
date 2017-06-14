
TouchAndPlay.Preloader = function (game) {

	this.background = null;
	this.fishy = null;

	this.ready = false;

};

TouchAndPlay.Preloader.prototype = {

	init: function () {
		this.fishy = null;
		this.ready = false;
	},

	preload: function () {
		this.load.image('fishy', 'assets/images/fishy.png');
		this.load.audio('bubbles', 'assets/audio/bubbles.mp3');        
		this.game.stage.backgroundColor = "#47acff";
	},

	create: function () {

	},
	update: function () {

		if (this.cache.isSoundDecoded('bubbles') && this.ready == false) {
			this.ready = true;
			this.state.start('Game');
		}
	}

};
