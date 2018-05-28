import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, reduce } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

export class Score {
  score: number;
  player: string;
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {
  constructor(private db: AngularFireDatabase) { }

  uploadHighscore(score: number, player: string) {
    return this.db.list('scores').push({ score, player });
  }

  getHighscores(): Observable<any[]> {
    return this.db.list('scores').valueChanges().pipe(
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
