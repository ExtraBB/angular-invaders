import ISystem from './ISystem';

interface Bullet {
    x: number;
    y: number;
}

export default class BulletSystem implements ISystem {
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
