import { Component, OnInit } from '@angular/core';

import {
	UserService,
	OrderService
} from '../../services'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css'],
	providers: [OrderService, UserService]
})
export class DashboardComponent implements OnInit {

	private orders
	public sortBy = "bulkOrderId"
    public sortOrder = "desc"

	constructor(
		private _userService: UserService,
		private _orderService: OrderService
		) {
		
	}

	ngOnInit() {
		this._orderService.getOrders().then(
			data => {
				console.log(data)
				this.orders = data
			}
		)
	}

}