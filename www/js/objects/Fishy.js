var Fishy = function (game, fishyScale = 0.66, bounce = false) {
    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'fishy');

    this.scale.setTo(fishyScale);
    this.anchor.setTo(0.5);
    this.angle = game.rnd.realInRange(0, 360);
    this.spriteFlip();

    game.physics.enable(this);
    this.body.maxSpeed = game.rnd.realInRange(60,140);
    game.physics.arcade.velocityFromRotation(this.rotation, this.body.maxSpeed, this.body.velocity);


    if (bounce) {
        // Bounce from edges!

        // Make sure we're in bounds to start
        let newX = game.rnd.realInRange(this.width, game.world.width - this.width);
        let newY = game.rnd.realInRange(this.width, game.world.height - this.width);
        this.position.setTo(newX, newY);

        // Faster!
        this.body.maxSpeed = 200;
        game.physics.arcade.velocityFromRotation(this.rotation, this.body.maxSpeed, this.body.velocity);
        

        // Now set up bounce!
        this.body.collideWorldBounds = true;
        // Alter rotation and sprite orientation on collision
        this.body.onWorldBounds = new Phaser.Signal();
        this.body.onWorldBounds.add(function (thisFishy, up, down, left, right) {
            // let direction = Array.prototype.slice.call(arguments, 1).indexOf(true);
            // let bias;
            // if (direction == 0) {
            //     bias = new Phaser.Point(0, 1);  // Up
            // } else if (direction == 1) {
            //     bias = new Phaser.Point(1, 0);  // Right
            // } else if (direction == 2) {
            //     bias = new Phaser.Point(0, -1); // Down
            // } else if (direction == 3) {
            //     bias = new Phaser.Point(-1, 0); // Left
            // }
            thisFishy.newRndDirection();
        });
    }
};
Fishy.prototype = Object.create(Phaser.Sprite.prototype);
Fishy.prototype.constructor = Fishy;

Fishy.prototype.spriteFlip = function () {
    if (Math.abs(this.angle) > 90) {
        // Going rtl
        if (this.scale.y > 0) {
            this.scale.y *= -1;
        }
    } else {
        // Going ltr
        if (this.scale.y < 0) {
            this.scale.y *= -1;
        }
    }
}

Fishy.prototype.newRndDirection = function(bias) {
    this.setRotation(game.math.degToRad(game.rnd.realInRange(0, 360)));
    game.physics.arcade.velocityFromRotation(this.rotation, this.body.maxSpeed, this.body.velocity);
}

Fishy.prototype.setRotation = function (newRotation) {
    this.rotation = newRotation;
    this.spriteFlip();
}

Fishy.prototype.update = function () {
    if (!this.body.collideWorldBounds) {
        screenWrap(this);
    }
}

function screenWrap(sprite) {
    if (sprite.x < 0 - sprite.width) {
        sprite.x = sprite.game.world.width + sprite.width;
    } else if (sprite.x > sprite.game.world.width + sprite.width) {
        sprite.x = 0 - sprite.width;
    }

    if (sprite.y < 0 - sprite.width) {
        sprite.y = sprite.game.world.height + sprite.width;
    } else if (sprite.y > sprite.game.world.height + sprite.width) {
        sprite.y = 0 - sprite.width;
    }
}