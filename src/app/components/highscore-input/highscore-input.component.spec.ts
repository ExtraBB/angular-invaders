import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighscoreInputComponent } from './highscore-input.component';

describe('HighscoreInputComponent', () => {
  let component: HighscoreInputComponent;
  let fixture: ComponentFixture<HighscoreInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighscoreInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighscoreInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
