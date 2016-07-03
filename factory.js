/**
 * Created by acastells on 03/07/2016.
 */
var factory = {

    normalSpawn: function (maxOrganizers,maxBuilders,maxHaulers,maxUpgraders,maxHarvesters) {
        var organizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'organizer');
        if(organizers.length < maxOrganizers){
            if (!(Game.spawns.Spawn1.createCreep([MOVE], undefined, {role: 'organizer'}) == ERR_NOT_ENOUGH_ENERGY)){
                console.log('organizer Spawned');
            }
        }
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < maxBuilders){
            var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'builder'});
            console.log('builder Spawned');
        }


        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        if(haulers.length < maxHaulers){
            var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'hauler'});
            console.log('hauler Spawned');
        }

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < maxUpgraders){
            var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});
            console.log('upgrader Spawned');
        }

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < maxHarvesters) {
            var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'harvester'});
            console.log('harvester Spawned');
        };

    }
    /*Populate lists and spawn*/
};
module.exports = factory;