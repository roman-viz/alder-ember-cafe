(function () {
  'use strict';

  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (selector, context) {
    return (context || document).querySelectorAll(selector);
  };

  /* sticky nav state */
  var nav = document.getElementById('nav');

  /* mobile menu */
  var b = document.querySelector('.burger');
  var m = document.getElementById('menu');

  function setMenu(open) {
    b.setAttribute('aria-expanded', open);
    m.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  b.addEventListener('click', function () {
    setMenu(b.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && b.getAttribute('aria-expanded') === 'true') {
      setMenu(false);
      b.focus();
    }
  });

  $('a', m).forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  matchMedia('(min-width:901px)').addEventListener('change', function () {
    setMenu(false);
  });

  /* scroll reveals (IntersectionObserver); content stays visible without JS */
  var rv = $('.reveal');

  if ('IntersectionObserver' in window && !rm) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: .15, rootMargin: '0px 0px -6% 0px' });

    rv.forEach(function (element) {
      io.observe(element);
    });
  } else {
    rv.forEach(function (element) {
      element.classList.add('in');
    });
  }

  /* parallax: transform only, eased with a light lerp so it glides instead of snapping; desktop only */
  var px = [].map.call($('[data-speed]'), function (element) {
    return {
      el: element,
      s: parseFloat(element.dataset.speed),
      y: 0
    };
  });
  var wide = matchMedia('(min-width:901px)');
  var run = false;

  function target(parallax) {
    var rect = parallax.el.parentElement.getBoundingClientRect();
    var viewportHeight = innerHeight;

    if (rect.bottom < -200 || rect.top > viewportHeight + 200) {
      return parallax.y;
    }

    return (rect.top + rect.height / 2 - viewportHeight / 2) * -parallax.s;
  }

  function loop() {
    var moving = false;

    nav.classList.toggle('solid', scrollY > 40);

    px.forEach(function (parallax) {
      var destination = (rm || !wide.matches) ? 0 : target(parallax);
      var distance = destination - parallax.y;

      if (Math.abs(distance) > .1) {
        parallax.y += distance * .12;
        moving = true;
      } else {
        parallax.y = destination;
      }

      parallax.el.style.transform = parallax.y
        ? 'translate3d(0,' + parallax.y.toFixed(2) + 'px,0)'
        : '';
    });

    if (moving) {
      requestAnimationFrame(loop);
    } else {
      run = false;
    }
  }

  function req() {
    if (!run) {
      run = true;
      requestAnimationFrame(loop);
    }
  }

  addEventListener('scroll', req, { passive: true });
  addEventListener('resize', req);
  req();

  /* "Visit us" scrolls to the map on this page if present */
  var v = document.querySelector('[data-visit]');

  if (v && document.getElementById('map')) {
    v.setAttribute('href', '#map');
  }

  /* menu tabs */
  var tabs = $('[role=tab]');

  function pick(tab) {
    tabs.forEach(function (item) {
      var on = item === tab;

      item.setAttribute('aria-selected', on);
      item.tabIndex = on ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !on;
    });

    tab.focus();
  }

  tabs.forEach(function (tab, index) {
    tab.addEventListener('click', function () {
      pick(tab);
    });

    tab.addEventListener('keydown', function (event) {
      var direction = event.key === 'ArrowRight'
        ? 1
        : event.key === 'ArrowLeft'
          ? -1
          : 0;

      if (direction) {
        event.preventDefault();
        pick(tabs[(index + direction + tabs.length) % tabs.length]);
      }
    });
  });

  if (tabs.length && location.hash) {
    var h = document.getElementById('t-' + decodeURIComponent(location.hash.slice(1)));

    if (h) {
      pick(h);
    }
  }

  /* contact form: validate, show front-end-only success */
  var f = document.getElementById('form');

  if (f) {
    var msgs = {
      name: 'Enter your name.',
      email: 'Enter a valid email address, like name@example.com.',
      msg: 'Write a message of at least 10 characters.'
    };

    function check(element) {
      var key = element.name;
      var value = element.value.trim();
      var valid = key === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        : key === 'msg'
          ? value.length >= 10
          : value.length > 0;

      element.setAttribute('aria-invalid', !valid);
      document.getElementById('e-' + key).textContent = valid ? '' : msgs[key];

      return valid;
    }

    var fs = $('input,textarea', f);

    fs.forEach(function (element) {
      element.addEventListener('blur', function () {
        check(element);
      });

      element.addEventListener('input', function () {
        if (element.getAttribute('aria-invalid') === 'true') {
          check(element);
        }
      });
    });

    f.addEventListener('submit', function (event) {
      event.preventDefault();

      var bad = [].filter.call(fs, function (element) {
        return !check(element);
      });
      var ok = document.getElementById('ok');

      if (bad.length) {
        ok.hidden = true;
        bad[0].focus();
        return;
      }

      /* TODO: send fields to a real backend here (see README) */
      ok.hidden = false;
      f.reset();
      fs.forEach(function (element) {
        element.removeAttribute('aria-invalid');
      });
    });
  }
})();
