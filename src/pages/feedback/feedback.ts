import { Component } from '@angular/core';
import {
  ActionSheetController,
  Events, Loading,
  LoadingController,
  NavController,
  NavParams,
  Platform,
  ToastController
} from 'ionic-angular';
import {Transfer, TransferObject} from "@ionic-native/transfer";
import {Storage} from "@ionic/storage";
import {Camera} from "@ionic-native/camera";
import {File} from "@ionic-native/file";
import {FilePath} from "@ionic-native/file-path";
import {finalize} from "rxjs/operators";
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import {BehaviorSubject, Observable} from "rxjs";
import {Facebook} from "@ionic-native/facebook";
import {AdsProvider} from "../../providers/ads/ads";
declare var cordova: any;
declare var window: any;

export interface FeedbackData {
  username: string;
  userId: string;
  email: string;
  detail: string;
  imageurl: string;
}
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html',
})
export class FeedbackPage {
  lastImage: string = null;
  loading: Loading;

  descriptionData='';

  _obj = { 'username': '', 'userId': '', 'email': '', 'detail': '', 'imageurl': '' };

  private feedbackCollection: AngularFirestoreCollection<any>;
  feedbackData: Observable<FeedbackData[]>;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  filedata:any;
  public myPhotosRef: any;
  public myPhoto: any='';
  public myPhotoURL: any;
  fbData:any={};
  private basePath: string = '/feedback_image/';
  percentSubject: BehaviorSubject<number> = new BehaviorSubject(0);


  loadingdata:any;

  flagsend:boolean=false;

  constructor(private adPov:AdsProvider,private locstorage:Storage,public facebook: Facebook,private  afs:AngularFirestore,private  storage:AngularFireStorage,private events:Events,public navCtrl: NavController, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
    this.platform.ready().then(() => {
      this.adPov.autoshowInterstitialAD();
      this.adPov.autoShowBannerAD();
    });

    this.platform.resume.subscribe(() => {
     // this.adPov.autoshowInterstitialAD();
      this.adPov.autoShowBannerAD();
    });

    this.feedbackCollection = this.afs.collection<FeedbackData>('feedback_data');
    this.feedbackData = this.feedbackCollection.valueChanges();


    this.locstorage.get('fbdatas1').then((val) => {
      if(val!='' &&  val!=null && val!=undefined){
        this.fbData=val;
        this._obj.username=this.fbData.displayName;
        this._obj.userId=this.fbData.uid;

        this._obj.email=this.fbData.email;
        this._obj.detail='';
        this._obj.imageurl='';

      }else{
        this.fbData='';
      }
    });

    this.loadingdata= this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Sending.......'
    });
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad FeedbackPage');
  }
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }


  takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };


    this.camera.getPicture(options).then((imagePath) => {
      this.myPhotosRef=imagePath;
      return this.makeFileIntoBlob(imagePath);//convert picture to blob
    }).then((imageBlob) => {
      this.myPhoto=imageBlob;
    });



  }


  makeFileIntoBlob(_imagePath) {
    return new Promise((resolve, reject) => {
      window.resolveLocalFileSystemURL(_imagePath, (fileEntry) => {

        fileEntry.file((resFile) => {

          var reader = new FileReader();
          reader.onloadend = (evt: any) => {
            var imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = 'sample.jpg';
            resolve(imgBlob);
          };

          reader.onerror = (e) => {
           // console.log('Failed file read: ' + e.toString());
            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        });
      });
    });
  }

  //Upload picture to the firebase storage
  uploadToFirebase(imgBlob: any) {
    var randomNumber = Math.floor(Math.random() * 256);
    //console.log('Random number : ' + randomNumber);
    return new Promise((resolve, reject) => {
      let storageRef = firebase.storage().ref(this.basePath + randomNumber + '.jpg');//Firebase storage main path

      let metadata: firebase.storage.UploadMetadata = {
        contentType: 'image/jpeg',
      };

      let uploadTask = storageRef.put(imgBlob, metadata);
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => {
          this.percentSubject.next((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          reject(error);
          this.loadingdata.dismiss();
          this.flagsend=false;


        },
        async () => {
          const val = await uploadTask.snapshot.ref.getDownloadURL();
          this.myPhotosRef=val;
          this._obj.imageurl = val;
          this._obj.detail=this.descriptionData;
          //console.log('Saved picture url', val);
          //console.log('Success Photo!');
          this.addFeedback(this._obj);
          resolve(val);

        }
      );
    });

  }

  uploadFile(){

    if(this.myPhotosRef == '' || this.myPhotosRef == undefined || this.myPhotosRef == null || this.myPhotosRef.trim().length == 0 ) {
          //console.log('NO Photo!');
      this._obj.detail=this.descriptionData;
      this.addFeedback(this._obj);
    }else{
      //console.log('upload photo');

      return this.uploadToFirebase(this.myPhoto);


    }
  }




  goFeedback(){
    if(!this.flagsend){
      this.flagsend=true;
      this.loadingdata.present();
      if(this.descriptionData == '' || this.descriptionData == undefined || this.descriptionData == null || this.descriptionData.trim().length == 0 ){
        this.presentToastFB('Please fill description.');
        this.loadingdata.dismiss();
        this.flagsend=false;


      }else{
        if(this.fbData == '' || this.fbData == null || this.fbData ==undefined){
          this.facebookLogin();
        }else{
          this.uploadFile();

        }
      }
    }

  }
  addFeedback(feedback_data: FeedbackData) {

      this.feedbackCollection.add({
        feedback_data,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    this.loadingdata.dismiss();
    this.flagsend=false;
    this.presentToastFB('Thanks you for your feedback');
    this.navCtrl.pop();


  }
  facebookLogin(): Promise<any> {

    return this.facebook.login(['email'])
      .then( response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);


        firebase.auth().signInWithCredential(facebookCredential)
          .then( success => {
            //console.log("Firebase fb success: " + JSON.stringify(success));

            this.fbData=success;
            this.locstorage.set(`fbdatas1`,this.fbData);
            this.events.publish('fbdata1', this.fbData);
            this._obj.username=this.fbData.displayName;
            this._obj.userId=this.fbData.uid;

            this._obj.email=this.fbData.email;
            this._obj.detail=this.descriptionData;
            this.uploadFile();


          });

      }).catch((error) => { console.log(error) });
  }
  presentToastFB(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 9000,
      position: 'bottom',
      dismissOnPageChange: true,

    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

}
