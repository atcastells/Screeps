/**
 * Created by acastells on 03/07/2016.
 */
var utils = require('utils');
var roleOrganizer = {

    /*Initial constructions*/

    run: function (creep) {
        for (var id in Game.rooms) {
            var room = Game.rooms[id];

            if (!Memory.rooms[room.name]) {
                Memory.rooms[room.name] = {};
                var buildings = room.find(FIND_MY_STRUCTURES);
                /*for(var x in sources) {
                 var path = Game.spawns.Spawn1.pos.findPathTo(sources[x]);

                 for(var i in path) {
                 Game.rooms.sim.createConstructionSite(path[i].x, path[ i].y, STRUCTURE_ROAD);
                 }*/
                if(!Memory.rooms[room.name].structures) {
                    Memory.rooms[room.name].structures = [];    //Log with all room buildings
                    for (var ids in buildings) {
                        var structureType = buildings[ids].structureType;
                        var id = buildings[ids].id;
                        if (!(buildings[ids].structureType == 'spawn' || buildings[ids].structureType == 'extension' )) {
                            Memory.rooms[room.name].structures.push({id: id, structureType: structureType});
                        }
                        else {
                            if (buildings[ids].structureType == 'spawn') {
                                var controllers = buildings[ids].pos.findInRange(FIND_MY_STRUCTURES, 4, {filter: {structureType: STRUCTURE_EXTENSION}}).length;
                                Memory.rooms[room.name].structures.push({
                                    id: id,
                                    structureType: structureType,
                                    controllers: controllers
                                });
                            }
                        }

                    }
                }
            };
            var resources = room.find(FIND_SOURCES);
            /*Log sources*/
            if (!Memory.rooms[room.name].sources) {
                Memory.rooms[room.name].sources = [];
                for (var ids in resources) {
                    var source = {};
                    var klair = resources[ids].pos.findInRange(FIND_STRUCTURES, 6, {filter: {structureType: STRUCTURE_KEEPER_LAIR}}).length > 0;
                    source.id = resources[ids].id;
                    source.slots = creep.room.lookAtArea((object.pos.y+1),(object.pos.x+1),(object.pos.x-1),(object.pos.y-1));
                    source.klair = klair;
                    source.posX = resources[ids].pos.x;
                    source.posY = resources[ids].pos.y;
                    Memory.rooms[room.name].sources.push(source);
                }
            }
            ;

            for (var cid in Memory.creeps) {
                if (Memory.creeps[cid].role == 'harvester') {
                    if (!Memory.creeps[cid].workJournal) {
                        Memory.creeps[cid].workJournal = {};
                        /*Looking for source*/
                        for (var j = 0; j < Memory.rooms[room.name].sources.length; j++) {
                            if (Memory.rooms[room.name].sources[j].slots > 0 && Memory.rooms[room.name].sources[j].klair == false) {
                                Memory.rooms[room.name].sources[j].slots--;
                                Memory.creeps[cid].workJournal.energyCollected = 0;
                                Memory.creeps[cid].workJournal.sources = Memory.rooms[room.name].sources[j].id;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
};
module.exports = roleOrganizer;