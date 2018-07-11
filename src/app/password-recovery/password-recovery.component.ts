import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Helper } from '../_helpers/helper';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})

export class PasswordRecoveryComponent implements OnInit {
	
	recoveryForm: FormGroup;
	loading = false;
	submitted = false;
	
	constructor(
		private helper: Helper, 
		private userService: UserService,
		private router: Router) { }

	ngOnInit() {
		this.recoveryForm = new FormGroup({
			email: new FormControl(null, [Validators.required, Validators.email]),
		});
	}

	onSubmit() {
		this.submitted = true;
		this.loading = true;
		this.userService.changePassword(this.recoveryForm)
			.subscribe(
				data => {
					this.helper.openSnackBar(data.message.text, data.message.type);
					if (data.message.type == "S") {
						this.router.navigate(['/login']);
					}
					this.loading = false;
				}, error => {
					this.helper.openSnackBar(error.message, "ERROR");
					this.loading = false;
				}
			);
	}

	get f() {
		return this.recoveryForm.controls;
	}

}
