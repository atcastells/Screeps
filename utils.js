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
    GetCreepsByRole: function (role){
        var CreepList = [];
        for (var creepname in Game.creeps){
            if (Game.creeps[creepname].memory.role == role){
                CreepList.push(Game.creeps[creepname]);
            }
        }
        return CreepList
    },
    miningSpots(id,creep,room){
        var object = Game.getObjectById(id);
        const MAX_SPOTS = 9;
        var numSpot = 9;
        var look = creep.room.lookAtArea((object.pos.y+1),(object.pos.x+1),(object.pos.x-1),(object.pos.y-1),true);
        for (var i = 0; i < look.length; i++){
            if(look.indexOf('wall') > -1){
                numSpot--;
            }
        }
        return numSpot;
    }
};
module.exports = utils;