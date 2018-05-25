import ISystem from './ISystem';
import { HostListener } from '@angular/core';

export default class PlayerSystem implements ISystem {

    // Screen
    windowWidth: number;
    windowHeight: number;

    // Input
    movingLeft = false;
    movingRight = false;
    shooting = false;
    ticksShooting = 0;

    // Player
    playerWidth: number;
    playerOffset: number;
    playerSpeed: number;

    // Game
    spawnBulletCallback: (x: number, y: number) => void;

    constructor() {
        document.addEventListener('keydown', this.onKeydownHandler.bind(this));
        document.addEventListener('keyup', this.onKeyupHandler.bind(this));
        window.addEventListener('deviceorientation', this.onOrientationChangeHandler, true);
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
        this.playerWidth = width / 20;
        this.playerOffset = width / 2 - this.playerWidth / 3;
        this.playerSpeed = width / 64;
        this.windowWidth = width;
        this.windowHeight = height;
    }

    adjustToNewScreenSize(width: number, height: number) {
        this.playerOffset = (this.playerOffset / this.windowWidth) * width;
        this.playerWidth = width / 20;
        this.playerSpeed = width / 64;
        this.windowWidth = width;
        this.windowHeight = height;
    }

    getPlayerRect() {
        return {
            x: this.playerOffset,
            y: 0,
            width: this.playerWidth,
            height: this.playerWidth * 0.5
        };
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

    onOrientationChangeHandler(event) {
        if (event.alpha > 10 && event.alpha < 90) {
           this.movingRight = true;
        }

        if (event.alpha > 270 && event.alpha < 350) {
            this.movingLeft = true;
        }

        if (event.alpha > 350 || event.alpha < 10) {
            this.movingLeft = false;
            this.movingRight = false;
        }
    }
}
