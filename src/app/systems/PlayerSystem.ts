import ISystem from './ISystem';
import { HostListener } from '@angular/core';

export default class PlayerSystem implements ISystem {

    // Input
    movingLeft = false;
    movingRight = false;
    shooting = false;
    ticksShooting = 0;

    // Player
    playerWidth = 20;
    playerOffset = window.innerWidth / 2;
    playerSpeed = 10;

    // Game
    windowPadding = 0;
    spawnBulletCallback: (x: number, y: number) => void;

    constructor() {
        document.addEventListener('keydown', this.onKeydownHandler.bind(this));
        document.addEventListener('keyup', this.onKeyupHandler.bind(this));
    }

    tick(): void {
        if (this.movingLeft) {
            this.playerOffset = Math.max(this.windowPadding, this.playerOffset - this.playerSpeed);
        }
        if (this.movingRight) {
            this.playerOffset = Math.min(window.innerWidth - this.windowPadding - this.playerWidth, this.playerOffset + this.playerSpeed);
        }
        if (this.shooting) {
            if (this.ticksShooting % 10 === 0) {
                this.spawnBulletCallback(
                    this.playerOffset + this.playerWidth / 2,
                    this.windowPadding * 3
                );
            }
            this.ticksShooting++;
        }
    }

    setPlayerWidth(width: number) {
        this.playerWidth = width;
    }

    setPlayerOffset(offset: number) {
        this.playerOffset = offset;
    }

    setWindowPadding(padding: number) {
        this.windowPadding = padding;
    }

    onKeydownHandler(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowLeft': {
                this.movingLeft = true;
                break;
            }
            case 'ArrowRight': {
                this.movingRight = true;
                break;
            }
            case ' ': {
                this.shooting = true;
                break;
            }
            default: {
                return;
            }
        }
    }

    onKeyupHandler(evt: KeyboardEvent) {
        switch (evt.key) {
            case 'ArrowLeft': {
                this.movingLeft = false;
                break;
            }
            case 'ArrowRight': {
                this.movingRight = false;
                break;
            }
            case ' ': {
                this.shooting = false;
                this.ticksShooting = 0;
                break;
            }
            default: {
                return;
            }
        }
    }
}
