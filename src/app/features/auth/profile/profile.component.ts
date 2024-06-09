import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../../core/services/session.service';
import { Route, Router } from '@angular/router';

/**
 * Componente de perfil do usuário.
 * Exibe as informações do usuário logado e permite que o usuário faça logout da aplicação.
 */
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  user: any | null;

  constructor(
    private sessionService: SessionService, // Serviço de gerenciamento de sessão
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sessionService.user$.subscribe(user => {
      this.user = user;
    });
  }

  /**
 * Realiza o logout do usuário.
 * Limpa as informações do usuário da sessão e redireciona para a página de personagens.
 */
  logout(): void {
    this.sessionService.clearUser();
    this.router.navigate(['/characters']);
  }

}
