import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailDialogsComponent } from './order-detail-dialogs.component';

describe('OrderDetailDialogsComponent', () => {
  let component: OrderDetailDialogsComponent;
  let fixture: ComponentFixture<OrderDetailDialogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailDialogsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDetailDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
