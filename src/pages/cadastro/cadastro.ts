import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../domain/carro/carro';
import { Acessorio } from '../../domain/carro/acessorio';
import { HomePage } from '../home/home';
import { Agendamento } from '../../domain/agendamento/agendamento'
import { AgendamentoService } from '../../domain/agendamento/agendamento-service'

// @IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  private _precoTotal: number;
  public acessorios: Acessorio[];
  public agendamento: Agendamento;
  public alerta: Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _service: AgendamentoService,
    public alertCtrl: AlertController) {
    this.getParams();

    this.agendamento = new Agendamento(this.carro, this.precoTotal)

    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [{
        text: 'Ok',
        handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
      }],
    });
  }

  ionViewDidLoad() { }

  get precoTotal() {
    return this._precoTotal;
  }

  getParams() {
    this.carro = this.navParams.get('carro');
    this._precoTotal = this.navParams.get('precoTotal');
    this.acessorios = this.navParams.get('acessorios');
  }

  agenda() {
    if (!this.checaObrigatorios()) {
      this.alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Você deve preencher todas as informações',
        buttons: ['Ok']
      }).present();
    } else {
      this._service
        .agenda(this.agendamento)
        .then(() => {
          this.alerta.setSubTitle('Agendamento realizado com sucesso').present();
        })
        .catch(err => {
          this.alerta.setSubTitle('Não foi possível realizar o agendamento').present();
        })
    }
  }

  checaObrigatorios(): boolean {
    if (!this.agendamento.nome || !this.agendamento.endereco || !this.agendamento.email) {
      return false;
    } else {
      return true;
    }
  }

}
