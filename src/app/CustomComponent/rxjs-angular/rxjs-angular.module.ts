import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ObservablesComponent } from './observables.component';
import { TakeOperatorsComponent } from './takeOperators.component';
import { UtilityOperatorsComponent } from './utilityOperators.component';
import { ConditionalOperatorsComponent } from './conditionalOperators.component';
import { MulticastingOperatorsComponent } from './multicastingOperators.component';
import { FilteringOperatorsComponent } from './filteringOperators.component';
import { RxJsComponent } from './rxjs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SubjectBehaviourComponent } from './subject-behaviour.component';

const rxjsangular_routes =  [
	//{  
		//path: 'datatables', canActivate: [AuthGuard], children: [
      { path: 'rxjs', component: RxJsComponent, },
			{ path: 'observables', component: ObservablesComponent, },
			{ path: 'take-operators', component: TakeOperatorsComponent, },
      { path: 'utility-operators', component: UtilityOperatorsComponent, },
      { path: 'conditional-operators', component: ConditionalOperatorsComponent, },
      { path: 'multicasting-operators', component: MulticastingOperatorsComponent, },
      { path: 'filtering-operators', component: FilteringOperatorsComponent, },
      { path:'subject-types', component: SubjectBehaviourComponent }
		//] 
	//}
]

@NgModule({
  declarations: [
    RxJsComponent,
    ObservablesComponent,
    TakeOperatorsComponent,
    UtilityOperatorsComponent,
    ConditionalOperatorsComponent,
    MulticastingOperatorsComponent,
    FilteringOperatorsComponent,
    SubjectBehaviourComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rxjsangular_routes),
    MatSlideToggleModule,
  ],
  exports: [
    RxJsComponent,
    ObservablesComponent,
    TakeOperatorsComponent,
    UtilityOperatorsComponent,
    ConditionalOperatorsComponent,
    MulticastingOperatorsComponent,
    FilteringOperatorsComponent
	],
})
export class RxjsAngularModuleModule { }
