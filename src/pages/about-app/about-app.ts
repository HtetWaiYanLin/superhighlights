import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import {AdsProvider} from "../../providers/ads/ads";

/**
 * Generated class for the AboutAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-app',
  templateUrl: 'about-app.html',
})
export class AboutAppPage {
  p1='ဤ App သည် ဘောလုံးပွဲများကို အချိန်ပေးပြီး မကြည့်နိုင်သူများနှင့် Goal Highlights များအား ကြည့်ရှု့   ခြင်းကို ဝါသနာပါသူများ အတွက် ရည်ရွယ်ပါသည်။';
  p2='App အသုံးပြုသူ Users များ အနေဖြင့် ထည့်သွင်းစေလိုသော အခြားကဏ္ဍများ နှင့် အဆင်မပြေသောအကြောင်းအရာများ ရှိပါက  အကြောင်းကြားစာ ပေးပို့သည့်နေရာတွင် ပေးပို့အကြံပြုနိုင်ပါသည်။';

  p3= 'Developed by Team 24 Innovative Solutions';
  constructor(private platform:Platform,private adPov:AdsProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.platform.ready().then(() => {
      this.adPov.autoshowInterstitialAD();
      this.adPov.autoShowBannerAD();
    });

    this.platform.resume.subscribe(() => {
   //   this.adPov.autoshowInterstitialAD();
      this.adPov.autoShowBannerAD();
    });
  }
  backPage(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
  //  console.log('ionViewDidLoad AboutAppPage');
  }

}
