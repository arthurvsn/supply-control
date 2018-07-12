import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Helper } from '../_helpers/helper';
import { UserService } from "../_services/user.service";
import { Address } from "../_models/address";
import { Phone } from "../_models/phone";
import { User } from "../_models/user";

function passwordConfirming(c: AbstractControl): any {
	if (!c.parent || !c) return;
	const pwd = c.parent.get('password');
	const cpwd = c.parent.get('confirmedPassword');

	if (!pwd || !cpwd) return;
	if (pwd.value !== cpwd.value) {
		return { invalid: true };
	}
}

export interface DialogData {
	animal: string;
	name: string;
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
	errorAddress = '';
	picture = "assets/images/flat-avatar.png";
	returnUrl = "/dashboard";
	loading = false;
	submitted = false;

	get cpwd() {
		return this.userForm.get('confirmedPassword');
	}

	constructor(
		private userService: UserService, 
		private router: Router, 
		private helper: Helper,
		public dialog: MatDialog) { }

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
			number: new FormControl(null, [Validators.required]),
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
						this.setAddressForm(this.address),
						this.setPhonesForm(this.phones),
						this.picture = user.dataset.user.profile_picture
					} else {
						this.helper.openSnackBar(user.message.text, user.message.type);
					}
				},
				error => {
					this.helper.openSnackBar(error.message, "ERROR");
				}
			);
	}

	onSubmit() {
		this.submitted = true;
		// stop here if form is invalid
		if (this.userForm.invalid) {
			this.helper.openSnackBar("Error filling out form", "ERROR");
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
					this.helper.openSnackBar(error.message, "ERROR");
					this.loading = false
				}
			)
	}

	deletProfile() {
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

	/**
   * this is used to trigger the input
   */
	openInput() {
		// your can use ElementRef for this later		
		document.getElementById("fileInput").click();
	}

	onFileChange(event: any) {
		
		const [file] = event.srcElement.files;
		if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
			this.helper.openSnackBar('Favor selecionar uma imagem que tenha o formato JPG ou PNG', 'OK');
		} else {
			const formData = new FormData();
			formData.append('profile_picture', file);

			this.userService.saveProfilePicture(this.user.id, formData)
				.subscribe(
					data => {
						this.picture = data.dataset.picture.url;
						this.helper.openSnackBar(data.message.text, data.message.type);
					}, error => {
						this.helper.openSnackBar(error.message, "Error");
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
		this.userForm.get('number').setValue(address.number);
	}

	private setPhonesForm(phone: Phone) {
		this.userForm.get('code').setValue(phone.country_code);
		this.userForm.get('phone').setValue(phone.number);
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogUserOverview, {
			width: '250px',
			data: { name: this.user.name, response: "yes" }
		});

		dialogRef.afterClosed().subscribe(result => {
			if(result == "yes") {
				this.deletProfile();
			}
		});
	}

}

@Component({
	selector: 'dialog-user-component-dialog',
	templateUrl: 'dialog.user.component.html',
})
export class DialogUserOverview {

	constructor(
		private dialogRef: MatDialogRef<DialogUserOverview>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

	onNoClick(): void {
		this.dialogRef.close();
	}

}