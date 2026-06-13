# Google OAuth Branding Checklist

Google security emails cannot be disabled. The goal is to make the app identity, consent screen, and redirect domain clearly show Two Fingers Foundation instead of the Firebase default domain.

## Firebase Authentication

In Firebase Console for project `two-finger-foundation`:

1. Go to Authentication > Sign-in method.
2. Confirm Google provider is enabled.
3. In Authentication > Settings > Authorized domains, add:
   - `localhost`
   - `twofingersfoundation.com`
   - `app.twofingersfoundation.com`
4. Connect the branded auth domain with Firebase Hosting or an auth helper proxy before using it as `VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN`.

The production frontend env should use:

```env
VITE_FIREBASE_AUTH_DOMAIN=two-finger-foundation.firebaseapp.com
VITE_FIREBASE_PRODUCTION_AUTH_DOMAIN=app.twofingersfoundation.com
```

Local development can keep the Firebase default auth domain.

## Google Cloud OAuth Consent Screen

In Google Cloud Console for the same Firebase project:

1. Go to APIs & Services > OAuth consent screen / Branding.
2. Set app name to `Two Fingers Foundation`.
3. Upload the official Two Fingers Foundation logo.
4. Set homepage URL to `https://twofingersfoundation.com`.
5. Set privacy policy URL to `https://twofingersfoundation.com/privacy-policy`.
6. Set terms URL to `https://twofingersfoundation.com/terms-and-conditions`.
7. Add authorized domain: `twofingersfoundation.com`.
8. Verify domain ownership in Google Search Console with an account that has access to this Google Cloud project.
9. Submit the branding changes for verification if Google requires it.

## OAuth Client

In APIs & Services > Credentials > Web client:

1. Add authorized JavaScript origins:
   - `http://localhost:4000`
   - `https://twofingersfoundation.com`
   - `https://app.twofingersfoundation.com`
2. Add authorized redirect URIs:
   - `https://two-finger-foundation.firebaseapp.com/__/auth/handler`
   - `https://app.twofingersfoundation.com/__/auth/handler`

Do not add Google API scopes beyond basic sign-in identity. The app should only use OpenID Connect identity data: `openid`, `email`, and `profile`.
