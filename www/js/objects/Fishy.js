
var Fishy = function (game) {
    Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'fishy');

    let newX = game.rnd.realInRange(this.width, game.world.width - this.width);
    let newY = game.rnd.realInRange(this.width, game.world.height - this.width);
    this.position.setTo(newX, newY);
    this.scale.setTo(0.66);
    this.anchor.setTo(0.5);
    this.angle = game.rnd.realInRange(0, 360);

    game.physics.enable(this);
    game.physics.arcade.velocityFromRotation(this.rotation, 100, this.body.velocity);
    this.body.collideWorldBounds = true;
    this.body.worldBounce = new Phaser.Point(1,1);
    this.body.onWorldBounds = new Phaser.Signal();
    this.body.onWorldBounds.add(function (thisFishy, up, down, left, right) {
        thisFishy.rotation = game.math.angleBetween(0,0,thisFishy.body.velocity.x,thisFishy.body.velocity.y);
        thisFishy.spriteFlip();
    });

    this.spriteFlip();
};
Fishy.prototype = Object.create(Phaser.Sprite.prototype);
Fishy.prototype.constructor = Fishy;

Fishy.prototype.spriteFlip = function () {
    if(Math.abs(this.angle) > 90) {
            // Going rtl
            if (this.scale.y > 0){
            this.scale.y *= -1;
            }
        } else {
        // Going ltr
        if (this.scale.y < 0) {
            this.scale.y *= -1;
        }
    }
}