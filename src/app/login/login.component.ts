import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Helper } from '../_helpers/helper';
import { AuthenticationService } from "../_services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authenticationService: AuthenticationService,
		private helper: Helper) { }

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl(null, [Validators.required]),
			password: new FormControl(null, [Validators.required]),
		});

		// reset login status
		this.authenticationService.logout();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
	}

	// convenience getter for easy access to form fields
	get f() { 
		return this.loginForm.controls; 
	}

	onSubmit() {
		this.submitted = true;
		
		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;
		this.authenticationService.login(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(				
				data => {
					if (data == true) {
						this.router.navigate([this.returnUrl]);
						window.location.reload();
					} else {
						this.helper.openSnackBar(data, "ERROR");
						this.loading = false;
					}
				},
				error => {
					this.helper.openSnackBar(error, "ERROR");
					this.loading = false;
		});
	}

}
