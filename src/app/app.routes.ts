import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },

  {
    path: 'profile/:id', // done
    component: UserProfileComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
];
