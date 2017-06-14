var VectorHelper = {
    getVector: function (xCoord, yCoord, angle, length) {
        length = typeof length !== 'undefined' ? length : 10;
        return [length * Math.cos(angle) + xCoord, length * Math.sin(angle) + yCoord]
    }
};