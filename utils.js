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
        console.log(id,creep.name,room.name)
        const MAX_SPOTS = 9;
        var numSpot = 9;
        var look = creep.room.lookAtArea((object.pos.y+1),(object.pos.x+1),(object.pos.x-1),(object.pos.y-1));
        for (var property in look) {
            if(property == 'wall'){
                numSpot--;
            }
        }
        return numSpot;
    }
};
module.exports = utils;