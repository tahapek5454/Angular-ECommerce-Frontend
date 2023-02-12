import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectProductsImageDialogComponent } from './select-products-image-dialog.component';

describe('SelectProductsImageDialogComponent', () => {
  let component: SelectProductsImageDialogComponent;
  let fixture: ComponentFixture<SelectProductsImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectProductsImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectProductsImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
