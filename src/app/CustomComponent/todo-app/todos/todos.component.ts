import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from '../Todo';
import TodoData from '../sampleTodoData';
import { Toast } from 'bootstrap';
import { ToastService, TOAST_STATE } from '../../../Services/toast/toast.service'; 

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent implements OnInit{

	todos:Todo[]; //we have already checked data type in sample data file but double checking here
	localTodo:string;
	tostObj:{
		messageType:string;
		message:string;
		showMessage:boolean
	};

	@Output() triggerToast:EventEmitter<{messageType:string, message:string}> = new EventEmitter();

	constructor(private toastService: ToastService){
		this.localTodo = localStorage.getItem('todos');
		//assigned sample data to todos
		this.todos = JSON.parse(this.localTodo) || TodoData; 
	}
	ngOnInit(): void {
	}
	deleteTodo(todo: Todo){
		const indexOftodo = this.todos.indexOf(todo);
		this.todos.splice(indexOftodo, 1);
		this.todos.forEach((item, index) => item.sno = index+1);
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.toastService.showToast( TOAST_STATE.success, 'Todo deleted successfully!');  	
	}
	addTodoItem(todo: Todo):void {
		this.todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.toastService.showToast( TOAST_STATE.success, 'Todo added successfully!');  
	}
	todoUpdate(data:{ isChecked:boolean, todoData:Todo }):void {
		const indexOftodo = this.todos.indexOf(data.todoData);
		this.todos[indexOftodo].completed = !data.isChecked;
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.toastService.showToast( TOAST_STATE.success, 'Todo update successfully!');  
	}
}
