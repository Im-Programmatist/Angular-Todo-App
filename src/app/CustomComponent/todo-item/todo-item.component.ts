import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Todo } from '../../Todo';

@Component({
	selector: 'app-todo-item',
	templateUrl: './todo-item.component.html',
	styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent implements OnInit {

	//this input will take data from parent component or from import
	@Input() todo: Todo;

	//This output will pass data to parent component
	@Output() todoDelete: EventEmitter<Todo> = new EventEmitter();//we have emitted event from child to parent
	@Output() updateTodoItem: EventEmitter<{isChecked:boolean,  todo:Todo}> = new EventEmitter();//we have emitted event from child to parent for update

    constructor() {
		console.info('constructor TodoItemComponent');
	}
	ngOnInit(): void {
		console.info('ngOnInit');
	}
	OnClick(todo:Todo){
		//creating event emitter 
		this.todoDelete.emit(todo);//pass to parent
		console.log('OnClick has been triggered');
	}
	
	changeTodoStatus(isChecked, todo:Todo): void {
		console.log('changeTodoStatus has been triggered', isChecked, todo);
		this.updateTodoItem.emit({isChecked:isChecked,  todo:todo});
	}
}
