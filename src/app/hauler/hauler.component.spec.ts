import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HaulerComponent } from './hauler.component';

describe('HaulerComponent', () => {
  let component: HaulerComponent;
  let fixture: ComponentFixture<HaulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HaulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
