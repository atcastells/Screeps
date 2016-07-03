/**
 * Created by acastells on 02/07/2016.
 */
var utils = {
    fillCreep: function (creep) {
        var source = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_CONTAINER) && structure.energy >= (structure.energyCapacity/2);
            }
        });
        var targetStructure = creep.pos.findClosestByRange(source);
        targetStructure.transferEnergy(creep);
    },
    buildInRange: function (pos, int) { //pos: building position, int: radius
        var x = pos[0];
        var y = pos [1];

    }
};
module.exports = utils;