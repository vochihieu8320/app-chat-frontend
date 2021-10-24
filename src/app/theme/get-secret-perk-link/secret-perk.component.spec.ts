import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretPerkComponent } from './secret-perk.component';

describe('SimplePageComponent', () => {
  let component: SecretPerkComponent;
  let fixture: ComponentFixture<SecretPerkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretPerkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretPerkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
