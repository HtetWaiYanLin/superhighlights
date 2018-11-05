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
import {SigninPage} from "../pages/signin/signin";
import { Facebook } from '@ionic-native/facebook'
import { IonicStorageModule } from '@ionic/storage';
import {AllVideosPage} from "../pages/all-videos/all-videos";
import {LeaguesPage} from "../pages/leagues/leagues";
import {ChampionsLeaguePage} from "../pages/champions-league/champions-league";
import {EuropaLeaguePage} from "../pages/europa-league/europa-league";
import {PremierLeaguePage} from "../pages/premier-league/premier-league";
import {LaligaPage} from "../pages/laliga/laliga";
import {LiguePage} from "../pages/ligue/ligue";
import {SerieAPage} from "../pages/serie-a/serie-a";
import {ProfilePage} from "../pages/profile/profile";
import {FeedbackPage} from "../pages/feedback/feedback";
import {AboutAppPage} from "../pages/about-app/about-app";
import {SplashPage} from "../pages/splash/splash";
export const credentials = {
  firebase: {
    apiKey: 'AIzaSyB8gMwoN9FbRFMYnYkNor2tNqZZ3tHz6bQ',
    authDomain: 'super-highlights.firebaseapp.com',
    databaseURL: 'https://super-highlights.firebaseio.com',
    projectId: 'super-highlights',
    storageBucket: 'super-highlights.appspot.com',
    messagingSenderId: '56099216619'
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    VideoPage,
    SigninPage,
    AllVideosPage,
    LeaguesPage,
    ChampionsLeaguePage,
    EuropaLeaguePage,
    PremierLeaguePage,
    LaligaPage,
    LiguePage,
    SerieAPage,
    ProfilePage,
    FeedbackPage,
    AboutAppPage,
    SplashPage

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
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    VideoPage,
    SigninPage,
    AllVideosPage,
    LeaguesPage,
    ChampionsLeaguePage,
    EuropaLeaguePage,
    PremierLeaguePage,
    LaligaPage,
    LiguePage,
    SerieAPage,
    ProfilePage,
    FeedbackPage,
    AboutAppPage,
    SplashPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook,

  ]
})
export class AppModule {}
