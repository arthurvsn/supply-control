import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import 'hammerjs';

import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

	mobileQuery: MediaQueryList;

	fillerNav = Array(50).fill(0).map((_, i) => `Nav Item ${i + 1}`);

	fillerContent = Array(50).fill(0).map(() =>
		`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

	private _mobileQueryListener: () => void;
	
	title = 'Supply Control';
	isLogged: any;
	returnUrl = '/';

	constructor(private userService: UserService, 
		private route: ActivatedRoute,
		private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
		this._mobileQueryListener = () => changeDetectorRef.detectChanges();
		this.mobileQuery.addListener(this._mobileQueryListener);
	}
	shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
	ngOnDestroy(): void {
		this.mobileQuery.removeListener(this._mobileQueryListener);
	}
	ngOnInit() {
		
		if (this.userService.getUserLogged()) {

			this.userService.validateToken()
				.subscribe(
					ping => {
						if (ping.message.type == "S") {
							this.isLogged = true;
							this.returnUrl = '/dashboard';
							this.router.navigate([this.returnUrl]);
						} else {
							this.isLogged = false;
							this.returnUrl = '/login';
							this.router.navigate([this.returnUrl]);
						}
					}, error => {
						console.error(error);
						this.returnUrl = '/login';
						this.router.navigate([this.returnUrl]);
					}
				);
		} else {
			this.isLogged = false;
			this.returnUrl = '/login';
		}
		this.router.navigate([this.returnUrl]);		
	}

	logout() {
		this.router.navigate(['login']);
		window.location.reload();
	}
}
