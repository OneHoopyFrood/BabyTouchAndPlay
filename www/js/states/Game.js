
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;    //  the tween manager
    this.state;	    //	the state manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

	create: function () {
        this.game.stage.backgroundColor = "#47acff";

        this.music = this.add.audio('bg');
        this.music.volume = 0.1;
        this.music.loop = true;
        this.music.play();

        // Make fishies!
        this.fishies = [];
        for(let i = 0; i < 10; i++){
            let fishy = this.game.add.sprite(this.world.width / 2,this.world.height / 2,'fishy');
            fishy.anchor.setTo(0.5,0.5);
            fishy.angle = Math.random() * 360;
            this.fishies.push(fishy);
        }
	},

	update: function () {
        delete this.target;
        if(this.input.activePointer.isDown) {
            // If touches, buzz!
            navigator.vibrate(5);
            // If touches, make target!
            this.target = [this.input.activePointer.clientX, this.input.activePointer.clientY]
        }

		// Move da fishies!
        let self = this;
        this.fishies.forEach(function(fishy){
            let vector = self.getVector(fishy.position.x, fishy.position.y, fishy.rotation, 2);

            if(self.target) {
                fishy.angle = self.getAngle(fishy.position.x, fishy.position.y, self.target[0], self.target[1]);
            } else {
                let index = 0;
                while(!self.checkBounds(vector[0], vector[1]) && index < 10) 
                {   
                    fishy.angle = (fishy.angle + Math.random() * 100) % 360;
                    vector = self.getVector(fishy.position.x, fishy.position.y, fishy.rotation, 2);
                    index++;
                }
                if (index == 10) {
                    fishy.position.x = self.world.width / 2;
                    fishy.position.y = self.world.height / 2;
                    return;
                }
            }
            fishy.position.x = vector[0]; 
            fishy.position.y = vector[1];
        });
	},

	quitGame: function (pointer) {
        
		this.music.stop();

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	},

    getVector: function (xCoord, yCoord, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
    },

    getAngle: function (cx, cy, ex, ey) {
        var dy = ey - cy;
        var dx = ex - cx;
        var theta = Math.atan2(dy, dx); // range (-PI, PI]
        theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
        //if (theta < 0) theta = 360 + theta; // range [0, 360)
        return theta;
    },

    checkBounds: function (x, y) {
        return !(x < 40 || y < 50 || x > this.world.width - 40 || y > this.world.height - 50);
    }

};
