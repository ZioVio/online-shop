import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MarkdownModule } from 'ngx-markdown'; 

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { IndexComponent } from './components/index/index.component';
import { AboutComponent } from './components/about/about.component';
import { PuzzlesComponent } from './components/puzzles/puzzles.component'
import { UsersComponent } from './components/users/users.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PuzzlesNewComponent } from './components/puzzles-new/puzzles-new.component';
import { PuzzleComponent } from './components/puzzle/puzzle.component';
import { ConfirmComponent } from './modals/confirm-danger/confirm.component';
import { UserComponent } from './components/user/user.component';
import { ConfirmSafetyComponent } from './modals/confirm-safety/confirm-safety.component';
import { ShellComponent } from './components/shell/shell.component';
import { RegisterComponent } from './modals/register/register.component';
import { LoginComponent } from './modals/login/login.component';

import { TokenInterseptorService } from './services/token/token-interseptor.service';
import { RolesDirective } from './directives/roles.directive';
import { AlertComponent } from './components/alert/alert.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { DeveloperComponent } from './components/developer/developer.component';
import { CartComponent } from './modals/cart/cart.component';
import { LoadingComponent } from './components/loading/loading.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { TestComponent } from './components/test/test.component';
import { SafePipe } from './pipes/safe.pipe';
import { TelegramWidgetComponent } from './components/telegram-widget/telegram-widget/telegram-widget.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ShippingEditComponent } from './modals/shipping-edit/shipping-edit.component';
import { ShippingEditFixComponent } from './modals/shipping-edit-fix/shipping-edit-fix.component';
import { OrderDetailsComponent } from './modals/order-details/order-details.component';
import { LocalDateTimeComponent } from './components/local-date-time/local-date-time.component'; 


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    MainComponent,
    IndexComponent,
    AboutComponent,
    UsersComponent,
    PuzzlesComponent,
    PuzzlesNewComponent,
    PuzzleComponent,
    ConfirmComponent,
    UserComponent,
    ConfirmSafetyComponent,
    ShellComponent,
    RegisterComponent,
    LoginComponent,
    RolesDirective,
    AlertComponent,
    NotFoundComponent,
    ForbiddenComponent,
    DeveloperComponent,
    CartComponent,
    LoadingComponent,
    UserEditComponent,
    TestComponent,
    SafePipe,
    TelegramWidgetComponent,
    OrdersComponent,
    ShippingEditComponent,
    ShippingEditFixComponent,
    OrderDetailsComponent,
    LocalDateTimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgbModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [
    NgbActiveModal,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterseptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmComponent,
    ConfirmSafetyComponent,
    RegisterComponent,
    LoginComponent, 
    CartComponent, 
    ShippingEditComponent, 
    ShippingEditFixComponent, 
    OrderDetailsComponent
  ]
})
export class AppModule { } 
