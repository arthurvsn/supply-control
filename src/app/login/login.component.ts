import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from "../_services/authentication.service";
import { UserService } from "../_services/user.service";

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
	error = '';

	constructor(private formBuilder: FormBuilder,
				private route: ActivatedRoute,
				private router: Router,
				private authenticationService: AuthenticationService,
				private userService: UserService) { }

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});

		// reset login status
		this.userService.logout();

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
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
		this.userService.login(this.f.username.value, this.f.password.value)
			.pipe(first())
			.subscribe(				
				data => {
					if(data.message.type == "S") {						
						this.router.navigate([this.returnUrl]);
					} else if (data.message.type == "N") {
						this.error = data.message.text;	
						this.loading = false;
					}
				},
				error => {
					this.error = error.error.message.text;
					this.loading = false;
				});
	}

}
