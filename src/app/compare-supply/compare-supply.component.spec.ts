import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareSupplyComponent } from './compare-supply.component';

describe('CompareSupplyComponent', () => {
  let component: CompareSupplyComponent;
  let fixture: ComponentFixture<CompareSupplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompareSupplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
