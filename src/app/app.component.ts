import { Component, OnInit, HostListener } from '@angular/core';
import ISystem from './systems/ISystem';
import BulletSystem, { Bullet } from './systems/BulletSystem';
import PlayerSystem from './systems/PlayerSystem';
import EnemySystem, { Enemy } from './systems/EnemySystem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Screen
  windowPadding: number;
  playWidth: number;
  playHeight: number;

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
    // Set play area
    this.updatePlayArea(window.innerWidth, window.innerHeight);

    // Create systems
    this.systems.set('BulletSystem', new BulletSystem());
    this.systems.set('PlayerSystem', new PlayerSystem());
    this.systems.set('EnemySystem', new EnemySystem());
    this.initializeSystems();

    // Start loop
    setInterval(this.loop.bind(this), 1000 / 60);
  }

  initializeSystems() {
    this.spawnEnemies();
    this.systems.forEach(system => system.initialize(this.playWidth, this.playHeight));
    this.playerSystem.spawnBulletCallback = this.bulletSystem.spawnBullet.bind(this.bulletSystem);
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
    this.checkForCollisions();
    if (this.enemySystem.enemies.every(enemy => !enemy.alive)) {
      this.endGame();
    } else if (this.enemySystem.enemies.reduce((a, b) => a.y < b.y ? a : b).y <  0) {
      this.endGame();
    }
  }

  endGame(): void {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }
  }

  checkForCollisions() {
    this.bulletSystem.bullets.forEach(bullet => {
      this.enemySystem.enemies.forEach(enemy => {
        if (enemy.alive && this.enemyCollidesWithBullet(enemy, bullet)) {
          this.bulletSystem.despawnBullet(bullet);
          enemy.alive = false;
          this.score += enemy.value;
        }
      });
    });
  }

  enemyCollidesWithBullet(enemy: Enemy, bullet: Bullet) {
    const rect = this.enemySystem.getRectForEnemy(enemy);
    return (bullet.x >= rect.x && bullet.x <= rect.x + rect.width) &&
      (bullet.y >= rect.y && bullet.y <= rect.y + rect.height);
  }

  updatePlayArea(windowWidth: number, windowHeight: number) {
    this.windowPadding = windowWidth / 50;
    this.playWidth = windowWidth - 2 * this.windowPadding;
    this.playHeight = windowHeight - 2 * this.windowPadding;
  }

  updateSystemLayouts(windowWidth: number, windowHeight: number): void {
    this.updatePlayArea(windowWidth, windowHeight);
    this.systems.forEach(system => system.adjustToNewScreenSize(this.playWidth, this.playHeight));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.updateSystemLayouts(event.target.innerWidth, event.target.innerHeight);
  }
}
