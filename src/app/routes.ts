import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import {
	LoginComponent,
	ErrorComponent,
	DashboardComponent,
	OrderComponent
} from './components'

const appRoutes: Routes = [
	{
		path: '',
		component: LoginComponent,
		data: {
			title: 'Login'
		}
	},
	{
		path: 'login',
		component: LoginComponent,
		data: {
			title: 'Login'
		}
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
		data: {
			title: "Dashboard"
		}
	},
	{
		path: 'order/:orderId',
		component: OrderComponent,
		data: {
			title: "Order"
		}
	},
	{
		path: '**',
		component: ErrorComponent,
		
	}
];

export const appRoutingProviders: any = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
