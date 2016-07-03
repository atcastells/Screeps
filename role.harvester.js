var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var sources = creep.room.find(FIND_SOURCES);
        var targetPos = creep.pos.findClosestByPath(sources);
        creep.moveTo(targetPos);
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if(creep.room.find(FIND_CREEPS, {
                    filter: (creep) => {
                        return (creep.memory.role == 'hauler');
                    }
                })){
                creep.drop(RESOURCE_ENERGY);
            }
            else {
                creep.say('No Hauler!');
                var storage = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) =>{
                        return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER);
                    }
                });
                var nearestStorage = creep.pos.findClosestByPath(storage);
             if(creep.transfer(nearestStorage) == ERR_NOT_IN_RANGE){
                 creep.moveTo(nearestStorage);
             }
            }
        }
    }
};

module.exports = roleHarvester;