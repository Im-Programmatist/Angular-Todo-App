import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './CustomComponent/about/about.component';
import { HomeComponent } from './CustomComponent/home/home.component';
import { LoginComponent } from './CustomComponent/login/login.component';
import { RegistrationComponent } from './CustomComponent/registration/registration.component';
import { AuthGuard } from './Services/guard/auth-guard.guard';
import { NotFoundComponent } from './Core/not-found-component/not-found-component.component'
const routes: Routes = [
	//{ path: '**', component: NotFoundComponent },
	{ path: '', component: HomeComponent, canActivate: [AuthGuard]},
	{ path: 'login', component: LoginComponent, pathMatch: 'full' },
	{ path: 'registration', component: RegistrationComponent, pathMatch: 'full' },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
	{
		path:'todo',
		canActivate: [AuthGuard],
		loadChildren: () => import('./CustomComponent/todo-app/todo.module').then(mod=>mod.TodoModule)
	},
	{
		path:'datatables',
		canActivate: [AuthGuard],
		loadChildren: () => import('./CustomComponent/datatables/datatable.module').then(mod=>mod.DatatableModule)
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule {

}
