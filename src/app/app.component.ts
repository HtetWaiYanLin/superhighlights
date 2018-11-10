import { Component, ViewChild } from '@angular/core';
import {Nav, Platform, Events, AlertController, ToastController, ModalController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import {AllVideosPage} from "../pages/all-videos/all-videos";
import {LeaguesPage} from "../pages/leagues/leagues";
import firebase from "firebase";
import {Facebook} from "@ionic-native/facebook";
import {ProfilePage} from "../pages/profile/profile";
import {FeedbackPage} from "../pages/feedback/feedback";
import {AboutAppPage} from "../pages/about-app/about-app";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {HomeTabPage} from "../pages/home-tab/home-tab";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = HomeTabPage;
  pages: Array<{title: string, component: any,icon:string}>;

  fbData:any={};
  db:any;
  constructor(private sqlite:SQLite,private splashScreen:SplashScreen,private modalCtrl: ModalController,private toastCtrl:ToastController, public facebook: Facebook,private afAuth: AngularFireAuth,private alertCtrl:AlertController,private storage:Storage,public platform: Platform, public statusBar: StatusBar,private  events:Events) {
    this.initializeApp();
    this.storage.get('fbdatas1').then((val) => {
     // console.log('storage app fbdata is', JSON.stringify(val));
      if(val!='' &&  val!=null && val!=undefined){
       // val.photoURL=val.photoURL+`?width=1024&height=1024`;
        this.fbData=val;
      }
      //https://graph.facebook.com/1450577385085712/picture?width=1024&height=1024

    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomeTabPage ,icon:'md-home' },
      { title: 'Leagues', component: LeaguesPage ,icon:'md-trophy'},
      { title: 'All Videos', component: AllVideosPage,icon:'ios-videocam'},
      { title: 'Feedback', component: FeedbackPage ,icon:'ios-create' },
      { title: 'About App', component: AboutAppPage,icon:'ios-football' }


    ];


    this.events.subscribe('fbdata1', (fb) => {
      console.log('fbdata sub'+fb);
      if(fb!='' &&  fb!=null && fb!=undefined){
        this.storage.set(`fbdatas1`,fb);
        //fb.photoURL=fb.photoURL+`?width=1024&height=1024`;
        this.fbData=fb;
      }else{
        this.storage.get('fbdatas1').then((val) => {
          // console.log('storage app fbdata is', JSON.stringify(val));
          if(val!='' &&  val!=null && val!=undefined){
          //  val.photoURL=val.photoURL+`?width=1024&height=1024`;
            this.fbData=val;
          }
          //https://graph.facebook.com/1450577385085712/picture?width=1024&height=1024

        });
      }
    });
  }
  editData(){
    this.nav.push(ProfilePage)
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.statusBar.backgroundColorByHexString('#546E7A');
      this.statusBar.backgroundColorByName('#ffffff')
      this.statusBar.styleDefault();

      // this.sqlite.create({
      //   name:"hcmconnect.db",
      //   location:"default"
      // }).then((db) =>{
      //   this.db = db;
      //   this.getOfflineData();
      // });
    });



  }

  getOfflineData(){
    //all_videos
    this.db.executeSql("CREATE TABLE IF NOT EXISTS all_videos (id INTEGER PRIMARY KEY AUTOINCREMENT,data TEXT)", {}).then((data) => {
      console.log("all_videos TABLE CREATED");
    }, (error) => {
      console.error("Unable to create all_videos table", error);
    })
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=='Home'){
      this.nav.setRoot(page.component);

    }else{
      this.nav.push(page.component,{pageStatus:1});
    }
  }
  facebookLogin(): Promise<any> {

    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);


        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
             console.log("Firebase fb success: " + JSON.stringify(success));
            //this.fbData.photoURL1=success.photoURL+'?width=1024&height=1024';
            this.fbData=success;
            this.storage.set('fbdatas1',this.fbData);
            this.events.publish('fbdata1', this.fbData);
            this.presentToast();
            //this.navCtrl.push(HomePage,{data:success})

          });

      }).catch((error) => { console.log(error) });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Congratulation! Welcome Super Highlights.',
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
