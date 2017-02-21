import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {
	UserService
} from '../../services'

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
	providers: [UserService]
})

export class LoginComponent implements OnInit {

	private errmsg: any = {
		show: false,
		msg: ''
	}

	private next: string;

	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
		) { }

	ngOnInit() {
		this._route
			.queryParams
				.subscribe(params => {
					this.next = params['next'] || '/dashboard';
		});

		if(this._userService.isLoggedIn)
			this._router.navigate([this.next])
	}

	authUser(form: any) {

		let userData = {
			email: form.userEmail,
			password: form.userPassword
		}

		this._userService.authUser(userData).then(
			data => {
				this.errmsg = {
					show: false,
					msg: ''
				}
				sessionStorage.setItem('user_token', data.user_auth_token)
				this.getUser(data)
			},
			error => {
				this.errmsg = {
					show: true,
					msg: error.message == 'Unauthorized' 
						? 'Please check your login credentials & try again.' 
							: error.message
				}
			}
		)
	}

	getUser(authData) {
		this._userService.getUser(authData.user_auth_token, authData.email).then(
			data => {
				this.errmsg = {
					show: false,
					msg: ''
				}
				sessionStorage.setItem('logged_user', JSON.stringify(data))
				this._userService.isLoggedIn = true
				this._router.navigate([this.next])
			},
			error => {
				this.errmsg = {
					show: true,
					msg: error.message
				}
				sessionStorage.removeItem('user_token')
			}
		)
	}

}
