import { Component } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  lists: string[] = ['Buscar por:', 'Characters', 'Episodes', 'Locations'];
  genders: string[] = ['female', 'male', 'genderless', 'unknown'];
  status: string[] = ['alive', 'dead', 'unknown'];

  selectedList: string = this.lists[0]; // Valor padrão
  selectedGender: string = this.genders[0]; // Valor padrão
  selectedStatus: string = this.status[0]; // Valor padrão

  userInput: string = '';
  showInput: boolean = false;

  toggleInput(): void {
    if(this.selectedList == this.lists[0]) {
      this.showInput = false;
      this.userInput = ''; // Limpa o input se voltar para o valor padrão
    } else{
      this.showInput = true;
    }
  }

  onSearch(): void {
    // pega a lista que o user selecionar
    let searchParams = this.selectedList;

    // aqui você vai criar as lógicas de busca
    if (this.showInput && this.userInput.trim() !== '') {

      searchParams += ` ${this.userInput.trim()}`;
    }
    // this.searchService.setSearchTerm(searchTerm);
    console.log(this.userInput);
    this.userInput = ''; // Limpa o input se voltar para o valor padrão
  }

}
