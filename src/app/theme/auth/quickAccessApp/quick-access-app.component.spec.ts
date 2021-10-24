import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAccessAppComponent } from './quick-access-app.component';

describe('HeaderFooterQuickAccessAppComponent', () => {
  let component: QuickAccessAppComponent;
  let fixture: ComponentFixture<QuickAccessAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickAccessAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickAccessAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
