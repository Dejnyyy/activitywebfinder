import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

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
          const newWaypoint = { position: e.latlng, text: '' };
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

  const handleTextSubmit = async (index: number) => {
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
        }),
      });
      const savedWaypoint = await response.json();
      setWaypoints((prev) =>
        prev.map((wp, i) => (i === index ? { ...wp, id: savedWaypoint.id } : wp))
      );
    }
  };

  return (
    <div className="relative">
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {waypoints.map((waypoint, index) => (
          <Marker key={index} position={waypoint.position}>
            <Popup>
              <div>
                {waypoint.text || 'No text added'}
                {selectedWaypoint === index && (
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newWaypointText}
                      onChange={handleTextChange}
                      className="w-full p-1 border border-gray-300 rounded-md"
                      placeholder="Enter text"
                    />
                    <button
                      onClick={() => handleTextSubmit(index)}
                      className="mt-2 bg-blue-500 text-white p-1 rounded-md"
                    >
                      Save
                    </button>
                  </div>
                )}
                {selectedWaypoint !== index && (
                  <button
                    onClick={() => setSelectedWaypoint(index)}
                    className="mt-2 bg-blue-500 text-white p-1 rounded-md"
                  >
                    Edit
                  </button>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
        {addWaypointMode && <AddWaypoint />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
