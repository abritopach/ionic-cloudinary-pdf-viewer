import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfCarouselComponent } from './pdf-carousel.component';

describe('GenreCarouselComponent', () => {
  let component: PdfCarouselComponent;
  let fixture: ComponentFixture<PdfCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
