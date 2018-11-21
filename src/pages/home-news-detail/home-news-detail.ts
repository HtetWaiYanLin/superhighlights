import { Component } from '@angular/core';
import {App, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {AdsProvider} from "../../providers/ads/ads";
import {Global} from "../global/global";
import {AdMobFree} from "@ionic-native/admob-free";
import {NetworkDetectProvider} from "../../providers/network-detect/network-detect";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the HomeNewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-news-detail',
  templateUrl: 'home-news-detail.html',
})
export class HomeNewsDetailPage {


  newData:any;
  devicewidth:any;
    constructor(private adPov:AdsProvider,private global:Global,private app:App,private admob:AdMobFree,private toastCtrl:ToastController,private network:NetworkDetectProvider,private navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer,private platform: Platform) {
      this.platform.ready().then(() => {
          this.newData = this.navParams.get('data');
        this.devicewidth = platform.width();
        this.adPov.prepareInterstitialAD();
        this.adPov.autoShowBannerAD();

      });

      this.platform.resume.subscribe(() => {
        this.adPov.autoShowBannerAD();
      });

      setTimeout(()=>{
        this.adPov.showInterstitialAD();
      }, 9000); //10min


    }
  backPage() {
    this.navCtrl.pop();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeNewsDetailPage');
  }

}
