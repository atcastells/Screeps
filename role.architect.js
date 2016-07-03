/**
 * Created by acastells on 03/07/2016.
 */
var roleArchitect = {

    /*Initial constructions*/

    run: function (creep) {
        /*Check rooms*/

        for(var id in Game.rooms){
            var room = Game.rooms[id];
            if(!Memory.rooms[room.name]){
                Memory.rooms[room.name]={};

                var sources = room.find(FIND_SOURCES);
                var buildings = room.find(FIND_MY_STRUCTURES);
                for(var x in sources) {
                    var path = Game.spawns.Spawn1.pos.findPathTo(sources[x]);

                    for(var i in path) {
                        Game.rooms.sim.createConstructionSite(path[i].x, path[ i].y, STRUCTURE_ROAD);
                    }
                }
                Memory.room[room.name].architectLog=[];
                for (var ids in buildings){
                    var structureType = buildings[ids].structureType;
                    var id = buildings[ids].id;
                    Memory.architectLog.push({id: id,structureType: structureType});
                }
                Memory.rooms[room.name].sources=[];
                for(var ids in sources){
                    var klair = sources[ids].pos.findInRange(FIND_STRUCTURES, 6, {filter: { structureType: STRUCTURE_KEEPER_LAIR }}).length > 0;
                    Memory.rooms[room.name].sources.push({id: sources[ids].id ,slots: 3, klair: klair});
                };
            };
        };
    }

}
module.exports = roleArchitect;