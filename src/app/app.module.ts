import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {  HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {VideoPage} from "../pages/video/video";
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook'
import { IonicStorageModule } from '@ionic/storage';
import {AllVideosPage} from "../pages/all-videos/all-videos";
import {LeaguesPage} from "../pages/leagues/leagues";

import {ProfilePage} from "../pages/profile/profile";
import {FeedbackPage} from "../pages/feedback/feedback";
import {AboutAppPage} from "../pages/about-app/about-app";
import { NetworkDetectProvider } from '../providers/network-detect/network-detect';
import {Network} from "@ionic-native/network";
import { SQLite } from '@ionic-native/sqlite';

import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AngularFireStorage } from '@angular/fire/storage';
import {HomeTabPage} from "../pages/home-tab/home-tab";
import { AdMobFree } from '@ionic-native/admob-free';
import { Global } from '../pages/global/global';
import {HomeNewsPage} from "../pages/home-news/home-news";
import { AdsProvider } from '../providers/ads/ads';
import {HomeNewsDetailPage} from "../pages/home-news-detail/home-news-detail";

export const credentials = {
  firebase: {
    apiKey: 'AIzaSyALV6TllWXnewNvejtqIRVRYOEodBbc7Sk',
    authDomain: 'super-highlight.firebaseapp.com',
    databaseURL: 'https://super-highlight.firebaseio.com',
    projectId: 'super-highlight',
    storageBucket: 'super-highlight.appspot.com',
    messagingSenderId: '168956493413'

  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VideoPage,
    AllVideosPage,
    LeaguesPage,
    ProfilePage,
    FeedbackPage,
    AboutAppPage,
    HomeTabPage,
    HomeNewsPage,
    HomeNewsDetailPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(credentials.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{tabsPlacement: 'bottom', tabsHideOnSubPages: true,

      platforms: {
        android: {
          tabsPlacement: 'bottom',
          tabsHideOnSubPages: true,
        },
        ios: {
          tabsPlacement: 'bottom'
        }
      }}),

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VideoPage,
    AllVideosPage,
    LeaguesPage,
    ProfilePage,
    FeedbackPage,
    AboutAppPage,
    HomeTabPage,
    HomeNewsPage,
    HomeNewsDetailPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,
    NetworkDetectProvider,
    Network,
    SQLite,
    File,
    Transfer,
    Camera,
    FilePath,
    AngularFireStorage,
    AdMobFree,
    Global,
    AdsProvider

  ]
})
export class AppModule {}
