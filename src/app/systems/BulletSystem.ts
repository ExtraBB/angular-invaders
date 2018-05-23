import ISystem from './ISystem';

interface Bullet {
    x: number;
    y: number;
}

export default class BulletSystem implements ISystem {

    // Screen
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    // Bullets
    bullets: Bullet[] = [];
    bulletWidth = 2;
    bulletSpeed = 20;

    tick(): void {
        this.bullets.forEach(bullet => {
            bullet.y += this.bulletSpeed;
            if (bullet.y > window.innerHeight) {
                this.despawnBullet(bullet);
            }
        });
    }

    initialize(width: number, height: number) {
        
    }

    adjustToNewScreenSize(width: number, height: number) {
        this.bulletWidth = Math.max(1, width / 300);
        this.bullets.forEach(bullet => {
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

    despawnBullet(bullet: Bullet): void {
        const index = this.bullets.indexOf(bullet);
        if (index !== -1) {
            this.bullets.splice(index, 1);
        }
    }

    setBulletWidth(width: number): void {
        this.bulletWidth = width;
    }
}
