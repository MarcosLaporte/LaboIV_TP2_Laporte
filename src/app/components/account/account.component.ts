import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { Toast } from 'src/app/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})
export class AccountComponent {
	user: User | null = null;

	constructor(private auth: AuthService, private router: Router) {
		this.user = auth.LoggedUser;
	}

	/* async ngOnInit() {
		Loader.fire();
		await this.auth.getLoggedUser()
			.then((user) => {
				this.user = user;
			});
		Loader.close();
	} */

	signOut() {
		this.auth.signOut()
			.then(() => {
				Toast.fire({ icon: 'success', title: 'Signed out!', background: '#a5dc86' });
				this.router.navigateByUrl('login');
			})
			.catch((error: any) => {
				if (error)
					Toast.fire({ icon: 'warning', title: 'Oops...', text: error.message, background: '#3fc3ee' });
				else
					Toast.fire({ icon: 'error', title: 'Oops...', text: error.message, background: '#f27474' });
			});
	}
}