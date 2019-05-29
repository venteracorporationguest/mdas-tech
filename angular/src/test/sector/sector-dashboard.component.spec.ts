import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorDashboardComponent } from '../../app/sector/sector-dashboard.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('SectorDashboardComponent', () => {
  let component: SectorDashboardComponent;
  let fixture: ComponentFixture<SectorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorDashboardComponent ],
      imports: [InfiniteScrollModule, HttpClientTestingModule, RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
