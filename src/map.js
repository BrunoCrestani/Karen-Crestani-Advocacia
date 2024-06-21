
export default class Map {
  #map;
  #mapZoomLevel = 13;

  constructor(){
    // Get user's position
    this._getPosition(); 
  }

  _getPosition(){
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this), 
        function(){
        alert('Não foi possível obter sua posição');
      });
    }
  }
  
  _loadMap(position){
    const { latitude, longitude } = position.coords;
    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', { 
     attribution: '&copy; OpenStreetMap contributors'}).addTo(this.#map);

    var usrMarker = L.marker(coords).addTo(this.#map)
    .bindPopup('Sua localização')
    .openPopup();

    var marker = L.marker([-25.4278, -49.2731]).addTo(this.#map)
    .bindPopup('Karen Crestani Advocacia<br>Dr. Zamenhof 378, Alto da Glória, Curitiba')
    .openPopup();



  }
}
