import { Component } from '@angular/core';
import {App, NavController, NavParams, Platform} from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import {VideoPage} from "../video/video";
import * as firebase from "firebase";
import {AdsProvider} from "../../providers/ads/ads";


export interface VideoData {
  title: string;
  url: string;
  league: string;
  detail: string;

}


@Component({
  selector: 'page-leagues',
  templateUrl: 'leagues.html',
})
export class LeaguesPage {
  videosD: Observable<VideoData[]>;
  productsCollectionRef: AngularFirestoreCollection<VideoData>;

  flag1=false;
  flag2=false;
  flag3=false;
  flag4=false;
  flag5=false;
  flag6=false;

  showText='';
  postTime: any;
  totalday: any;
  pageStatus:number;
  rootNavCtrl: NavController;
//  textData=['Champions','Europa','Premier','La Liga','Ligue 1','Serie A'];

  /*
  ချန်ပီယံလိခ်
ယူရိုပါလိခ်
ပရီးမီးယားလိခ်
လာလီဂါ
လီဂူး
စီးရီးအေ
*/
  textData=['ချန်ပီယံလိခ်','ယူရိုပါလိခ်','ပရီးမီးယားလိခ်','လာလီဂါ','လီဂူး','စီးရီးအေ'];
  constructor(private platform:Platform,private adPov:AdsProvider,private app:App,public storage:Storage,public afs: AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {
    this.platform.ready().then(() => {
     // this.adPov.autoshowInterstitialAD();
     // this.adPov.autoShowBannerAD();
      this.adPov.hideBannerAD();

    });


    this.platform.resume.subscribe(() => {
      //this.adPov.autoshowInterstitialAD();
     // this.adPov.autoShowBannerAD();
      this.adPov.hideBannerAD();

    });
    this.pageStatus = this.navParams.get('pageStatus');
    this.rootNavCtrl = navParams.get('rootNavCtrl');

    this.storage.get('flag').then((val) => {
      //console.log('flag'+val);
      if(val!='' &&  val!=null && val!=undefined){
       if(val==1){
         this.flag1=true;
         this.showText=this.textData[0];
         this.getFilterValue('Champions League');

       }else if(val==2){
         this.flag2=true;
         this.showText=this.textData[1];
         this.getFilterValue('Europa League');

       }else if(val==3){
         this.flag3=true;
         this.showText=this.textData[2];
         this.getFilterValue('Premier League');

       }else if(val==4){
         this.flag4=true;
         this.showText=this.textData[3];
         this.getFilterValue('Laliga');

       }else if(val==5){
         this.flag5=true;
         this.showText=this.textData[4];
         this.getFilterValue('Ligue 1');

       }else if(val==6){
         this.flag6=true;
         this.showText=this.textData[5];
         this.getFilterValue('Seire A');

       }
      }else{
        this.flag1=true;
        this.showText=this.textData[0];
        this.storage.set(`flag`,1);
        this.getFilterValue('Champions League');

      }
    });
  }

  champions(){
    this.flag1=true;
    this.flag2=false;
    this.flag3=false;
    this.flag4=false;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[0];
    this.storage.set(`flag`,1);
    this.getFilterValue('Champions League');

  }
  europa(){
    this.flag1=false;
    this.flag2=true;
    this.flag3=false;
    this.flag4=false;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[1];
    this.storage.set(`flag`,2);
    this.getFilterValue('Europa League');

  }
  premier(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=true;
    this.flag4=false;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[2];
    this.storage.set(`flag`,3);
    this.getFilterValue('Premier League');


  }
  laLiga(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=true;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[3];
    this.storage.set(`flag`,4);
    this.getFilterValue('Laliga');



  }
  ligue(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=false;
    this.flag5=true;
    this.flag6=false;
    this.showText=this.textData[4];
    this.storage.set(`flag`,5);
    this.getFilterValue('Ligue 1');



  }
  serieA(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=false;
    this.flag5=false;
    this.flag6=true;
    this.showText=this.textData[5];
    this.storage.set(`flag`,6);
    this.getFilterValue('Seire A');



  }
  openPlaylist(ydata) {
  /*  this.navCtrl.push(VideoPage, {
      data:ydata,
    });
*/
    this.app.getRootNav().push(VideoPage, {
      data:ydata,
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
  getVideoDatabyFilter(league: string): Observable<any> {
    return new Observable((observer) => {
      firebase.firestore().collection('video_data').where('video_detail.league', '==', league).orderBy('created', 'desc')
        .get().then((querySnapshot) => {
        const videodata1 = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          videodata1.push({
            key:doc.id,
            send_viewcount:doc.data().view_count,
            videodata : data.video_detail,
            goaldata : data.goal_detail,
            viewcount :this.getViewCount(data.view_count),
            posttime : this.getLongTime(data.created.toDate())
          });
        });
        observer.next(videodata1);
      });
    });
  }
  getFilterValue(league: string) {
    //console.log('data st league='+league);
      this.getVideoDatabyFilter(league).subscribe(data => {
        //console.log('data league='+JSON.stringify(data));
        this.videosD = data;
      });

  }
  ionViewDidLoad() {
   // console.log('ionViewDidLoad LeaguesPage');
  }

}
