import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { RegisterService } from "../_services/register.service";
import { Address } from "../_models/address";

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
	error = '';

	constructor(private formBuilder: FormBuilder,
				private registerService: RegisterService,
				private route: ActivatedRoute,
				private router: Router,) {		
	}
	
	ngOnInit() {
		/* form = new FormGroup({
			first: new FormControl({ value: 'Nancy', disabled: true }, Validators.required),
			last: new FormControl('Drew', Validators.required)
		}); */
		this.registerForm = new FormGroup({
			name: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
			password: new FormControl(null, [Validators.required]),
			confirmedPassword: new FormControl(null, [Validators.required]),
			zipcode: new FormControl(null, [Validators.required]),
			street: new FormControl({value: null, disabled: true}, [Validators.required]),
			city: new FormControl({value: null, disabled: true}, [Validators.required]),
			state: new FormControl({value: null, disabled: true}, [Validators.required]),
			country: new FormControl({value: null, disabled: true}, [Validators.required]),
			code: new FormControl(null, [Validators.required, Validators.maxLength(6)]),
			phone: new FormControl(null, [Validators.required]),
		}, this.validateAreEqual);

		/* this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			//username: ['', Validators.required],
			username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
			email: ['', Validators.required],
			password: ['', Validators.required],
			confirmedPassword: new FormControl(null, [Validators.required]),		
			zipcode: ['', Validators.required],
			street: ['', Validators.required],
			city: ['', Validators.required],
			state: ['', Validators.required],
			country: ['', Validators.required],
			phone: ['', Validators.required],
			code: ['', Validators.required],
		}, this.pwdMatchValidator); */
	}
	
	validateAreEqual(frm: FormGroup) {
		return frm.get('password').value === frm.get('confirmedPassword').value ? null : { 'missmatch': true };
	}

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.registerForm.invalid) {
			return;
		}
		this.loading = true;

		this.registerService.saveNewUser(this.f)
			.pipe(first())
			.subscribe(
				data => {
					if (data) {
						this.router.navigate([this.returnUrl]);
					} else {
						this.error = "Erro on register";
						this.loading = false;
					}
				},
				error => {
					this.error = error.message;
					this.error = "Error on register";
					this.loading = false;
			});;
	}

	get f() {
		return this.registerForm.controls;
	}

	seacrchAddress(zipcode: any) {		
		this.registerService.getAddress(zipcode)
			.pipe(first())
			.subscribe(address => {
				this.registerForm.get('street').setValue(address.logradouro);
				this.registerForm.get('country').setValue("Brasil");
				this.registerForm.get('state').setValue(address.uf);
				this.registerForm.get('city').setValue(address.localidade);
		});
	}
}
