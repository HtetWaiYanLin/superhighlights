import {Component, ViewChild} from '@angular/core';
import {Content, NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs";
import {VideoData} from "../home/home";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import {VideoPage} from "../video/video";
import * as firebase from "firebase";


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

  postTime: any;
  totalday: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public afs: AngularFirestore) {
    // this.productsCollectionRef = this.afs.collection('video_data');
    // this.videosD = this.productsCollectionRef.valueChanges();

    this.getVideoData().subscribe(data => {
      this.videosD = data;
    });
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
