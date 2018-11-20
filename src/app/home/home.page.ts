import { Component } from '@angular/core';

declare var cloudinary;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private readonly CLOUD_NAME = 'CLOUD_NAME';
  private readonly UPLOAD_PRESET = 'UPLOAD_PRESET';
  file: any;
  preview: any = null;
  pages: any[] = [];

  uploadPDF() {
    console.log('HomePage::uploadPDF | method called');

    cloudinary.openUploadWidget(
    {
      cloud_name: this.CLOUD_NAME,
      upload_preset: this.UPLOAD_PRESET,
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
        this.preview = `https://res.cloudinary.com/${this.CLOUD_NAME}/image/upload/w_350,h_400,c_fill,pg_1/` +
        `${this.file.public_id}.${this.file.format}`;
        for (let i = 1; i <= this.file.pages; i++) {
          this.pages.push(
            {
              url: `https://res.cloudinary.com/${this.CLOUD_NAME}/image/upload/w_200,h_250,c_fill,pg_${i}/` +
              `${this.file.public_id}.${this.file.format}`,
              page: i
            }
          );
        }
      }
    }
    );
    }

}
