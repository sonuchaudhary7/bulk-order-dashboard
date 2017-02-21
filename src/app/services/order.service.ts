import { Injectable } from '@angular/core';

import {apiConst} from '../config/local'

import {UserService} from './user.service'

import {Http, Headers, RequestOptions, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OrderService {

	private apiConsts = apiConst

	constructor(private _userService: UserService, private _http: Http) {

	}

	getOrders() {
    	let url = this.apiConsts.bulkOrderEndpoint + "/orders"
    	return this._http.get(url)
    		.toPromise()
    			.then(this._userService.apiResponse)
    				.catch(this._userService.handleError)
	}

	getOrder(orderId) {
		let url = this.apiConsts.bulkOrderEndpoint + "/order/" + orderId
    	return this._http.get(url)
    		.toPromise()
    			.then(this._userService.apiResponse)
    				.catch(this._userService.handleError)
	}

	markLineOrderAsShipped(data) {
		let url = this.apiConsts.bulkOrderEndpoint + "/order/shipped"
		let body = JSON.stringify(data)

        let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});

		return this._http.put(url, body, {headers: headers})
            .toPromise()
      			.then(this._userService.apiResponse)
                	.catch(this._userService.handleError)
	}

}
