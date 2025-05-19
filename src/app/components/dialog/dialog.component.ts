import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ServiceService } from '../../service/service.service';

@Component({
  selector: 'app-dialog',
  imports: [MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  loginForm!: FormGroup;
  registerForm!: FormGroup;
  userExist: boolean = false;
  validUser: boolean = false;
  userName: string = '';


  constructor(@Inject(MAT_DIALOG_DATA) public data: { type: 'login' | 'register' },
    private fb: FormBuilder,
    private service: ServiceService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('user')
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmitLogin() {
    this.validUser = false

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.service.login(email, password).subscribe(user => {
        if (user) {
          this.userName = user[0].name
          console.log('Login Success:', user[0].name);
          this.validUser = false;
          sessionStorage.setItem('token', 'logged-in')
          sessionStorage.setItem('user', this.userName)
          window.location.reload()
          // Proceed with app logic
        } else {
          this.validUser = true;
        }
      });
    }
  }

  onSubmitRegister() {
    this.userExist = false;
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      const email = formData.email;

      this.service.checkUserExists(email).subscribe(users => {
        if (users.length > 0) {
          // Email already exists
          this.userExist = true;
        } else {
          // Proceed to register
          this.service.register(formData).subscribe(res => {
            this.userExist = false;
            window.location.reload()
            // this.dialog.open(DialogComponent, {
            //   data: { type: 'login' },
            //   width: '400px'
            // });
          });
        }
      });
    }
  }

}
