var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleArchitect = require('role.architect');
var roleBuilder = require('role.builder');
var administration = require('administration');
var factory = require('factory');
var utils = require('utils');
var taskManager = require('taskManager');

module.exports.loop = function () {


    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            if(Memory.roles){
                for(var i in Memory.roles){
                    for(var j in Memory.roles[i].members){
                        if(Memory.roles[i].members[j] == name){
                            var deleteIndex = Memory.roles[i].members[j].indexOf(name);
                            Memory.roles[i].members.splice(deleteIndex,1);
                        }
                    }
                }
            }
            delete Memory.creeps[name]
        }
    }

    /*Create explorer*/
    if(!Memory.init){
        Memory.init = {};
        Memory.init.explorer = false;
        Memory.init.memoryReady = false;
    }
    if(Memory.init.explorer == false){
        Game.spawns.Spawn1.createCreep([MOVE], 'explorer1', {role: 'explorer', action: 'wander'});
        Memory.init.explorer = true;
    }

    /*Administrate Memory*/

    for(var i in Game.rooms){
        var room = Game.rooms[i];
        var creep;
        for(var c in Game.creeps){
            if(Game.creeps[c].room.name == room.name && Game.creeps[c].name == 'explorer1'){
                creep = Game.creeps[c];
                administration.run(creep);
                Memory.init.memoryReady = true;
            }
        }

    }

    if(Memory.init.memoryReady == true){
        /*Normal Spawn*/ //maxOrganizers,maxBuilders,maxHaulers,maxUpgraders,maxHarvesters
        //factory.normalSpawn(1, 4, 4, 2, 5);

        /*Dynamic Spawn*/
        factory.dynamicSpawn(taskManager);
        /*Creep Iteration*/
        for(var name in Game.creeps){
            var creep = Game.creeps[name];

            if(creep.memory.role == 'harvester' && !(creep.spawning)){
                var haulerList = utils.GetCreepsByRole('hauler');
                roleHarvester.run(creep,haulerList);
            }
            if(creep.memory.role == 'hauler' && !(creep.spawning)){
                roleHauler.run(creep);
            }
            if(creep.memory.role == 'upgrader' && !(creep.spawning)){
                roleUpgrader.run(creep);
            }
            if (creep.memory.role == 'builder' && !(creep.spawning)){
                roleBuilder.run(creep);
            }
            if(creep.memory.role == 'architect' && !(creep.spawning)){
                roleArchitect.run(creep);
            }
        }
    }
}