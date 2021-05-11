import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {MlApiService} from '../services/ml-api.service'
import { ResultsListComponent } from './results-list.component';
import { of } from 'rxjs';

describe('ResultsListComponent', () => {
  let component: ResultsListComponent;
  let fixture: ComponentFixture<ResultsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultsListComponent ],
      imports: [HttpClientTestingModule],
      providers: [ {
        provide: ActivatedRoute,
        useValue: {
            queryParamMap: of({ get: (search: string) => 'buzos' })
          }
      }, MlApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
