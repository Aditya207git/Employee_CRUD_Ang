import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddempdataComponent } from './addempdata.component';

describe('AddempdataComponent', () => {
  let component: AddempdataComponent;
  let fixture: ComponentFixture<AddempdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddempdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddempdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
