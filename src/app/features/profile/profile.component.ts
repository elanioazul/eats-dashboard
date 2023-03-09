import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Store } from "@ngrx/store";
import { selectUserDetails } from "src/app/core/state/user";
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user$ = this.store.select(selectUserDetails);

  constructor(private store: Store) {}
}
