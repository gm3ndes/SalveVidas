import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobreNosPageComponent } from './sobre-nos-page.component';

describe('SobreNosPageComponent', () => {
  let component: SobreNosPageComponent;
  let fixture: ComponentFixture<SobreNosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobreNosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SobreNosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
