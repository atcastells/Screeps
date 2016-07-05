var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep,list) {
        for (var id in Game.rooms) {
            var room = Game.rooms[id];
            var targetSource = Memory.creeps[creep.name].workJournal.sources;
            var targetPos;
            for(var i = 0; i < Memory.rooms[room.name].sources.length; i++){
                if(Memory.rooms[room.name].sources[i].id == targetSource){
                    var resource = Game.getObjectById(Memory.rooms[room.name].sources[i].id);
                }
            }
            if (creep.carry.energy < creep.carryCapacity) {
                if (creep.harvest(resource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(resource);
                }
            }
            else {
                var haulers = list;
                if (haulers.length > 0) {
                    creep.drop(RESOURCE_ENERGY);
                }
                else {
                    creep.say('No Hauler!');
                    var storage = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType == STRUCTURE_SPAWN ||
                            structure.structureType == STRUCTURE_CONTAINER);
                        }
                    });
                    var targetStorage = creep.pos.findClosestByPath(storage);
                    if (creep.transfer(targetStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(targetStorage);
                    }
                }
            }
        }
    }
};

module.exports = roleHarvester;