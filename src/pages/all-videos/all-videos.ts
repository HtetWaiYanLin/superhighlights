import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs";
import {VideoData} from "../home/home";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {VideoPage} from "../video/video";


export interface VideoData {
  title: string;
  url: string;
  league: string;
  detail: string;
  imageurl:string;
}


@Component({
  selector: 'page-all-videos',
  templateUrl: 'all-videos.html',
})
export class AllVideosPage {
 @ViewChild(Content) contentdata: Content;

  videosD: Observable<VideoData[]>;
  productsCollectionRef: AngularFirestoreCollection<VideoData>;

  currentPlayingVideo: HTMLVideoElement;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore) {
    this.productsCollectionRef = this.afs.collection('video_data');
    this.videosD = this.productsCollectionRef.valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllVideosPage');
  }

  openPlaylist(ydata) {
    this.navCtrl.push(VideoPage, {
      data:ydata,
    });

  }

  // onPlayingVideo(event,index) {
  //   console.log("index="+index)
  //   event.preventDefault();
  //   if (this.currentPlayingVideo === undefined) {
  //     console.log("L");
  //     this.currentPlayingVideo = event.target;
  //     this.currentPlayingVideo.play();
  //   } else {
  //     console.log("A");
  //     if (event.target !== this.currentPlayingVideo) {
  //       this.currentPlayingVideo.pause();
  //       this.currentPlayingVideo = event.target;
  //     }
  //   }
  // }
}
