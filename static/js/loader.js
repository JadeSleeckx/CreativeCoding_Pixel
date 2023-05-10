setTimeout(function() {
    const nextPage = 'intro';
  location.assign(`/static/intro.html?&nextPage=${nextPage}`)
  }, 7000); // 7000 milliseconden = 7 seconden
  