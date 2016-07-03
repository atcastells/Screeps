var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleArchitect = require('role.architect');
var roleBuilder = require('role.builder');
var utils = require('utils');

/*
 * ROLES
 *
 * Harvester: Mina recursos y los dropea
 * Hauler: Recoje recursos del suelo y los entrega
 * Upgrader: Mejora edificios
 * Builder: Construye los edificios designados
 * Architect: Log buildings and designates construction spots
 * 
 * FUNCIONES
 * 
 * fillCreep --> Llena el creep de energia
 * buildInRange --> Construye 'x' en el rango de 'y' de una ubicaciÃÂ³n
 *
 *
 * */


module.exports.loop = function () {

    /*Memory Cleaning*/
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) delete Memory.creeps[name];
    }

    /*Populate lists and spawn*/
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(builders.length < 2) var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'builder'});

    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    if(haulers.length < 2) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'hauler'});

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 1) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 4) var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'harvester'});

    var architects = _.filter(Game.creeps, (creep) => creep.memory.role == 'architect');
    if(architects.length < 1) var newName = Game.spawns.Spawn1.createCreep([MOVE], undefined, {role: 'architect'});


    /*Creep Iteration*/
    for(let name in Game.creeps){
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