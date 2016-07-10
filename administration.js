/**
 * Created by acastells on 10/07/2016.
 */
var administration = {
    run: function () {
        for (var id in Game.rooms) {
            var room = Game.rooms[id];
            if (!Memory.rooms[room.name]) {     //Memory room
                Memory.rooms[room.name] = {};
            }
            if(!Memory.rooms.structures){       //Memory structure
                Memory.rooms.structures = [];
            }
            else {
                for(var k in Game.structures){
                    var structureType = Game.structures[k].structureType;
                    var id = Game.structures[k].id;
                    var name = Game.structures[k].name;
                    if (!(structureType == 'spawn' || structureType == 'extension' )) {
                        Memory.rooms[room.name].structures.push({id: id, structureType: structureType});
                    }
                    else {
                        if (structureType == 'spawn') {
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
                // List creeps by role
                for (var cid in Memory.creeps) {
                    if (!Memory.roles) {
                        Memory.roles = {};
                        Memory.roles.builders = {};
                        Memory.roles.harvesters = {};
                        Memory.roles.haulers = {};
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
                    //Assign source to harvester
                }
                for (var cid in Memory.creeps) {
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
}

module.exports = administration;
