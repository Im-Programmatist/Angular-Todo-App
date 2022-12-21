import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './observables/observables.component';
import { OperatorsComponent } from './operators/operators.component';

const rxjsangular_routes =  [
	//{ 
		//path: 'datatables', canActivate: [AuthGuard], children: [
			{ path: 'observables', component: ObservablesComponent, },
			{ path: 'operators', component: OperatorsComponent,  }
		//] 
	//}
]

@NgModule({
  declarations: [
    ObservablesComponent,
    OperatorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rxjsangular_routes),
  ],
  exports: [
    ObservablesComponent,
    OperatorsComponent
	],
})
export class RxjsAngularModuleModule { }
