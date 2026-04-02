'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface PropertyMapProps {
  readonly center: [number, number];
  readonly zoom?: number;
  readonly title?: string;
}

export default function PropertyMap({ center, zoom = 13, title }: PropertyMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || mapInstance.current) return;

    // Fix default icon issue in Leaflet
    const DefaultIcon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    mapInstance.current = L.map(mapContainer.current, {
      center,
      zoom,
      scrollWheelZoom: false,
      zoomControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
    }).addTo(mapInstance.current);

    if (title) {
        L.marker(center).addTo(mapInstance.current).bindPopup(title).openPopup();
    } else {
        L.marker(center).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [center, zoom, title]);

  return (
    <div className="w-full h-full relative group">
      <div ref={mapContainer} className="w-full h-full grayscale-[0.8] contrast-[1.2] invert-[0.05] brightness-[0.8] group-hover:grayscale-0 transition-all duration-1000" />
      <div className="absolute inset-0 pointer-events-none border border-white/10 z-10" />
    </div>
  );
}
