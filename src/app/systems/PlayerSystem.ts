import ISystem from './ISystem';
import { HostListener } from '@angular/core';

export default class PlayerSystem implements ISystem {

    // Screen
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

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
    spawnBulletCallback: (x: number, y: number) => void;

    constructor() {
        document.addEventListener('keydown', this.onKeydownHandler.bind(this));
        document.addEventListener('keyup', this.onKeyupHandler.bind(this));
    }

    tick(): void {
        if (this.movingLeft) {
            this.playerOffset = Math.max(0, this.playerOffset - this.playerSpeed);
        }
        if (this.movingRight) {
            this.playerOffset = Math.min(this.windowWidth - this.playerWidth, this.playerOffset + this.playerSpeed);
        }
        if (this.shooting) {
            if (this.ticksShooting % 10 === 0) {
                this.spawnBulletCallback(
                    this.playerOffset + this.playerWidth / 2,
                    0
                );
            }
            this.ticksShooting++;
        }
    }
    initialize(width: number, height: number) {
        
    }

    adjustToNewScreenSize(width: number, height: number) {
        this.playerOffset = (this.playerOffset / this.windowWidth) * width;
        this.playerWidth = width / 20;
        this.windowWidth = width;
        this.windowHeight = height;
    }

    setPlayerWidth(width: number) {
        this.playerWidth = width;
    }

    setPlayerOffset(offset: number) {
        this.playerOffset = offset;
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
