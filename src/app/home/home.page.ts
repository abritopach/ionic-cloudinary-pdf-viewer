import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, IonSlides } from '@ionic/angular';

import ConfigCloudinary from '../config/config';

import { CloudinaryApiService } from './../services/cloudinary-api.service';

declare var cloudinary;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentYear = new Date().getFullYear();
  file: any;
  preview: any = null;
  pages: any[] = [];
  pageCount = 82;
  slideOpts = {
    effect: 'flip'
  };
  @ViewChild('slides') slides: IonSlides;
  loading: any;

  constructor(private cloudinaryApiService: CloudinaryApiService, private loadingCtrl: LoadingController) {
    console.log('HomePage::constructor | method called');
  }

  ngOnInit() {
    this.preview = `https://res.cloudinary.com/${ConfigCloudinary.cloud_name}/image/upload/w_auto:100:450,c_fill,pg_1/` +
    `v1542795828/pdf-viewer/ITEM_1890_EBLOG_2546_ejrzgc.jpg`;

    for (let i = 1; i <= this.pageCount; i++) {
      this.pages.push(
        {
          url: `https://res.cloudinary.com/${ConfigCloudinary.cloud_name}/image/upload/w_auto:100:450,c_fill,pg_${i}/` +
          `v1542795828/pdf-viewer/ITEM_1890_EBLOG_2546_ejrzgc.jpg`,
          page: i
        }
      );
    }
    console.log('pages', this.pages);
  }

  receivePdf($event) {
    console.log('HomePage::receivePdf | method called', $event);
    this.presentLoading();
    this.slides.slideTo(0, 2000);
    this.pages = [];
    this.cloudinaryApiService.getPDFNumberPages($event.public_id).subscribe(
      result => {
        console.log('result', result);
        for (let i = 1; i <= result.pages; i++) {
          this.pages.push(
            {
              url: `https://res.cloudinary.com/${ConfigCloudinary.cloud_name}/image/upload/w_300,h_450,c_fill,pg_${i}/v1542795828/` +
              `${$event.public_id}.jpg`,
              page: i
            }
          );
        }
        console.log(this.pages);
        setTimeout(() => this.dismissLoading(), 3000);
      },
      err => {
        console.log('err', err);
    });
  }

  next() {
    console.log('HomePage::next | method called');
    this.slides.slideNext();
  }

  prev() {
    console.log('HomePage::prev | method called');
    this.slides.slidePrev();
  }

  uploadPDF() {
    console.log('HomePage::uploadPDF | method called');

    cloudinary.openUploadWidget(
    {
      cloud_name: ConfigCloudinary.cloud_name,
      upload_preset: ConfigCloudinary.upload_preset,
      tags: ['pdf'],
      sources: [
        'local',
        'url',
        'camera'
      ]
    },
    (error, result) => {
      console.log(error, result);
      // Listen to 'success' event.
      if (result.event === 'success') {
        this.file = result.info;
        console.log('file', this.file);
        this.preview = `https://res.cloudinary.com/${ConfigCloudinary.cloud_name}/image/upload/w_auto:100:450,c_fill,pg_1/` +
        `${this.file.public_id}.jpg`;
        for (let i = 1; i <= this.file.pages; i++) {
          this.pages.push(
            {
              url: `https://res.cloudinary.com/${ConfigCloudinary.cloud_name}/image/upload/w_auto:100:450,c_fill,pg_${i}/` +
              `${this.file.public_id}.jpg`,
              page: i
            }
          );
        }
      }
    }
    );
    }

    async presentLoading() {
      this.loading = await this.loadingCtrl.create({
        message: 'Please wait, loading PDF...',
      });
      return await this.loading.present();
    }

    async dismissLoading() {
      this.loading.dismiss();
      this.loading = null;
    }

}
