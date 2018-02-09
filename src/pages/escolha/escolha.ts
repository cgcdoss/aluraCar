import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Acessorio } from '../../domain/carro/acessorio';
import { Carro } from '../../domain/carro/carro';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { CadastroPage } from '../cadastro/cadastro';

@Component({
    templateUrl: 'escolha.html'
})
export class EscolhaPage {

    public carro: Carro;
    public acessorios: Acessorio[];
    public acessoriosSelecionados: Acessorio[] = [];
    private _precoTotal: number;

    constructor(public navParams: NavParams, public navCtrl: NavController) {
        this.carro = navParams.get('carroSelecionado');
        this._precoTotal = this.carro.preco;
        this.acessorios = [
            { nome: 'Freio ABS', preco: 800 },
            { nome: 'Ar-condicionado', preco: 1000 },
            { nome: 'MP3 Player', preco: 500 }
            //new Acessorio('MP3 Player', 500 )
        ];
    }

    get precoTotal() {
        return this._precoTotal;
    }

    atualizaTotal(ligado: boolean, acessorio: Acessorio) {
        /*ligado ? //if ternário
            this._precoTotal += acessorio.preco :
            this._precoTotal -= acessorio.preco;*/
        if (ligado) {
            this._precoTotal += acessorio.preco;
            this.adicionaNaLista(acessorio);
        } else {
            this._precoTotal -= acessorio.preco;
            this.removeDaLista(acessorio);
        }
    }

    adicionaNaLista(acessorio) {
        this.acessoriosSelecionados.push(acessorio);
    }

    removeDaLista(acessorio) {
        let index = this.acessoriosSelecionados.indexOf(acessorio);
        console.log(index);
        if (index !== 1) {
            this.acessoriosSelecionados.splice(index, 1);
            console.log('removido: ' + acessorio.nome);
        }
    }

    avanca() {
        this.navCtrl.push(CadastroPage, {
            carro: this.carro,
            precoTotal: this.precoTotal,
            acessorios: this.acessoriosSelecionados
        });
    }
}
