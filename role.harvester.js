var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,list) {
        var targetPos = creep.memory.assingedSource; 
        creep.moveTo(targetPos);
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            var haulers = list;
            if(haulers.length > 0){
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
                var targetStorage = creep.pos.findClosestByPath(storage);
                if(creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(targetStorage);
                }
            }
        }
    }
};

module.exports = roleHarvester;