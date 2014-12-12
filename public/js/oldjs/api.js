var geolocation = (function(){
  function getLocation(){
    if (navigator.geolocation) {
      var timeoutVal = 10 * 1000 * 1000;
      navigator.geolocation.getCurrentPosition(
        returnPosition,
        displayError,
        { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
        );
    } else {
      alert("Geolocation is not supported by this browser");
    }
  }

  function returnPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    //return {latitude: latitude, longitude: longitude}
    controller.updateCoords(latitude, longitude);
  }

  function displayError(error) {
    var errors = {
      1: 'Permission denied',
      2: 'Position unavailable',
      3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
  }
  return{
    getLocation:getLocation
  }
})();