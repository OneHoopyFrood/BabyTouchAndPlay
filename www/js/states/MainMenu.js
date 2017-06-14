
TouchAndPlay.MainMenu = function (game) {
	this.bg;
	this.music = null;
};

TouchAndPlay.MainMenu.prototype = {
	create: function () {
		this.drawTitle();
	},

	drawTitle: function () {
		var text = this.add.text(this.game.width * 0.5, 0, 'How many Fishies do you wish?', {
			font: '64px Modak', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);
		text.wordWrap = true;
		text.wordWrapWidth = this.game.width * 0.9;
		text.position.y = (text.height / 2) + 40;
		this.input.onDown.add(this.startGame, this);
	},

	drawButton: function (x, y) {
		
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
