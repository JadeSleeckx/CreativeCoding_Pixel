const interval = setInterval(function() {
  if (document.readyState === 'complete') {
    clearInterval(interval);
    const nextPage = 'loader';
    location.assign('/static/loader.html?nextPage=' + nextPage);
  }
}, 1000);