import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClickMenuComponent } from './click-menu.component';

describe('ClickMenuComponent', () => {
  let component: ClickMenuComponent;
  let fixture: ComponentFixture<ClickMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClickMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
