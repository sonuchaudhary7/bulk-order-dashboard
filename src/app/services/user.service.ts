import { Injectable } from '@angular/core';

import {apiConst} from '../config/local'


import {Http, Headers, RequestOptions, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx'
import 'rxjs/add/operator/map'

import 'rxjs/add/operator/toPromise';


@Injectable()
export class UserService {

	private apiConsts = apiConst

	public isLoggedIn: boolean = false
	public loggedUser: any
	public userToken: any

	constructor(private _http: Http) {
		this.isUserLoggedIn()
		this.loggedUserDetails()
	}

	authUser(userJson) {

		let body = JSON.stringify(userJson)

        let headers = new Headers({
			'Content-Type': 'application/json'
		});
		let options = new RequestOptions({
			headers: headers
		});

		let url =  this.apiConsts.endpoint + '/2.0/dashboard/users/auth?key=' + this.apiConsts.key


        return this._http.post(url, body, {headers: headers})
            .toPromise()
      			.then(this.apiResponse)
                	.catch(this.handleError)
	}

	getUser(userToken, userEmail) {

        let headers = new Headers();
        this.createAuthorizationHeader(headers, userToken)
    	let url = this.apiConsts.endpoint + "/2.0/dashboard/users/" + userEmail + "?key=" + this.apiConsts.key
    	return this._http.get(url, {headers: headers})
    		.toPromise()
    			.then(this.apiResponse)
    				.catch(this.handleError)
	}

	createAuthorizationHeader(headers: Headers, token) {
        headers.append('Authorization', 'Basic ' + btoa('token:' + token)); 
    }

	apiResponse(res: Response) {
		let _res = res.json();
		return _res.data || {};
	}

	handleError(err: any) {
		let _err = err.json() && err.json().data || err;
		return Promise.reject(_err);
	}

	getAuthtoken() {
		if(this.isLoggedIn) {
			let userToken = sessionStorage.getItem('user_token')
			this.userToken = JSON.parse(userToken)
		}
	}

	private isUserLoggedIn() {
		if(sessionStorage.getItem('logged_user'))
			this.isLoggedIn = true
	}

	private loggedUserDetails() {
		if(this.isLoggedIn) {
			let loggedUser = sessionStorage.getItem('logged_user')
			this.loggedUser = JSON.parse(loggedUser)
		}
	}

}
