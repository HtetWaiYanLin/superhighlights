import {Component, ViewChild,} from '@angular/core';
import {Content, NavController, NavParams, ToastController} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from 'ionic-angular';
import * as firebase from "firebase";
import {NetworkDetectProvider} from "../../providers/network-detect/network-detect";


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

  constructor(private toastCtrl:ToastController,private network:NetworkDetectProvider,private navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer, platform: Platform) {

    if(network.checkNetwork()!=''){
      this.playvideo = this.navParams.get('data');
      this.playvideo.imageurl='assets/imgs/err-sh.png';
      this.presentToast(network.checkNetwork());

    }else{
      this.playvideo = this.navParams.get('data');
    }
   console.log("JSON playvideo"+JSON.stringify(this.playvideo));

    platform.ready().then((readySource) => {
      this.devicewidth = platform.width();
    });


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

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');


  }


  // onPlayingVideo(ev: any) {
  //   console.log("ev vid=");
  //
  //}

  onPlayingVideo(event) {
    console.log("index="+JSON.stringify(event))
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
      console.log('key==' + key);
      console.log('video viewcount==' + this.playvideo.send_viewcount);

      const db = firebase.firestore();
      const data = db.collection('video_data').doc(key);
      // To update age and favorite color:
      data.update({
        'view_count': Number(this.playvideo.send_viewcount + 1),
      }).then(function () {
        console.log('Document successfully updated!');
      });
    }

  }
}
