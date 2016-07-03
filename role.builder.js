var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_CONTAINER) && 
                        structure.energy >= (structure.energyCapacity/2);
                }
            });
            var path = creep.pos.findClosestByPath(sources);
            creep.moveTo(path);
            if(creep.pos.getRangeTo(path) == 1 && creep.carry.energy < creep.carryCapacity){
                creep.say('Filling');
                utils.fillCreep(creep);
            };
        }
    }
};

module.exports = roleBuilder;