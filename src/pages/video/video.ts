import { Component,ViewChild, } from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import { DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'page-video',
  templateUrl: 'video.html',

})
export class VideoPage {
  playvideo={
    title: '',
  url: '',
  league: '',
  detail:'',
  imageurl:'',

  };

  @ViewChild(Content) contentdata: Content;

  constructor(private navCtrl:NavController,public navParams:NavParams,public sanitizer: DomSanitizer) {

    this.playvideo=this.navParams.get('data');


  }


  backPage(){
    this.navCtrl.pop();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');


  }


  onPlayingVideo(ev:any) {
    console.log("ev vid=");

  }

}
