import ISystem from './ISystem';

export interface Bullet {
    x: number;
    y: number;
}

export default class BulletSystem implements ISystem {

    // Screen
    windowWidth: number;
    windowHeight: number;

    // Bullets
    bullets: Bullet[] = [];
    bulletWidth: number;
    bulletHeight: number;
    bulletSpeed: number;

    // Enemy Bullets
    enemyBullets: Bullet[] = [];
    enemyBulletWidth: number;
    enemyBulletHeight: number;
    enemyBulletSpeed: number;

    tick(): void {
        this.bullets.forEach(bullet => {
            bullet.y += this.bulletSpeed;
            if (bullet.y > this.windowHeight) {
                this.despawnBullet(bullet);
            }
        });

        this.enemyBullets.forEach(bullet => {
            bullet.y -= this.enemyBulletSpeed;
            if (bullet.y < 0) {
                this.despawnEnemyBullet(bullet);
            }
        });
    }

    initialize(width: number, height: number) {
        this.bulletWidth = Math.max(1, width / 300);
        this.bulletHeight = 4 * this.bulletWidth;
        this.bulletSpeed = height / 30;
        this.enemyBulletWidth = Math.max(1, width / 150);
        this.enemyBulletHeight = this.enemyBulletWidth;
        this.enemyBulletSpeed = height / 120;
        this.windowWidth = width;
        this.windowHeight = height;
    }

    adjustToNewScreenSize(width: number, height: number) {
        this.bulletWidth = Math.max(1, width / 300);
        this.bulletHeight = 4 * this.bulletWidth;
        this.bulletSpeed = height / 30;
        this.enemyBulletWidth = Math.max(1, width / 150);
        this.enemyBulletHeight = this.enemyBulletWidth;
        this.enemyBulletSpeed = height / 120;
        this.bullets.forEach(bullet => {
            bullet.x = (bullet.x / this.windowWidth) * width;
            bullet.y = (bullet.y / this.windowHeight) * height;
        });
        this.enemyBullets.forEach(bullet => {
            bullet.x = (bullet.x / this.windowWidth) * width;
            bullet.y = (bullet.y / this.windowHeight) * height;
        });
        this.windowWidth = width;
        this.windowHeight = height;
    }

    spawnBullet(x: number, y: number): void {
        this.bullets.push({
            x: x,
            y: y
        });
    }

    spawnEnemyBullet(x: number, y: number): void {
        this.enemyBullets.push({
            x: x,
            y: y
        });
    }

    despawnBullet(bullet: Bullet): void {
        const index = this.bullets.indexOf(bullet);
        if (index !== -1) {
            this.bullets.splice(index, 1);
        }
    }

    despawnEnemyBullet(bullet: Bullet): void {
        const index = this.enemyBullets.indexOf(bullet);
        if (index !== -1) {
            this.enemyBullets.splice(index, 1);
        }
    }
}
