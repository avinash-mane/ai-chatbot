// components/GoogleDrivePicker.tsx
import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    gapi: any;
    google: any;
  }
}

const GoogleDrivePicker = () => {
  const [fileName, setFileName] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load the gapi script dynamically
  useEffect(() => {
    const loadGapiScript = () => {
      if (typeof window !== 'undefined' && !window.gapi) {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.async = true;
        script.onload = () => {
          window.gapi.load('client:auth2', initGapiClient);
        };
        document.body.appendChild(script);
      } else if (window.gapi) {
        // If gapi is already available (e.g., hot reload or previous load)
        window.gapi.load('client:auth2', initGapiClient);
      }
    };

    loadGapiScript();

    // Cleanup the script when the component is unmounted
    return () => {
      const script = document.querySelector('script[src="https://apis.google.com/js/api.js"]');
      if (script) {
        script.remove();
      }
    };
  }, []);

  // Initialize the GAPI client with your credentials
  const initGapiClient = () => {
    window.gapi.client.init({
      apiKey: 'AIzaSyDPhcUSFxw2F94T9VuCujH8m8j1ryGeoT0',
      clientId: '17564016300-bcnss413bhj2imovkckddd7e63ajlsqb.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/drive.file',
    }).then(() => {
      if (window.gapi.auth2.getAuthInstance().isSignedIn.get()) {
        setIsAuthenticated(true);
      }
    });
  };

  // Handle the Google Sign-in click
  const handleAuthClick = () => {
    if (window.gapi) {
      window.gapi.auth2.getAuthInstance().signIn().then(() => {
        setIsAuthenticated(true);
        loadPicker();
      });
    }
  };

  // Load the Google Picker to select files
  const loadPicker = () => {
    const picker = new window.google.picker.PickerBuilder()
      .addView(new window.google.picker.DocsView())
      .setOAuthToken(window.gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  };

  // Handle the file selection from the picker
  const pickerCallback = (data: any) => {
    if (data.action === window.google.picker.Action.PICKED) {
      const fileName = data.docs[0].name;
      console.log('Selected file:', fileName);
      setFileName(fileName);
    }
  };

  return (
    <div>
      {!isAuthenticated ? (
        <button onClick={handleAuthClick}>Connect to Google Drive</button>
      ) : (
        <p>Authenticated! You can now pick a file.</p>
      )}
      {/* Display the selected file name in the input box */}
      <input type="text" value={fileName} readOnly />
    </div>
  );
};

export default GoogleDrivePicker;
