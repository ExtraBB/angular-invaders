import { Component, OnInit, HostListener } from '@angular/core';
import ISystem from './systems/ISystem';
import BulletSystem from './systems/BulletSystem';
import PlayerSystem from './systems/PlayerSystem';
import EnemySystem from './systems/EnemySystem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Screen
  windowPadding = 10;
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  // Game
  score = 0;
  highscore = 0;

  // Systems
  systems: Map<string, ISystem> = new Map<string, ISystem>();
  get bulletSystem() {
    return (this.systems.get('BulletSystem') as BulletSystem);
  }
  get playerSystem() {
    return (this.systems.get('PlayerSystem') as PlayerSystem);
  }
  get enemySystem() {
    return (this.systems.get('EnemySystem') as EnemySystem);
  }

  ngOnInit(): void {
    // Create systems
    this.systems.set('BulletSystem', new BulletSystem());
    this.systems.set('PlayerSystem', new PlayerSystem());
    this.systems.set('EnemySystem', new EnemySystem());

    // Set system variables
    this.playerSystem.spawnBulletCallback = this.bulletSystem.spawnBullet.bind(this.bulletSystem);
    this.spawnEnemies();

    // Update layout to screen
    this.calculateDynamicSizes(window.innerWidth, window.innerHeight);

    // Start loop
    setInterval(this.loop.bind(this), 1000 / 60);
  }

  spawnEnemies() {
    this.enemySystem.spawnEnemyRow(30);
    this.enemySystem.spawnEnemyRow(20);
    this.enemySystem.spawnEnemyRow(20);
    this.enemySystem.spawnEnemyRow(10);
    this.enemySystem.spawnEnemyRow(10);
  }

  loop(): void {
    this.systems.forEach(system => system.tick());
  }

  calculateDynamicSizes(windowWidth: number, windowHeight: number): void {
    // Update Player
    this.playerSystem.setPlayerWidth(window.innerWidth / 20);
    this.playerSystem.setWindowPadding(this.windowPadding);
    this.playerSystem.setPlayerOffset((this.playerSystem.playerOffset / this.windowWidth) * windowWidth);

    // Update Enemies
    this.enemySystem.setEnemyWidth(this.playerSystem.playerWidth);
    this.enemySystem.setWindowPadding(this.windowPadding);
    this.enemySystem.setEnemyOffset((this.enemySystem.enemyOffsetX / this.windowWidth) * windowWidth);

    // Update Bullets
    this.bulletSystem.setBulletWidth(Math.max(1, this.playerSystem.playerWidth / 15));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.calculateDynamicSizes(event.target.innerWidth, event.target.innerHeight);
    this.windowWidth = event.target.innerWidth;
    this.windowHeight = event.target.innerHeight;
  }
}
