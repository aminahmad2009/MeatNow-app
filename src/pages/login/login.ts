import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ServerProvider } from '../../providers/server/server';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:any;
  password:any;

  loginForm: FormGroup;
  data:any = {'email': '', 'password': ''};
  constructor(public navCtrl: NavController, public navParams: NavParams, public sd:ServerProvider, public ts: ToastController) {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
   this.loginForm = new FormGroup({
     email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
     password: new FormControl('', [Validators.required])
   });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    console.log(this.email, this.password);
    if(localStorage.getItem('user_id') == null){
      this.sd.login(this.email, this.password).subscribe(d=>{
        if(d.error == null){
          localStorage.setItem('user_id', d.id);
          localStorage.setItem('name', d.name);
          let toast = this.ts.create({
            message: 'Wellcome '+d.name,
            duration: 3000
          });
          toast.present();
          this.navCtrl.pop();
        }else{
          let toast = this.ts.create({
            message: d.error,
            duration: 3000
          });
          toast.present();
        }
      })
    }
  }
}
