import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Storage } from '@ionic/storage';
import {VideoPage} from "../video/video";


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
  textData=['Champions','Europa','Premier','La Liga','Ligue 1','Serie A'];
  constructor(public storage:Storage,public afs: AngularFirestore,public navCtrl: NavController, public navParams: NavParams) {
    this.productsCollectionRef = this.afs.collection('video_data');
    this.videosD = this.productsCollectionRef.valueChanges();


    this.storage.get('flag').then((val) => {
      console.log('flag'+val);
      if(val!='' &&  val!=null && val!=undefined){
       if(val==1){
         this.flag1=true;
         this.showText=this.textData[0];
       }else if(val==2){
         this.flag2=true;
         this.showText=this.textData[1];
       }else if(val==3){
         this.flag3=true;
         this.showText=this.textData[2];
       }else if(val==4){
         this.flag4=true;
         this.showText=this.textData[3];
       }else if(val==5){
         this.flag5=true;
         this.showText=this.textData[4];
       }else if(val==6){
         this.flag6=true;
         this.showText=this.textData[5];
       }
      }else{
        this.flag1=true;
        this.showText=this.textData[0];
        this.storage.set(`flag`,1)
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
    this.storage.set(`flag`,1)
  }
  europa(){
    this.flag1=false;
    this.flag2=true;
    this.flag3=false;
    this.flag4=false;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[1];
    this.storage.set(`flag`,2)

  }
  premier(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=true;
    this.flag4=false;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[2];
    this.storage.set(`flag`,3)

  }
  laLiga(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=true;
    this.flag5=false;
    this.flag6=false;
    this.showText=this.textData[3];
    this.storage.set(`flag`,4)


  }
  ligue(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=false;
    this.flag5=true;
    this.flag6=false;
    this.showText=this.textData[4];
    this.storage.set(`flag`,5)


  }
  serieA(){
    this.flag1=false;
    this.flag2=false;
    this.flag3=false;
    this.flag4=false;
    this.flag5=false;
    this.flag6=true;
    this.showText=this.textData[5];
    this.storage.set(`flag`,6)


  }
  openPlaylist(ydata) {
    this.navCtrl.push(VideoPage, {
      data:ydata,
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaguesPage');
  }

}
