const admin = require('firebase-admin');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  let rawStr = process.env.FIREBASE_SERVICE_ACCOUNT.trim();
  
  // Strip outer quotes if they exist
  if ((rawStr.startsWith("'") && rawStr.endsWith("'")) || (rawStr.startsWith('"') && rawStr.endsWith('"'))) {
    rawStr = rawStr.slice(1, -1).trim();
  }

  try {
    serviceAccount = JSON.parse(rawStr);
  } catch (err) {
    console.warn('Standard JSON.parse failed for FIREBASE_SERVICE_ACCOUNT, trying JS evaluation fallback...');
    try {
      // Evaluate as JS Object literal (handles single quotes, unquoted keys, etc.)
      const parsed = new Function(`return (${rawStr})`)();
      if (parsed && typeof parsed === 'object') {
        serviceAccount = parsed;
      } else if (typeof parsed === 'string') {
        serviceAccount = JSON.parse(parsed);
      }
    } catch (fallbackErr) {
      console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', err);
    }
  }
}

if (!serviceAccount) {
  try {
    serviceAccount = require('./firebase-service-account.json');
  } catch (err) {
    console.warn('Could not find firebase-service-account.json locally. Ensure FIREBASE_SERVICE_ACCOUNT environment variable is set.');
  }
}

if (serviceAccount) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  console.error('Firebase Admin SDK failed to initialize: No service account credentials available.');
}

module.exports = admin;
