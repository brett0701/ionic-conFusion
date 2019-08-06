import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../../pages/comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {

  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              @Inject('BaseURL') private BaseURL,
              private favoriteservice: FavoriteProvider,
              public modalCtrl: ModalController,
              private socialSharing: SocialSharing) {
    this.dish = navParams.get('dish');
    this.favorite = favoriteservice.isFavorite(this.dish.id);
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteservice.isFavorite(this.dish.id)
    this.numcomments = this.dish.comments.length;

    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log('Adding to Favorites', this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
      message: 'Dish ' + this.dish.id + ' added successfully',
      position: 'middle',
      duration: 3000
    }).present();
  }

  clickActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
        title: 'Action Sheet',
        buttons: [{
          text: 'Add to Favorites',
          handler: () => {
            this.favorite = this.favoriteservice.addFavorite(this.dish.id);
            this.toastCtrl.create({
            message: 'Dish ' + this.dish.id + ' added successfully',
            position: 'middle',
            duration: 3000
            }).present();
          }
        },
        {
          text: 'Add a Comment',
          handler: () => {
            let modal = this.modalCtrl.create(CommentPage);
            modal.present();
            modal.onDidDismiss( (comment: Comment ) => {
              this.dish.comments.push(comment);
            });
          }
        },
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }]

    });

    actionSheet.present();
  }


}
