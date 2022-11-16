import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodosComponent } from './CustomComponent/todos/todos.component';
import { TodoItemComponent } from './CustomComponent/todo-item/todo-item.component';
import { AddTodoItemComponent } from './CustomComponent/add-todo-item/add-todo-item.component';
import { ToastComponent } from './CustomComponent/toast/toast.component';
import { FormFieldVlidationComponent } from './CustomComponent/form-field-vlidation/form-field-vlidation.component';
import { AboutComponent } from './CustomComponent/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    TodosComponent,
    TodoItemComponent,
    AddTodoItemComponent,
    ToastComponent,
    FormFieldVlidationComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
