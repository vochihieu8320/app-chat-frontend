import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAccountComponent } from './get-account.component';

describe('ForgotComponent', () => {
  let component: GetAccountComponent;
  let fixture: ComponentFixture<GetAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
