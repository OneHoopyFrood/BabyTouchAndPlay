
TouchAndPlay.Game = function (game) {

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


TouchAndPlay.Game.prototype = {

	create: function () {
        this.game.stage.backgroundColor = "#47acff";

        this.music = this.add.audio('bubbles');
        this.music.volume = 0.1;
        this.music.loop = true;
        this.music.play();

        game.physics.startSystem(Phaser.Physics.ARCADE);

        let numFishies = 20;

        // Make fishies!
        this.fishies = [];
        for(let i = 0; i < numFishies; i++){
            let fishy = new Fishy(this.game);
            this.fishies.push(fishy);
            game.add.existing(fishy);
        }

        // this.input.onDown(function(){
        //     // Add food
        // });
	},

	update: function () {

        // game.physics.arcade.collide(this.sprites);
        delete this.game.fishyTarget;
        if(this.input.activePointer.isDown) {
            // If touches, buzz!
            navigator.vibrate(10);
            // If touches, make target!
            this.game.fishyTarget = new Phaser.Point(this.input.activePointer.clientX, this.input.activePointer.clientY);
        }



		// Move da fishies!
        // for(let i = 0; i < this.fishies.length; i++){
        //     let fishy = this.fishies[i];
        //     fishy.doMove();
        // }
	},

	quitGame: function (pointer) {
        
		this.music.stop();

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
