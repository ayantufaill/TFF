const admin = require('firebase-admin');

let serviceAccount;

function parseConfigValue(val) {
  if (!val) return null;
  if (typeof val === 'object') return val;

  const trimmed = val.trim();

  // Try parsing as JSON first
  try {
    const res = JSON.parse(trimmed);
    if (res && typeof res === 'object') return res;
    if (typeof res === 'string') return parseConfigValue(res);
  } catch (err) {
    // If JSON parsing fails, try evaluating as JS object/expression
    try {
      const res = new Function(`return (${trimmed})`)();
      if (res && typeof res === 'object') return res;
      if (typeof res === 'string') return parseConfigValue(res);
    } catch (evalErr) {
      // If evaluating fails, check if we can clean outer quotes
      if ((trimmed.startsWith("'") && trimmed.endsWith("'")) || (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
        return parseConfigValue(trimmed.slice(1, -1));
      }
      throw err; // throw the original JSON parse error
    }
  }
  return null;
}

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = parseConfigValue(process.env.FIREBASE_SERVICE_ACCOUNT);
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
