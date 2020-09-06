import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../models/Photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})


export class PhotoComponent implements OnInit {

  constructor(private authService: AuthService,
    private alertifyService: AlertifyService,
    private activatedRoute: ActivatedRoute) { }

  /*photos: Photo[] = [];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = "http://localhost:44387/api";
  currentMain: Photo;
  currentCity: any;*/

  URL = "http://localhost:44387/api/";
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;

  currentCity: any;
  currentMain: Photo;
  photos: Photo[] = [];

  ngOnInit() {
    alert('#')
    alert(localStorage.getItem('token'));
    this.activatedRoute.params.subscribe(p => {
      this.currentCity = p['cityId'];
    });
    this.initializeUploader();
  }

  initializeUploader() {
    /*this.uploader = new FileUploader({
      url: URL + "cities/" + this.currentCity + "/photos",
      authToken: "Bearer " + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024
    });*/
    this.uploader = new FileUploader({
      url: this.URL + "cities/" + this.currentCity + "/photos",
      disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      isHTML5: true,
      authToken: "Bearer " + localStorage.getItem('token'),
      allowedFileType: ['image'],
      autoUpload: false,
      removeAfterUpload: true,
      maxFileSize: 10 * 1024 * 1024,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }
    });
    alert("ngOnInit");
 
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;
 
    this.uploader.response.subscribe( res =>{
      alert('1');
      this.response = res;
      alert('2' + this.response);
    });

    this.uploader.onSuccessItem = (item, response, status, header) => {
      alert('yükleme işlemi galiba oldu');
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain,
          cityId: res.cityId
        };
        this.photos.push(photo);
      }
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
 
  public fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }

}
