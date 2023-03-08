import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RolesService } from 'src/app/core';
import { Store } from "@ngrx/store";
import { selectMenuItems } from "src/app/core/state/menus";
@Component({
  selector: 'app-menu-items',
  templateUrl: './menu-items.component.html',
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class MenuItemsComponent {
  menuItems$ = this.store.select(selectMenuItems);
  isAdmin$ = this.rolesService.isAdmin$;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private rolesService: RolesService,
    private store: Store
  ) {}

  addMenuItem(): void {
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }
}
