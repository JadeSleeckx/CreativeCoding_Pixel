setTimeout(function() {
  const nextPage = 'loader';
  console.log('Redirecting...');
  location.assign('../loader.html?&nextPage=' + nextPage);
  }, 1000); // 7000 milliseconden = 7 seconden
  

  //./demos/
  //static\loader.html