export function inAppSocialBrowser(userAgent) {
  return /FBAN|FBAV|FB_IAB|FB4A|Instagram/i.test(String(userAgent || ''));
}

export function shouldShowBrowserBanner(userAgent, dismissed) {
  return inAppSocialBrowser(userAgent) && !dismissed;
}
