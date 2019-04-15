import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamescreenComponent } from './gamescreen/gamescreen.component';

const routes: Routes = [{
  path: 'game', component: GamescreenComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
