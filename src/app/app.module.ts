import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScoreComponent } from './score/score.component';
import { PlayerComponent } from './player/player.component';
import { BulletComponent } from './bullet/bullet.component';
import { EnemyComponent } from './enemy/enemy.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreComponent,
    PlayerComponent,
    BulletComponent,
    EnemyComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
