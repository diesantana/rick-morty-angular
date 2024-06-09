import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeListComponent } from './episode-list/episode-list.component';
import { EpisodeTableComponent } from './episode-table/episode-table.component';



@NgModule({
  declarations: [
    EpisodeListComponent,
    EpisodeTableComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class EpisodeModule { }
