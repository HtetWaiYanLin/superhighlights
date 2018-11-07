import {Component} from '@angular/core';
import {NavController, NavParams, Events, MenuController} from 'ionic-angular';
import {VideoPage} from '../../pages/video/video';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';

import {Storage} from '@ionic/storage';
import {AllVideosPage} from "../all-videos/all-videos";
import * as firebase from "firebase";


export interface VideoData {
  title: string;
  url: string;
  iframeurl: string;
  league: string;
  detail: string;
  imageurl: string;
}

export interface GoalDetail {
  goal: string;
  minute: string;
  assist: string;
  result: string;
  team: string;
}

export interface VideoDetail {
  videodata: VideoData;
  goaldata: GoalDetail;
  posttime: string;
  viewcount: string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  videosD: Observable<VideoDetail[]>;
  // productsCollectionRef: AngularFirestoreCollection<VideoData>;
  fbData: any = {};
  isLoading = true;
  postTime: any;
  totalday: any;


  constructor(private  menuCtrl: MenuController, private storage: Storage, private events: Events, public afs: AngularFirestore, private navCtrl: NavController, private navParams: NavParams) {
    this.menuCtrl.swipeEnable(true);
    this.isLoading = true;

    // this.productsCollectionRef = this.afs.collection('video_data');

    // this.videosD = this.productsCollectionRef.valueChanges();
    this.getVideoData().subscribe(data => {
      this.videosD = data;
    });

    this.isLoading = false;
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

  viewAll() {
    this.navCtrl.push(AllVideosPage);
  }

  openPlaylist(ydata) {
    this.navCtrl.push(VideoPage, {
      data: ydata,
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Homepage');
  }

  getVideoData(): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection('video_data')
        .orderBy('created', 'desc').get().then((querySnapshot) => {
        const dataarray = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          dataarray.push({
            videodata : data.video_detail,
            goaldata : data.goal_detail,
            viewcount :this.getViewCount(data.view_count),
            posttime : this.getLongTime(data.created.toDate())
          });
        });
        observer.next(dataarray);
      });
    });
  }

  getLongTime(createdtime: any) {
    const diffsecond = new Date().getTime() - createdtime.getTime();
    const diffTime = ((diffsecond / 1000) / 3600);
    this.postTime = diffTime.toFixed();

    if (this.postTime == 0) {
      if ((diffTime * 100) > 10) {
        return (diffTime * 100).toFixed() + ' minutes ago';
      } else {
        return 'Just now';
      }

    } else if (this.postTime >= 24) {
      this.totalday = ((this.postTime) / 24).toFixed();
      if (this.totalday > 1) {
        return this.totalday + ' days ago';
      } else {
        return this.totalday + ' day ago';
      }
    } else {
      this.totalday = this.postTime;
      if (this.totalday > 1) {
        return this.totalday + ' hours ago';
      } else {
        return this.totalday + ' hour ago';
      }
    }
  }
  getViewCount(count: number) {
    if (count == 0 || isNaN(count)) {
      return 0;
    } else if (count < 1000) {
      return count + '';
    } else if (count > 1000 && count < 1000000) {
      if (count % 1000 === 0) {
        return (count / 1000 ).toFixed() + ' K';
      } else {
        return (count / 1000 ).toFixed(1) + ' K';
      }
    } else {
      if (count % 1000000 === 0) {
        return (count / 1000000 ).toFixed() + ' M';
      } else {
        return (count / 1000000 ).toFixed(1) + ' M';
      }
    }
  }

}
