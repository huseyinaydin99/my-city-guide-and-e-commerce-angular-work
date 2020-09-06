import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';

import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { CityComponent } from './city/city.component';

import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";

import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { CityAddComponent } from './city/city-add/city-add.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AlertifyService } from './services/alertify.service';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";
import { RegisterComponent } from './register/register.component';
import { NgxEditorModule } from 'ngx-editor';
import { menu, placeholder, schema } from 'ngx-editor';
import { PhotoComponent } from './photo/photo.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [			
    AppComponent,
      ValueComponent,
      NavComponent,
      CityComponent,
      CityDetailComponent,
      CityAddComponent,
      RegisterComponent,
      PhotoComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxEditorModule,
    FileUploadModule,
    RouterModule.forRoot(appRoutes),
    NgxEditorModule.forRoot({
      schema, // optional scheama, see https://sibiraj.dev/ngx-editor/additional-documentation/schema.html
      plugins: [
        menu({
          // default options (Optional)
          toolbar: [
            ['bold', 'italic', 'code'], // inline icons
            ['ordered_list', 'bullet_list']
          ],
          labels: {
            bold: 'Bold',
            italics: 'Italics',
            code: 'Code',
            ordered_list: 'Ordered List',
            bullet_list: 'Bullet List',
            heading: 'Heading'
          }
        }),
        placeholder('Açıklama giriniz...')
      ],
      nodeViews: {} // optional, see https://prosemirror.net/examples/footnote/
    })
  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
