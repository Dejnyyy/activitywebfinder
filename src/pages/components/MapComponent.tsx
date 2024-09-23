import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import { redIcon, blueIcon, greenIcon } from './CustomIcons';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

// Fix for the default icon issue
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Waypoint {
  id?: number;
  position: L.LatLng;
  text: string;
  color: string;
}

interface MapComponentProps {
  addWaypointMode: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ addWaypointMode }) => {
  const [waypoints, setWaypoints] = useState<Waypoint[]>([]);
  const [newWaypointText, setNewWaypointText] = useState<string>('');
  const [selectedWaypointIndex, setSelectedWaypointIndex] = useState<number | null>(null);

  useEffect(() => {
    // Fetch waypoints from the API
    const fetchWaypoints = async () => {
      try {
        const response = await fetch('/api/waypoints');
        const data = await response.json();
        setWaypoints(data.map((waypoint: any) => ({
          id: waypoint.id,
          position: new L.LatLng(waypoint.latitude, waypoint.longitude),
          text: waypoint.text,
          color: waypoint.color,
        })));
      } catch (error) {
        console.error('Failed to fetch waypoints:', error);
      }
    };

    fetchWaypoints();
  }, []);

  useEffect(() => {
    const map = L.map('map').setView([50.0755, 14.4378], 14);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Create a marker cluster group
    const markerClusterGroup = L.markerClusterGroup();

    // Add markers to the marker cluster group
    waypoints.forEach((waypoint, index) => {
      const marker = L.marker(waypoint.position, { icon: getIcon(waypoint.color) });
      
      // Bind popup to marker
      marker.bindPopup(() => {
        const popupDiv = document.createElement('div');
        popupDiv.innerHTML = `
          <div>${waypoint.text || 'No text added'}</div>
          <input type="text" id="text-input-${index}" value="${waypoint.text}" class="w-full p-1 border border-gray-300 rounded-md" placeholder="Enter text" />
          <button id="save-btn-${index}" class="mt-2 bg-blue-500 text-white p-1 rounded-md">Save</button>
        `;

        popupDiv.querySelector(`#save-btn-${index}`)?.addEventListener('click', () => {
          const inputField = document.querySelector(`#text-input-${index}`) as HTMLInputElement;
          if (inputField) {
            handleTextSubmit(index, inputField.value);
          }
          marker.closePopup();
        });

        return popupDiv;
      });

      markerClusterGroup.addLayer(marker);
    });

    // Add the marker cluster group to the map
    map.addLayer(markerClusterGroup);

    return () => {
      map.remove();
    };
  }, [waypoints]);

  const AddWaypoint = () => {
    useMapEvents({
      click(e) {
        if (addWaypointMode) {
          const colors = ['red', 'blue', 'green'];
          const color = colors[waypoints.length % 3]; // Cycle through colors
          const newWaypoint = { position: e.latlng, text: '', color };
          setWaypoints([...waypoints, newWaypoint]);
          setSelectedWaypointIndex(waypoints.length); // Select the newly added waypoint
        }
      },
    });
    return null;
  };

  const handleTextSubmit = (index: number, newText: string) => {
    const updatedWaypoints = waypoints.map((waypoint, i) =>
      i === index ? { ...waypoint, text: newText } : waypoint
    );
    setWaypoints(updatedWaypoints);
    // Save waypoint text to the database (assuming there's an API to handle this)
    const waypoint = updatedWaypoints[index];
    if (waypoint.id) {
      fetch(`/api/waypoints/${waypoint.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      }).catch((error) => console.error('Failed to update waypoint text:', error));
    }
  };

  const getIcon = (color: string) => {
    if (color === 'red') return redIcon;
    if (color === 'blue') return blueIcon;
    return greenIcon;
  };

  return (
    <div className="relative">
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>
      {addWaypointMode && <AddWaypoint />}
    </div>
  );
};

export default MapComponent;
