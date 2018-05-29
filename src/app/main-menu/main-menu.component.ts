import { Component, OnInit } from '@angular/core';
import { HighscoreService, Score } from '../services/highscore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  highscore$: Observable<Score>;

  constructor(private highscoreService: HighscoreService) {

  }

  ngOnInit(): void {
    this.highscore$ = this.highscoreService.getHighscore();
  }
}
