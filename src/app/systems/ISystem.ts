export default interface ISystem {
    initialize(width: number, height: number): void;
    tick(): void;
    adjustToNewScreenSize(width: number, height: number): void;
}
