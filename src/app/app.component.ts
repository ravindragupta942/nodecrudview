import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  constructor(public router: Router) {
    if (localStorage.getItem("token")) {
        this.router.navigateByUrl('/home');
    }
  }
}
