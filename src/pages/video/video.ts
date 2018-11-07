import {Component, ViewChild,} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from 'ionic-angular';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html',

})
export class VideoPage {

  playvideo: any;
  devicewidth: any;
  @ViewChild(Content) contentdata: Content;
  currentPlayingVideo: HTMLVideoElement;

  constructor(private navCtrl: NavController, public navParams: NavParams, public sanitizer: DomSanitizer, platform: Platform) {

    this.playvideo = this.navParams.get('data');

    platform.ready().then((readySource) => {
      this.devicewidth = platform.width();
    });


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

    } else {
      console.log("pause");
      if (event.target !== this.currentPlayingVideo) {
        console.log("ha ha");

      }
    }
  }

}
