import { Component } from '@angular/core';
import {NavController, NavParams, Events, MenuController} from 'ionic-angular';
import { VideoPage} from '../../pages/video/video';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, } from '@angular/fire/firestore';

import { Storage } from '@ionic/storage';
import {AllVideosPage} from "../all-videos/all-videos";
import * as firebase from "firebase";


export interface VideoData {
  title: string;
  url: string;
  league: string;
  detail: string;
  imageurl:string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {
  videosD: Observable<VideoData[]>;
  productsCollectionRef: AngularFirestoreCollection<VideoData>;
  fbData:any={};
  isLoading=true;
  constructor(private  menuCtrl:MenuController,private storage:Storage,private events: Events,public afs: AngularFirestore,private navCtrl:NavController,private navParams:NavParams) {
   this.menuCtrl.swipeEnable(true);
    this.isLoading=true;
    this.productsCollectionRef = this.afs.collection('video_data');
    this.videosD = this.productsCollectionRef.valueChanges();

    this.isLoading=false;
    // this.afAuth.auth.signInAnonymously();

    // firebase.firestore().enablePersistence()
    //   .catch(function(err) {
    //     if (err.code == 'failed-precondition') {
    //       // Multiple tabs open, persistence can only be enabled
    //       // in one tab at a a time.
    //       console.log('failed-precondition');
    //     } else if (err.code == 'unimplemented') {
    //       // The current browser does not support all of the
    //       // features required to enable persistence
    //       console.log('unimplemented');
    //     }
    //   });
    //
    //
    // firebase.firestore().disableNetwork()
    //   .then(function() {
    //     // Do offline actions
    //     console.log('disableNetwork');
    //   });
    //
    // firebase.firestore().enableNetwork()
    //   .then(function() {
    //     // Do online actions
    //     console.log('enableNetwork');
    //
    //     this.productsCollectionRef = this.afs.collection('video-data');
    //     this.videosD = this.productsCollectionRef.valueChanges();
    //
    //   });


  }

  viewAll(){
    this.navCtrl.push(AllVideosPage);
  }
  openPlaylist(ydata) {
    this.navCtrl.push(VideoPage, {
      data:ydata,
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Homepage');
  }

}
