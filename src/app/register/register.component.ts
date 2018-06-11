import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
	error: string;

	constructor(private formBuilder: FormBuilder,
				private registerService: RegisterService,
				private route: ActivatedRoute,
				private router: Router,) {		
	}
	
	ngOnInit() {
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
		});
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
					this.error = error;
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
