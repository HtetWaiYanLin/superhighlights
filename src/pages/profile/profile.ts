import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular'
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

  constructor(public storage:Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.storage.get('fbdatas').then((val) => {
      // console.log('storage app fbdata is', JSON.stringify(val));
      if(val!='' &&  val!=null && val!=undefined){
        this.fbData=val;
        this.fbData.photoURL=this.fbData.photoURL+`?width=1024&height=1024`;

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
