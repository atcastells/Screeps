/**
 * Created by acastells on 03/07/2016.
 */
var factory = {


    normalSpawn: function (maxOrganizers,maxBuilders,maxHaulers,maxUpgraders,maxHarvesters) {
        var spawnList = Game.rooms['sim'].find(FIND_MY_STRUCTURES, {
            filter:(structure) => {
                return (structure.structureType == STRUCTURE_SPAWN);
            }
        });

        var queue = spawnList.length;
        var organizers = _.filter(Game.creeps, (creep) => creep.memory.role == 'organizer');
        if(organizers.length < maxOrganizers){
            if (!(Game.spawns.Spawn1.createCreep([MOVE], undefined, {role: 'organizer'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))){
            }
        }
        else {
            var architects = _.filter(Game.creeps, (creep) => creep.memory.role == 'architect');
            if(architects.length < 1){
                if (!(Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'architect'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))) {
                }
            }
            var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
            if(builders.length < maxBuilders){
                if (!(Game.spawns.Spawn1.createCreep([CARRY,WORK,MOVE], undefined, {role: 'builder'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))) {
                }
            }
            var haulers = _.filter(Game.creeps, (creep) => creep.memory.role == 'hauler');
            if(haulers.length < maxHaulers){
                if (!(Game.spawns.Spawn1.createCreep([CARRY,CARRY,MOVE], undefined, {role: 'hauler'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))) {
                }
            }
            var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
            if(upgraders.length < maxUpgraders) {
                if (!(Game.spawns.Spawn1.createCreep([CARRY, CARRY, MOVE], undefined, {role: 'upgrader'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))) {
                }
            }
            var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
            if(harvesters.length < maxHarvesters) {
                if (!(Game.spawns.Spawn1.createCreep([CARRY, WORK, MOVE], undefined, {role: 'harvester'}) == (ERR_NOT_ENOUGH_ENERGY || ERR_BUSY))) {
                }
            }

        }
    },
    dynamicSpawn: function () {
        for(var i in Game.rooms){
            var room = Game.rooms[i];



            /***  LOCAL FACTORY DATA  ***/

            if(!Memory.rooms[room.name].factory){
                Memory.rooms[room.name].factory = {};
                Memory.rooms[room.name].factory.processList = [];
                Memory.rooms[room.name].factory.spawns = [];
                Memory.rooms[room.name].factory.roles = {};
                Memory.rooms[room.name].factory.roles.builders = 0;
                Memory.rooms[room.name].factory.roles.haulers = 0;
                Memory.rooms[room.name].factory.roles.harvesters = 0;
                Memory.rooms[room.name].factory.roles.upgraders = 0;
                Memory.rooms[room.name].factory.roles.architects = 0;

            }
            else {
                for(var j in Game.spawns){
                    if(Memory.rooms[room.name].factory.spawns.indexOf(Game.spawns[j].id) == -1){
                        Memory.rooms[room.name].factory.spawns.push({id: Game.spawns[j].id,energy: Game.spawns[j].energy})
                    }
                }

            }

        }


    },
    creeps: function (role) {

        var roles = ['hauler','upgrader','harvester','builder','architect'];
        var bodyHauler = [CARRY,MOVE,CARRY];
        var bodyUpgrader = [CARRY,MOVE,WORK];
        var bodyHarvester = [WORK,MOVE];
        var bodyBuilder = [CARRY,MOVE,WORK];
        var bodyMisc = [MOVE];
        var creep = {};
        var selectedRole = 0;
        selectedRole = roles.indexOf(role);
        if(selectedRole == 0){
            creep.body = bodyHauler;
            return creep
        }
        if(selectedRole == 1){
            creep.body = bodyUpgrader
            return creep
        }
        if(selectedRole == 2) {
            creep.body = bodyHarvester;
            return creep
        }
        if(selectedRole == 3){
            creep.body = bodyBuilder;
            return creep
        }
        if(selectedRole == 4){
            creep.body = bodyMisc;
            return creep
        }
        return creep;
    }

};
module.exports = factory;