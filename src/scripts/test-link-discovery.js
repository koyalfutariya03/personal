// scripts/test-link-discovery.js
const puppeteer = require('puppeteer');
const fs = require('fs');

async function testLinkDiscovery() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  
  try {
    console.log('Testing link discovery...');
    
    // Test homepage → all-course-links discovery
    await page.goto('https://connectingdotserp.com');
    
    const footerLinks = await page.$$eval('footer a[href*="all-course-links"]', 
      links => links.map(link => link.href)
    );
    
    console.log(`Found ${footerLinks.length} links to /all-course-links in footer`);
    
    // Go to all-course-links page
    await page.goto('https://connectingdotserp.com/all-course-links');
    
    // Count total links
    const totalLinks = await page.$$eval('a[href*="course-in-"]', 
      links => links.length
    );
    
    console.log(`Total course links found: ${totalLinks}`);
    
    // Test specific problematic links
    const problemLinks = [
      'hr-training-course-in-shivaji-nagar',
      'hr-training-course-in-nagpur',
      'sap-course-in-pune',
      'sap-fice-course-in-mumbai',
      'ui-ux-course-in-agra',
      'hr-training-course-in-hinjewadi'
    ];
    
    for (const link of problemLinks) {
      const linkExists = await page.$(`a[href*="${link}"]`);
      console.log(`Link ${link} exists: ${!!linkExists}`);
    }
    
    // Test page load performance
    const performanceMetrics = await page.metrics();
    console.log('Page metrics:', {
      JSHeapUsedSize: Math.round(performanceMetrics.JSHeapUsedSize / 1024 / 1024) + 'MB',
      JSHeapTotalSize: Math.round(performanceMetrics.JSHeapTotalSize / 1024 / 1024) + 'MB'
    });
    
  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
  }
}

testLinkDiscovery();