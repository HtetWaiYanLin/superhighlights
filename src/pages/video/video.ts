import {Component, ViewChild,} from '@angular/core';
import {App, Content, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from 'ionic-angular';
import * as firebase from "firebase";
import {NetworkDetectProvider} from "../../providers/network-detect/network-detect";

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',

})
export class VideoPage {

  playvideo: any;
  devicewidth: any;
  view_count:number;
  @ViewChild(Content) contentdata: Content;
  currentPlayingVideo: HTMLVideoElement;
  @ViewChild('videoPlayer') videoplayer: any;

  constructor(private app:App,private admob:AdMobFree,private toastCtrl:ToastController,private network:NetworkDetectProvider,private navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer,private platform: Platform) {

    if(network.checkNetwork()!=''){
      this.playvideo = this.navParams.get('data');
      this.playvideo.imageurl='assets/imgs/err-sh.png';
      this.presentToast(network.checkNetwork());

    }else{
      this.playvideo = this.navParams.get('data');
    }
 //  console.log("JSON playvideo"+JSON.stringify(this.playvideo));

    this.platform.ready().then((readySource) => {
      this.devicewidth = platform.width();
     this.prepareADs();
    });

    this.platform.resume.subscribe(() => {
      this.prepareADs();
    });


  /*  this.platform.registerBackButtonAction(() => {
      console.log("backPressed 1");
      this.shwoADS();
      navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
    },5);*/


    setTimeout(()=>{

      this.showData();
    }, 10000); //10sec


  }


  toggleVideo() {
    this.videoplayer.nativeElement.pause();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  backPage() {

    this.navCtrl.pop();

  }
showData(){
    this.toggleVideo();
  this.admob.interstitial.show();

}


  prepareADs(){
    let interstitialConfig: AdMobFreeInterstitialConfig = {
      isTesting: false, // Remove in production
      autoShow: false,
      id: 'ca-app-pub-9860353158665861/5792083316'
    };
    this.admob.interstitial.config(interstitialConfig);

    this.admob.interstitial.prepare()
      .then(() => {
        //this.admob.interstitial.show()
      })
      .catch(e => console.log(e));
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');


  }


  // onPlayingVideo(ev: any) {
  //   console.log("ev vid=");
  //
  //}

  onPlayingVideo(event) {
   // console.log("index="+JSON.stringify(event))
    event.preventDefault();
    if (this.currentPlayingVideo === undefined) {
      console.log("play");
      this.updateViewwCount(this.playvideo.key);

    } else {
      console.log("pause");
      if (event.target !== this.currentPlayingVideo) {
        console.log("ha ha");

      }
    }
  }
  updateViewwCount(key: string) {
    if (this.network.checkNetwork() == '') {
     // console.log('key==' + key);
     // console.log('video viewcount==' + this.playvideo.send_viewcount);

      const db = firebase.firestore();
      const data = db.collection('video_data').doc(key);
      // To update age and favorite color:
      data.update({
        'view_count': Number(this.playvideo.send_viewcount + 1),
      }).then(function () {
       // console.log('Document successfully updated!');
      });
    }

  }
}
