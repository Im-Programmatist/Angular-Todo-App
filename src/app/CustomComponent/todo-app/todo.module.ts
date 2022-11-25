import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TodosComponent } from './todos/todos.component';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { AddTodoItemComponent } from './add-todo-item/add-todo-item.component';
import { AuthGuard } from '../../Services/guard/auth-guard.guard';

const todo_routes =  [
	//{ 
		//path: 'todo', canActivate: [AuthGuard], children: [
			{ path: 'todo-list', component: TodoItemComponent },
			{ path: 'add-todo', component: TodosComponent  }
		//] 
	//}
]

@NgModule({
	declarations: [
		TodosComponent,
		TodoItemComponent,
		AddTodoItemComponent,
	],
	imports: [
		CommonModule, 
		FormsModule, 
		ReactiveFormsModule, 
		RouterModule.forChild(todo_routes)
	],
	exports: [
        
    ],
	providers: [AuthGuard],
})
export class TodoModule {
	constructor(){
		console.log('this is a todo-app module ');
	}
}
