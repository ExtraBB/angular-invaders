import ISystem from './ISystem';

export interface Enemy {
    x: number;
    y: number;
    value: number;
    alive: boolean;
    imagePath: string;
}

export default class EnemySystem implements ISystem {

    readonly LEVEL_MODIFIER = 1.3;

    // Screen
    windowWidth: number;
    windowHeight: number;

    // Layout
    enemyOffsetX: number;
    enemyOffsetY: number;
    enemyWidth: number;
    enemyPadding: number;

    // Enemy Shape
    enemiesPerRow = 11;
    numRows = 0;
    get blockSize() {
        return {
            x: this.enemyOffsetX,
            y: this.enemyOffsetY,
            width: this.enemyWidth * this.enemiesPerRow + this.enemyPadding * (this.enemiesPerRow - 1),
            height: this.enemyWidth * this.numRows
        };
    }

    // Enemy Behaviour
    enemies: Enemy[] = [];
    horizontalSpeed: number;
    verticalSpeed: number;
    direction = 1;

    // Bullets
    spawnBulletCallback: (x: number, y: number) => void;
    ticksSinceBullet = 0;

    constructor(private level: number) { }

    tick(): void {
        // Change direction if needed
        if (this.enemyOffsetX + this.direction * this.horizontalSpeed < 0) {
            this.direction *= -1;
            this.enemyOffsetY -= this.verticalSpeed;
        }

        if (this.enemyOffsetX + this.blockSize.width + this.direction * this.horizontalSpeed > this.windowWidth) {
            this.direction *= -1;
            this.enemyOffsetY -= this.verticalSpeed;
        }

        this.enemyOffsetX += this.direction * this.horizontalSpeed;

        for (let row = 0; row < this.numRows; row++) {
            for (let col = 0; col < this.enemiesPerRow; col++) {
                this.enemies[row * this.enemiesPerRow + col].x = this.enemyOffsetX + col * (this.enemyWidth + this.enemyPadding);
                this.enemies[row * this.enemiesPerRow + col].y = this.enemyOffsetY + row * this.enemyWidth;
            }
        }

        this.ticksSinceBullet++;
        if (this.ticksSinceBullet >= 60 - Math.pow(2, this.level)) {
            this.spawnEnemyBullet();
            this.ticksSinceBullet = 0;
        }
    }

    adjustToNewScreenSize(width: number, height: number) {
        this.enemyWidth = width / 20;
        this.enemyPadding = this.enemyWidth * 0.2;
        this.enemyOffsetX = (this.enemyOffsetX / this.windowWidth) * width;
        this.enemyOffsetY = (this.enemyOffsetY / this.windowHeight) * height;
        this.horizontalSpeed = (width / 256) * Math.pow(this.LEVEL_MODIFIER, this.level);
        this.verticalSpeed = height / 32;
        this.windowWidth = width;
        this.windowHeight = height;
    }

    initialize(width: number, height: number) {
        this.windowWidth = width;
        this.windowHeight = height;
        this.enemyWidth = width / 20;
        this.enemyPadding = this.enemyWidth * 0.2;
        this.horizontalSpeed = (width / 256) * Math.pow(this.LEVEL_MODIFIER, this.level);
        this.verticalSpeed = height / 32;
        this.enemyOffsetX = 0;
        this.enemyOffsetY = height - this.blockSize.height;
    }

    resetEnemyPositions(): void {
        this.enemyOffsetX = 0;
        this.enemyOffsetY = this.windowHeight - this.blockSize.height;
    }

    spawnEnemyBullet() {
        const livingEnemies = this.enemies.filter(enemy => enemy.alive);
        const shootingEnemyIndex = Math.floor(Math.random() * livingEnemies.length);
        this.spawnBulletCallback(livingEnemies[shootingEnemyIndex].x, livingEnemies[shootingEnemyIndex].y);
    }

    spawnEnemyRow(value: number, imagePath: string) {
        for (let i = 0; i < this.enemiesPerRow; i++) {
            this.enemies.push({ x: 0, y: 0, value: value, alive: true, imagePath: imagePath });
        }
        this.numRows++;
    }

    despawnEnemy(enemy: Enemy): void {
        const index = this.enemies.indexOf(enemy);
        if (index !== -1) {
            this.enemies.splice(index, 1);
            return;
        }
    }

    getRectForEnemy(enemy: Enemy) {
        const index = this.enemies.indexOf(enemy);
        const row = Math.floor(index / this.enemiesPerRow);
        const col = index % this.enemiesPerRow;
        return {
            x: this.enemyOffsetX + col * (this.enemyWidth + this.enemyPadding),
            y: this.enemyOffsetY + row * this.enemyWidth,
            width: this.enemyWidth,
            height: this.enemyWidth * 0.6
        };
    }
}
