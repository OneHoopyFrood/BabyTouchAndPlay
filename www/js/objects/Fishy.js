var Fishy = function (game, fishyScale = 0.66, bounce = false) {

    this.speed = game.rnd.realInRange(60,140);

    if (fishyScale === 'big') {
        Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'fishy-big');
        // Faster!
        this.speed = 200;
    } else {
        Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'fishy');
        this.scale.setTo(fishyScale);
    }

    this.anchor.setTo(0.5);
    this.angle = game.rnd.realInRange(0, 360);
    this.spriteFlip();

    game.physics.enable(this);
    this.body.allowRotation = true;


    if (bounce) {
        // Bounce from edges!

        // Make sure we're in bounds to start
        let newX = game.rnd.realInRange(this.width, game.world.width - this.width);
        let newY = game.rnd.realInRange(this.width, game.world.height - this.width);
        this.position.setTo(newX, newY);        

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

    game.physics.arcade.velocityFromRotation(this.rotation, this.speed, this.body.velocity);
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
    game.physics.arcade.velocityFromRotation(this.rotation, this.speed, this.body.velocity);
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

Fishy.prototype.makeCurious = function (target, noticeDistance = 50, noticeChance = 1) {
    if(!target) {
        return; // No target. ( >_< )
    }

    let distance = this.position.distance(target);
    if (distance < noticeDistance){
        if (distance <= this.width/2 + 50) {
            this.body.drag.set(this.body.speed * 5);
            this.setRotation(this.position.angle(target));
        } else {
            let direction = new Phaser.Point(target.x, target.y);
            // now we subtract the current boid position
            direction.subtract(this.x, this.y);
            // then we normalize it. A normalized vector has its length is 1, but it retains the same direction
            direction.normalize();
            // time to set magnitude (length) to boid speed
            direction.setMagnitude(this.speed);
            // now we subtract the current boid velocity
            direction.subtract(this.body.velocity.x, this.body.velocity.y);
            // normalizing again
            direction.normalize();
            // finally we set the magnitude to boid force, which should be WAY lower than its velocity
            direction.setMagnitude(20); 
            // Now we add boid direction to current boid velocity
            this.body.velocity.add(direction.x, direction.y);
            // we normalize the velocity
            this.body.velocity.normalize();
            // we set the magnitue to boid speed
            this.body.velocity.setMagnitude(this.speed);
            this.setRotation(this.position.angle(new Phaser.Point(this.x + this.body.velocity.x, this.y + this.body.velocity.y)));


            // this.setRotation(game.physics.arcade.moveToObject(this, point, this.speed, 1000));
        }
        this.curious = true;
    } else if (this.curious) {
        this.getDistracted();
    }
}

Fishy.prototype.getDistracted = function () {
    this.body.drag.set(0);
    this.curious = false;
    this.newRndDirection();
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