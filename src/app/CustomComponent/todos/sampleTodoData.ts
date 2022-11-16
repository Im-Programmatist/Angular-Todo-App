import { Todo } from '../../Todo';

var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
var currentDateTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

const TodoData:Todo[] = [
    {
        "sno":1,
        title:"First Todo",
        desc:"This is not just a todo it is first todo",
        completed:true,
        createdAt:currentDateTime,
        updatedAt:currentDateTime 
    },
    {
        "sno":2,
        title:"Second Todo",
        desc:"This is not just a todo it is second todo",
        completed:true,
        createdAt:currentDateTime,
        updatedAt:currentDateTime 
    },
    {
        "sno":3,
        title:"Third Todo",
        desc:"This is not just a todo it is third todo",
        completed:true,
        createdAt:currentDateTime,
        updatedAt:currentDateTime 
    },
    {
        "sno":4,
        title:"Fourth Todo",
        desc:"This is not just a todo it is fourth todo",
        completed:true,
        createdAt:currentDateTime,
        updatedAt:currentDateTime 
    }
];
export default TodoData;