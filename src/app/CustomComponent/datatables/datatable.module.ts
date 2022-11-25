import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { ScrollloadingComponent } from './scrollloading/scrollloading.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../Services/guard/auth-guard.guard';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

const datatable_routes =  [
	//{ 
		//path: 'datatables', canActivate: [AuthGuard], children: [
			{ path: 'pagination', component: PaginationComponent, },
			{ path: 'scrollloading', component: ScrollloadingComponent,  }
		//] 
	//}
]

@NgModule({
	declarations: [
		PaginationComponent,
		ScrollloadingComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(datatable_routes),
		MatTableModule,
		MatPaginatorModule,
	],
	exports: [
		PaginationComponent,
		ScrollloadingComponent,
		MatTableModule,
		MatPaginatorModule,
	],
	providers: [],
})
export class DatatableModule {
	constructor(){
		//to check if module invoked or not 
		//also can test lazy loading works or not 
		//if this line printed from refreshing tab on home page then lazy loading not work
		console.log('this is a datatable module ');
	}
}
