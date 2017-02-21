import { Component, OnInit } from '@angular/core';

import {
	UserService
} from '../../services'

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
	providers: [UserService]
})
export class HeaderComponent implements OnInit {


	private loggedUser: any
	constructor(
		private _userService: UserService,
		private _route: ActivatedRoute,
		private _router: Router
		) { }

	ngOnInit() {
		if(!this._userService.isLoggedIn)
			this._router.navigate(['/'], {queryParams: {next: this._router.url}})
		this.loggedUser = this._userService.loggedUser
	}

	logout() {
		sessionStorage.removeItem('user_token')
		sessionStorage.removeItem('logged_user')
		this._router.navigate(['/'])
	}
}
