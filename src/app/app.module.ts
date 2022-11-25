import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastComponent } from './Core/toast/toast.component';
import { FormFieldVlidationComponent } from './CustomComponent/form-field-vlidation/form-field-vlidation.component';
import { AboutComponent } from './CustomComponent/about/about.component';
import { HomeComponent } from './CustomComponent/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';  
import { TokenInterceptor } from './Services/auth/Interceptor';
import { LoginComponent } from './CustomComponent/login/login.component';
import { RegistrationComponent } from './CustomComponent/registration/registration.component';
import { MaterialModule } from './Core/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from './Services/toast/toast.service';
//Below modules are imported by lazyloading in app-routing modules
//import { TodoModule } from './CustomComponent/todo-app/todo.module';
//import { DatatableModule } from './CustomComponent/datatables/datatable.module';

@NgModule({
	declarations: [
		AppComponent,
		ToastComponent,
		FormFieldVlidationComponent,
		AboutComponent,
		HomeComponent,
		LoginComponent,
		RegistrationComponent,
	],
	imports: [
		HttpClientModule,
		MaterialModule,
		//TodoModule,
		//DatatableModule,
		BrowserModule, 
		FormsModule, 
		ReactiveFormsModule,
		AppRoutingModule, 
	],
	providers: [{  
		provide: HTTP_INTERCEPTORS,  
		useClass: TokenInterceptor,  
		multi: true  
	},ToastService],
	bootstrap: [AppComponent],
})
export class AppModule {
	constructor(){
		//to check if module invoked or not 
		console.log('this is a app module ');
	}
}
