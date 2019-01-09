import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserAddGroupComponent } from './admin-user-add-group.component';

describe('AdminUserAddGroupComponent', () => {
  let component: AdminUserAddGroupComponent;
  let fixture: ComponentFixture<AdminUserAddGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserAddGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserAddGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
