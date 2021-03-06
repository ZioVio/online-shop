import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser'

import { FormHelperService } from '../../services/form-helper.service';
import { AuthService } from '../../services/auth/auth.service';
import { HttpMouseLoadingService } from '../../services/loading-helper/http-mouse-loading.service';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  loginAlreadyExists: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public formHelper: FormHelperService,
    public auth: AuthService,
    private loadingService: HttpMouseLoadingService,
    private alerts: AlertService, 
    private sanitizer: DomSanitizer
    ) { }
    
    ngOnInit() {
      const validators = [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
    ];

    this.registerForm = new FormGroup({
      first_name: new FormControl('', validators),
      last_name: new FormControl('', validators),
      login: new FormControl('', validators),
      password: new FormControl('', validators),
      passwordRepeat: new FormControl('', validators.concat(this.passwordsValidator))
    });
    this.registerForm.valueChanges.subscribe(() => {
      this.loginAlreadyExists = false;
      (document.getElementById('submit') as HTMLButtonElement).disabled = !this.registerForm.valid;
    });
  }


  onTelegramAuth(user) {
    alert(user);
  }

  comparePasswords() {
    if (!this.registerForm)
      return false;
    const password = this.registerForm.get('password').value;
    const passwordRepeat = this.registerForm.get('passwordRepeat').value;
    console.log(password === passwordRepeat);

    return password === passwordRepeat;
  }

  passwordsValidator = (control: FormControl) => {
    const passwordsEqual = this.comparePasswords();
    return passwordsEqual ? null : {
      stringWithoutRegExpSymbolsValidator: {
        valid: passwordsEqual
      }
    };
  }

  registerClicked(event) {
    this.loadingService.onRequest(event);
    this.registerForm.markAllAsTouched();
    if (!this.registerForm.valid) {
      this.alerts.warn('Форма не валидная');
      return;
    }
    this.auth.register(this.registerForm.value).subscribe(response => {
      this.modal.close(true);
      this.loginAlreadyExists = false;
    },
      err => {
        console.log(err);
        if (err.status == 409)
          this.loginAlreadyExists = true;
      });
  }

  // get formIsValid() {
  //   return this.registerForm.valid;
  // }


}
