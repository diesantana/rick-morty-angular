import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any = null;

  constructor(private sessionService: SessionService, private router: Router) {}

  ngOnInit(): void {
    this.sessionService.user$.subscribe( user => {
      this.user = user;
    })
  }

  logout(): void {
    this.sessionService.clearUser();
    this.router.navigate(['/characters']);
  }

  get isLoggedIn(): boolean {

    return this.user !== null;
  }

}
