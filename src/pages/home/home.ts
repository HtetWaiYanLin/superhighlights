import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Events, MenuController, ToastController, Nav, App} from 'ionic-angular';
import {VideoPage} from '../../pages/video/video';
import {Observable} from 'rxjs/Observable';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/firestore';

import {Storage} from '@ionic/storage';
import {AllVideosPage} from "../all-videos/all-videos";
import * as firebase from "firebase";
import {Network} from "@ionic-native/network";
import {NetworkDetectProvider} from "../../providers/network-detect/network-detect";


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

 // videosD: Observable<VideoDetail[]>;
  // productsCollectionRef: AngularFirestoreCollection<VideoData>;
  fbData: any = {};
  isLoading = true;
  postTime: any;
  totalday: any;



  videoData=[];
  lastVisible:any;
  listVideoData=[];

  infinite:any='';
  refresh:boolean=false;

  pageStatus:number;
  @ViewChild(Nav) nav: Nav;
  constructor(private app: App,private st:Storage,private toastCtrl:ToastController,private network:NetworkDetectProvider,private  menuCtrl: MenuController, private storage: Storage, private events: Events, public afs: AngularFirestore, private navCtrl: NavController, private navParams: NavParams) {
    //this.menuCtrl.swipeEnable(true);
    this.pageStatus = this.navParams.get('pageStatus');
    this.storage.get('vddata').then((val) => {
      if(val != '' && val != null &&  val != undefined){
        this.videoData=val;
        this.isLoading=false;
      }
    });
    this.storage.get('listdata').then((lis) => {
      if(lis != '' && lis != null &&  lis != undefined){
        this.listVideoData=lis;
        this.isLoading=false;
      }
    });



    if(this.network.checkNetwork()!=''){
      this.presentToast(this.network.checkNetwork());
      this.isLoading=false;
    }else{
      this.refresh=true;
      this.getVideoData().subscribe();
    }


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
  viewAll() {
    this.navCtrl.push(AllVideosPage);
  }

  openPlaylist(ydata) {
    this.app.getRootNav().push(VideoPage, {
      data:ydata,
    });


  /*  this.navCtrl.push(VideoPage, {
        data:ydata,
      });*/

    /*if(this.pageStatus == 1){
      this.navCtrl.push(VideoPage, {
        data:ydata,
      });
    }
    else{
      let localNavCtrl: boolean = false;
      if (localNavCtrl) {
        this.navCtrl.push(VideoPage, {
          data:ydata,
        });
      } else {
        this.rootNavCtrl.push(VideoPage, {
          data:ydata,
        });
      }
    }*/


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Homepage');
  }
/*

  getVideoData(): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection('video_data')
        .orderBy('created', 'desc').get().then((querySnapshot) => {
        const dataarray = [];
        querySnapshot.forEach((doc) => {
          this.view_count = doc.data().view_count;
          this.view_counttxt = this.getViewCount(this.view_count);
          const data = doc.data();
          dataarray.push({
            key:doc.id,
            send_viewcount:doc.data().view_count,
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
*/

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
    } else if (count <= 1000) {
      return count + '';
    } else if (count > 1000 && count < 1000000) {
      if ((count % 1000 === 0)  || (count % 1000 <= 99)) {
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

  getVideoData(): Observable<any> {
   // this.isLoading=true;
    const first = firebase.firestore().collection('video_data')
      .orderBy('created', 'desc').limit(5);
    return new Observable((observer) => {
      first.get().then((documentSnapshots) => {
        // Get the last visible document
        this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        this.getPager().subscribe();
        if(this.refresh==true){
          this.videoData=[];
        }
        documentSnapshots.forEach((doc) => {
          const data = doc.data();
          this.videoData.push({
            key:doc.id,
            send_viewcount:doc.data().view_count,
            videodata : data.video_detail,
            goaldata : data.goal_detail,
            viewcount :this.getViewCount(data.view_count),
            posttime : this.getLongTime(data.created.toDate())
          });
        });
        observer.next();
        this.isLoading=false;
        this.storage.set('vddata',this.videoData);


      });
    });

  }

  getPager(): Observable<any> {
    //this.isLoading=true;

    const first = firebase.firestore().collection('video_data')
      .orderBy('created', 'desc').startAfter(this.lastVisible).limit(20);
      return new Observable((observer) => {
        first.get().then((documentSnapshots) => {
          if (documentSnapshots.size > 0) {
            console.log('Hello');
           // this.infinite.complete();
            this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

            if(this.refresh==true){
              this.listVideoData=[];
            }
            documentSnapshots.forEach((doc) => {
              const data = doc.data();
              this.listVideoData.push({
                key:doc.id,
                send_viewcount:doc.data().view_count,
                videodata : data.video_detail,
                goaldata : data.goal_detail,
                viewcount :this.getViewCount(data.view_count),
                posttime : this.getLongTime(data.created.toDate())
              });

            });
            observer.next();

            this.isLoading=false;
            this.storage.set('listdata',this.listVideoData);
          } else {
            console.log('NO');
            this.isLoading=false;

          }


        });
      });


  }
  doInfinite(infiniteScroll) {
    this.refresh=false;
    console.log('Begin async operation');
    this.infinite=infiniteScroll;
    return new Promise((resolve) => {
      setTimeout(() => {
        if(!this.isLoading){
          this.getPager().subscribe();
          infiniteScroll.complete();

        }

        console.log('Async operation has ended');
      }, 900);
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation refresh', refresher);
    setTimeout(() => {
      console.log('Async operation has ended refresh');
      if(!this.isLoading){
        this.refresh=true;
       this.getVideoData().subscribe();
        refresher.complete();
      }
    }, 2000);
  }
}
