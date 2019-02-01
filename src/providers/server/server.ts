import { Http,Response, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

/*
  Generated class for the ServerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServerProvider {
  private url: string = "http://products.technicalmicrosolutions.com/meat_now/api/";
  // private url: string = "http://localhost/meat/api/";
  constructor(public http: Http) {
    console.log('Hello ServerProvider Provider');
  }

  private extractData(res: Response){
    return res.json();
  }

  getMeatCategories(){
    var link = this.url+'getMeatCategories.php';
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  getShops(location, category, meatType){
    var link = this.url+'shops.php?location='+location+'&category='+category+'&meat_type='+meatType;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  getSubCategories(cat){
    var link = this.url+'getSubCategories.php?category='+cat;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  getShop(id){
    var link = this.url+'getShop.php?shop_id='+id;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }
  
  getProducts(id, cat, sub){
    if(cat == 'all'){
      sub ='all';
    }
    var link = this.url+'getProducts.php?shop_id='+id+'&category='+cat+'&sub_category='+sub;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  login(email,pass){
    var link = this.url+'login.php?email='+email+'&password='+pass;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  getCart(id){
    var link = this.url+'getCart.php?user_id='+id;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  addToCart(id, shop_id, item_id, quantity){
    var link = this.url+'addToCart.php?shop_id='+shop_id+'&item_id='+item_id+'&user_id='+id+"&quantity="+quantity;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  removeCartItem(id){
    var link = this.url+'removeCartItem.php?item_id='+id;
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }

  checkoutToPortal(user_id){
    var link = this.url+'confirm.php';
    var postData = {
      'user_id' : user_id
    }
    this.http.post(link,postData)
  }

  guestLogin(){
    var link = this.url+'guestLogin.php';
    console.log(link);
    return this.http.get(link)
    .map(this.extractData)
  }
}
