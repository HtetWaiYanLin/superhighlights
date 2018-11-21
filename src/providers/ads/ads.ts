import { Injectable } from '@angular/core';
import {AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig} from "@ionic-native/admob-free";
import {Global} from "../../pages/global/global";
import {App} from "ionic-angular";

/*
  Generated class for the AdsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AdsProvider {

  constructor(private global:Global,private app:App,private admob:AdMobFree) {
   // console.log('Hello AdsProvider Provider');

  }
  prepareInterstitialAD(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: this.global.istesting, // Remove in production
      autoShow: false,
      id: 'ca-app-pub-9860353158665861/5792083316'
    };
    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare()
      .then(() => {
        this.admob.interstitial.show()
      })
      .catch(e => console.log(e));
  }

  showInterstitialAD(){
   this.admob.interstitial.show()
  }

  prepareBannerAD() {

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: this.global.istesting, // Remove in production
      autoShow: false,
      id: 'ca-app-pub-9860353158665861/8033311260'
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
     this.admob.banner.show();

    }).catch(e => console.log(e));


  }

  showBannerAD(){
   this.admob.banner.show();
  }

  hideBannerAD(){
    this.admob.banner.remove();

  }

  autoShowBannerAD() {

    let bannerConfig: AdMobFreeBannerConfig = {
      isTesting: this.global.istesting, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-9860353158665861/8033311260'
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
      // success
      this.admob.banner.show();

    }).catch(e => console.log(e));


  }
  autoshowInterstitialAD(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: this.global.istesting, // Remove in production
      autoShow: true,
      id: 'ca-app-pub-9860353158665861/5792083316'
    };
    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare()
      .then(() => {
       this.admob.interstitial.show()
      })
      .catch(e => console.log(e));
  }

}
