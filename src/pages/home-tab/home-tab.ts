import {Component, ViewChild} from '@angular/core';
import {AlertController, Content, MenuController, NavController, NavParams, Platform, Tabs} from 'ionic-angular';
import {HomePage} from "../home/home";
import {LeaguesPage} from "../leagues/leagues";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
} from '@ionic-native/admob-free';
import {Global} from "../global/global";
import {Observable} from 'rxjs/Observable';
import * as firebase from "firebase";
import {HomeNewsPage} from "../home-news/home-news";
import {AdsProvider} from "../../providers/ads/ads";

/**
 * Generated class for the HomeTabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home-tab',
  templateUrl: 'home-tab.html',
  providers: [Global]

})
export class HomeTabPage {
  page1 = HomePage;
  page3 = LeaguesPage;
  page2 = HomeNewsPage;
  title = '';
  versionData: any;

  newsDataArray = [];
  newsdata = '';

  @ViewChild('myTabs') tabRef: Tabs;
  confirm: any;
  isShow=false;
  @ViewChild(Content) content: Content;

  constructor(private adPov:AdsProvider,private global: Global, private alertCtrl: AlertController, private platform: Platform, private admob: AdMobFree, private  menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.menuCtrl.swipeEnable(true);


    this.platform.ready().then(() => {

      this.getVersionData().subscribe(data=>{
        this.isforceupdate();

      });
     // this.adPov.autoshowInterstitialAD();
      this.adPov.hideBannerAD();

      this.geNewsData().subscribe(data => {
        if (this.newsDataArray.length > 0)  {
          if (this.newsDataArray[0].isActive === 'active') {
            this.isShow = true;
          }
        }
        this.newsDataArray.forEach(element => {
          this.newsdata += element.detail + '  ';
        });
        this.content.resize();
      });

    });


    this.platform.resume.subscribe(() => {
      this.getVersionData().subscribe(data=>{
        this.isforceupdate();

      });
     // this.adPov.autoshowInterstitialAD();
      this.adPov.hideBannerAD();
    });
  }


  isforceupdate(){
    if(this.versionData != undefined){
      if(this.versionData.isForce == 'true' || this.versionData.isForce == true)  {
        if(this.versionData.version > this.global.version) {
          this.alertfun();
        }
      }
    }

  }

  myMethod1() {
    this.title = 'Super Highlights';
  }

  myMethod2() {
    this.title = 'News';

  }
  myMethod3() {
    this.title = 'Leagues';

  }



  ionViewDidLoad() {

  }


  alertfun() {
      this.confirm = this.alertCtrl.create({
        enableBackdropDismiss: false,
        cssClass: 'uni',
        message: 'ပိုမိုကောင်းမွန်သော feature များအား အသုံးပြုနိုင်ရန် App အား အဆင့်မြှင့်တင်ရန် လိုအပ်ပါသည်',

        buttons: [{
          text: 'အဆင့်မြှင့်တင်မယ်',
          handler: () => {
            window.open(this.global.storelink, '_system');
          }

        }]
      });


    this.confirm.present();
    let doDismiss = () => {
      if(this.versionData.version <= this.global.version) {

        this.confirm.dismiss()
      }
    };
    let unregBackButton = this.platform.registerBackButtonAction(doDismiss, 1);
    this.confirm.onDidDismiss(unregBackButton);

  }

  getVersionData(): Observable<any> {
    const first = firebase.firestore().collection('version_data');
    return new Observable((observer) => {
      first.get().then((documentSnapshots) => {
        documentSnapshots.forEach((doc) => {
          const data = doc.data();
          this.versionData = {
            isForce: data.isForce,
            version: data.version,
          };
        });
        observer.next();
      });
    });
  }

  geNewsData(): Observable<any> {
    const first = firebase.firestore().collection('dynews_data')
      .orderBy('created', 'desc').limit(5);
    return new Observable((observer) => {
      first.get().then((documentSnapshots) => {
        documentSnapshots.forEach((doc) => {
          const data = doc.data().dynews_data;
          this.newsDataArray.push({
            key: doc.id,
            detail: data.detail,
            isActive: data.isActive
          });
        });
        observer.next();
      });
    });
  }

}
