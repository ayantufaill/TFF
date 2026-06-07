const admin = require('firebase-admin');

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error('Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:', err);
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
