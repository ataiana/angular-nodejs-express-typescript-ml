import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  searchForm = new FormGroup({
    searchText: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    )
  });

  constructor(
    private router: Router
  ) {}


  onSubmit(): void {
    const searchString:string = this.searchForm.value.searchText;
    this.router.navigate([ '/list'], { queryParams: { search: searchString } });
  }
  
}
