import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoacoesPageComponent } from './doacoes-page.component';

describe('DoacoesPageComponent', () => {
  let component: DoacoesPageComponent;
  let fixture: ComponentFixture<DoacoesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoacoesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoacoesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
