import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap } from "rxjs/operators";
import { BaseMenuItem } from "src/app/core";
import { Store } from "@ngrx/store";
import { editMenuItemFormSubmitted, selectMenuItem, } from "src/app/core/state/menus";
@Component({
  selector: "app-edit-item",
  templateUrl: "./edit-item.component.html",
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class EditItemComponent {
  menuItemId$ = this.activatedRoute.params.pipe(map((params) => params.id));
  menuItem$ = this.menuItemId$.pipe(
    tap((id) => (this._id = id)),
    switchMap((id) => this.store.select(selectMenuItem({ id: id })))
  );

  private _id!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {}

  cancel(): void {
    this.location.back();
  }

  submit(menu: BaseMenuItem): void {
    this.store.dispatch(
      editMenuItemFormSubmitted({
        menuItem: {
          ...menu,
          id: this._id.toString(),
        },
      })
    );
    this.location.back();
  }
}
