// components/HomePage/BranchesMapView.js (NEW FILE)
"use client";

import React, { useRef, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { MapPin } from "lucide-react"; // Import only necessary icons

// Define map container styles here or pass them as props
const mapContainerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "16px",
};

// Define map options to prevent re-creation on renders
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  // Keep your existing styles array, but consider if all of them are strictly necessary
  // if you want to further reduce the bundle size related to map styling
  styles: [
    {
      featureType: "water",
      elementType: "geometry.fill",
      stylers: [{ color: "#d3d3d3" }],
    },
    {
      featureType: "transit",
      stylers: [{ color: "#808080" }, { visibility: "off" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ visibility: "on" }, { color: "#b3b3b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.fill",
      stylers: [{ visibility: "on" }, { color: "#ffffff" }, { weight: 1.8 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d7d7d7" }],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [{ visibility: "on" }, { color: "#ebebeb" }],
    },
    {
      featureType: "administrative",
      elementType: "geometry",
      stylers: [{ color: "#a7a7a7" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.fill",
      stylers: [{ color: "#ffffff" }],
    },
    {
      featureType: "landscape",
      elementType: "geometry.fill",
      stylers: [{ visibility: "on" }, { color: "#efefef" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#696969" }],
    },
    {
      featureType: "administrative",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "on" }, { color: "#737373" }],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry.stroke",
      stylers: [{ color: "#d6d6d6" }],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "geometry.fill",
      stylers: [{ color: "#dadada" }],
    },
  ],
};

// Custom SVG path for location marker
const customMarkerSvg = {
  path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  fillOpacity: 1,
  strokeWeight: 1,
  strokeColor: "#ffffff",
  scale: 1.5,
  anchor: { x: 12, y: 23 },
};

const BranchesMapView = ({ branches, selectedBranch, onBranchChange }) => {
  const mapRef = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // 🚨 IMPORTANT: Use environment variable
  });

  useEffect(() => {
    // Pan to selected branch when it changes and map is loaded
    if (isLoaded && mapRef.current) {
      mapRef.current.panTo(branches[selectedBranch].position);
      mapRef.current.setZoom(15);
    }
  }, [selectedBranch, isLoaded, branches]);

  if (loadError)
    return (
      <div className="text-red-500 text-center py-8">Error loading maps</div>
    );
  if (!isLoaded)
    return (
      <div className="flex justify-center items-center h-[320px] md:h-[390px] w-full">
        <div className="bg-white bg-opacity-10 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-400 h-10 w-10"></div>
            <div className="flex-1 space-y-3 py-1">
              <div className="h-3 bg-blue-400 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-blue-400 rounded"></div>
                <div className="h-3 bg-blue-400 rounded w-5/6"></div>
              </div>
            </div>
          </div>
          <p className="text-center mt-3 text-white font-medium">
            Loading Map...
          </p>
        </div>
      </div>
    );

  return (
    <>
      {/* City Navigation Tabs - MOVED INSIDE MAP CONTAINER for styling */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-b-lg flex justify-center lg:justify-end items-center gap-1 border-b border-gray-200">
        {branches.map((branch, index) => (
          <button
            key={`city-tab-${index}`}
            onClick={() =>
              onBranchChange(index, index > selectedBranch ? "right" : "left")
            }
            className={`px-2 py-1 rounded-lg text-xs font-medium transition-all duration-300 flex items-center ${
              selectedBranch === index
                ? "text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            style={{
              backgroundColor: selectedBranch === index ? branch.color : "",
              border: `1px solid ${selectedBranch === index ? branch.color : "#e5e7eb"}`,
            }}
          >
            <MapPin
              size={12}
              className={`mr-1 ${selectedBranch === index ? "animate-pulse" : ""}`}
            />
            {branch.city}
          </button>
        ))}
      </div>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={branches[selectedBranch].position}
        zoom={15}
        options={mapOptions}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {branches.map((branch, index) => (
          <Marker
            key={index}
            position={branch.position}
            onClick={() =>
              onBranchChange(index, index > selectedBranch ? "right" : "left")
            }
            animation={isLoaded ? window.google?.maps.Animation.DROP : null}
            icon={{
              ...customMarkerSvg,
              fillColor: selectedBranch === index ? branch.color : "#909090",
              scale: selectedBranch === index ? 2.0 : 1.3,
            }}
          />
        ))}
      </GoogleMap>

      {/* Location Indicator - moved to bottom-left for better layout with tabs */}
      <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md">
        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center mr-2 animate-pulse"
            style={{
              backgroundColor: `${branches[selectedBranch].color}20`,
            }}
          >
            <MapPin size={16} color={branches[selectedBranch].color} />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-800">
              {branches[selectedBranch].city}
            </h3>
            <p className="text-xs text-gray-500">
              {branches[selectedBranch].headline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default BranchesMapView;
