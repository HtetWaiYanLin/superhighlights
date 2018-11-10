import { Component } from '@angular/core';
import {
  NavController,
  Events,
   NavParams
} from 'ionic-angular';


import {Storage} from '@ionic/storage'


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  fbData:any={};


   constructor(private events:Events,public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.events.subscribe('fbdata1', (fb) => {
      console.log('fbdata profile');
      if(fb!='' &&  fb!=null && fb!=undefined){
        this.storage.set('fbdatas1',fb);
       // fb.photoURL=fb.photoURL+`?width=1024&height=1024`;
        this.fbData=fb;
      }else{
        this.storage.get('fbdatas1').then((val) => {
          // console.log('storage app fbdata is', JSON.stringify(val));
          if(val!='' &&  val!=null && val!=undefined){
           // val.photoURL=val.photoURL+`?width=1024&height=1024`;
            this.fbData=val;

          }

        });
      }
    });
    this.storage.get('fbdatas1').then((val1) => {
      // console.log('storage app fbdata is', JSON.stringify(val));
      if(val1!='' &&  val1!=null && val1!=undefined){
        //val1.photoURL=val1.photoURL+`?width=1024&height=1024`;
        this.fbData=val1;
      }

    });

  }
  backPage(){
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
