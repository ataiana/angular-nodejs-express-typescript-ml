import { Component, OnInit, OnDestroy } from '@angular/core';
import { Items, Result } from '../../../../typings/types';
import { MlApiService } from '../services/ml-api.service'
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit, OnDestroy  {

  searchResults: Items | null = null;
  resultsList: Result[] | null = null;
  $param!: Subscription;
  $search!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mlApiService: MlApiService
  ) { }

  ngOnInit(): void {
    this.$param = this.route.queryParamMap
    .subscribe( params => {
      const searchStr = params.get('search');
      if (searchStr) {
        this.getItems(searchStr)
      }
    });
  }

  getItems(search: string): void {
    this.$search = this.mlApiService
    .searchItems(search)
    .subscribe( (result: Items) => {
      this.searchResults = result;
      this.resultsList = result.results;
    });
  }

  getPrice(price: number): [string, string] {
    return this.mlApiService.getPrice(String(price))
  }

  ngOnDestroy(): void {
    this.$param.unsubscribe();
    this.$search.unsubscribe();
  }

}
