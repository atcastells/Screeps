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
        for (var id in Game.rooms) {
            
            var room = Game.rooms[id];
            var numslots;
            var numSources = Memory.rooms[room.name].sources.length;

            if(!Memory.rooms[room.name].factory){
                Memory.rooms[room.name].factory = {};
                Memory.rooms[room.name].factory.created = [0,0,0,0,0,0];
                Memory.rooms[room.name].factory.factoryQueue = [0,0,0,0,0,0];
                Memory.rooms[room.name].factory.toCreate = [0,0,0,0,0,0];
                Memory.rooms[room.name].factory.isLocked = false;
                Memory.rooms[room.name].factory.haulersLock = false;
            }
            /*Num Spawns*/
            var numSpawns = 0;
            for(var i in Memory.rooms[room.name].structures){   //Spawn num in room
                if(Memory.rooms[room.name].structures[i].structureType == 'spawn'){
                    numSpawns++;
                    spawn = Game.getObjectById(Memory.rooms[room.name].structures[i].id);
                }
            }
            /*Fill toCreate list*/

            if(Memory.rooms[room.name].factory.isLocked == false){
                var hauler = 0, upgrader = 0, harvester = 0, builder = 0, architect = 0, organizer = 0;

                for (var i in Memory.rooms[room.name].sources){
                    numslots +=    Memory.rooms[room.name].sources[i].totalSlots;
                    if(Memory.rooms[room.name].sources[i].totalSlots > 1){
                        hauler += 2;
                    }
                    else {
                        hauler += 1;
                    }
                }

                harvester = numslots;
                upgrader = harvester/4;
                builder = harvester/2;
                architect, organizer = 1;

                Memory.rooms[room.name].factory.toCreate[0] = hauler;
                Memory.rooms[room.name].factory.toCreate[1] = upgrader;
                Memory.rooms[room.name].factory.toCreate[2] = harvester;
                Memory.rooms[room.name].factory.toCreate[3] = builder;
                Memory.rooms[room.name].factory.toCreate[4] = architect;
                Memory.rooms[room.name].factory.toCreate[5] = organizer;
                Memory.rooms[room.name].factory.isLocked = true;
            }
            else {
                //FactoryQueue
                for (var i = 0; i <  Memory.rooms[room.name].factory.toCreate.length; i++){
                    if(Memory.rooms[room.name].factory.factoryQueue[i] < Memory.rooms[room.name].factory.toCreate[i]){
                        if(i == 0 && !Memory.rooms[room.name].factory.haulersLock){ //Haulers
                            Memory.rooms[room.name].factory.factoryQueue[0] = 0;    //Reset hauler queue to recheck
                            for(var j in Memory.rooms[room.name].sources){
                                var totalSlots = Memory.rooms[room.name].sources[j].totalSlots;
                                var slotsRemaining = totalSlots = Memory.rooms[room.name].sources[j].slotsRemaining;
                                if(Memory.rooms[room.name].sources[j].totalSlots > 1){
                                    if(parseInt((slotsRemaining * 100)/totalSlots) < 50){
                                        Memory.rooms[room.name].factory.factoryQueue[0] += 1;
                                    }
                                    else {
                                        Memory.rooms[room.name].factory.factoryQueue[0] += 2;
                                    }
                                }
                                else {
                                    if(parseInt((slotsRemaining * 100)/totalSlots) >= 50){
                                        Memory.rooms[room.name].factory.factoryQueue[0] += 1;
                                    }
                                }
                            }
                            Memory.rooms[room.name].factory.haulersLock = true;
                        }
                        if(i == 1){ //Upgraders
                            var totalSlots;
                            var slotsRemaining;
                            for(var j in Memory.rooms[room.name].sources){
                                totalSlots += Memory.rooms[room.name].sources[j].totalSlots;
                                slotsRemaining += totalSlots = Memory.rooms[room.name].sources[j].slotsRemaining;
                            }
                            var upgradersToAdd = parseInt(((100-((slotsRemaining*100)/totalSlots))*(Memory.rooms[room.name].factory.toCreate[1]))/100);
                            Memory.rooms[room.name].factory.factoryQueue[1] = upgradersToAdd;
                        }
                        if(i == 2){ //Harvesters

                        }
                        if(i == 3){ //Builders

                        }
                        if(i == 4){ //Architects

                        }
                        if(i == 5){ //Organizers

                        }
                    }
                }
            }





            /*Create array with room unit queue*/



        }
    },
    creeps: function (role) {
        var roles = ['hauler','upgrader','harvester','builder','architect','organizer'];
        var bodyHauler = ['CARRY','MOVE','CARRY'];
        var bodyUpgrader = ['CARRY','MOVE','WORK'];
        var bodyHarvester = ['WORK','MOVE'];
        var bodyBuilder = ['CARRY','MOVE','WORK'];
        var bodyMisc = ['MOVE'];
        var creep = {};
        var selectedRole = roles.indexOf(role);
        if(roles[selectedRole] == 'hauler'){
            creep.body = bodyHauler;
        }
        if(roles[selectedRole] == 'upgrader'){
            creep.body = bodyUpgrader
        }
        if(roles[selectedRole] == 'harvester') {
            creep.body = bodyHarvester;
        }
        if(roles[selectedRole] == 'builder'){
            creep.body = bodyBuilder;
        }
        else {
            creep.body = bodyMisc;
        }
        return creep;
    }

};
module.exports = factory;