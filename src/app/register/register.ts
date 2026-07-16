import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../service/auth';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  constructor(private authService: AuthService,private router: Router) {}
  register() {
    const data = {
      name: this.name,
      email: this.email,
      password: this.password
    };
    this.authService.register(data).subscribe({
      next: () => {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      },
      error: (err:any) => {
        alert( err.error?.message || 'Registration Failed');
      }
    });
  }
}
