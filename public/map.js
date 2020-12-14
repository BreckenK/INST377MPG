var map;
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  
async function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.7849, lng: -76.8721},
          zoom: 10
        });
        fetch('/sql', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then((fromServer) => {
          fromServer.text().then(data => {
            let list = JSON.parse(data);
            list = shuffle(list);
            let geocoder = new google.maps.Geocoder();
            for (let i = 0; i < 10; i++) {
              addr = list[i].biz_addr;
              geocoder.geocode({'address': addr }, function (results, status) {
              if (status == google.maps.GeocoderStatus.OK) {
                console.log("success");
                var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
                  });
              }
              else{
                console.log(status)
              }
              });
            }
          });
    })
    .catch((err) => {
      console.log(err)
      // 
    });
      }
    
initMap();