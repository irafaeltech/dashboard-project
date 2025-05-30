export class TeamsService {
  async getMessageCount(): Promise<number> {
    return Math.floor(Math.random() * 50);
  }

  async connect(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => resolve(true), 1000);
    });
  }
}