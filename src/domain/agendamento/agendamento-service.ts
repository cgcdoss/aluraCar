import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Agendamento } from './agendamento';
import { AgendamentoDao } from './agendamento-dao';

@Injectable()
export class AgendamentoService {
    constructor(private _http: Http, private _dao: AgendamentoDao) {

    }

    agenda(agendamento: Agendamento) {

        let url: string = 'https://aluracar.herokuapp.com/salvarpedido?';
        let params: string = `carro=${agendamento.carro.nome}&preco=${agendamento.valor}&nome=${agendamento.nome}&endereco=${agendamento.endereco}&email=${agendamento.email}&dataAgendamento=${agendamento.data}`;
        let api: string = url + params;

        return this._dao.ehAgendamentoDuplicado(agendamento)
            .then(existe => {
                if (existe)
                    throw new Error('Agendamento já realizado');
                else {
                    return this._http
                        .get(api)
                        .toPromise()
                        .then(() => agendamento.confimardo = true, err => console.log(err))
                        .then(() => this._dao.salva(agendamento))
                        .then(() => agendamento.confimardo);
                }
            })
    }
}