
export class Global {
  version:number;
  storelink:string;
  istesting:boolean;
  constructor() {
    this.istesting=false;   //T for Test, F  for Production
    this.version=5;
    this.storelink='https://play.google.com/store/apps/details?id=com.team24.superhighlights';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Global');
  }
}
