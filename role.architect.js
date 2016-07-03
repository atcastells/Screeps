/**
 * Created by acastells on 03/07/2016.
 */
var stage = 0;
var containers = 0;
var extensions = 0;
var roleArchitect = {

    /*Initial constructions*/

    run: function (creep) {
        /*Check room*/
        var buildings = creep.room.find(FIND_MY_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER ||
                structure.structureType == STRUCTURE_EXTENSION)
            }})

        if(stage == 1){


        }
    }

}
module.exports = roleArchitect;