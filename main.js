var roleHarvester = require('role.harvester');
var roleHauler = require('role.hauler');
var roleUpgrader = require('role.upgrader');
var roleArchitect = require('role.architect');
var roleBuider = require('role.builder');
var utils = require('utils');
//var roleBuilder = require ('role.builder');

/*
 * ROLES
 *
 * Harvester: Mina recursos y los dropea
 * Hauler: Recoje recursos del suelo y los entrega
 * Upgrader: Mejora edificios
 * Builder: Construye los edificios designados
 * 
 * FUNCIONES
 * 
 * fillCreep --> Llena el creep de energia
 * buildInRange --> Construye 'x' en el rango de 'y' de una ubicación
 * 
 *
 * */


module.exports.loop = function () {

    /*Memory Cleaning*/
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) delete Memory.creeps[name];
    }

    /*Populate lists*/
    
    var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
    if(haulers.length < 1) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'hauler'});

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    if(upgraders.length < 1) var newName = Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'upgrader'});

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    if(harvesters.length < 1) var newName = Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'harvester'});


    /*Creep Iteration*/
    for(let name in Game.creeps){
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvester'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'hauler'){
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'upgrader'){
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }

    }
}