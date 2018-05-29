import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../environments/environment';

import { AppComponent } from '../components/app.component';
import { ScoreComponent } from '../components/score/score.component';
import { PlayerComponent } from '../components/player/player.component';
import { BulletComponent } from '../components/bullet/bullet.component';
import { EnemyComponent } from '../components/enemy/enemy.component';
import { LivesComponent } from '../components/lives/lives.component';
import { HighscoreInputComponent } from '../components/highscore-input/highscore-input.component';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from '../components/game/game.component';
import { MainMenuComponent } from '../components/main-menu/main-menu.component';
import { HighscoresComponent } from '../components/highscores/highscores.component';
import { ReversePipe } from '../pipes/reverse.pipe';

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
