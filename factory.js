/**
 * Created by acastells on 03/07/2016.
 *

 */
var factory = {
    
    dynamicSpawn: function (taskManager) {
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
                Memory.rooms[room.name].factory.queue = [];
                

            }
            else {
                for(var j in Game.spawns){
                    if(Memory.rooms[room.name].factory.spawns.indexOf(Game.spawns[j].id) == -1){
                        Memory.rooms[room.name].factory.spawns.push(Game.spawns[j].id)
                    }
                    else {
                        break;
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
        creep.taskType = 'creep';
        return creep;
    }

};
module.exports = factory;