import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from '../../Todo';
import TodoData from './sampleTodoData';
import { Toast } from 'bootstrap';
import { ToastComponent } from '../toast/toast.component'; 

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

	@ViewChild(ToastComponent) child: ToastComponent;
	@Output() triggerToast:EventEmitter<{messageType:string, message:string}> = new EventEmitter();

	constructor(){
		this.localTodo = localStorage.getItem('todos');
		console.log('localTodo', this.localTodo, JSON.parse(this.localTodo));
		//assigned sample data to todos
		this.todos = JSON.parse(this.localTodo) || TodoData; 
	}

	ngOnInit(): void {
		console.info('ngOnInit');
	}
	deleteTodo(todo: Todo){
		console.log('deleteTodo Parent - ', todo);
		const indexOftodo = this.todos.indexOf(todo);
		this.todos.splice(indexOftodo, 1);
		this.todos.forEach((item, index) => item.sno = index+1);
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.tostObj = {
			messageType:"Success",
			message:"Todo deleted successfully!",
			showMessage:true
		}
		this.child.showToastMessage(this.tostObj);		
	}
	addTodoItem(todo: Todo):void {
		console.log('todo item adding',todo);
		this.todos.push(todo);
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.tostObj = {
			messageType:"Success",
			message:"Todo added successfully!",
			showMessage:true
		}
		this.child.showToastMessage(this.tostObj);
	}
	todoUpdate(data:{ isChecked:boolean, todo:Todo }):void {
		console.log('todo update data', data);
		const indexOftodo = this.todos.indexOf(data.todo);
		this.todos[indexOftodo].completed = !data.isChecked;
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.tostObj = {
			messageType:"Success",
			message:"Todo updated successfully!",
			showMessage:true
		}
		this.child.showToastMessage(this.tostObj);
	}
}
