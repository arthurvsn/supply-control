import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
	user2: User;
	address: Address;
	registerForm: FormGroup;
	userForm: FormGroup;
	error = '';
	loading = false;

	constructor(private userService: UserService, private formBuilder: FormBuilder) { }

	ngOnInit() {
		this.user = this.userService.getUserLogged();
		this.getUser();
		
		this.userForm = new FormGroup({
			name: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
			password: new FormControl(null, [Validators.required]),
			confirmedPassword: new FormControl(null, [Validators.required]),
			zipcode: new FormControl(null, [Validators.required]),
			street: new FormControl({ value: null, disabled: true }, [Validators.required]),
			city: new FormControl({ value: null, disabled: true }, [Validators.required]),
			state: new FormControl({ value: null, disabled: true }, [Validators.required]),
			country: new FormControl({ value: null, disabled: true }, [Validators.required]),
			code: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
			phone: new FormControl(null, [Validators.required]),
		});


		/* this.userForm = this.formBuilder.group({
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
 */		
	}

	getUser() {
		this.userService.getUser(this.user.id)
			.subscribe(
				user => {
					if (user.message.type == "S") {
						this.user2 = user.dataset.user,
						this.address = user.dataset.user.addresses[0]
					} else {
						this.error = user.message.text;
					}
				},
				error => this.error = error
			);
	}

	showUser() {
		console.log(this.user2);
		console.log(this.address);
	}

}
