import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-highscore-input',
  templateUrl: './highscore-input.component.html',
  styleUrls: ['./highscore-input.component.css']
})
export class HighscoreInputComponent implements OnInit {

  @Output() highscoreEntered = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }
}
