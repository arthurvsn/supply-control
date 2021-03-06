import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	
	contactForm: FormGroup;
	constructor(private formBuilder: FormBuilder,
		private router: Router) { }

	details: string;
	sending = false;

	ngOnInit() {
		this.contactForm = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
		});
	}

	closePopup() {
		this.router.navigate([{ outlets: { popup: null } }]);
	}

	send() {
		this.sending = true;
		this.details = 'Sending Message...';

		setTimeout(() => {
			this.sending = false;
			this.closePopup();
			this.details ='';
		}, 1000);
	}

}
