(function () {
  var root = document.getElementById('root');
  if (!root) return;
  var KEY = 'solidrec.lang';
  try {
    var saved = localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'ja') root.setAttribute('data-lang', saved);
  } catch (e) { /* 保存できない環境でも既定の日本語で成立する */ }

  function sync() {
    var lang = root.getAttribute('data-lang');
    root.querySelectorAll('.langbar button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
    document.documentElement.lang = lang;
  }
  root.addEventListener('click', function (e) {
    var b = e.target.closest('.langbar button');
    if (!b) return;
    root.setAttribute('data-lang', b.dataset.set);
    try { localStorage.setItem(KEY, b.dataset.set); } catch (err) { /* 任意 */ }
    sync();
    window.scrollTo(0, 0);
  });
  sync();
})();
