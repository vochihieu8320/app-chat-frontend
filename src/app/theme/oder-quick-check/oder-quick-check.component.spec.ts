import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OderQuickCheckComponent } from './oder-quick-check.component';

describe('OderQuickCheckComponent', () => {
  let component: OderQuickCheckComponent;
  let fixture: ComponentFixture<OderQuickCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OderQuickCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OderQuickCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
