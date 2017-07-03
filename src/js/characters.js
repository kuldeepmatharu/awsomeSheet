var hardCodedCharacters = (function() {

  var demoCharacters = [
    nif.data,
    vos.data
  ];

  var allCharacters = [
    nif.data,
    vos.data,
    orrin.data,
    nefi.data,
    ro.data,
    marika.data,
    auralis.data
  ];

  var singleCharacters = {
    nif: nif.data,
    vos: vos.data,
    orrin: orrin.data,
    nefi: nefi.data,
    ro: ro.data,
    marika: marika.data,
    auralis: auralis.data
  }

  function all() {
    return allCharacters
  };

  function demo() {
    return demoCharacters
  };

  function single() {
    return singleCharacters
  };

  // exposed methods
  return {
    demo: demo,
    all: all,
    single: single
  };

})();
