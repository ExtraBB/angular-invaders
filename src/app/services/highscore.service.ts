import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, reduce, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export class Score {
  id: number;
  score: number;
  player: string;
}

@Injectable({
  providedIn: 'root'
})
export class HighscoreService {

  private highscoreUrl = 'api/highscores';

  constructor(private http: HttpClient) { }

  uploadHighscore(score: number): Observable<Score> {
    return this.http.post<Score>(this.highscoreUrl, { score, player: 'Test Player' }, httpOptions);
  }

  getHighscores(): Observable<Score[]> {
    return this.http.get<Score[]>(this.highscoreUrl);
  }

  getHighscore(): Observable<Score> {
    return this.http.get<Score[]>(this.highscoreUrl).pipe(
      map(res => res.reduce((a, b) => a.score > b.score ? a : b))
    );
  }
}
