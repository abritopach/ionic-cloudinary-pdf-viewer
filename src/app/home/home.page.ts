import { Component } from '@angular/core';

declare var cloudinary;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  uploadPDF() {
    console.log('HomePage::uploadPDF | method called');

    cloudinary.openUploadWidget(
      {
        cloud_name: 'CLOUD_NAME',
        upload_preset: 'UPLOAD_PRESET',
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
        }
      }
    );
    }

}
