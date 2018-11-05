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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = HomePage;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any,icon:string}>;

  fbData:any={};

  constructor(private splashScreen:SplashScreen,private modalCtrl: ModalController,private toastCtrl:ToastController, public facebook: Facebook,private afAuth: AngularFireAuth,private alertCtrl:AlertController,private storage:Storage,public platform: Platform, public statusBar: StatusBar,private  events:Events) {
    this.initializeApp();
    this.storage.get('fbdatas').then((val) => {
     // console.log('storage app fbdata is', JSON.stringify(val));
      if(val!='' &&  val!=null && val!=undefined){
        this.fbData=val;
        this.fbData.photoURL=this.fbData.photoURL+`?width=1024&height=1024`;
      }
      //https://graph.facebook.com/1450577385085712/picture?width=1024&height=1024

    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage ,icon:'md-home' },
      { title: 'Leagues', component: LeaguesPage ,icon:'md-trophy'},
      { title: 'All Videos', component: AllVideosPage,icon:'ios-videocam'},
      { title: 'Feedback', component: FeedbackPage ,icon:'ios-create' },
      { title: 'About App', component: AboutAppPage,icon:'ios-football' }



    ];


    // this.events.subscribe('fbdata', (fb) => {
    //   console.log('fbdata app');
    //   if(fb!='' &&  fb!=null && fb!=undefined){
    //     this.fbData=fb;
    //     this.storage.set(`fbdatas`,this.fbData);
    //
    //   }
    // });
  }
  editData(){
    this.nav.push(ProfilePage)
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.backgroundColorByHexString('#546E7A');
      this.statusBar.styleDefault();
      this.splashScreen.hide();

        // let splash = this.modalCtrl.create(SplashPage);
        // splash.present();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=='Home'){
      this.nav.setRoot(page.component);

    }else{
      this.nav.push(page.component);
    }
  }
  facebookLogin(): Promise<any> {

    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);


        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
            //  console.log("Firebase success: " + JSON.stringify(success));

            this.fbData=success;
            this.storage.set(`fbdatas`,this.fbData);
            //this.events.publish('fbdata',success);
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
