import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import {
	UserService,
	OrderService
} from '../../services'

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css'],
	providers: [OrderService, UserService]
})

export class OrderComponent implements OnInit {

	private orderId: string
	private orderDetails: any
	private isLoading: boolean = true

	private line_orders_to_ship = []

	private beforeDialogAlert: boolean = true

	private lineOrderAtOnce = []

	private markAsShippedModel: any

	private date

	private shippingBtnText: string = "Save Changes"

	@ViewChild('myModal')

	modal: ModalComponent

	constructor(
		private _router: Router,
		private _route: ActivatedRoute,
		private _orderService: OrderService
		) {
		this.orderId = this._route.snapshot.params['orderId']
		this.isLoading = true
		this._orderService.getOrder(this.orderId).then(
			data => {
				// console.log(data)
				this.orderDetails = data
				this.isLoading = false
			},
			error => {
				// console.log(error)
			}
		)
		this.date = new Date()
	}

	ngOnInit() {

	}

	markAsShipped(form: any, beforeService = false) {
		this.shippingBtnText = "Save Changes"
		this.line_orders_to_ship = []
		this.lineOrderAtOnce = []
		for(let key in form) {
			if(form[key] == true)
				this.lineOrderAtOnce.push(key)
		}
		for (var i = 0; i <= this.lineOrderAtOnce.length - 1; i++) {
			this.line_orders_to_ship.push({
				"line_id": this.lineOrderAtOnce[i]
			})
		}

		if(this.line_orders_to_ship.length > 0) {
			this.beforeDialogAlert = true
			this.modal.open()
		}
		else
			this.beforeDialogAlert = false

		// console.log(this.line_orders_to_ship)
	}

	markShipped(form: any) {
		// console.log(form)
		this.shippingBtnText = "Saving Changes .."
		this.line_orders_to_ship = []
		for (var i = 0; i <= this.lineOrderAtOnce.length - 1; i++) {
			this.line_orders_to_ship.push({
				"line_id": this.lineOrderAtOnce[i],
				"quantity_shipped": form['quantity_shipped' + this.lineOrderAtOnce[i]],
				"shipped_on": form['shipped_on' + this.lineOrderAtOnce[i]],
				"shipped_by": form['shipped_by' + this.lineOrderAtOnce[i]]
			})
		}

		this.markAsShippedModel = {
			order_id: this.orderId,
			flag: 1,
			contact: {
				first_name: this.orderDetails.ship_contact.first_name,
				last_name: this.orderDetails.ship_contact.last_name,
				email_address: this.orderDetails.ship_contact.email_address,
				phone_number: this.orderDetails.ship_contact.phone_number,
				active_flag: 1,
				address: {
					brand_id: this.orderDetails.ship_contact.address.brand_id,
					name: this.orderDetails.ship_contact.address.name,
					address1: this.orderDetails.ship_contact.address.address1,
					address2: this.orderDetails.ship_contact.address.address2,
					city: this.orderDetails.ship_contact.address.city,
					state: this.orderDetails.ship_contact.address.state,
					country: this.orderDetails.ship_contact.address.country,
					country_code: this.orderDetails.ship_contact.address.country_code,
					active_flag: 1
				}
			},
			line_orders: this.line_orders_to_ship
		}

		this._orderService.markLineOrderAsShipped(this.markAsShippedModel).then(
			data => {
				console.log(data)
				this.shippingBtnText = "Changes Saved"
				this.modal.close()
			},
			error => {
				console.log(error)
			}
		)
		console.log(this.markAsShippedModel)
		// console.log(this.line_orders_to_ship)
	}

	checkAll(ev) {
		this.orderDetails.line_orders.forEach(x => x.state = ev.target.checked)
	}

	isAllChecked() {
		return this.orderDetails.line_orders.every(_ => _.state);
	}

}
