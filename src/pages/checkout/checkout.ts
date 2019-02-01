import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ServerProvider } from '../../providers/server/server';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { PaynowPage } from '../paynow/paynow';


@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  
  private url: string = "http://products.technicalmicrosolutions.com/meat_now/api/";
  // private url: string = "http://localhost/meat/api/";
  user_id:any;
  items:any;
  total:any=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sd: ServerProvider, public tc: ToastController, 
    public iab: InAppBrowser) {
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
      this.getDetails();
    }else{
      this.navCtrl.push(LoginPage);
    }
    

  }

  getDetails(){
    this.sd.getCart(this.user_id).subscribe(d=>{
      console.log(d);
      this.items = d.items;
      this.total = d.total_cost;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutPage', 'user_id '+this.user_id);
  }

  removeItem(id){
    this.sd.removeCartItem(id).subscribe(d=>{
      let a = this.tc.create({
        message: d.status,
        duration: 1000
      })
      a.present();
      this.getDetails();
    })
  }

  checkoutToPortal(){
    // let a = this.iab.create(this.url+'paynow.php?id='+this.user_id, '_system',{location: 'no',zoom:'no'});
    // a.show();

    window.open(this.url+'paynow.php?id='+this.user_id, '_system');
    this.navCtrl.pop();
    // this.navCtrl.push(PaynowPage, {'amount': '200'})
  }

}
