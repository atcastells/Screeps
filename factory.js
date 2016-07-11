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

                //Calculate next construction


            }

        }


    },
    creeps: function (role) {

        var roles = ['hauler','upgrader','harvester','builder','architect'];
        var bodyCost =[
            {part: MOVE,cost: 50},
            {part: WORK,cost: 100},
            {part:CARRY ,cost:50},
            {part:ATTACK,cost:80 },
            {part:RANGED_ATTACK,cost:150},
            {part:HEAL,cost:250},
            {part:CLAIM,cost:600},
            {part:TOUGH,cost:10}
        ];

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
        var calculateCost = function (creep,bodyCost) {
            var total = 0;
            for(var i in creep){
                for(var j in creep[i].body){
                        if(creep[i].body[j]){
                            var tempNum = bodyCost.indexOf(creep[i].body[j])
                            total += bodyCost[tempNum].cost;
                        }
                }
            }
            return total;
        }
        creep.cost = calculateCost(creep,bodyCost);
        creep.taskType = 'creep';
        return creep;
    }

};
module.exports = factory;