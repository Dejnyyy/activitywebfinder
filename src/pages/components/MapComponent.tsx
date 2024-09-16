import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import 'leaflet.markercluster';
import { redIcon, blueIcon, greenIcon } from './CustomIcons';

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
  const [selectedWaypoint, setSelectedWaypoint] = useState<number | null>(null);

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

  const AddWaypoint = () => {
    useMapEvents({
      click(e) {
        if (addWaypointMode) {
          const colors = ['red', 'blue', 'green'];
          const color = colors[waypoints.length % 3]; // Cycle through colors
          const newWaypoint = { position: e.latlng, text: '', color };
          setWaypoints([...waypoints, newWaypoint]);
          setSelectedWaypoint(waypoints.length); // Select the newly added waypoint
        }
      },
    });
    return null;
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWaypointText(e.target.value);
  };

  const handleTextSubmit = async (index: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event propagation to the map

    const updatedWaypoints = waypoints.map((waypoint, i) =>
      i === index ? { ...waypoint, text: newWaypointText } : waypoint
    );
    setWaypoints(updatedWaypoints);
    setSelectedWaypoint(null); // Deselect the waypoint after text is submitted
    setNewWaypointText(''); // Clear the input field

    const waypoint = updatedWaypoints[index];

    // Save waypoint to the database
    if (!waypoint.id) {
      const response = await fetch('/api/waypoints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: waypoint.position.lat,
          longitude: waypoint.position.lng,
          text: waypoint.text,
          color: waypoint.color,
        }),
      });
      const savedWaypoint = await response.json();
      setWaypoints((prev) =>
        prev.map((wp, i) => (i === index ? { ...wp, id: savedWaypoint.id } : wp))
      );
    }
  };

  const getIcon = (color: string) => {
    if (color === 'red') return redIcon;
    if (color === 'blue') return blueIcon;
    return greenIcon;
  };

  useEffect(() => {
    // Initialize map
    const map = L.map('map').setView([50.0755, 14.4378], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Initialize the marker cluster group
    const markers = L.markerClusterGroup({
      disableClusteringAtZoom: 16, // Prevent clustering at higher zoom levels
      showCoverageOnHover: false, // No coverage overlay when hovering
    });

    waypoints.forEach((waypoint) => {
      const marker = L.marker(waypoint.position, {
        icon: getIcon(waypoint.color),
      }).bindPopup(
        `<div>${waypoint.text || 'No text added'}</div>`
      );
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.remove();
    };
  }, [waypoints]);

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}>
      {/* Cluster markers are now added in the useEffect above */}
      {addWaypointMode && <AddWaypoint />}
    </div>
  );
};

export default MapComponent;
