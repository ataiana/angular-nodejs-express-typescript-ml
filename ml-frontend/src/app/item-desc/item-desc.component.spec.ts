import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ItemDescComponent } from './item-desc.component';
import {MlApiService} from '../services/ml-api.service'
import { Observable } from 'rxjs';
import { of } from 'rxjs';

describe('ItemDescComponent', () => {
  let component: ItemDescComponent;
  let fixture: ComponentFixture<ItemDescComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDescComponent ],
      imports: [HttpClientTestingModule],
      providers: [ {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of({ get: (id: string) => 'ML2734' })
        }
      }, MlApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDescComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
