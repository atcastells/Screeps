/**
 * Created by acastells on 11/07/2016.
 */
/*
*
*
*
*
*
*/

var taskManager = {
    run: function (task) {
        var queue;
        if(task.taskType == 'creep'){
            Memory.rooms[room.name].factory.queue.push(task);
            }
        }
    };
module.exports(taskManager);