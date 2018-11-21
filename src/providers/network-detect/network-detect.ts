import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Platform} from "ionic-angular";
import {Network} from "@ionic-native/network";

/*
  Generated class for the NetworkDetectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkDetectProvider {

  public online:boolean = true;

  public netMsg:string = '';

  constructor(public platform:Platform, private network:Network) {
    console.log('Hello NetworkDetectProvider Provider');

  }

  checkNetwork(){
      let type = this.network.type;
      if(type == "unknown" || type == "none" || type == undefined){
        //console.log("The device is not online");
        this.netMsg='You are offline!';
        this.online = false;
      }else{
        //console.log("The device is online!");
        this.netMsg='';
        this.online = true;
      }

    this.network.onDisconnect().subscribe( () => {
      this.netMsg='Your network disconnect!';
      this.online = false;
      //console.log('network was disconnected :-(');
    });

    this.network.onConnect().subscribe( () => {
      this.online = true;
      this.netMsg='';
      //console.log('network was connected :-)');
    });

    return this.netMsg;
  }
}
