import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveempdataComponent } from './removeempdata.component';

describe('RemoveempdataComponent', () => {
  let component: RemoveempdataComponent;
  let fixture: ComponentFixture<RemoveempdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveempdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveempdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
