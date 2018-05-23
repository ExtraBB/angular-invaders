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
  readonly BACKGROUND_COLOR: string = '#1A1A1A';
  readonly BACKGROUND_FLASH_COLOR: string = '#00FF41';

  // Screen
  windowPadding: number;
  playWidth: number;
  playHeight: number;
  livesWidth: number;
  backgroundColor = this.BACKGROUND_COLOR;
  flashingTicks = 0;

  // Game
  score: number;
  highscore = 0;
  playing = false;
  lives: number;
  timer: number;

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

  ngOnInit(): void {}

  startGame() {
    this.playing = true;
    this.score = 0;
    this.lives = 3;
    this.backgroundColor = this.BACKGROUND_COLOR;
    this.flashingTicks = 0;

    // Set play area
    this.updatePlayArea(window.innerWidth, window.innerHeight);

    // Create systems
    this.systems.set('BulletSystem', new BulletSystem());
    this.systems.set('PlayerSystem', new PlayerSystem());
    this.systems.set('EnemySystem', new EnemySystem());
    this.initializeSystems();

    // Start loop
    this.timer = setInterval(this.loop.bind(this), 1000 / 60);
  }

  initializeSystems() {
    this.spawnEnemies();
    this.systems.forEach(system => system.initialize(this.playWidth, this.playHeight));
    this.playerSystem.spawnBulletCallback = this.bulletSystem.spawnBullet.bind(this.bulletSystem);
    this.enemySystem.spawnBulletCallback = this.bulletSystem.spawnEnemyBullet.bind(this.bulletSystem);
  }

  spawnEnemies() {
    this.enemySystem.spawnEnemyRow(10, 'assets/invader1.svg');
    this.enemySystem.spawnEnemyRow(10, 'assets/invader1.svg');
    this.enemySystem.spawnEnemyRow(20, 'assets/invader2.svg');
    this.enemySystem.spawnEnemyRow(20, 'assets/invader2.svg');
    this.enemySystem.spawnEnemyRow(30, 'assets/invader3.svg');
  }

  loop(): void {
    this.systems.forEach(system => system.tick());
    this.checkForCollisions();
    this.checkForPlayerCollisions();
    if (this.enemySystem.enemies.every(enemy => !enemy.alive)) {
      this.endGame();
    } else if (this.enemySystem.enemies.reduce((a, b) => a.y < b.y ? a : b).y < 0) {
      this.endGame();
    } else if (this.lives < 1) {
      this.endGame();
    }

    this.handleScreenFlash();
  }

  endGame(): void {
    if (this.score > this.highscore) {
      this.highscore = this.score;
    }
    this.playing = false;
    clearInterval(this.timer);
  }

  loseLife(): void {
    this.enemySystem.resetEnemyPositions();
    this.lives--;
    this.backgroundColor = '#00FF41';
  }

  handleScreenFlash() {
    if (this.backgroundColor === this.BACKGROUND_FLASH_COLOR) {
      this.flashingTicks++;
    }
    if (this.flashingTicks > 3) {
      this.backgroundColor = this.BACKGROUND_COLOR;
      this.flashingTicks = 0;
    }
  }

  checkForCollisions() {
    this.bulletSystem.bullets.forEach(bullet => {
      // Early elimination
      if (!this.enemyBlockCollidesWithBullet(bullet)) {
        return;
      }

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

  enemyBlockCollidesWithBullet(bullet: Bullet) {
    const rect = this.enemySystem.blockSize;
    return (bullet.x >= rect.x && bullet.x <= rect.x + rect.width) &&
      (bullet.y >= rect.y && bullet.y <= rect.y + rect.height);
  }

  checkForPlayerCollisions() {
    const rect = this.playerSystem.getPlayerRect();
    this.bulletSystem.enemyBullets.forEach(bullet => {
      if (bullet.x >= rect.x &&
        bullet.x <= rect.x + rect.width &&
        bullet.y >= rect.y &&
        bullet.y <= rect.y + rect.height) {
          this.bulletSystem.despawnEnemyBullet(bullet);
          this.loseLife();
        }
    });
  }

  updatePlayArea(windowWidth: number, windowHeight: number) {
    this.windowPadding = windowWidth / 50;
    this.playWidth = windowWidth - 2 * this.windowPadding;
    this.playHeight = windowHeight - 2 * this.windowPadding;
    this.livesWidth = windowWidth * 0.4;
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
