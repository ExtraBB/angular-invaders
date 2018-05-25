import ISystem from './ISystem';
import { HostListener } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';

export default class PlayerSystem implements ISystem {

    // Screen
    windowWidth: number;
    windowHeight: number;

    // Input
    keysPressed: {[key: string]: boolean} = {};
    ticksShooting = 0;
    keydownSubscription: Subscription;
    keyupSubscription: Subscription;

    // Player
    playerWidth: number;
    playerOffset: number;
    playerSpeed: number;

    // Game
    spawnBulletCallback: (x: number, y: number) => void;

    constructor() {
        this.setupInputSubscriptions();
    }

    setupInputSubscriptions(): void {
        this.keydownSubscription = fromEvent(document, 'keydown')
            .pipe(
                map(evt => (evt as KeyboardEvent).key),
                filter(key => ['ArrowLeft', 'ArrowRight', ' '].includes(key))
            )
            .subscribe(key => this.keysPressed[key] = true);
        this.keyupSubscription = fromEvent(document, 'keyup')
            .pipe(
                map(evt => (evt as KeyboardEvent).key),
                filter(key => ['ArrowLeft', 'ArrowRight', ' '].includes(key))
            )
            .subscribe(key => {
                this.keysPressed[key] = false;
                if (key === ' ') {
                    this.ticksShooting = 0;
                }
            });
    }

    unsubscribeAll() {
        this.keydownSubscription.unsubscribe();
        this.keyupSubscription.unsubscribe();
    }

    tick(): void {
        if (this.keysPressed['ArrowLeft']) {
            this.playerOffset = Math.max(0, this.playerOffset - this.playerSpeed);
        }
        if (this.keysPressed['ArrowRight']) {
            this.playerOffset = Math.min(this.windowWidth - this.playerWidth, this.playerOffset + this.playerSpeed);
        }
        if (this.keysPressed[' ']) {
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
}
