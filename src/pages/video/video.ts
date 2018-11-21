import {Component, ElementRef, ViewChild,} from '@angular/core';
import {App, Content, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from 'ionic-angular';
import * as firebase from "firebase";
import {NetworkDetectProvider} from "../../providers/network-detect/network-detect";

import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {Global} from "../global/global";
import {e} from "@angular/core/src/render3";
import {AdsProvider} from "../../providers/ads/ads";

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
  providers:[Global]

})
export class VideoPage {

  playvideo: any;
  devicewidth: any;
  view_count:number;
  @ViewChild(Content) contentdata: Content;
  currentPlayingVideo: HTMLVideoElement;
  @ViewChild('videoPlayer') videoplayer: any;
//@ViewChild('videoPlayer') videoplayer: ElementRef;

  isLoading:boolean;

  constructor(private adPov:AdsProvider,private global:Global,private app:App,private admob:AdMobFree,private toastCtrl:ToastController,private network:NetworkDetectProvider,private navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer,private platform: Platform) {
      this.isLoading=true;
    this.platform.ready().then(() => {
      if(network.checkNetwork()!=''){
        this.playvideo = this.navParams.get('data');
        this.playvideo.imageurl='assets/imgs/err-sh.png';
        this.presentToast(network.checkNetwork());

      }else{
        this.playvideo = this.navParams.get('data');
      }

      this.devicewidth = platform.width();
      this.adPov.prepareInterstitialAD();
      this.adPov.autoShowBannerAD();

    });

    this.platform.resume.subscribe(() => {
     // this.adPov.autoshowInterstitialAD();
      this.adPov.autoShowBannerAD();
    });
    this.isLoading=false;

    setTimeout(()=>{
      this.adPov.showInterstitialAD();
      }, 100000); //10min


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
     // console.log('Dismissed toast');
    });

    toast.present();
  }
  backPage() {
    //this.toggleVideo();
    //this.adPov.autoshowInterstitialAD();
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
  //  console.log('ionViewDidLoad VideoPage');

  }


  endVideo(eve){
   // console.log("end=="+JSON.stringify(eve));
   // this.toggleVideo();
   // this.adPov.autoshowInterstitialAD();


  }
  pauseEvent(ev){
    //  console.log("pause=="+JSON.stringify(ev));
    this.toggleVideo();
    this.adPov.autoshowInterstitialAD();
  }
  onPlayingVideo(event) {
  // console.log("play=="+JSON.stringify(event));
    event.preventDefault();
    if (this.currentPlayingVideo === undefined) {
     // console.log("play");
      this.updateViewwCount(this.playvideo.key);

    } else {
     // console.log("pause");
      if (event.target !== this.currentPlayingVideo) {
       // console.log("ha ha");

      }
    }
  }
  updateViewwCount(key: string) {
    if (this.network.checkNetwork() == '') {

      const db = firebase.firestore();
      const data = db.collection('video_data').doc(key);
      data.update({
        'view_count': Number(this.playvideo.send_viewcount + 1),
      }).then(function () {
      });
    }

  }




}
