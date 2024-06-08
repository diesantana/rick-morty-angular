import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EpisodeListComponent } from './pages/episode-list/episode-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  {path: 'characters', component: CharacterListComponent},
  {path: 'characters/:id', component: CharacterDetailsComponent},
  {path: 'episodes', component: EpisodeListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
