import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TeamsComponent } from './teams/teams.component';

export const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
  { path: 'teams', component: TeamsComponent },
  {
    path: 'profile/:id', // done
    component: UserProfileComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'users',
  //   pathMatch: 'full',
  // },
];
