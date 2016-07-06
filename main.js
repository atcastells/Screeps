var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleOrganizer = require('role.organizer');
var roleBuilder = require('role.builder');
var factory = require('factory');
var utils = require('utils');

/*
 * ROLES
 *
 * Harvester: Mina recursos y los dropea
 * Hauler: Recoje recursos del suelo y los entrega
 * Upgrader: Mejora edificios
 * Builder: Construye los edificios designados
 * Organizer: Log buildings and designates construction spots
 * 
 * FUNCIONES
 * 
 * fillCreep --> Llena el creep de energia
 * buildInRange --> Construye 'x' en el rango de 'y' de una ubicaciÃ³n
 *
 *
 * */


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

    /*Normal Spawn*/ //maxOrganizers,maxBuilders,maxHaulers,maxUpgraders,maxHarvesters,roomlist
    factory.normalSpawn(1, 4, 4, 2, 5);

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
        if(creep.memory.role == 'organizer' && !(creep.spawning)){
            roleOrganizer.run(creep);
        }

    }


}