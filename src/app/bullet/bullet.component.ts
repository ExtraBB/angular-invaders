import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.css']
})
export class BulletComponent implements OnInit {

  @Input() width;
  @Input() x;
  @Input() y;

  constructor() { }

  ngOnInit() {
  }

}
