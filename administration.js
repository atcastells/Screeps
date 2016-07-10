/**
 * Created by acastells on 10/07/2016.
 */
var administration = {
    run: function () {
        for (var id in Game.rooms) {
            var room = Game.rooms[id];
            if (!Memory.rooms[room.name]) {
                Memory.rooms[room.name] = {};   //Memory Room Name
            }
            else {
                var buildings = room.find(FIND_MY_STRUCTURES);
                var controllers = room.find(FIND_STRUCTURES, {
                    filter: {structureType: STRUCTURE_CONTROLLER}
                });
                if (!Memory.rooms[room.name].structures) {
                    Memory.rooms[room.name].structures = [];    //[room.name].structures
                }
                else {
                    for (var ids in buildings) {
                        var structureType = buildings[ids].structureType;
                        var id = buildings[ids].id;
                        var name = buildings[ids].name;
                        if (!(buildings[ids].structureType == 'spawn' || buildings[ids].structureType == 'extension' )) {
                            Memory.rooms[room.name].structures.push({id: id, structureType: structureType});
                        }
                        else {
                            if (buildings[ids].structureType == 'spawn') {
                                var controllers = buildings[ids].pos.findInRange(FIND_MY_STRUCTURES, 4, {filter: {structureType: STRUCTURE_EXTENSION}}).length;
                                Memory.rooms[room.name].structures.push({
                                    id: id,
                                    name: name,
                                    structureType: structureType,
                                    controllers: controllers
                                });
                            }
                        }

                    }
                }
                if (!Memory.rooms[room.name].architectLog) {
                    var creep = Game.creeps[0];
                    Memory.rooms[room.name].architectLog = [];  //[room.name].architectLog
                    var resourceRoutes = [];
                    var haulerQueues = [];
                    Memory.rooms[room.name].architectLog.push(resourceRoutes, haulerQueues);
                    var resources = room.find(FIND_SOURCES);
                    /*Log sources*/
                    if (!Memory.rooms[room.name].sources) {
                        Memory.rooms[room.name].sources = [];
                        for (var ids in resources) {
                            var source = {};
                            var klair = resources[ids].pos.findInRange(FIND_STRUCTURES, 6, {filter: {structureType: STRUCTURE_KEEPER_LAIR}}).length > 0;
                            source.id = resources[ids].id;
                            var resourceObject = Game.getObjectById(resources[ids].id);
                            var resourceArea = creep.room.lookAtArea((resourceObject.pos.y - 1), (resourceObject.pos.x - 1), (resourceObject.pos.y + 1), (resourceObject.pos.x + 1), true);
                            var freeSlots = 9;
                            for (var i = 1; i < resourceArea.length; i++) {
                                if (resourceArea[i].terrain == 'wall') {
                                    freeSlots--;
                                }
                            }
                            source.totalSlots = freeSlots;
                            source.slotsRemaining = freeSlots;
                            source.klair = klair;
                            source.status = 'Inactive';
                            Memory.rooms[room.name].sources.push(source);
                        }
                    }
                    Memory.rooms[room.name].sources[0].status = 'Active';  //Activate first source
                }
                // List creeps by role
                for (var cid in Memory.creeps) {
                    if (!Memory.roles) {
                        Memory.roles = {};
                        Memory.roles.builders = {};
                        Memory.roles.harvesters = {};
                        Memory.roles.haulers = {};
                        Memory.roles.organizers = {};
                        Memory.roles.upgraders = {};
                        for (var i in Memory.roles) {
                            var roleNames = i.substr(0, (i.length - 1));
                            Memory.roles[i].id = roleNames;
                            Memory.roles[i].members = [];
                        }
                    }
                    else {
                        for (var i in Memory.roles) {
                            if (Memory.roles[i].id == Memory.creeps[cid].role) {
                                var creepExists = false;
                                for (var j = 0; j < Memory.roles[i].members.length; j++) {
                                    if (Memory.roles[i].members[j] == cid) {
                                        creepExists = true;
                                    }
                                }
                                if (creepExists == false) {
                                    Memory.roles[i].members.push(cid)
                                }
                            }
                        }
                    }
                }
                //Activate sources
                var activateNext = false;
                for (var j = 0; j < Memory.rooms[room.name].sources.length; j++) {
                    if (Memory.rooms[room.name].sources[j].status == 'Active' && Memory.rooms[room.name].sources[j].slotsRemaining == 0) {
                        activateNext = true;
                    }
                    if (Memory.rooms[room.name].sources[j].status == 'Inactive' && activateNext == true) {
                        Memory.rooms[room.name].sources[j].status = 'Active';
                    }
                }
                //Assign source to harvester
                if (Memory.creeps[cid].role == 'harvester') {
                    if (!Memory.creeps[cid].workLog) {
                        Memory.creeps[cid].workLog = {};
                    }
                    else {
                        /*Looking for source*/
                        for (var j = 0; j < Memory.rooms[room.name].sources.length; j++) {
                            if (Memory.rooms[room.name].sources[j].slotsRemaining > 0 && Memory.rooms[room.name].sources[j].klair == false && Memory.rooms[room.name].sources[j].status == 'Active') {
                                Memory.rooms[room.name].sources[j].slotsRemaining--;
                                Memory.creeps[cid].workLog.energyCollected = 0;
                                Memory.creeps[cid].workLog.sources = Memory.rooms[room.name].sources[j].id;
                                break;
                            }
                        }
                    }
                }
            }
        }   
    }
}

module.exports = administration;
