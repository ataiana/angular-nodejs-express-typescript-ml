import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemResponse } from '../../../../typings/types';
import { MlApiService } from '../services/ml-api.service'
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss']
})
export class ItemDescComponent implements OnInit, OnDestroy {

  searchResults: ItemResponse | null = null;
  price!: [string, string];
  $paramMap!: Subscription;
  $result!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mlApiService: MlApiService
  ) {}

  ngOnInit(): void {
    this.$paramMap = this.route.paramMap
    .subscribe( (param: ParamMap) => {
        const id = param.get('id');
        this.getItem(id);
      }
    );
  }

  getItem(id: string | null): void {
    this.$result = this.mlApiService
      .getItem(id)
      .subscribe( (res: ItemResponse) =>  this.searchResults = res);
  }

  getPrice(price: number): [string, string] {
    return this.mlApiService.getPrice(String(price))
  }

  ngOnDestroy(): void {
    this.$paramMap.unsubscribe();
    this.$result.unsubscribe();
  }

}
