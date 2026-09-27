window.addEventListener('error', function (event) {
  var fallback = document.getElementById('boot-fallback');
  var root = document.getElementById('root');
  if (!fallback || !root || root.children.length > 1) return;
  var text = event && event.message ? event.message : 'eroare necunoscută';
  fallback.textContent = 'Nu am putut încărca aplicația (' + text + '). Reîncarcă pagina.';
});
