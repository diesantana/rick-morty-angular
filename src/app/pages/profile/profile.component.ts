import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  dataDashboard: {data: string, value: number} [] = [
    {data: 'Personagens encontrados', value: 826},
    {data: 'Episódios encontrados', value: 51},
    {data: 'Localizações: ', value: 126},
  ];

}
