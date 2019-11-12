import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private searchKeyword: string;
  @Input() keyword: string;
  @Output() searchButtonClick = new EventEmitter<string>();

  get isDisabled() {
    return !this.searchKeyword;
  }

  handleKeywordInput(event: any) {
    this.searchKeyword = event.target.value;
  }

  handleSerchButtonClick() {
    this.searchButtonClick.emit(this.searchKeyword);
  }
}
