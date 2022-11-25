import { Component, ElementRef, ViewChild, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '../../Services/login/login.service';
import { SharedService } from '../../Services/shared/shared.service';
import { ToastService, TOAST_STATE } from '../../Services/toast/toast.service'; 

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	animations: [
		trigger('slideInOut', [
			state('in', style({
				transform: 'translate3d(0, 0, 0)'
			})),
			state('out', style({
				transform: 'translate3d(100%, 0, 0)'
			})),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out'))
		])
	]
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	formBuilder: FormBuilder;
	formSubmitAttempt: boolean = false;
	login_api_data:any;
	tostObj:{
		messageType:string;
		message:string;
		showMessage:boolean
	};
	username: string;
	password: string;
	showSpinner:boolean;

	constructor(
		private router: Router, 
		private fb: FormBuilder, 
		private loginservice: LoginService,
		private sharedService: SharedService,
		private toastService: ToastService 
	){

	}
	ngOnInit(){
		this.showSpinner = false;
		this.loginForm = this.fb.group({
			username: [null, [Validators.required]],
			password:[null, Validators.compose([Validators.required,Validators.minLength(4),Validators.maxLength(10)])],
		});
	}
	login() : any {
		this.formSubmitAttempt = true;
		this.showSpinner = true;
		if (this.loginForm.valid) {
			const loginDoData = {
				username:this.username,
				password:this.password,
			}			
			this.loginservice.loginUser(loginDoData)
			.subscribe (
				result => {
					this.login_api_data = result;
					localStorage.setItem('user_details', JSON.stringify(result));
					localStorage.setItem('auth_token', JSON.stringify(result.token));
					this.toastService.showToast( TOAST_STATE.success, 'You have successfully log in!');        
					//this.dismissError();  
				},
				error => {
					//alert('login failed!')
					console.log('error - ', error);
					this.toastService.showToast( TOAST_STATE.danger, 'Login failed!');
					this.reset();
				},
				() => {
					// No errors, route to new page
					this.sharedService.changeRouteVisibility();
					this.router.navigate(['home']);	
				}
			);
		}else{
			//this.formValidChild.displayError = true; 
			this.validateAllFormFields(this.loginForm);
			this.showSpinner = false;
			return false;
		}
	}
	reset() {
		this.loginForm.reset();
		this.formSubmitAttempt = false;
		this.showSpinner = false;
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
	// private dismissError(): void {    
	// 	setTimeout(() => {      
	// 	  this.toastService.dismissToast();    
	// 	}, 2000);  
	// }
}
