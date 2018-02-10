import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EscolhaPage } from '../pages/escolha/escolha';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { AgendamentoService } from '../domain/agendamento/agendamento-service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AgendamentoDao } from '../domain/agendamento/agendamento-dao';

function provideStorage() {
  return new Storage({
    name: 'aluracar',
    driverOrder: ['indexeddb'],
    storeName: 'agendamentos'
  });
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EscolhaPage,
    CadastroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AgendamentoService,
    { provide: Storage, useFactory: provideStorage },
    AgendamentoDao
  ]
})
export class AppModule { }
