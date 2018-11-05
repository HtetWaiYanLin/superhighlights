import { Component } from '@angular/core';
import { NavController,Events } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {HomePage} from "../home/home";

import { Facebook } from '@ionic-native/facebook'
import firebase from 'firebase';


@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {



  constructor(public facebook: Facebook,public afAuth: AngularFireAuth, public navCtrl: NavController,private events:Events) {

  }


  facebookLogin(): Promise<any> {

    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);


        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
          //  console.log("Firebase success: " + JSON.stringify(success));
            this.events.publish('fbdata',success);
            this.navCtrl.push(HomePage,{data:success})

          });

      }).catch((error) => { console.log(error) });
  }

signOut() {
    this.afAuth.auth.signOut();
  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }

}
