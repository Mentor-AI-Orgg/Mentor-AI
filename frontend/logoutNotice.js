function logoutNotice(reason, signedOut) {
  if (reason === 'deleted') return 'Contul a fost șters.';
  return signedOut;
}

export { logoutNotice };
