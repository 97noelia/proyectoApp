import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraNavegacion1Component } from './barra-navegacion1.component';

describe('BarraNavegacion1Component', () => {
  let component: BarraNavegacion1Component;
  let fixture: ComponentFixture<BarraNavegacion1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarraNavegacion1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarraNavegacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
