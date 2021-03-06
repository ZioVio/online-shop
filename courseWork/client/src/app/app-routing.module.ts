import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { UsersComponent } from './components/users/users.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component';
import { PuzzlesNewComponent } from './components/puzzles-new/puzzles-new.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { UserComponent } from './components/user/user.component';
import { ShellComponent } from './components/shell/shell.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { DeveloperComponent } from './components/developer/developer.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { AdminGuard } from './guards/admin/admin.guard';
import { ManagerGuard } from './guards/manager/manager.guard';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserEditGuard } from './guards/userEdit/user-edit.guard';
import { TestComponent } from './components/test/test.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  {
    path: '', component: ShellComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'about', component: AboutComponent },
      { path: 'puzzles', redirectTo: 'puzzles/page/1'},
      { path: 'puzzles/new', component: PuzzlesNewComponent, canActivate: [ManagerGuard]},
      { path: 'puzzles/page/:page', component: PuzzlesComponent },
      { path: 'puzzles/:id', component: PuzzleComponent },
      { path: 'puzzles/update/:id', component: PuzzlesNewComponent, canActivate: [ManagerGuard]},
      { path: 'users', redirectTo: 'users/page/1' },
      { path: 'users/page/:page', component: UsersComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard] },
      { path: 'users/:id', component: UserComponent, canActivate: [AuthGuard] }, 
      { path: 'users/update/:id',  component: UserEditComponent, canActivate: [AuthGuard, UserEditGuard] },
      { path: 'orders', component: OrdersComponent, canActivate: [ManagerGuard] },
      { path: 'test', component: TestComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'developer/v1',  component: DeveloperComponent },
      { path: '**', redirectTo: '404'},
      { path: '404',        component: NotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: `reload`
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
