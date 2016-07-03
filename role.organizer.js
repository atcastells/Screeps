/**
 * Created by acastells on 03/07/2016.
 */
var roleOrganizer = {

    /*Initial constructions*/

    run: function (creep) {
        var sources = room.find(FIND_SOURCES);
        var buildings = room.find(FIND_MY_STRUCTURES);
        var creeps = room.find(FIND_MY_CREEPS);
        for(var id in Game.rooms){
            var room = Game.rooms[id];
            if(!Memory.rooms[room.name]){
                Memory.rooms[room.name]={};

                /*for(var x in sources) {
                    var path = Game.spawns.Spawn1.pos.findPathTo(sources[x]);

                    for(var i in path) {
                        Game.rooms.sim.createConstructionSite(path[i].x, path[ i].y, STRUCTURE_ROAD);
                    }*/
                }

                Memory.rooms[room.name].organizerLog=[];    //Log with all room buildings
                for (var ids in buildings){
                    var structureType = buildings[ids].structureType;
                    var id = buildings[ids].id;
                    if(!(buildings[ids].structureType == 'spawn' || buildings[ids].structureType == 'extension' )){
                        Memory.rooms[room.name].organizerLog.push({id: id,structureType: structureType});
                    }
                    else {
                        if (buildings[ids].structureType == 'spawn'){
                            var controllers = buildings[ids].pos.findInRange(FIND_MY_STRUCTURES, 4, {filter: {structureType: STRUCTURE_EXTENSION}}).length;
                            Memory.rooms[room.name].organizerLog.push({id: id,structureType: structureType,controllers: controllers});
                        }
                    }

                }

                /*Sort sources by distance*/
                for(var ids in sources){
                    var spawnPos = Game.spawns.Spawn1.pos;
                    var tempSource;
                    var distance = 0;
                    if(sources.length > 1){
                        if(sources[ids].pos.getDirectionTo(spawnPos) < distance || distance == 0){
                            distance = sources[ids].pos.getDirectionTo(spawnPos);
                            if(ids > 0){
                                tempSource = sources[0];
                                sources[0] = sources[ids];
                                sources[ids] = tempSource;
                            }
                    }
                    }

                }

                /*Log sources*/
                Memory.rooms[room.name].sources=[];
                for(var ids in sources){
                    var klair = sources[ids].pos.findInRange(FIND_STRUCTURES, 6, {filter: { structureType: STRUCTURE_KEEPER_LAIR }}).length > 0;
                    Memory.rooms[room.name].sources.push({id: sources[ids].id ,slots: 3, klair: klair,distance: sources[ids].pos.getDirectionTo(Game.spawns.Spawn1.pos)});
                };
            };
        /*Manage workers*/
        for(var cid in Game.creeps) {
            if (creeps[cid].memory == 'harvester') {
                if(!Memory.creeps[cid].workJournal){
                    Memory.creeps[creeps[cid].name].workJournal = [];
                    /*Looking for source*/
                    var sourceId;
                    for (var j = 0; j < Memory.rooms[creeps[cid].room.name].sources.length; j++) {
                        if (Memory.rooms[creeps[cid].room.name].sources[j].slots > 0 && Memory.rooms[creeps[cid].room.name].sources[j].klair == false) {
                            Memory.rooms[creeps[cid].room.name].sources[j].slots--;
                            Memory.creeps[creeps[cid].name].workJournal.source = Memory.rooms[creeps[cid].room.name].sources[j].id;
                        }
                    }
                    Memory.creeps[creeps[cid].name].workJournal.push({energyCollected: 0, sourceId: sourceId})
                }
            }
        }
        }
};
module.exports = roleOrganizer;