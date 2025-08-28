// File: utils/passiveEvents.js (new file)

// This function detects if passive events are supported
export function supportsPassiveEvents() {
    let passiveSupported = false;
    
    try {
      const options = {
        get passive() {
          passiveSupported = true;
          return false;
        }
      };
      
      window.addEventListener("test", null, options);
      window.removeEventListener("test", null, options);
    } catch (err) {
      passiveSupported = false;
    }
    
    return passiveSupported;
  }
  
  // This should be called in a client-side component or useEffect
  export function applyPassiveEventListeners() {
    if (typeof window !== 'undefined') {
      // Check if passive is supported
      const isPassiveSupported = supportsPassiveEvents();
      
      if (isPassiveSupported) {
        // Apply passive event listeners to scroll/touch events
        const listenerOptions = { passive: true };
        
        document.addEventListener('touchstart', () => {}, listenerOptions);
        document.addEventListener('touchmove', () => {}, listenerOptions);
        document.addEventListener('wheel', () => {}, listenerOptions);
        document.addEventListener('mousewheel', () => {}, listenerOptions);
      }
    }
  }