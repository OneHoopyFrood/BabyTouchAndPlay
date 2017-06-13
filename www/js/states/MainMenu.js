
BasicGame.MainMenu = function (game) {
	this.bg;
	this.music = null;
};

BasicGame.MainMenu.prototype = {
	create: function () {
		var text = this.add.text(this.game.width * 0.5, this.game.height * 0.5, 'Tap to Start!', {
			font: '42px Arial', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);

		this.input.onDown.add(this.startGame, this);
	},

	resize: function (width, height) {

		//	If the game container is resized this function will be called automatically.
		//	You can use it to align sprites that should be fixed in place and other responsive display things.

		this.bg.width = width;
		this.bg.height = height;
	},

	startGame: function () {
		this.state.start("Game");
	}

};
