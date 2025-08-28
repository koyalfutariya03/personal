"use client";
import { useEffect, useRef, useState } from "react";
import { MapPin, Globe as GlobeIcon } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import with SSR disabled
const Globe = dynamic(() => import("react-globe.gl"), {
  ssr: false,
});

const BRANCH_DATA = [
  {
    id: "pune",
    city: "Pune",
    address:
      "1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh, Pune, Pimpri-Chinchwad, Maharashtra 411027",
    position: { lat: 18.588048051275003, lng: 73.78119014757031 },
    mapLink: "https://maps.app.goo.gl/DNwzKa2Yt1WB6zUB7",
    labelAltitude: 0.01,
    labelOffset: { lat: 0.1, lng: 0.1 },
  },
  {
    id: "mumbai",
    city: "Mumbai",
    address:
      "4th Floor, Ram Niwas, B-404, Gokhale Rd, near McDonald's, Dada Patil Wadi, Naupada, Thane West, Thane, Maharashtra 400602",
    position: { lat: 19.259055941077712, lng: 72.96564544031934 },
    mapLink: "https://maps.app.goo.gl/i7W3baVVS1mDLmTJ9",
    labelAltitude: 0.02,
    labelOffset: { lat: -0.1, lng: -0.1 },
  },
  {
    id: "raipur",
    city: "Raipur",
    address: "New Panchsheel Nagar, Civil Lines, Raipur, Chhattisgarh 492001",
    position: { lat: 21.23944689267376, lng: 81.65363342070017 },
    mapLink: "https://maps.app.goo.gl/1KA1uhcyoF5Tu4Mg6",
    labelAltitude: 0.03,
    labelOffset: { lat: 0, lng: 0 },
  },
];

const BranchCard = ({ branch, isActive, onHover }) => (
  <div
    className={`
      bg-white/10 border border-white/20 rounded-xl transition-all duration-300 ease-in-out overflow-hidden cursor-pointer
      hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)]
      ${isActive 
        ? 'scale-[1.03] shadow-[0_0_15px_rgba(255,255,255,0.3)] border-white/50' 
        : ''
      }
    `}
    onMouseEnter={() => onHover(branch.id)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="p-3 sm:p-4">
      <div className="flex items-center mb-2 sm:mb-3">
        <MapPin className="mr-2 text-white/70 w-4 h-4 sm:w-5 sm:h-5" />
        <h5 className="text-base sm:text-lg lg:text-xl font-semibold text-white/90 m-0">
          {branch.city}
        </h5>
      </div>
      <p className="text-white/80 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed">
        {branch.address}
      </p>
      <a
        href={branch.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-transparent border-none inline-flex items-center transition-all duration-300 p-0 hover:opacity-90 text-sm sm:text-base"
      >
        <GlobeIcon className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
        View on Map
      </a>
    </div>
  </div>
);

const Branches = () => {
  const globeRef = useRef(null);
  const [activeBranch, setActiveBranch] = useState(null);
  const [globeRotation, setGlobeRotation] = useState(true);
  const [globeSize, setGlobeSize] = useState({ width: 500, height: 500 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      let width, height;

      if (windowWidth < 480) {
        width = 250;
        height = 250;
      } else if (windowWidth < 640) {
        width = 300;
        height = 300;
      } else if (windowWidth < 768) {
        width = 400;
        height = 400;
      } else if (windowWidth < 1024) {
        width = 500;
        height = 500;
      } else if (windowWidth < 1280) {
        width = 600;
        height = 600;
      } else {
        width = 700;
        height = 700;
      }

      setGlobeSize({ width, height });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const configureGlobe = () => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = globeRotation;
        globeRef.current.controls().autoRotateSpeed = 0.6;
        globeRef.current.controls().enableZoom = false;
      }
    };

    configureGlobe();
  }, [globeRotation, isClient]);

  const handleBranchHover = (branchId) => {
    setActiveBranch(branchId);
    
    if (!isClient) return;
    
    if (branchId && globeRef.current) {
      setGlobeRotation(false);
      
      const branch = BRANCH_DATA.find(b => b.id === branchId);
      if (branch) {
        globeRef.current.pointOfView(
          { 
            lat: branch.position.lat, 
            lng: branch.position.lng, 
            altitude: 2.5 
          }, 
          1000
        );
      }
    } else {
      setGlobeRotation(true);
    }
  };

  // Fixed marker creation function
  const createCustomMarker = (d) => {
    if (!isClient) return null;
    
    const isActive = d.id === activeBranch;
    const color = isActive ? "#FF6B6B" : "#4CAF50";
    
    const el = document.createElement("div");
    el.style.cssText = `
      width: 28px;
      height: 28px;
      position: relative;
      transform: translate(-50%, -100%);
      pointer-events: none;
      z-index: 1000;
    `;
    
    el.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        ${isActive ? 'animation: markerPulse 1.5s ease-in-out infinite;' : ''}
      ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" width="28" height="28" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
      </div>
    `;
    
    return el;
  };

  return (
    <div className="bg-[#04041D] text-white flex items-center justify-center py-6 sm:py-8 lg:py-12 px-3 sm:px-4 lg:px-8 w-full max-w-[1800px] mx-auto min-h-screen lg:min-h-0">
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-4 sm:gap-6 lg:gap-8">
        
        {/* Globe Section */}
        <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-1">
          <div className="w-full aspect-square flex justify-center items-center overflow-hidden max-w-[250px] sm:max-w-[300px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] 2xl:max-w-[700px]">
            {isClient && (
              <Globe
                ref={globeRef}
                width={globeSize.width}
                height={globeSize.height}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                backgroundColor="rgba(0,0,0,0)"
                labelsData={BRANCH_DATA}
                labelLat={(d) => d.position.lat + (d.labelOffset?.lat || 0)}
                labelLng={(d) => d.position.lng + (d.labelOffset?.lng || 0)}
                labelText={(d) => d.city}
                labelSize={1.2}
                labelColor={() => "white"}
                labelAltitude={(d) => d.labelAltitude}
                labelDotRadius={0}
                labelResolution={2}
                htmlElementsData={BRANCH_DATA}
                htmlElement={createCustomMarker}
                htmlLat={(d) => d.position.lat}
                htmlLng={(d) => d.position.lng}
                htmlAltitude={0.01}
              />
            )}
          </div>
        </div>

        {/* Branch List Section */}
        <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 text-white text-center lg:text-left">
            Our Branches
          </h2>
          
          <div className="flex flex-col gap-3 sm:gap-4">
            {BRANCH_DATA.map((branch) => (
              <BranchCard
                key={branch.id}
                branch={branch}
                isActive={branch.id === activeBranch}
                onHover={handleBranchHover}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CSS for animations */}
      <style jsx global>{`
        @keyframes markerPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Branches;