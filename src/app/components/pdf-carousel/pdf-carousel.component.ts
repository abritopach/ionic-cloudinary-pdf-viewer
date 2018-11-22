import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CloudinaryApiService } from './../../services/cloudinary-api.service';

@Component({
  selector: 'app-pdf-carousel',
  templateUrl: './pdf-carousel.component.html',
  styleUrls: ['./pdf-carousel.component.css']
})
export class PdfCarouselComponent implements OnInit {

  pdfs: any;
  selected: Number = -1;
  @Output() pdfEvent = new EventEmitter<any>();

  constructor(private cloudinaryApiService: CloudinaryApiService) {
  }

  ngOnInit() {
    this.cloudinaryApiService.fetchPDFs().subscribe(
      result => {
        console.log('result', result);
        result.map(pdf => {
          pdf.src = `https://res.cloudinary.com/salsapp/image/upload/w_350,h_400,c_fill,pg_1/v1542795828/${pdf.public_id}.jpg`;
        });
        this.pdfs = result;
      },
      err => {
        console.log('err', err);
    });
  }

  selectedPDF(pdf, i) {
    console.log('PdfCarouselComponent::constructor | method called', pdf);
    this.selected = i;
    this.pdfEvent.emit(pdf);
  }

}
