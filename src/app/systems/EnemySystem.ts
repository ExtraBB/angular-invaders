import ISystem from './ISystem';

interface Enemy {
    x: number;
    y: number;
    value: number;
}

export default class EnemySystem implements ISystem {

    // Layout
    windowPadding = 10;
    enemyOffsetX = 100;
    enemyOffsetY = 200;
    enemyWidth = 20;
    enemyPadding = this.enemyWidth * 0.2;
    enemiesPerRow = 11;
    numRows = 0;
    get blockSize() {
        return {
            width: this.enemyWidth * this.enemiesPerRow + this.enemyPadding * (this.enemiesPerRow - 1),
            height: this.enemyWidth * this.numRows
        };
    }

    // Enemy Behaviour
    enemies: Enemy[] = [];
    horizontalSpeed = 4;
    verticalSpeed = 10;
    direction = 1;

    tick(): void {
        // Change direction if needed
        if (this.enemyOffsetX + this.direction * this.horizontalSpeed < this.windowPadding) {
            this.direction *= -1;
            this.enemyOffsetY -= this.verticalSpeed;
        }

        if (this.enemyOffsetX + this.blockSize.width + this.direction * this.horizontalSpeed > window.innerWidth - this.windowPadding) {
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
    }

    setEnemyOffset(offset: number) {
        this.enemyOffsetX = offset;
        this.enemyOffsetY = (window.innerHeight - this.blockSize.height) * 0.75;
    }

    setWindowPadding(padding: number) {
        this.windowPadding = padding;
    }

    spawnEnemyRow(value: number) {
        for (let i = 0; i < this.enemiesPerRow; i++) {
            this.enemies.push({
                x: this.enemyOffsetX + i * (this.enemyWidth + this.enemyPadding),
                y: 200 + Math.floor((this.enemies.length / this.enemiesPerRow)) * this.enemyWidth,
                value: value
            });
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

    setEnemyWidth(width: number) {
        this.enemyWidth = width;
        this.enemyPadding = width * 0.2;
    }
}
