import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeMenuDialogComponent } from './authorize-menu-dialog.component';

describe('AuthorizeMenuDialogComponent', () => {
  let component: AuthorizeMenuDialogComponent;
  let fixture: ComponentFixture<AuthorizeMenuDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorizeMenuDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
