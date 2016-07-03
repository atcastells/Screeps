/**
 * Created by acastells on 03/07/2016.
 */
var roleArchitect = {

    /*Initial constructions*/

    run: function (creep) {
        /*Check rooms*/
        Memory.architectLog = {
            roomHash: Memory.roomName
        };
        var containers = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
            }})


        var spawn = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION)
            }})

        if(stage == 1){


        }
    }

}
module.exports = roleArchitect;