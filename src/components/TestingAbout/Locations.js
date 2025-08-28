"use client";
import React, { useEffect, useRef, useState } from "react";
import { MapPin, Building2, Phone, Mail, Navigation } from "lucide-react";
import BackgroundAnimation from "@/components/Common/BackgroundAnimation";

// Company locations data
const companyLocations = [
  {
    id: "pune",
    name: "Pune Office",
    coordinates: [18.586540582890077, 73.78154440891436],
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    address:
      "1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027",
    mapUrl:
      "https://www.google.com/maps/place/Best+SAP+Training+Institute+in+Pune+%7C+SAP+Course+in+Pune+%7C+SAP+Classes+in+Pune+%7C+Placement+%7C/@18.5863803,73.7788298,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2b919d0592ea1:0xf431691661c2c3ec!8m2!3d18.5863803!4d73.7814047!16s%2Fg%2F11sdnq4jzt?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    phone: "+91 90040 02941",
    description:
      "Our Pune office in Pimpri-Chinchwad, serving the western Maharashtra region.",
  },
  {
    id: "mumbai",
    name: "Mumbai Office",
    coordinates: [19.188380013416644, 72.97569750017392],
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=800&q=80",
    address:
      "4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602",
    description:
      "Our Mumbai office in Thane West, strategically located in the financial capital of India.",
    mapUrl:
      "https://www.google.com/maps/place/Connecting+Dot/@19.1876209,72.9727232,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7b909db7deec9:0x116fea8715c8a1a2!8m2!3d19.1876209!4d72.9752981!16s%2Fg%2F11r_ryrhf8?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    phone: "+91 90040 05382",
  },
  {
    id: "raipur",
    name: "Raipur Office",
    coordinates: [21.23718483397514, 81.65330086453389],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    address: "New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001",
    description:
      "Our Raipur office in Chhattisgarh, serving as our central India operations hub.",
    mapUrl:
      "https://www.google.com/maps/place/Panchsheel+Nagar,+Raipur,+Chhattisgarh+492001/@21.2400774,81.6534778,17z/data=!3m1!4b1!4m6!3m5!1s0x3a28dd0db5f041a9:0xc9ebebac6ea4bb0a!8m2!3d21.2406348!4d81.655903!16s%2Fg%2F1hhxnd69j?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D",
    phone: "+91 89560 01555",
  },
];

