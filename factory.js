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

            if (!Memory.rooms[room.name].factory) {
                Memory.rooms[room.name].factory = {};
                Memory.rooms[room.name].factory.created = [0, 0, 0, 0, 0];
                Memory.rooms[room.name].factory.factoryQueue = [0, 0, 0, 0, 0];
                Memory.rooms[room.name].factory.toCreate = [0, 0, 0, 0, 1];
                Memory.rooms[room.name].factory.isLocked = false;
                Memory.rooms[room.name].factory.haulersLock = false;
            }
            /*Num Spawns*/
            var numSpawns = 0;
            for (var i in Game.spawns) {   //Spawn num in room
                var spawn = Game.spawns[i];
                /*Fill toCreate list*/

                if (Memory.rooms[room.name].factory.isLocked == false) {
                    var hauler = 0, upgrader = 0, harvester = 0, builder = 0, architect = 0;
                    var numSlots = 0;
                    for (var i in Memory.rooms[room.name].sources) {
                        numSlots += Memory.rooms[room.name].sources[i].totalSlots;
                        if (Memory.rooms[room.name].sources[i].totalSlots > 1) {
                            hauler += 2;
                        }
                        else {
                            hauler += 1;
                        }
                    }

                    if (Memory.rooms[room.name].projects) {
                        for (var k in Memory.rooms[room.name].projects) {
                            builder += 3;
                        }
                    }

                    harvester = numSlots;
                    upgrader = parseInt(harvester / 4);
                    architect = 1;

                    Memory.rooms[room.name].factory.toCreate[0] = hauler;
                    Memory.rooms[room.name].factory.toCreate[1] = upgrader;
                    Memory.rooms[room.name].factory.toCreate[2] = harvester;
                    Memory.rooms[room.name].factory.toCreate[3] = builder;
                    Memory.rooms[room.name].factory.toCreate[4] = architect;
                    Memory.rooms[room.name].factory.isLocked = true;
                }
                else {
                    //FactoryQueue
                    for (var i = 0; i < Memory.rooms[room.name].factory.toCreate.length; i++) {
                        if (Memory.rooms[room.name].factory.created[i] < Memory.rooms[room.name].factory.toCreate[i]) {
                            if (i == 0 && !Memory.rooms[room.name].factory.haulersLock && (Memory.rooms[room.name].factory.created[2] > 0)) { //Haulers
                                var haulersToAdd = 0;
                                for (var j in Memory.rooms[room.name].sources) {
                                    var totalSlots = Memory.rooms[room.name].sources[j].totalSlots;
                                    var slotsRemaining = Memory.rooms[room.name].sources[j].slotsRemaining;
                                    if (Memory.rooms[room.name].sources[j].totalSlots > 1) {
                                        if (parseInt((slotsRemaining * 100) / totalSlots) < 50) {
                                            Memory.rooms[room.name].factory.factoryQueue[0] += 1;
                                        }
                                        else {
                                            Memory.rooms[room.name].factory.factoryQueue[0] += 2;
                                        }
                                    }
                                    else {
                                        if (parseInt((slotsRemaining * 100) / totalSlots) >= 50) {
                                            Memory.rooms[room.name].factory.factoryQueue[0] += 1;
                                        }
                                    }
                                }
                                Memory.rooms[room.name].factory.haulersLock = true;
                            }
                            if (i == 1) { //Upgraders
                                var totalSlots = 0;
                                var slotsRemaining = 0;
                                for (var j in Memory.rooms[room.name].sources) {
                                    totalSlots += Memory.rooms[room.name].sources[j].totalSlots;
                                    slotsRemaining += Memory.rooms[room.name].sources[j].slotsRemaining;
                                }
                                var upgradersToAdd = parseInt(((100 - ((slotsRemaining * 100) / totalSlots)) * (Memory.rooms[room.name].factory.created[1])) / 100);
                                Memory.rooms[room.name].factory.factoryQueue[1] = upgradersToAdd;
                            }
                            if (i == 2) { //Harvesters
                                var harvestersToAdd = 0;
                                for (var j in Memory.rooms[room.name].sources) {
                                    if (Memory.rooms[room.name].sources[j].status == 'Active') {
                                        if (Memory.rooms[room.name].factory.created[0] > 0) {
                                            harvestersToAdd += Memory.rooms[room.name].sources[j].slotsRemaining;
                                        }
                                        else {
                                            harvestersToAdd += 1;
                                        }
                                    }
                                }
                                Memory.rooms[room.name].factory.factoryQueue[2] = harvestersToAdd;
                            }
                            if (i == 3) { //Builders
                                var buildersToAdd = 0;
                                if (Memory.rooms[room.name].factory.created[4] == 1) {
                                    for (var k in Memory.rooms[room.name].projects) {
                                        buildersToAdd += 3;
                                    }
                                }
                            }
                            if (i == 4) { //Architects
                                if(Memory.rooms[room.name].factory.created[0] > 0 && Memory.rooms[room.name].factory.created[4] < 1){
                                    Memory.rooms[room.name].factory.toCreate[4] = 1;
                                }
                            }
                        }
                    }
                }

                /*Process queue*/
                for (var x in Memory.rooms[room.name].factory.factoryQueue) {
                    if (!(Memory.rooms[room.name].factory.factoryQueue[x] > 0)) {
                        var role;
                        if (x == 0) {
                            role = 'hauler';
                        }
                        if (x == 1) {
                            role = 'upgrader';

                        }
                        if (x == 2) {
                            role = 'harvester';
                        }
                        if (x == 3) {
                            role = 'builder';
                        }
                        if (x == 4) {
                            role = 'architect';

                        }
                    }

                    var creepToProcess = factory.creeps(role);
                    Memory.rooms[room.name].factory.queue = creepToProcess;
                    if(spawn.canCreateCreep(creepToProcess.body) == OK && spawn.spawning == null){
                        spawn.createCreep(creepToProcess.body,null,{role: role});
                    }
                }
            }
        }
    },
    recount: function () {
        for(var r in Game.rooms){
            for(var i in Memory.rooms[room.name].factory.created){
                Memory.rooms[room.name].factory.created[i] = 0;
            }
            var room = Game.rooms[r];
            var roles = ['hauler','upgrader','harvester','builder','architect'];
            var initCreated = Memory.rooms[room.name].factory.created;
            for(var i in roles){
                for(var j in Memory.creeps){
                    if(Memory.creeps[j].role == roles[i]){
                        Memory.rooms[room.name].factory.created[i] += 1;
                    }
                }
            }
            for(var i in initCreated){
                Memory.rooms[room.name].factory.factoryQueue[i] = Memory.rooms[room.name].factory.factoryQueue[i] - (Memory.rooms[room.name].factory.created[i] - initCreated[i]);
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