import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Acessorio } from '../../domain/carro/acessorio';

// @IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  private _precoTotal: number;
  public acessorios: Acessorio[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getParams();
   }

  ionViewDidLoad() { }

   get precoTotal(){
     return this._precoTotal;
   }

  getParams() {
    this.carro = this.navParams.get('carro');
    this._precoTotal = this.navParams.get('precoTotal');
    this.acessorios = this.navParams.get('acessorios');
  }

}
