import { Component } from '@angular/core';
import {  NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { LoginPage } from '../login/login';
import { ServerProvider } from '../../providers/server/server';


@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  user_id:any;
  shopID:any;
  quantity:any=[];
  q:any = {};
  category:any = 'all';
  subCategory:any = "all";
  cart_total:any =0;
  cats:any;
  subcats:any;
  products:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sd: ServerProvider, public tc: ToastController, 
    public ld: LoadingController) {
      let load = this.ld.create({content: 'Loading'});
      load.present();
    this.shopID = this.navParams.get('shop_id');
    // localStorage.clear();
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
      this.cartTotal();
      load.dismiss();
    }
    this.sd.getShop(this.shopID).subscribe(d=>{
      console.log(d);
      this.q = d.data;
    });

    this.sd.getMeatCategories().subscribe(d=>{
      console.log(d);
      this.cats = d;
    });
    this.getProducts();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage', this.q);
  }

  checkout(){
    if(localStorage.getItem('user_id') !== null){
      this.navCtrl.push(CheckoutPage);
    }else{
      this.navCtrl.push(LoginPage);
    }
  }

  getSub(){
    console.log(this.category);
    this.sd.getSubCategories(this.category).subscribe(d=>{
      console.log(d);
      this.subcats = d;
    });
    this.getProducts();
  }

  getProducts(){
    this.sd.getProducts(this.shopID, this.category, this.subCategory).subscribe(d=>{
      console.log(d);
      this.products = d;
    });
  }

  cartTotal(){
    this.sd.getCart(this.user_id).subscribe(d=>{
      console.log(d.total);
      this.cart_total = d.total;
    })
  }

  addtocart(id, index){
    if(localStorage.getItem('user_id') == null){
      console.log('please login');
      this.navCtrl.push(LoginPage);
    }else{
      console.log(id, index, this.quantity[index]);
      this.sd.addToCart(this.user_id, this.shopID, id,this.quantity[index]).subscribe(d=>{
        let t = this.tc.create({
          message : d.status,
          duration: 1000 
        });
        t.present();
        this.cartTotal();
      })
    }
  }


}
