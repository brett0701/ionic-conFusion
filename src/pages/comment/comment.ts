import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  comment: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,
              public viewCtrl: ViewController) {

    this.comment = this.formBuilder.group({
      rating: 5,
      author: ['', [Validators.required, Validators.minLength(2)] ],
      comment: ['', Validators.required ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  onSubmit() {
    this.comment.value.date = new Date().toISOString();
    console.log(this.comment.value);
    this.viewCtrl.dismiss(this.comment.value);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
