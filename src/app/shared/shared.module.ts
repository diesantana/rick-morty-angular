import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SearchBarComponent

  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
