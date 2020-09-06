import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriComponent } from './categori.component';

describe('CategoriComponent', () => {
  let component: CategoriComponent;
  let fixture: ComponentFixture<CategoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
