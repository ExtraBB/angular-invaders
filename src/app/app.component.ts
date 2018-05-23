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
  windowPadding = 100;

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
    this.initializeSystems();

    // Update layout to screen
    this.updateSystemLayouts(window.innerWidth, window.innerHeight);

    // Start loop
    setInterval(this.loop.bind(this), 1000 / 60);
  }

  initializeSystems() {
    this.systems.forEach(system => system.initialize(window.innerWidth, window.innerHeight));
    this.playerSystem.spawnBulletCallback = this.bulletSystem.spawnBullet.bind(this.bulletSystem);
    this.spawnEnemies();
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

  updateSystemLayouts(windowWidth: number, windowHeight: number): void {
    this.systems.forEach(system => {
      system.adjustToNewScreenSize(windowWidth - 2 * this.windowPadding, windowHeight - 2 * this.windowPadding);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.updateSystemLayouts(event.target.innerWidth, event.target.innerHeight);
  }
}
