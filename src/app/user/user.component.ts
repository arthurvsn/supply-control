import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from "../_services/user.service";
import { Helper } from '../_helpers/helper';
import { User } from "../_models/user";
import { Address } from "../_models/address";
import { Phone } from "../_models/phone";


function passwordConfirming(c: AbstractControl): any {
	if (!c.parent || !c) return;
	const pwd = c.parent.get('password');
	const cpwd = c.parent.get('confirmedPassword');

	if (!pwd || !cpwd) return;
	if (pwd.value !== cpwd.value) {
		return { invalid: true };

	}
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	user: User;
	user2: User;
	address: Address;
	phones: Phone;
	userForm: FormGroup;
	error = '';
	errorAddress = '';
	returnUrl = "/dashboard";
	loading = false;
	submitted = false;
	get cpwd() {
		return this.userForm.get('confirmedPassword');
	}

	constructor(private userService: UserService, private router: Router, private helper: Helper) { }

	ngOnInit() {
		this.user = this.userService.getUserLogged();
		this.getUser();
		
		this.userForm = new FormGroup({
			name: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
			password: new FormControl(null, [Validators.required]),
			confirmedPassword: new FormControl(null, [Validators.required, passwordConfirming]),
			zipcode: new FormControl(null, [Validators.required]),
			street: new FormControl({ value: null, disabled: true }, [Validators.required]),
			city: new FormControl({ value: null, disabled: true }, [Validators.required]),
			state: new FormControl({ value: null, disabled: true }, [Validators.required]),
			country: new FormControl({ value: null, disabled: true }, [Validators.required]),
			code: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
			phone: new FormControl(null, [Validators.required]),
		});
	}
	getUser() {
		this.userService.getUser(this.user.id)
			.subscribe(
				user => {
					if (user.message.type == "S") {
						this.user2 = user.dataset.user,
						this.address = user.dataset.user.addresses[0],
						this.phones = user.dataset.user.phones[0],
						this.setUserForm(this.user2),
						this.setAddressForm(this.address)
						this.setPhonesForm(this.phones)
					} else {
						this.error = user.message.text;
					}
				},
				error => this.error = error
			);
	}

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.userForm.invalid) {
			return;
		}

		this.loading = true;

		this.userService.updateUser(this.user.id, this.userForm)
			.subscribe(
				user => {
					if (user.message.type == "S") {
						this.helper.openSnackBar(user.message.text, user.message.type);
						this.router.navigate([this.returnUrl]);
					} else {
						this.helper.openSnackBar("Erro on update Profile and " + user.message.message, user.message.type);
						this.loading = false;
					}
				}, error => {
					this.error = error,
						this.loading = false
				}
			)
	}

	deletProfile() {
		if (confirm("Are you sure to delete your profile?")) {
			this.userService.deleteUser(this.user.id)
				.subscribe(
					data => {
						this.helper.openSnackBar(data.message.text, data.message.type);
						if(data.message.type == "S") {
							this.router.navigate(['/login']);
						}
					}, error => {
						this.helper.openSnackBar(error, "ERROR");
					}
				)
		}
	}

	seacrchAddress(zipcode: any) {
		
		this.userService.getAddress(zipcode)
			.subscribe(address => {
				this.userForm.get('street').setValue(address.logradouro);
				this.userForm.get('country').setValue("Brasil");
				this.userForm.get('state').setValue(address.uf);
				this.userForm.get('city').setValue(address.localidade);				
			}, 
			error => {
				console.error(error)				
				this.errorAddress = error
			}
		);
	}

	get f() {
		return this.userForm.controls;
	}

	private setUserForm(user: User) {
		this.userForm.get('name').setValue(user.name);
		this.userForm.get('username').setValue(user.username);
		this.userForm.get('email').setValue(user.email);
	}

	private setAddressForm(address: Address) {
		this.userForm.get('zipcode').setValue(address.zip_code);
		this.userForm.get('street').setValue(address.street);
		this.userForm.get('city').setValue(address.city);
		this.userForm.get('country').setValue(address.country);
		this.userForm.get('state').setValue(address.state);
	}

	private setPhonesForm(phone: Phone) {
		this.userForm.get('code').setValue(phone.country_code);
		this.userForm.get('phone').setValue(phone.number);
	}

}
