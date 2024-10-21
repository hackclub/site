import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';

const LeafletMap = ({ points }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = L.map(mapRef.current).setView([21.505, -10.09], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const markers = L.markerClusterGroup();

    points.forEach((point) => {
      const marker = L.marker([point.lat, point.lng]).bindPopup(point.name);
      markers.addLayer(marker);
    });

    map.addLayer(markers);

    return () => {
      map.remove();
    };
  }, [points]);

  return (
    <div>
      <div ref={mapRef} style={{ height: '50vh', minHeight: '300px', width: '100%', borderRadius: '10px' }} />
    </div>
  );
};

export default LeafletMap;