const InteractiveMap = ({
  selectedLocation,
  hoveredLocation,
  onLocationSelect,
  onMapLeave,
  className = "",
}) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markersRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Default map center and zoom for India - responsive zoom levels
  const defaultCenter = [20.5937, 78.9629];
  const getDefaultZoom = () => {
    if (window.innerWidth < 640) return 4.5; // Mobile - show full India
    if (window.innerWidth < 1024) return 5; // Tablet
    return 5; // Desktop
  };
  const [defaultZoom, setDefaultZoom] = useState(5);

  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setLeafletLoaded(true);
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css";
      document.head.appendChild(link);

      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      script.onload = () => {
        setLeafletLoaded(true);
      };
      document.head.appendChild(script);
    };

    // Set responsive default zoom
    const handleResize = () => {
      setDefaultZoom(getDefaultZoom());
    };

    setDefaultZoom(getDefaultZoom());
    window.addEventListener("resize", handleResize);
    loadLeaflet();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapContainer.current || map.current) return;

    const L = window.L;

    map.current = L.map(mapContainer.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
    });

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "© Esri",
        maxZoom: 19,
      }
    ).addTo(map.current);

    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "",
        maxZoom: 19,
        opacity: 0.7,
      }
    ).addTo(map.current);

    setIsLoading(false);

    // Add markers
    companyLocations.forEach((location, index) => {
      setTimeout(() => {
        addMarker(location, L);
      }, index * 200);
    });

    // Add mouse leave handler for map container
    const handleMouseLeave = () => {
      if (!map.current) return;

      const currentZoom = map.current.getZoom();
      const currentCenter = map.current.getCenter();

      const centerOffset =
        Math.abs(currentCenter.lat - defaultCenter[0]) > 0.05 ||
        Math.abs(currentCenter.lng - defaultCenter[1]) > 0.05;

      const zoomOffset = Math.abs(currentZoom - defaultZoom) > 0.2;

      const noActiveLocation = !selectedLocation && !hoveredLocation;

      if ((centerOffset || zoomOffset) && noActiveLocation) {
        map.current.flyTo(defaultCenter, defaultZoom, {
          animate: true,
          duration: 1.5,
        });
      }

      onMapLeave(); // reset selected & hover
    };

    mapContainer.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (mapContainer.current) {
        mapContainer.current.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [leafletLoaded, defaultZoom, onMapLeave]);

  // Handle location selection and hovering
  useEffect(() => {
    if (!map.current || !leafletLoaded) return;

    try {
      if (hoveredLocation) {
        // Zoom to hovered location
        map.current.flyTo(hoveredLocation.coordinates, 14, {
          animate: true,
          duration: 1.5,
        });
      } else if (selectedLocation) {
        // Stay at selected location when not hovering
        map.current.flyTo(selectedLocation.coordinates, 14, {
          animate: true,
          duration: 1.5,
        });
      } else {
        // Return to default view when no location is selected or hovered
        map.current.flyTo(defaultCenter, defaultZoom, {
          animate: true,
          duration: 1.5,
        });
      }
    } catch (error) {
      console.warn("Map navigation error:", error);
    }
  }, [
    selectedLocation,
    hoveredLocation,
    defaultCenter,
    defaultZoom,
    leafletLoaded,
  ]);

  const addMarker = (location, L) => {
    // Use traditional red marker icon
    const defaultIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker(location.coordinates, {
      icon: defaultIcon,
      opacity: 0,
    }).addTo(map.current);

    // Fade in animation
    setTimeout(() => {
      marker.setOpacity(1);
    }, 100);

    // Add click event
    marker.on("click", () => {
      onLocationSelect(location);
    });

    // Add popup
    marker.bindPopup(`
      <div style="font-family: system-ui, sans-serif; min-width: 200px;">
        <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #1f2937;">
          ${location.name}
        </h3>
        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
          ${location.description}
        </p>
        <div style="font-size: 11px; color: #9ca3af; line-height: 1.3;">
          <div style="margin-bottom: 4px;">📍 ${location.address}</div>
          <div>📞 ${location.phone}</div>
        </div>
      </div>
    `);

    markersRef.current.push(marker);
  };

  return (
    <div
      className={`relative  bg-gray-900 rounded-2xl overflow-hidden ${className}`}
    >
      {(isLoading || !leafletLoaded) && (
        <div className="absolute  inset-0 bg-gray-900 flex items-center justify-center z-10">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-2 mx-auto"></div>
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}

      <div ref={mapContainer} className="w-full h-full" />

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// Mobile Square Box Component
const MobileLocationBox = ({ location, isActive, onClick }) => {
  return (
    <div
      className={`relative p-4 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer transform active:scale-95 ${
        isActive
          ? "bg-gray-600/80 border-2 border-gray-400 shadow-xl"
          : "bg-gray-800/70 border border-gray-600 hover:bg-gray-700/80 hover:border-gray-500"
      }`}
      onClick={() => onClick(location)}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        {/* Icon */}
        <div
          className={`p-3 rounded-full transition-all duration-300 ${
            isActive ? "bg-white/30 scale-110" : "bg-white/20"
          }`}
        >
          <Building2
            className={`w-6 h-6 transition-colors duration-300 ${
              isActive ? "text-white" : "text-gray-300"
            }`}
          />
        </div>

        {/* City Name */}
        <div>
          <h3
            className={`font-bold text-sm transition-colors duration-300 ${
              isActive ? "text-white" : "text-gray-200"
            }`}
          >
            {location.name}
          </h3>
        </div>

        {/* Status Indicator */}
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isActive ? "bg-white animate-pulse" : "bg-gray-500"
          }`}
        />
      </div>

      {/* Active Glow Effect */}
      {isActive && (
        <div className="absolute inset-0 rounded-xl bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </div>
  );
};

// Desktop Card Component (unchanged)
const CompactBranchCard = ({
  location,
  isActive,
  isHovered,
  onHover,
  onLeave,
  onClick,
}) => {
  return (
    <div
      className={`group relative p-3 sm:p-4 rounded-xl backdrop-blur-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${
        isActive
          ? "bg-gray-800/90 border border-gray-600 shadow-xl"
          : isHovered
            ? "bg-gray-700/90 border border-gray-500 shadow-lg"
            : "bg-gray-800/60 border border-gray-700 hover:bg-gray-600/90 hover:border-gray-500"
      }`}
      onMouseEnter={() => onHover(location)}
      onMouseLeave={onLeave}
      onClick={() => onClick(location)}
    >
      <div className="absolute inset-0 rounded-xl bg-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div
              className={`p-2 rounded-full transition-colors duration-300 flex-shrink-0 ${
                isActive || isHovered
                  ? "bg-white/30"
                  : "bg-white/20 group-hover:bg-white/30"
              }`}
            >
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base font-bold text-white mb-1 leading-tight">
                {location.name}
              </h3>
              <p className="text-blue-200 text-xs sm:text-sm leading-tight line-clamp-1">
                {location.description}
              </p>
            </div>
          </div>
          <div
            className={`transition-transform duration-300 flex-shrink-0 ${
              isActive
                ? "rotate-45"
                : isHovered
                  ? "rotate-12"
                  : "group-hover:rotate-12"
            }`}
          >
            <Navigation className="w-4 h-4 text-white/70" />
          </div>
        </div>

        <div className="space-y-2 text-white/80 text-xs sm:text-sm">
          <div className="flex items-start space-x-2">
            <Building2 className="w-4 h-4 mt-0.5 text-white/60 flex-shrink-0" />
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="leading-tight text-white hover:white-500"
            >
              {location.address}
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-white/60 flex-shrink-0" />
              <a
                href={`tel:${location.phone}`}
                className="truncate hover:underline"
              >
                {location.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10">
          <button
            className={`w-full py-2 px-3 rounded-lg font-medium transition-all duration-300 text-sm ${
              isActive
                ? "bg-white text-gray-900 shadow-lg"
                : isHovered
                  ? "bg-white/30 text-white border border-white/30"
                  : "bg-white/20 text-white hover:bg-white/30 border border-white/30"
            }`}
          >
            {isActive ? "Viewing" : isHovered ? "Preview" : "View Map"}
          </button>
        </div>
      </div>

      {/* Animated border */}
      <div
        className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
          isActive || isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 p-0.5">
          <div className="h-full w-full rounded-xl bg-transparent" />
        </div>
      </div>
    </div>
  );
};

// Mobile Address Display Component
const MobileAddressDisplay = ({ location }) => {
  if (!location) return null;

  return (
    <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-4 border border-gray-600 shadow-lg">
      <div className="space-y-3">
        <div className="flex items-center space-x-2 mb-3">
          <div className="p-2 bg-blue-600/30 rounded-full">
            <MapPin className="w-4 h-4 text-blue-400" />
          </div>
          <h3 className="font-bold text-white text-sm">{location.name}</h3>
        </div>

        <div className="space-y-2 text-xs text-gray-300">
          <div className="flex items-start space-x-2">
            <Building2 className="w-4 h-4 mt-0.5 text-gray-400 flex-shrink-0" />
            <a
              href={location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white leading-tight"
            >
              {location.address}
            </a>
          </div>

          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <a
              href={`tel:${location.phone}`}
              className="text-gray-300 hover:text-white"
            >
              {location.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const OurBranch = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const handleCardHover = (location) => {
    setHoveredLocation(location);
  };

  const handleCardLeave = () => {
    setHoveredLocation(null);
  };

  const handleCardClick = (location) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
    setHoveredLocation(null);
  };

  const handleMapLocationSelect = (location) => {
    if (selectedLocation?.id === location.id) {
      setSelectedLocation(null);
    } else {
      setSelectedLocation(location);
    }
  };

  const handleMapLeave = () => {
    setSelectedLocation(null);
    setHoveredLocation(null);
  };

  return (
    <div className="min-h-[700px] relative overflow-hidden">
      <BackgroundAnimation />
      {/* Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-800/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-20 container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
        <div className="text-center">
  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 text-white">
    Our Branches
  </h1>
  <span className="block w-40 h-1 mx-auto bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 rounded-full opacity-70"></span>
</div>

          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            <span className="hidden lg:inline">
              Explore our office locations across India. Hover over the cards to
              preview locations, click to select and zoom in.
            </span>
            <span className="lg:hidden">
              Tap on a location below to view it on the map and see details.
            </span>
          </p>
        </div>

        {/* Mobile Layout (< lg screens) */}
        <div className="lg:hidden space-y-6">
          {/* Map Section */}
          <div>
            <InteractiveMap
              selectedLocation={selectedLocation}
              hoveredLocation={hoveredLocation}
              onLocationSelect={handleMapLocationSelect}
              onMapLeave={handleMapLeave}
              className="h-[300px] sm:h-[400px] shadow-2xl rounded-2xl"
            />
          </div>

          {/* Mobile Location Boxes */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {companyLocations.map((location) => (
              <MobileLocationBox
                key={location.id}
                location={location}
                isActive={selectedLocation?.id === location.id}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* Mobile Address Display */}
          {selectedLocation && (
            <MobileAddressDisplay location={selectedLocation} />
          )}
        </div>

        {/* Desktop Layout (>= lg screens) */}
        <div className="hidden lg:flex lg:flex-row gap-8 max-w-7xl mx-auto">
          {/* Branch Cards Section - Always on left */}
          <div className="w-[33%] order-2">
            <div className="grid grid-cols-1 gap-4 lg:gap-3">
              {companyLocations.map((location) => (
                <CompactBranchCard
                  key={location.id}
                  location={location}
                  isActive={selectedLocation?.id === location.id}
                  isHovered={hoveredLocation?.id === location.id}
                  onHover={handleCardHover}
                  onLeave={handleCardLeave}
                  onClick={handleCardClick}
                />
              ))}
            </div>
          </div>

          {/* Map Section - Always on right */}
          <div className="w-[67%] order-1">
            <div className="sticky top-6">
              <InteractiveMap
                selectedLocation={selectedLocation}
                hoveredLocation={hoveredLocation}
                onLocationSelect={handleMapLocationSelect}
                onMapLeave={handleMapLeave}
                className="h-[500px] sm:h-[600px] lg:h-[700px] shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <p className="text-gray-400 text-xs sm:text-sm">
            <span className="hidden lg:inline">
              Click on map markers or location cards to explore our offices in
              detail
            </span>
            <span className="lg:hidden">
              Tap on location boxes or map markers to explore our offices
            </span>
          </p>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default OurBranch;
  