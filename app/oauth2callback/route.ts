import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.redirect('/'); // Redirect to homepage if no code is provided
  }

  // Ensure the environment variables are defined
  const clientId = '17564016300-bcnss413bhj2imovkckddd7e63ajlsqb.apps.googleusercontent.com';
  const clientSecret = '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';

  if (!clientId || !clientSecret) {
    return NextResponse.error(); // Return an error response if credentials are missing
  }

  try {
    // Exchange the authorization code for an access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: 'http://localhost:3000/oauth2callback',
        grant_type: 'authorization_code',
      }),
    });

    const data = await response.json();
    console.log('Access Tokens:', data);  // Store the tokens securely

    return NextResponse.redirect('http://localhost:3000/');  // Redirect after successful authentication
  } catch (error) {
    console.error('Error exchanging code for token:', error);
    return NextResponse.redirect('/'); // Redirect if there's an error
  }
};
