/*
 * 表示する言語を決め、切り替えを受け持つ。<head> で読み込む。
 *
 * **描く前に決める。** 本文より先に <html data-lang> を立てておけば、
 * 英語の人に日本語が一瞬見えることがない。
 *
 * 決め方（先にあるものほど強い）:
 *   1. URL の ?lang=en / ?lang=ja … アプリから開かれたとき。アプリの表示言語に合わせる。
 *      覚えておく。サイト内のリンクを辿った先でも同じ言語で出すため
 *   2. この端末で自分で切り替えた言語
 *   3. ブラウザの言語が日本語なら日本語、それ以外は英語
 */
(function () {
  var KEY = 'solidrec.lang';
  var html = document.documentElement;

  function pick() {
    var match = /[?&]lang=(en|ja)(?:&|$)/.exec(location.search);
    if (match) {
      try { localStorage.setItem(KEY, match[1]); } catch (e) { /* 任意 */ }
      return match[1];
    }
    try {
      var saved = localStorage.getItem(KEY);
      if (saved === 'en' || saved === 'ja') return saved;
    } catch (e) { /* 保存できない環境でも成立する */ }
    var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
    return /^ja\b/i.test(langs[0] || '') ? 'ja' : 'en';
  }

  function apply(lang) {
    html.setAttribute('data-lang', lang);
    html.lang = lang;
    var title = html.getAttribute('data-title-' + lang);
    if (title) document.title = title;
    document.querySelectorAll('.langbar button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.set === lang));
    });
  }

  apply(pick());

  document.addEventListener('DOMContentLoaded', function () {
    apply(html.getAttribute('data-lang'));
    document.addEventListener('click', function (e) {
      var b = e.target.closest('.langbar button');
      if (!b) return;
      try { localStorage.setItem(KEY, b.dataset.set); } catch (err) { /* 任意 */ }
      apply(b.dataset.set);
      window.scrollTo(0, 0);
    });
  });
})();
