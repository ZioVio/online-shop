import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { FormHelperService } from '../../services/form-helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpMouseLoadingService } from '../../services/loading-helper/http-mouse-loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginFormIsValid = false;

  isInvalidLoginOrPassword: boolean = false;

  constructor(
    public modal: NgbActiveModal, 
    public formHelper: FormHelperService, 
    private auth: AuthService, 
    private loadingService: HttpMouseLoadingService
  ) { }

  ngOnInit() {
    const validators = [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(30)
    ];
    this.loginForm = new FormGroup({
      login: new FormControl('', validators),
      password: new FormControl('', validators)
    });
    this.loginForm.valueChanges.subscribe(() => {
      this.isInvalidLoginOrPassword = false;
      (document.getElementById('submit') as HTMLButtonElement).disabled = !this.loginForm.valid;
    });
  }

  public login(event) {
    this.loadingService.onRequest(event);
    this.loginForm.markAllAsTouched();
    if (!this.loginForm.valid)
      return;
    this.auth.login(this.loginForm.value).subscribe(res => {
      this.modal.close(true);
      this.isInvalidLoginOrPassword = false;
    }, err => {
      if (err.status == 404 || err.status == 401) {
        this.isInvalidLoginOrPassword = true;
      }
      console.log(err);
    })
  }

}
