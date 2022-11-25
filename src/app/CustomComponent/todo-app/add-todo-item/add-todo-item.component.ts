import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import TodoData from '../sampleTodoData';
import { Todo } from '../Todo';
//import validator and FormBuilder
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FormFieldVlidationComponent } from '../../form-field-vlidation/form-field-vlidation.component';

@Component({
  selector: 'app-add-todo-item',
  templateUrl: './add-todo-item.component.html',
  styleUrls: ['./add-todo-item.component.css']
})
export class AddTodoItemComponent implements OnInit{

	@Output() addTodo: EventEmitter<Todo> = new EventEmitter();
	//@ViewChild(FormFieldVlidationComponent) formValidChild: FormFieldVlidationComponent;

	addTodoFrom: FormGroup;
	formBuilder: FormBuilder;
	formSubmitAttempt: boolean = false;

	todo_title:string;
	todo_desc:string;
	todo_create:string;
	todo_complete:boolean;
	todo_active:boolean;
	
	constructor(private fb: FormBuilder ) {
		this.formBuilder = fb;
	}

	// titleTextValidator(control: FormControl) :boolean {
	// 	let title = control.value;
	// 	if (title.toLowerCase() == "todo" ) {
	// 		return true;
	// 	}
	// 	return false;
	// }

	ngOnInit(): void {
		console.info('ngOnInit');
		this.addTodoFrom = this.formBuilder.group({
			todo_title: [null, Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])],
			todo_create:[null, [Validators.required]],
            todo_desc:[null, Validators.compose([Validators.required,Validators.minLength(8),Validators.maxLength(50)])],
			todo_complete:[null]
		});
	}

	// isFieldValid(field: string) {
	// 	return (!this.addTodoFrom.get(field).valid && this.formSubmitAttempt);
	// }

	// displayFieldCss(field: string) {
	// 	return {
	// 	  'has-error': this.isFieldValid(field),
	// 	  'has-feedback': this.isFieldValid(field)
	// 	};
	// }

	onSubmitAddTodo(): any {
		this.formSubmitAttempt = true;
		if (this.addTodoFrom.valid) {
			const addToDoData = {
				sno:JSON.parse(localStorage.getItem('todos')).length+1,
				title:this.todo_title,
				desc:this.todo_desc,
				completed:this.todo_complete,
				createdAt:this.todo_create,
				updatedAt:this.todo_create,
				active:this.todo_active
			}
			this.addTodo.emit(addToDoData);
		}else{
			//this.formValidChild.displayError = true; 
			this.validateAllFormFields(this.addTodoFrom);
			return false;
		}
	}

	reset() {
		this.addTodoFrom.reset();
		this.formSubmitAttempt = false;
		//this.formValidChild.displayError = false;
		// Object.keys(this.addTodoFrom.controls).forEach(key => {
		// 	this.addTodoFrom.get(key).setErrors(null) ;
		// });
	}
	
	validateAllFormFields(formGroup: FormGroup) { 
		Object.keys(formGroup.controls).forEach(field => { 
			const control = formGroup.get(field);            
			if (control instanceof FormControl) { 
				control.markAsTouched({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control); 
			}
		});
	}

}
