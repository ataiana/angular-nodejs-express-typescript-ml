import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultsListComponent } from './results-list/results-list.component';
import { ItemDescComponent } from './item-desc/item-desc.component';

const routes: Routes = [
  {
    path: 'items',
    component: ResultsListComponent
  },
  {
    path: 'items/:id',
    component: ItemDescComponent
  },
  {
    path: '',
    redirectTo: 'items',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'items'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
