var Fishy = function (game, fishyScale = 0.66, bounce = false) {
    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'fishy');

    this.scale.setTo(fishyScale);
    this.anchor.setTo(0.5);
    this.angle = game.rnd.realInRange(0, 360);
    this.spriteFlip();

    game.physics.enable(this);
    game.physics.arcade.velocityFromRotation(this.rotation, 100, this.body.velocity);

    this.body.maxSpeed = 100;

    if (bounce) {
        // Bounce from edges!

        // Make sure we're in bounds to start
        let newX = game.rnd.realInRange(this.width, game.world.width - this.width);
        let newY = game.rnd.realInRange(this.width, game.world.height - this.width);
        this.position.setTo(newX, newY);

        // Faster!
        game.physics.arcade.velocityFromRotation(this.rotation, 200, this.body.velocity);
        

        // Now set up bounce!
        this.body.collideWorldBounds = true;
        this.body.worldBounce = new Phaser.Point(1,1);
        // Alter rotation and sprite orientation on collision
        this.body.onWorldBounds = new Phaser.Signal();
        this.body.onWorldBounds.add(function (thisFishy, up, down, left, right) {
            thisFishy.rotation = game.math.angleBetween(0,0,thisFishy.body.velocity.x,thisFishy.body.velocity.y);
            thisFishy.spriteFlip();
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

Fishy.prototype.newRndDirection = function() {
    this.setRotation(game.math.degToRad(game.rnd.realInRange(0, 360)));
    game.physics.arcade.velocityFromRotation(this.rotation, 100, this.body.velocity);
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