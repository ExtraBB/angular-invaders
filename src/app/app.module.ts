import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { PlayerComponent } from './player/player.component';
import { BulletComponent } from './bullet/bullet.component';
import { EnemyComponent } from './enemy/enemy.component';
import { LivesComponent } from './lives/lives.component';
import { HighscoreInputComponent } from './highscore-input/highscore-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    PlayerComponent,
    BulletComponent,
    EnemyComponent,
    LivesComponent,
    HighscoreInputComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
