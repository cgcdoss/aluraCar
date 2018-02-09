import { Http } from '@angular/http'
import { Injectable } from '@angular/core'
import { Agendamento } from './agendamento';

@Injectable()
export class AgendamentoService {
    constructor(private _http: Http) {

    }

    agenda(agendamento: Agendamento) {
        let url: string = 'https://aluracar.herokuapp.com/salvarpedido?';
        let params: string = `carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
        let api: string = url + params;
        return this._http
            .get(api)
            .toPromise();
    }
}