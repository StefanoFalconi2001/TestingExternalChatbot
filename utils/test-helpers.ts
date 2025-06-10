import { Page, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Performs visual comparison between a current screenshot and a baseline
 * @param page - Playwright page object
 * @param screenshotPath - Path to save the screenshot
 * @param threshold - Pixel difference threshold (0-1)
 */
export async function visualCompare(page: Page, screenshotPath: string, threshold = 0.2): Promise<boolean> {
  // Create directory if it doesn't exist
  const dir = path.dirname(screenshotPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Take a new screenshot
  await page.screenshot({ path: screenshotPath });
  
  // Check if baseline exists
  const baselinePath = screenshotPath.replace('.png', '.baseline.png');
  if (!fs.existsSync(baselinePath)) {
    console.log(`Baseline doesn't exist at ${baselinePath}. Creating it now.`);
    fs.copyFileSync(screenshotPath, baselinePath);
    return true;
  }

  // Compare with baseline
  const screenshot1Buffer = fs.readFileSync(screenshotPath);
  const screenshot2Buffer = fs.readFileSync(baselinePath);
  
  // Simple buffer comparison (in a real project, you'd use a proper image comparison library)
  const isMatch = screenshot1Buffer.equals(screenshot2Buffer);
  
  if (!isMatch) {
    console.log(`Visual difference detected in ${screenshotPath}`);
    // Save diff image for review (in a real project)
    const diffPath = screenshotPath.replace('.png', '.diff.png');
    fs.copyFileSync(screenshotPath, diffPath);
  }
  
  return isMatch;
}

/**
 * Performs basic accessibility checks on the current page
 * @param page - Playwright page object
 */
export async function runAccessibilityChecks(page: Page): Promise<void> {
  // In a real implementation, you would use a library like axe-core
  // This is a simplified version that checks for some basic accessibility issues
  
  // Check for alt text on images
  const imagesWithoutAlt = await page.$$eval('img:not([alt])', (imgs) => imgs.length);
  expect(imagesWithoutAlt, 'Images should have alt text').toBe(0);
  
  // Check for proper heading structure
  const headingOrder = await page.$$eval('h1, h2, h3, h4, h5, h6', (headings) => {
    return headings.map(h => ({
      level: parseInt(h.tagName.substring(1)),
      text: h.textContent
    }));
  });
  
  // Simple check that headings don't skip levels
  let prevLevel = 0;
  for (const heading of headingOrder) {
    expect(heading.level, `Heading levels should not skip (found ${heading.level} after ${prevLevel})`).toBeLessThanOrEqual(prevLevel + 1);
    prevLevel = heading.level;
  }
  
  // Check for sufficient color contrast (simplified)
  // In a real implementation, you would use a proper color contrast checker
  console.log('Note: Full accessibility testing would require additional tools like axe-core');
}

/**
 * Collects performance metrics for the page
 * @param page - Playwright page object
 */
export async function collectPerformanceMetrics(page: Page): Promise<Record<string, number>> {
  const metrics = await page.evaluate(() => {
    const perfEntries = performance.getEntriesByType('navigation');
    if (perfEntries.length > 0) {
      const navigationEntry = perfEntries[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime,
        load: navigationEntry.loadEventEnd - navigationEntry.startTime,
        firstPaint: 0, // Would need to use Performance API for this
        firstContentfulPaint: 0 // Would need to use Performance API for this
      };
    }
    return {
      domContentLoaded: 0,
      load: 0,
      firstPaint: 0,
      firstContentfulPaint: 0
    };
  });
  
  console.log('Performance metrics:', metrics);
  return metrics;
}

/**
 * Logs test information to a custom report
 * @param testInfo - Test information object
 * @param data - Additional data to log
 */
export function logTestInfo(testInfo: { title: string }, data: Record<string, any>): void {
  const logDir = path.join(process.cwd(), 'test-logs');
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }
  
  const logFile = path.join(logDir, 'test-execution.log');
  const logEntry = {
    test: testInfo.title,
    timestamp: new Date().toISOString(),
    ...data
  };
  
  fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
}
