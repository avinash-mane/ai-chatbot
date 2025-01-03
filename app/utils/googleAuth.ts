import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  '17564016300-bcnss413bhj2imovkckddd7e63ajlsqb.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/oauth2callback'
);

// This will generate the authentication URL
export const getAuthUrl = () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/drive.file'],
  });
  return authUrl;
};

// This function will be used to exchange the code for an access token
export const getTokens = async (code: string) => {
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  return tokens;
};

// Use this function to interact with Google Drive
export const getDriveService = () => {
  return google.drive({ version: 'v3', auth: oAuth2Client });
};
