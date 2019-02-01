import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ListPage } from '../list/list';
import { ServerProvider } from '../../providers/server/server';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user_id:any;
  location:any ='';
  constructor(public navCtrl: NavController, public sd: ServerProvider, public toast: ToastController) {
    
    if(localStorage.getItem('user_id')){
      this.user_id = localStorage.getItem('user_id');
    }else{
      this.sd.guestLogin().subscribe(d=>{
        console.log(d);
        localStorage.setItem('user_id', d.user_id);
        console.log(localStorage.getItem('user_id'));
      })
    }
  }
  
  list(){
    console.log(this.location);
    if(this.location == ''){
      let a = this.toast.create({
        message: 'Kindly Enter your zip code.',
        duration: 3000
      })
      a.present();
    }else{
      this.navCtrl.push(ListPage, {"location" : this.location});
    }
  }
}
