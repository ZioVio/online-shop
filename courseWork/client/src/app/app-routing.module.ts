import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent }  from './index/index.component';
import { AboutComponent }  from './about/about.component';
import { UsersComponent }  from './users/users.component';
import { PuzzlesComponent }from './puzzles/puzzles.component';


const routes: Routes = [
  { path: '',         component: IndexComponent }, 
  { path: 'about',    component: AboutComponent }, 
  { path: 'users',    component: UsersComponent }, 
  { path: 'puzzles',  component: PuzzlesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }