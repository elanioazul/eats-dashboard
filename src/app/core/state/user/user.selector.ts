import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";
import { environment } from "src/environments/environment";

export const USER_ROLES = {
    MENU_ADMIN: "menu-admin",
};

export const selectUser = createFeatureSelector<UserState>("user");

export const selectUserDetails = createSelector(
  selectUser,
  (state: UserState) => state.userDetails
);

export const selectIsLoggedIn = createSelector(
    selectUserDetails,
    (userDetails) => !!userDetails
);
  

export const selectUserRoles = createSelector(
  selectUserDetails,
  (userDetails) => (userDetails ? userDetails[`${environment.auth.authorizationParams.audience}/roles`] : null)
);

export const selectIsAdmin = createSelector(selectUserRoles, (userRoles) =>
  userRoles?.includes(USER_ROLES.MENU_ADMIN)
);