import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  @Input() keyword: string;
  @Output() private readonly searchButtonClick = new EventEmitter<string>();

  private searchKeyword: string;

  get isDisabled(): boolean {
    return !this.searchKeyword;
  }

  handleKeywordInput(event: Event): void {
    this.searchKeyword = (event as any).target.value;
  }

  handleSerchButtonClick(): void {
    this.searchButtonClick.emit(this.searchKeyword);
  }
}
