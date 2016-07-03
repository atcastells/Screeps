var utils = require('utils');
var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER) && structure.energy >= (structure.energyCapacity/2);
                }
            });
            var path = creep.pos.findClosestByPath(sources);
            creep.moveTo(path);
            if(creep.pos.getRangeTo(path) == 1 && creep.carry.energy < creep.carryCapacity){
                creep.say('Filling');
                utils.fillCreep(creep);
            };
        }
        else {
            if(creep.memory.upgrading && creep.carry.energy == 0) {
                creep.memory.upgrading = false;
            }
            if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
                creep.memory.upgrading = true;
            }

            if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleUpgrader;