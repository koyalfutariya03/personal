'use client';
import { useEffect } from 'react';

export default function ServerPing() {
  useEffect(() => {
    // Ping main server
    const pingServer = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL;
        if (!base) {
          console.warn('NEXT_PUBLIC_API_URL is not set; skipping main server ping');
          return;
        }
        const response = await fetch(`${base}/api/ping`, {
          headers: { Accept: 'application/json' },
        });
        const ct = response.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          const text = await response.text();
          console.warn('Main server ping did not return JSON:', {
            status: response.status,
            contentType: ct,
            bodyPreview: text.slice(0, 200),
          });
          return;
        }
        const data = await response.json();
        console.log("Main server status:", data);
      } catch (error) {
        console.error("Main server ping failed:", error);
      }
    };

    // Ping blogs server
    const pingBlogsServer = async () => {
      try {
        const blogBase = process.env.NEXT_PUBLIC_API_URL_BLOG;
        if (!blogBase) {
          console.warn('NEXT_PUBLIC_API_URL_BLOG is not set; skipping blogs server ping');
          return;
        }
        const response = await fetch(`${blogBase}/api/blogs/ping`, {
          headers: { Accept: 'application/json' },
        });
        const ct = response.headers.get('content-type') || '';
        if (!ct.includes('application/json')) {
          const text = await response.text();
          console.warn('Blogs server ping did not return JSON:', {
            status: response.status,
            contentType: ct,
            bodyPreview: text.slice(0, 200),
          });
          return;
        }
        const data = await response.json();
        console.log("Blogs server status:", data);
      } catch (error) {
        console.error("Blogs server ping failed:", error);
      }
    };

    // Execute both pings
    pingServer();
    pingBlogsServer();

    // Optional: Set up interval to ping periodically (every 5 minutes)
    const interval = setInterval(() => {
      pingServer();
      pingBlogsServer();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
}