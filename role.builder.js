var utils = require('utils');
var roleBuilder = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var project = 0;
        var target;
        for (var i in Game.rooms) {
            var room = Game.rooms[i];
            if (!Memory.creeps[creep.name].working) {
                Memory.creeps[creep.name].working = false;
                Memory.creeps[creep.name].taskAssigned = false;
            }
            /*Create work project*/
        }
    }
};
module.exports = roleBuilder;
