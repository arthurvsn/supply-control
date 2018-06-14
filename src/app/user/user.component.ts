import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from "../_services/user.service";
import { User } from "../_models/user";
import { Address } from "../_models/address";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	user: User;
	user2: any;
	address: Address;
	registerForm: FormGroup;

	constructor(private userService: UserService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.user = this.userService.getUserLogged();

		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			username: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			zipcode: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			country: ['', Validators.required],
			phone: ['', Validators.required],
			code: ['', Validators.required],
		});

		this.getUser();
	}

	getUser() {
		this.userService.getUser(this.user.id)
			.subscribe(user => this.user2 = user);
	}

	showUser() {
		console.log(this.user2);
		//console.log(this.address);
	}
	

}
