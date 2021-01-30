import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AdminComponent } from './components/forms/admin/admin.component';
import { CoursierComponent } from './components/forms/coursier/coursier.component';
import { NetworkComponent } from './components/forms/network/network.component';
import { ScriptComponent } from './components/forms/script/script.component';
import { NetworkDetailsComponent } from './components/profil/network-details/network-details.component';
import { LivraisonComponent } from './components/profil/livraison/livraison.component';
import { SocketIoModule } from 'ngx-socket-io';


const components = [AdminComponent, CoursierComponent, NetworkComponent, ScriptComponent, NetworkDetailsComponent, LivraisonComponent];
@NgModule({
  declarations: [AppComponent, ...components],
  entryComponents: [...components],
  imports: [
    BrowserModule,
    IonicModule.forRoot({mode: 'ios'}),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'toto-express'),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(environment.SocketIoConfig),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
