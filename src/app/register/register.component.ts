import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { Helper } from '../_helpers/helper';
import { UserService } from "../_services/user.service";
import { Address } from "../_models/address";

function passwordConfirming(c: AbstractControl): any {
	if (!c.parent || !c) return;
	const pwd = c.parent.get('password');
	const cpwd = c.parent.get('confirmedPassword');

	if (!pwd || !cpwd) return;
	
	if (pwd.value !== cpwd.value) {
		return { 
			invalid: true 
		};
	}
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;
	address: Address;
	returnUrl = "/login";
	submitted = false;
	loading = false;
	errorAddress = '';
	selectedFile: File = null;
	name: string;
	ourFile: File;
	
	get cpwd() {
		return this.registerForm.get('confirmedPassword');
	}

	constructor(
		private router: Router,
		private userService: UserService,
		private helper: Helper) {	}
	
	get f() {
		return this.registerForm.controls;
	}

	ngOnInit() {
		this.registerForm = new FormGroup({
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
			number: new FormControl(null, [Validators.required]),
			code: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
			phone: new FormControl(null, [Validators.required]),
		});
	}

	onSubmit() {

		this.submitted = true;
		// stop here if form is invalid
		if (this.registerForm.invalid) {
			this.helper.openSnackBar("Error filling out form", "ERROR");
			return;
		}
		this.loading = true;

		this.userService.storeUser(this.registerForm)
			.pipe(first())
			.subscribe(
				data => {
					if(data.message.type == 'S') {
						this.helper.openSnackBar(data.message.text, data.message.type);
						this.router.navigate([this.returnUrl]);
					} else {
						this.helper.openSnackBar("Error on register", data.message.type);
						this.loading = false;
					}
				},
				error => {
					this.helper.openSnackBar(error.message, "ERROR");
					this.loading = false;
			});
	}

	fileChange(files: File[]) {

		if (files.length > 0) {
			this.ourFile = files[0];
		}

		return;
	}

	seacrchAddress(zipcode: any) {		
		this.userService.getAddress(zipcode)
			.pipe(first())
			.subscribe(address => {
				this.registerForm.get('street').setValue(address.logradouro);
				this.registerForm.get('country').setValue("Brasil");
				this.registerForm.get('state').setValue(address.uf);
				this.registerForm.get('city').setValue(address.localidade);
			}, error => {
				this.errorAddress = error
			}
		);
	}
}
