import { Component } from '@angular/core';
import { NavController, NavParams,  LoadingController } from 'ionic-angular';
import { CheckoutPage } from '../checkout/checkout';
import { LoginPage } from '../login/login';
import { ServerProvider } from '../../providers/server/server';
import { ShopPage } from '../shop/shop';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  user_id:any;
  category:any= 'all';
  meatType:any= 'all';
  location: any;
  shops:any = [];
  cart_total:any=0;

  sub_cats:any;
  categories: any ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sd: ServerProvider, public ld: LoadingController) {
    let load = this.ld.create({content: 'Loading'});
    load.present();
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
    }
    this.location = this.navParams.get('location');
    if(localStorage.getItem('user_id') == 'undefined'){
      localStorage.clear();
    }else{
      this.user_id = localStorage.getItem('user_id');
      this.cartTotal();
    }
    this.sd.getMeatCategories().subscribe(d=>{
      if(d){
        console.log(d);
        this.categories = d;
        load.dismiss();
      }
    })
    this.getList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }

  checkout(){
    if(localStorage.getItem('user_id') !== null){
      this.navCtrl.push(CheckoutPage);
    }else{
      this.navCtrl.push(LoginPage);
    }
  }

  cartTotal(){
    this.sd.getCart(this.user_id).subscribe(d=>{
      console.log(d.total);
      this.cart_total = d.total;
    })
  }

  getList(){
    this.cartTotal();
    this.sd.getSubCategories(this.category).subscribe(d=>{
      console.log(d);
      this.sub_cats = d;
    });
    console.log(this.category, this.location);
    if(this.category == 'all'){
      this.meatType = 'all';
    }
    this.sd.getShops(this.location,this.category,this.meatType).subscribe(d=>{
      if(d){
        console.log(d);
        this.shops = d;
      }
    })
  }

  shop(id){
    this.cartTotal();
    console.log(id);
    this.navCtrl.push(ShopPage, {'shop_id': id})
  }

  add_user(){
    console.log(this.category);
    localStorage.setItem('user_id', this.category.val);
  }

  clear(){
    console.log(this.category);
    console.log(this.user_id);
    localStorage.removeItem('user_id');
    console.log(this.location);
  }

}
