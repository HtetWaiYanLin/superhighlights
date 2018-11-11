
export class Global {
  version:number;
  storelink:string;
  constructor() {
    this.version=4;
    this.storelink='https://play.google.com/store/apps/details?id=com.team24.superhighlights';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Global');
  }
}
