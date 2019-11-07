import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";

import { AuthService } from '../../services/auth/auth.service';

import { LoginComponent } from '../../modals/login/login.component';
import { RegisterComponent } from '../../modals/register/register.component';
import { ConfirmComponent } from '../../modals/confirm-danger/confirm.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  @Output() successMessage = new EventEmitter<String>();

  openRegistration = 'reg';
  openLogin = 'log';

  linksAreActive = true;

  links = {
    
  }

  constructor(
    public auth: AuthService,
    private modalService: NgbModal, 
    private route: ActivatedRoute 
  ) { }

  ngOnInit() {
    const authRequired = (this.route.snapshot.queryParamMap.get('sessionExpired') || '') === 'true';
    if (authRequired)
      this.loginClicked();
  }

  public loginClicked() {
    const modalRef = this.modalService.open(LoginComponent);
    modalRef.result.then(res => { 
      if (res === this.openRegistration) {
        this.registerClicked(); 
        return;
      }
      this.successMessage.emit('Вы успешно вошли!');
      this.reloadLinks();
    }, (reason) => {
    })
  }

  public registerClicked() {
    const modalRef = this.modalService.open(RegisterComponent);
    modalRef.result.then(res => {
      if (res == this.openLogin) {
        this.loginClicked();
        return;
      }
      this.successMessage.emit('Вы успешно зарегестрировались!');
      this.reloadLinks();
    }, (reason) => {
    })
  }

  public logoutClicked() {
    this.modalService.open(ConfirmComponent).result.then(res => {
      if (res) {
        this.auth.logout();
        this.successMessage.emit('Вы успешно вышли!');
        this.reloadLinks();
      }
    })
  }

  public reloadLinks() {
    this.linksAreActive = false;
    setTimeout(() => this.linksAreActive = true, 1);
  }


}