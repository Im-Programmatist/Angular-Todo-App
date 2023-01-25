import { Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import { Todo } from '../Todo';
import TodoData from '../sampleTodoData';
import { ToastService, TOAST_STATE } from '../../../Services/toast/toast.service'; 

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {

	//this input will take data from parent component or from import
	@Input() 
	set todo(value:any){
		console.log(`inside set todo`,value);
		value.testInputDecoGetSetMethod=value.sno+"Input decorator - modified input value coming from parent";
		this._todo = value;
	}
	get todo(): any{
		return this._todo
	}
	_todo: Todo;
	localTodo:string;
	//This output will pass data to parent component
	@Output() todoDelete: EventEmitter<Todo> = new EventEmitter();//we have emitted event from child to parent
	@Output() updateTodoItem: EventEmitter<{isChecked:boolean,  todoData:Todo}> = new EventEmitter();//we have emitted event from child to parent for update

	todosObj:Todo[];
	tostObj:{
		messageType:string;
		message:string;
		showMessage:boolean
	};

    constructor(private toastService: ToastService ) {
		this.localTodo = localStorage.getItem('todos');
		//assigned sample data to todos
		this.todosObj = JSON.parse(this.localTodo) ?? TodoData;
	}
	ngOnInit(): void {
		console.info('ngOnInit');
	}
	OnClick(todo_data:Todo){
		if(this.todo===undefined){
			//this is for self operation no parent involved
			const indexOftodo = this.todosObj.indexOf(todo_data);
			this.todosObj.splice(indexOftodo, 1);
			this.todosObj.forEach((item, index) => item.sno = index+1);
			localStorage.setItem('todos', JSON.stringify(this.todosObj));
			this.toastService.showToast( TOAST_STATE.success, 'Todo deleted successfully!');        
		}else{
			//creating event emitter 
			this.todoDelete.emit(todo_data);//pass to parent
		}
	}
	
	changeTodoStatus(isChecked, todoData:Todo): void {
		if(this.todo===undefined){
			//this is for self operation no parent involved
			const indexOftodo = this.todosObj.indexOf(todoData);
			this.todosObj[indexOftodo].completed = !isChecked;
			localStorage.setItem('todos', JSON.stringify(this.todosObj));
			this.toastService.showToast( TOAST_STATE.success, 'Todo update successfully!');
		}else{
			this.updateTodoItem.emit({isChecked:isChecked,  todoData:todoData});
		}
		
	}
}
