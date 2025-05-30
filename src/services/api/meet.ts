import { google } from 'googleapis/build/src/index.js';
import { OAuth2Client } from 'google-auth-library';

export class GoogleMeetService {
  private auth: OAuth2Client;

  constructor(clientId: string, clientSecret: string) {
    this.auth = new OAuth2Client(
      clientId,
      clientSecret,
      'http://localhost:5173/auth/callback'
    );
  }

  async getMessageCount(meetingId: string): Promise<number> {
    try {
      const chat = google.chat({ version: 'v1', auth: this.auth });
      const response = await chat.spaces.messages.list({
        parent: `spaces/${meetingId}`,
      });
      return response.data.messages?.length || 0;
    } catch (error) {
      console.error('Error fetching Google Meet messages:', error);
      return 0;
    }
  }

  async connect(): Promise<boolean> {
    try {
      const url = this.auth.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/chat.messages.readonly'],
      });
      window.location.href = url;
      return true;
    } catch (error) {
      console.error('Error connecting to Google Meet:', error);
      return false;
    }
  }
}