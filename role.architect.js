/**
 * Created by acastells on 06/07/2016.
 */

//Memory.rooms[room.name].architectLog.push(resourceRoutes,haulerQueues);

//var path = Game.spawns.Spawn1.pos.findPathTo(sources[x]);
//
//for(var i in path) {
//Game.rooms.sim.createConstructionSite(path[ i].x, path[ i].y, STRUCTURE_ROAD);
//}
//
//
//
//

var roleArchitect = {
    run: function (creep) {
        for (var id in Game.rooms) {
            var room = Game.rooms[id];
            var spawn;
            var numSpawns = 0;
            for(var i in Memory.rooms[room.name].structures){
                if(Memory.rooms[room.name].structures[i].structureType == 'spawn'){
                    numSpawns++;
                    spawn = Game.getObjectById(Memory.rooms[room.name].structures[i].id);
                }
            }
            /*Create resource routes*/

            if(numSpawns < 2){
                var numSources = Memory.rooms[room.name].sources.length;
                if(!(Memory.rooms[room.name].architectLog[0].length == numSources)){
                    for(var i in Memory.rooms[room.name].sources){
                        var sourceObject = Game.getObjectById(Memory.rooms[room.name].sources[i].id);
                        var route = {};
                        route.path = Game.spawns[spawn.name].pos.findPathTo(sourceObject);
                        Memory.rooms[room.name].architectLog[0].push(route);
                    }
                }

                for(var j in Memory.rooms[room.name].architectLog[0]){
                    console.log(Memory.rooms[room.name].architectLog[0][j].length)
                }
            }
        }
    }
};
module.exports = roleArchitect;