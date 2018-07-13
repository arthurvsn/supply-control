import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Helper } from '../_helpers/helper';
import { UserService } from '../_services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

	resetForm: FormGroup;
	loading = false;
	submitted = false;
	get cpwd() {
		return this.resetForm.get('confirmedPassword');
	}

	constructor(
		private helper: Helper, 
		private userService: UserService, 
		private route: ActivatedRoute,
		private router: Router) { }

	ngOnInit() {
		this.resetForm = new FormGroup({
			password: new FormControl(null, [Validators.required]),
			confirmedPassword: new FormControl(null, [Validators.required, passwordConfirming]),
		});
	}

	onSubmit() {
		this.submitted = true;
		
		if (this.resetForm.invalid) {
			this.helper.openSnackBar("Password do not match!", "ERROR");
			return;
		}
		this.loading = true;
		let token = this.route.snapshot.paramMap.get('token');

		this.userService.resetPassword(this.resetForm, token)		
			.subscribe(
				data => {
					this.helper.openSnackBar(data.message.text, data.message.type);
					if (data.message.type == "S") {
						this.router.navigate(['/login']);
					}
					this.loading = false;
				}, error => {
					this.loading = false;
					this.helper.openSnackBar(error.message, "ERROR");
				}
		);
		
	}

	get f() {
		return this.resetForm.controls;
	}
}
