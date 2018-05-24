import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const highscores = [
      { id: 0, score: 100 , player: 'Bruno'},
    ];
    return { highscores };
  }
}
