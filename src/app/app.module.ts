import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { PlayerComponent } from './player/player.component';
import { BulletComponent } from './bullet/bullet.component';
import { EnemyComponent } from './enemy/enemy.component';
import { LivesComponent } from './lives/lives.component';
import { HighscoreInputComponent } from './highscore-input/highscore-input.component';
import { AppRoutingModule } from './/app-routing.module';
import { GameComponent } from './game/game.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { ReversePipe } from './pipes/reverse.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    PlayerComponent,
    BulletComponent,
    EnemyComponent,
    LivesComponent,
    HighscoreInputComponent,
    GameComponent,
    MainMenuComponent,
    HighscoresComponent,
    ReversePipe
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
