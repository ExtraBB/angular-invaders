import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-enemy',
  templateUrl: './enemy.component.html',
  styleUrls: ['./enemy.component.css']
})
export class EnemyComponent implements OnInit {
  @Input() width;
  @Input() x;
  @Input() y;
  @Input() imagePath;

  constructor() { }

  ngOnInit() {
  }

}
