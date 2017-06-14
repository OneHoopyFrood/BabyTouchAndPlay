
var Fishy = function (game) {
    this.game = game;

    this.sprite = game.add.sprite(game.world.centerX,game.world.centerY,'fishy');
    let newX = game.rnd.realInRange(this.sprite.width, game.world.width - this.sprite.width);
    let newY = game.rnd.realInRange(this.sprite.width, game.world.height - this.sprite.width);
    this.sprite.position.setTo(newX, newY);
    this.sprite.scale.setTo(0.66);
    this.sprite.anchor.setTo(0.5,0.5);
    this.sprite.angle = game.rnd.realInRange(0, 360);
    this.spriteFlip();
};
(function () {
    Fishy.prototype = {

    doMove: function () {
        let vector = this.getVector();

        if(this.game.fishyTarget) {
            this.sprite.rotation = this.game.math.angleBetweenPoints(this.sprite.position, this.game.fishyTarget);
            this.spriteFlip();
        } else {
            // Try ten times to find a new heading
            if (!this.inBounds(vector[0], vector[1])) {
                for(let i = 0; i < 10; i++) 
                {   
                    this.sprite.angle = (this.sprite.angle + this.game.rnd.realInRange(0, 100)) % 360;
                    vector = this.getVector();

                    if (this.inBounds(vector[0], vector[1])) {
                        this.spriteFlip();
                        break;
                    }
                }
                // If we weren't able to find a new heading in that loop, then set position to center
                if (!this.inBounds(vector[0], vector[1])) {
                    this.sprite.position.setTo(this.game.world.centerX, this.game.world.centerY);
                    this.spriteFlip();
                    return;
                }
            }
        }
        this.sprite.position.setTo(vector[0], vector[1]);
    },

    spriteFlip: function () {
        if(Math.abs(this.sprite.angle) > 90) {
             // Going rtl
             if (this.sprite.scale.y > 0){
                this.sprite.scale.y *= -1;
             }
         } else {
            // Going ltr
            if (this.sprite.scale.y < 0) {
                this.sprite.scale.y *= -1;
            }
         }
    },

    getVector: function () {
        return VectorHelper.getVector(this.sprite.position.x, this.sprite.position.y, this.sprite.rotation, 2);
    },

    inBounds: function (x, y) {
        x = x || this.sprite.position.x;
        y = y || this.sprite.position.y;
        let r = this.sprite.width/2;
        return x > r && y > r && x < this.game.world.width - r && y < this.game.world.height - r;
    }
};
})();