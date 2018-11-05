import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
//import {SplashScreen} from "@ionic-native/splash-screen";
import {HomePage} from "../home/home";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController,public navCtrl:NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }
  ionViewDidEnter() {

    //this.splashScreen.hide();

    setTimeout(() => {
     // this.navCtrl.pop();
      this.navCtrl.setRoot(HomePage)
    }, 4000);

  }
}
