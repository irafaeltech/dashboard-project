import { Client } from "@microsoft/microsoft-graph-client";

export class TeamsService {
  private client: Client;

  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => {
        done(null, accessToken);
      },
    });
  }

  async getMessageCount(teamId: string): Promise<number> {
    try {
      const messages = await this.client
        .api(`/teams/${teamId}/channels/messages`)
        .get();
      return messages.value.length;
    } catch (error) {
      console.error('Error fetching Teams messages:', error);
      return 0;
    }
  }

  async connect(clientId: string, clientSecret: string): Promise<boolean> {
    try {
      // Implement Teams OAuth flow here
      return true;
    } catch (error) {
      console.error('Error connecting to Teams:', error);
      return false;
    }
  }
}