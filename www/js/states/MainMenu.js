
TouchAndPlay.MainMenu = function (game) {
	this.bg;
	this.music = null;
};

TouchAndPlay.MainMenu.prototype = {
	create: function () {
		this.drawTitle();
		this.drawButtons();
	},

	drawTitle: function () {
		var text = this.add.text(this.game.width * 0.5, 0, 'How many Fishies do you wish?', {
			font: '64px Modak', fill: '#ffffff', align: 'center'
		});
		text.anchor.set(0.5);
		text.wordWrap = true;
		text.wordWrapWidth = this.game.width * 0.9;
		text.position.y = (text.height / 2) + 40;
		// this.input.onDown.add(this.startGame, this);
	},

	drawButtons: function (x, y, number) {
		let buttonMargin = 20;
		let buttonBorder = 8;
		let buttonWidth = (game.width * 0.9) / 2 - (buttonMargin + buttonBorder * 2);
		let buttonHeight = 100;

		var graphics = this.add.graphics();
		graphics.lineStyle(buttonBorder, 0xFFFFFF, 1);

    	// Base State
		graphics.beginFill(0x2577C1, 1);
		graphics.drawRoundedRect(0, 0, buttonWidth, buttonHeight, 9);
    	graphics.endFill();
		
		// Over State
    	graphics.beginFill(0x2D8FE5, 1);
		graphics.drawRoundedRect(buttonWidth+buttonBorder, 0, buttonWidth, buttonHeight, 9);
    	graphics.endFill();
		let texture = graphics.generateTexture();
		graphics.destroy();

		game.cache.addSpriteSheet('menuButton', null, texture.baseTexture.source, buttonWidth + buttonBorder, buttonHeight+buttonBorder, 2, 0, 0);

		// Draw the group
		this.buttonGroup = game.add.group();
		let hSpacing = buttonWidth + buttonMargin + buttonBorder;
		let vSpacing = buttonHeight+buttonMargin+buttonBorder;
		for(let i = 0; i < 4; i++) {
			let textNum = 1;
			if (i === 1) {
				textNum = 20;
			} else if (i === 2) {
				textNum = 50;
			} else if (i === 3) {
				textNum = 100;
			}
			let buttonX = game.width * 0.1 + (hSpacing) * (i % 2);
			let buttonY = 300 + (i < 2 ? 0 : vSpacing);
			let button = game.add.button(buttonX, buttonY, 'menuButton', this.startGame, this, 1,0,1,0);
			let number = game.add.text(buttonX, buttonY, textNum.toString(), {
				font: '64px Modak', fill: '#ffffff', align: 'center'
			});
			number.anchor.set(.5)
			number.x = button.centerX;
			number.y = button.centerY;
			button.fishyNumber = textNum;
			this.buttonGroup.add(button);
		}
	},

	startGame: function (e) {
		this.state.start("Game", true, false, e.fishyNumber);
	}

};
