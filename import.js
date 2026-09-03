(function () {
  var script = document.currentScript;
  var baseUrl = script ? script.src.replace(/\/import\.js(?:[?#].*)?$/, '') : '';
  var cache = {};

  function loadIcon(element) {
    var match = Array.prototype.slice.call(element.classList).find(function (name) {
      return name.indexOf('glyphra-icon-') === 0 && name !== 'glyphra-icon';
    });
    var icon = element.getAttribute('data-icon');
    var variant = element.getAttribute('data-variant') || element.getAttribute('data-varient');
    if (icon && variant) {
      match = null;
    } else if (match) {
      var parts = match.replace('glyphra-icon-', '').split('-');
      variant = parts.pop();
      icon = parts.join('-');
    } else {
      return;
    }
    var key = icon + '/' + variant;
    var url = baseUrl + '/svg/' + variant + '/' + icon + '.svg';
    var request = cache[key] || (cache[key] = fetch(url).then(function (response) {
      if (!response.ok) throw new Error('Glyphra icon not found: ' + key);
      return response.text();
    }));

    request.then(function (svg) {
      if (!element.isConnected) return;
      element.innerHTML = svg;
      var svgElement = element.firstElementChild;
      if (svgElement) {
        svgElement.setAttribute('width', '1em');
        svgElement.setAttribute('height', '1em');
        svgElement.setAttribute('aria-hidden', 'true');
        var strokeWidth = element.getAttribute('data-stroke') || element.getAttribute('data-stroke-width');
        if (strokeWidth) {
          svgElement.querySelectorAll('[stroke-width]').forEach(function (node) {
            node.setAttribute('stroke-width', strokeWidth);
          });
        }
        var size = element.getAttribute('data-size');
        if (size) {
          svgElement.setAttribute('width', size);
          svgElement.setAttribute('height', size);
        }
      }
    }).catch(function () {
      element.setAttribute('data-glyphra-error', key);
    });
  }

  function scan() {
    document.querySelectorAll('i.glyphra-icon, i[class*="glyphra-icon-"]').forEach(loadIcon);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scan);
  else scan();
  new MutationObserver(scan).observe(document.documentElement, { childList: true, subtree: true });
})();