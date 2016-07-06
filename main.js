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
                        route.buildingPriority = false;
                        route.buildFinished = false;
                        route.repair = true;
                        Memory.rooms[room.name].architectLog[0].push(route);
                    }
                }
                /*Designate construction points*/
                for(var j in Memory.rooms[room.name].architectLog[0]){
                    console.log(Memory.rooms[room.name].architectLog[0][j].path.length)
                    for(var k in Memory.rooms[room.name].architectLog[0][j].path){

                        var pathRoute =  Memory.rooms[room.name].architectLog[0][j].path[k];
                        Game.rooms[room.name].createConstructionSite(pathRoute.x,pathRoute.y, STRUCTURE_ROAD);
                    }
                }

                /*Add priorities to construction points*/
                var shortest = 0;
                for(var j in Memory.rooms[room.name].architectLog[0]){
                    console.log(shortest + ' '+ Memory.rooms[room.name].architectLog[0][j].path.length)
                    if(shortest == 0 || Memory.rooms[room.name].architectLog[0][j].path.length < shortest){
                        shortest = j;
                    }
                }
                Memory.rooms[room.name].architectLog[0][shortest].buildingPriority = true;

            }
        }
    }
};
module.exports = roleArchitect;