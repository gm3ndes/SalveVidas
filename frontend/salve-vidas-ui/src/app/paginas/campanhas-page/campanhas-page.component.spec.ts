import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampanhasPageComponent } from './campanhas-page.component';

describe('CampanhasPageComponent', () => {
  let component: CampanhasPageComponent;
  let fixture: ComponentFixture<CampanhasPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampanhasPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampanhasPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
