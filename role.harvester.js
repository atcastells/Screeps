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
            creep.drop(RESOURCE_ENERGY);
        }
    }
};

module.exports = roleHarvester;