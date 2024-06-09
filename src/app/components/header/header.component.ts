import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  user: any = null;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.user$.subscribe( user => {
      this.user = user;
    })
  }

  logout(): void {
    this.sessionService.clearUser();
  }

  get isLoggedIn(): boolean {

    return this.user !== null;
  }

}
