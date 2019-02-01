import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Stripe } from '@ionic-native/stripe';

@Component({
  selector: 'page-paynow',
  templateUrl: 'paynow.html',
})
export class PaynowPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private stripe: Stripe) {
    this.stripe.setPublishableKey('pk_test_cYpH8RQ8COzuw3zebRq8Ct6d');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaynowPage');
  }

  pay(){
    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
     };
    this.stripe.createCardToken(card)
      .then(token => console.log(token.id))
      .catch(error => console.error(error));
  }
}
