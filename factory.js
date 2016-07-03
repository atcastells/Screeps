/**
 * Created by acastells on 03/07/2016.
 */
var factory = {
    
    normalSpawn: function (maxOrganizers,maxBuilders,maxHaulers,maxUpgraders,maxHarvesters) {
        var organizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'organizer');
        if(organizers.length < maxOrganizers) var newName = Game.spawns.Spawn1.createCreep([MOVE], undefined, {role: 'organizer'});

        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        if(builders.length < maxBuilders) var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'builder'});

        var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
        if(haulers.length < maxHaulers) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'hauler'});

        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
        if(upgraders.length < maxUpgraders) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
        if(harvesters.length < maxHarvesters) var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'harvester'});

    }
    /*Populate lists and spawn*/
}
module.export = factory;