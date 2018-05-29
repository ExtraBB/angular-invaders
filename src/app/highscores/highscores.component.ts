import { Component, OnInit } from '@angular/core';
import { HighscoreService, Score } from '../services/highscore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent implements OnInit {

  highscores$: Observable<Score[]>;

  constructor(private highscoreService: HighscoreService) { }

  ngOnInit() {
    this.highscores$ = this.highscoreService.getHighscores(10);
  }

}
