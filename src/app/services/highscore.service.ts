import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

export class Score {
  score: number;
  player: string;
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  lastScore: number;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    this.afAuth.auth.signInAnonymously().catch(function (error) {
      console.log(error);
    });
  }

  uploadHighscore(score: number, player: string) {
    return this.db.list('scores').push({ score, player });
  }

  getHighscores(limit: number = 50): Observable<any[]> {
    return this.db.list('scores',
      ref => ref.orderByChild('score').limitToLast(limit)
    ).valueChanges().pipe(
      map(res => res as Score[]));
  }

  getHighscore(): Observable<Score> {
    return this.db.list('scores',
        ref => ref.orderByChild('score').limitToLast(1))
      .valueChanges().pipe(
        map(res => res[0] as Score)
      );
  }
}
