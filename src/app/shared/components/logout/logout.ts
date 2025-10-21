import { Component } from '@angular/core';
import { MaterialModule } from '../../../material/material-module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [MaterialModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss'
})
export class Logout {

  constructor(
    private router: Router
  ) {}

  onSair() {
    this.router.navigate(['login']);
  }
}
