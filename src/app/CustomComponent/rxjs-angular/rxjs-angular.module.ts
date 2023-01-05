import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './observables.component';
import { OperatorsComponent } from './operators.component';
import { RxJsComponent } from './rxjs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const rxjsangular_routes =  [
	//{ 
		//path: 'datatables', canActivate: [AuthGuard], children: [
      { path: 'rxjs', component: RxJsComponent, },
			{ path: 'observables', component: ObservablesComponent, },
			{ path: 'operators', component: OperatorsComponent,  }
		//] 
	//}
]

@NgModule({
  declarations: [
    ObservablesComponent,
    OperatorsComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rxjsangular_routes),
    MatSlideToggleModule,
  ],
  exports: [
    ObservablesComponent,
    OperatorsComponent
	],
})
export class RxjsAngularModuleModule { }
