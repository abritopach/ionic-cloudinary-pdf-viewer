# IonicCloudinaryPdfViewer

Sample project that shows how to build  a PDF Viewer with Ionic and Cloudinary.

This project shows you how to:

    * Use Cloudinary SDK for Angular in Ionic 4.
        * Get pdfs tagged as pdf.
    * Show available pdf's list.
    * Select pdf & show pdf pages using ionic slides.

Technologies: Angular, Ionic, Cloudinary, TypeScript.

## Configuration

There are 2 settings you need to change for this demo to work. Edit config/config.ts file:

cloud_name - Should be change to the cloud name you received when you registered for a Cloudinary account.
upload_preset - You should first "Enable unsigned uploads" in the "Upload Settings" of your Cloudinary console and assign the resulting preset name to that field. Note, you may want to tweak and modify the upload preset's parameters.
Additionally, in your Cloudinary console in the "Security Settings" section you should uncheck the "Resource list" item.

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

* Test in localhost:

To run it, cd into `ionic-employees-stitch-mongodb` and run:

```bash
npm install
ionic serve
```

## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic](https://ionicframework.com/getting-started#cli)


