import L from 'leaflet';

// Define a custom red icon for map markers
const redIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Set icon size
  iconAnchor: [12, 41], // Point where the icon is anchored
  popupAnchor: [1, -34], // Where the popup should open relative to the icon
  shadowSize: [41, 41], // Size of the shadow
  className: 'red-marker', // Custom CSS class for styling
});

// Define a custom blue icon for map markers
const blueIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Set icon size
  iconAnchor: [12, 41], // Point where the icon is anchored
  popupAnchor: [1, -34], // Where the popup should open relative to the icon
  shadowSize: [41, 41], // Size of the shadow
  className: 'blue-marker', // Custom CSS class for styling
});

// Define a custom green icon for map markers
const greenIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41], // Set icon size
  iconAnchor: [12, 41], // Point where the icon is anchored
  popupAnchor: [1, -34], // Where the popup should open relative to the icon
  shadowSize: [41, 41], // Size of the shadow
  className: 'green-marker', // Custom CSS class for styling
});

export { redIcon, blueIcon, greenIcon };
