import fs from 'fs/promises';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { chromium } from 'playwright';

// Extract routes from the manifest, excluding API routes and token-protected routes
function extractRoutesFromManifest() {
    const staticRoutes = [
        '/',
        '/404',
        '/amas',
        '/amas/geohot',
        '/amas/sal',
        '/amas/vitalik',
        '/arcade',
        '/arcade/shop',
        '/arcade/showcase/my',
        '/arcade/showcase/vote',
        '/bin/gallery',
        '/bin/prelaunch',
        '/brand',
        '/clubs',
        '/congressional-app-challenge',
        '/content/covid19',
        '/content/it-admins',
        '/content/sponsorship',
        '/content/sunsetting-som',
        '/content/transparency/may-2020',
        '/elon',
        '/email-verified',
        '/events',
        '/fiscal-sponsorship',
        '/fiscal-sponsorship/about',
        '/fiscal-sponsorship/apply',
        '/fiscal-sponsorship/apply/success',
        '/fiscal-sponsorship/climate',
        '/fiscal-sponsorship/directory',
        '/fiscal-sponsorship/first',
        '/fiscal-sponsorship/open-source',
        '/hackathons',
        '/hackathons/grant',
        '/jobs',
        '/jobs/brand-director',
        '/jobs/clubs-lead',
        '/jobs/customer-success-lead',
        '/jobs/education-engineer',
        '/jobs/events-designer',
        '/jobs/executive-assistant',
        '/jobs/executive-producer',
        '/jobs/hcb-ops-associate',
        '/jobs/hcb-ops-lead',
        '/jobs/lead-hacker',
        '/jobs/philanthropy-communications-lead',
        '/jobs/vp-donor-engagement',
        '/minecraft',
        '/night',
        '/onboard',
        '/onboard/first',
        '/onboard/gallery',
        '/onboard/gallery/page',
        '/opensource',
        '/philanthropy',
        '/philanthropy/supporters',
        '/philosophy',
        '/press',
        '/preston-werner',
        '/preston-werner-2022',
        '/relon',
        '/replit',
        '/santa',
        '/security',
        '/ship',
        '/slack',
        '/steve',
        '/stickers',
        '/team',
        '/winter'
    ];

    // Add some example dynamic routes (excluding token-protected ones)
    const dynamicRouteExamples = [
        '/deprecated/cloud9',
        '/deprecated/challenge',
        '/deprecated/tech_domains',
        '/fiscal-sponsorship/climate/usa',
        '/fiscal-sponsorship/climate/global',
        '/fiscal-sponsorship/directory/climate',
        '/fiscal-sponsorship/directory/education',
        '/fiscal-sponsorship/directory/open-source',
        '/fiscal-sponsorship/directory/climate/usa',
        '/onboard/board/example-board'
    ];

    return [...staticRoutes, ...dynamicRouteExamples].sort();
}

async function compareRoutes() {
    const site1 = 'https://hcsite.vercel.app';
    const site2 = 'https://hackclub.com';

    console.log('🚀 Starting visual regression testing...\n');

    const routes = extractRoutesFromManifest();

    console.log(`📋 Found ${routes.length} routes to test:`);
    routes.forEach(route => console.log(`  ${route}`));
    console.log('');

    // Create screenshots directory
    await fs.mkdir('./screenshots', { recursive: true });
    await fs.mkdir('./screenshots/diffs', { recursive: true });

    const browser = await chromium.launch({
        headless: true,
        timeout: 300000 // 5 minutes launch timeout
    });
    const context = await browser.newContext({
        viewport: { width: 1920, height: 1080 },
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

    const results = [];
    let i = 0;

    for (const route of routes) {
        i++;
        const routeName = route.replace(/\//g, '_').replace(/^_$/, 'home');
        console.log(`📸 [${i}/${routes.length}] Testing route: ${route}`);

        const page = await context.newPage();
        let site1Success = false;
        let site2Success = false;
        let site1Error = '';
        let site2Error = '';
        let status = 'ERROR';
        let hasChanges = false;
        let pixelDiffCount = 0;

        try {
            // Screenshot site 1
            console.log(`  📷 [${route}] Capturing ${site1}${route}`);
            const response1 = await page.goto(`${site1}${route}`, {
                waitUntil: 'networkidle',
                timeout: 60000 // Increased timeout for parallel processing
            });

            if (response1.status() === 404) {
                console.log(`  ⚠️  [${route}] Site 1: 404 Not Found`);
                site1Error = '404 Not Found';
            } else if (response1.status() >= 400) {
                console.log(`  ⚠️  [${route}] Site 1: HTTP ${response1.status()}`);
                site1Error = `HTTP ${response1.status()}`;
            } else {
                await page.waitForTimeout(3000); // Increased wait for dynamic content

                await page.screenshot({
                    path: `./screenshots/${routeName}_site1.png`,
                    fullPage: true
                });
                site1Success = true;
                console.log(`  ✅ [${route}] Site 1: Screenshot captured`);
            }

        } catch (error) {
            console.log(`  ❌ [${route}] Site 1 failed: ${error.message}`);
            site1Error = error.message.split('\n')[0]; // Keep error concise
        }

        try {
            // Screenshot site 2
            console.log(`  📷 [${route}] Capturing ${site2}${route}`);
            const response2 = await page.goto(`${site2}${route}`, {
                waitUntil: 'networkidle',
                timeout: 60000 // Increased timeout
            });

            if (response2.status() === 404) {
                console.log(`  ⚠️  [${route}] Site 2: 404 Not Found`);
                site2Error = '404 Not Found';
            } else if (response2.status() >= 400) {
                console.log(`  ⚠️  [${route}] Site 2: HTTP ${response2.status()}`);
                site2Error = `HTTP ${response2.status()}`;
            } else {
                await page.waitForTimeout(3000); // Increased wait

                await page.screenshot({
                    path: `./screenshots/${routeName}_site2.png`,
                    fullPage: true
                });
                site2Success = true;
                console.log(`  ✅ [${route}] Site 2: Screenshot captured`);
            }

        } catch (error) {
            console.log(`  ❌ [${route}] Site 2 failed: ${error.message}`);
            site2Error = error.message.split('\n')[0]; // Keep error concise
        }

        // Determine status
        if (site1Success && site2Success) {
            try {
                const img1Data = await fs.readFile(`./screenshots/${routeName}_site1.png`);
                const img2Data = await fs.readFile(`./screenshots/${routeName}_site2.png`);

                const img1 = PNG.sync.read(img1Data);
                const img2 = PNG.sync.read(img2Data);

                const { width, height } = img1;
                const diff = new PNG({ width, height });

                pixelDiffCount = pixelmatch(
                    img1.data,
                    img2.data,
                    diff.data,
                    width,
                    height,
                    { threshold: 0.1, includeAA: true }
                );

                if (pixelDiffCount > 100) { // Threshold for considering images different (e.g., > 100 different pixels)
                    hasChanges = true;
                    status = 'DIFFERENT';
                    // Save the diff image
                    await fs.writeFile(`./screenshots/diffs/${routeName}_diff.png`, PNG.sync.write(diff));
                    console.log(`  🔍 [${route}] Significant pixel difference detected (${pixelDiffCount} pixels). Diff image saved.`);
                } else {
                    status = 'SAME';
                    console.log(`  👍 [${route}] Files are visually similar (${pixelDiffCount} different pixels).`);
                }
            } catch (error) {
                status = 'COMPARISON_ERROR';
                pixelDiffCount = -1; // Indicate error
                console.log(`  ⚠️  [${route}] Could not compare images: ${error.message.split('\n')[0]}`);
            }
        } else if (!site1Success && !site2Success) {
            status = 'BOTH_FAILED';
        } else if (!site1Success) {
            status = 'SITE1_FAILED';
        } else if (!site2Success) {
            status = 'SITE2_FAILED';
        }

        results.push({
            route,
            site1Success,
            site2Success,
            site1Error,
            site2Error,
            hasChanges,
            status,
            pixelDiffCount
        });

        await page.close();
        console.log(`🏁 [${i}/${routes.length}] Finished route: ${route} - Status: ${status}\n`);
    }

    await browser.close();

    // Generate report
    console.log('\n' + '='.repeat(70));
    console.log('📊 VISUAL REGRESSION TEST REPORT');
    console.log('='.repeat(70));

    const summary = {
        total: results.length,
        same: results.filter(r => r.status === 'SAME').length,
        different: results.filter(r => r.status === 'DIFFERENT').length,
        site1Failed: results.filter(r => r.status === 'SITE1_FAILED').length,
        site2Failed: results.filter(r => r.status === 'SITE2_FAILED').length,
        bothFailed: results.filter(r => r.status === 'BOTH_FAILED').length,
        comparisonError: results.filter(r => r.status === 'COMPARISON_ERROR').length
    };

    console.log(`\n📈 Summary:`);
    console.log(`  Total routes tested: ${summary.total}`);
    console.log(`  ✅ No changes: ${summary.same}`);
    console.log(`  🎨 Visually different: ${summary.different}`);
    console.log(`  ❌ Site 1 failed: ${summary.site1Failed}`);
    console.log(`  ❌ Site 2 failed: ${summary.site2Failed}`);
    console.log(`  ❌ Both failed: ${summary.bothFailed}`);
    console.log(`  ⚠️  Comparison errors: ${summary.comparisonError}`);

    console.log(`\n📋 Detailed Results:`);
    results.forEach(result => {
        const icons = {
            'SAME': '✅',
            'DIFFERENT': '🔍',
            'SITE1_FAILED': '❌',
            'SITE2_FAILED': '❌',
            'BOTH_FAILED': '💥',
            'COMPARISON_ERROR': '⚠️',
            'ERROR': '❌'
        };

        const icon = icons[result.status] || '❓';
        let detail = result.status;
        if (result.status === 'DIFFERENT') {
            detail += ` (${result.pixelDiffCount}px diff)`;
        } else if (result.status === 'SAME' && result.pixelDiffCount > 0) {
            detail += ` (${result.pixelDiffCount}px diff)`;
        } else if (result.status === 'COMPARISON_ERROR') {
            detail += ` (Error)`;
        }
        console.log(`  ${icon} ${result.route.padEnd(40)} ${detail}`);
    });

    if (summary.different > 0) {
        console.log(`
🎨 Routes with visual differences (diff images in ./screenshots/diffs/):`);
        results
            .filter(r => r.status === 'DIFFERENT')
            .forEach(r => console.log(`  • ${r.route}`));
    }

    if (summary.site1Failed > 0) {
        console.log(`\n❌ Routes that failed on Site 1 (${site1}):`);
        results
            .filter(r => r.status === 'SITE1_FAILED')
            .forEach(r => console.log(`  • ${r.route} - ${r.site1Error}`));
    }

    if (summary.site2Failed > 0) {
        console.log(`\n❌ Routes that failed on Site 2 (${site2}):`);
        results
            .filter(r => r.status === 'SITE2_FAILED')
            .forEach(r => console.log(`  • ${r.route} - ${r.site2Error}`));
    }

    console.log(`\n📁 Screenshots saved to: ./screenshots/`);

    // Save detailed JSON report
    const report = {
        timestamp: new Date().toISOString(),
        sites: { site1, site2 },
        summary,
        results
    };

    await fs.writeFile(
        './screenshots/report.json',
        JSON.stringify(report, null, 2)
    );

    console.log(`📄 Detailed report saved to: ./screenshots/report.json`);

    // Create HTML report
    const htmlReport = generateHTMLReport(report);
    await fs.writeFile('./screenshots/report.html', htmlReport);
    console.log(`🌐 HTML report saved to: ./screenshots/report.html`);

    return results;
}

function generateHTMLReport(report) {
    const routeToFilename = (route) => route.replace(/\//g, '_').replace(/^_$/, 'home');
    return `
<!DOCTYPE html>
<html>
<head>
    <title>Visual Regression Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .route { margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 3px; }
        .same { border-left: 4px solid #4CAF50; }
        .different { border-left: 4px solid #FF9800; }
        .error { border-left: 4px solid #F44336; }
        .screenshots { display: flex; gap: 10px; margin-top: 10px; }
        .screenshot { max-width: 300px; }
        .screenshot img { width: 100%; border: 1px solid #ddd; }
    </style>
</head>
<body>
    <h1>Visual Regression Test Report</h1>
    <p>Generated: ${report.timestamp}</p>
    <p>Comparing: <strong>${report.sites.site1}</strong> vs <strong>${report.sites.site2}</strong></p>
    
    <div class="summary">
        <h2>Summary</h2>
        <ul>
            <li>Total routes: ${report.summary.total}</li>
            <li>✅ No changes: ${report.summary.same}</li>
            <li>🎨 Visually different: ${report.summary.different}</li>
            <li>❌ Errors: ${report.summary.site1Failed + report.summary.site2Failed + report.summary.bothFailed + report.summary.comparisonError}</li>
        </ul>
    </div>
    
    <h2>Results</h2>
    ${report.results.map(result => {
        const className = result.status === 'SAME' ? 'same' :
            result.status === 'DIFFERENT' ? 'different' : 'error';

        const routeFilenameBase = routeToFilename(result.route);

        return `
        <div class="route ${className}">
            <h3>${result.route}</h3>
            <p>Status: <strong>${result.status}</strong></p>
            ${result.pixelDiffCount > 0 && result.status === 'DIFFERENT' ? `<p>Pixel Difference: ${result.pixelDiffCount} pixels</p>` : ''}
            ${result.site1Success && result.site2Success ? `
                <div class="screenshots">
                    <div class="screenshot">
                        <h4>Site 1 (${report.sites.site1})</h4>
                        <img src="${routeFilenameBase}_site1.png" alt="Site 1 screenshot for ${result.route}">
                    </div>
                    <div class="screenshot">
                        <h4>Site 2 (${report.sites.site2})</h4>
                        <img src="${routeFilenameBase}_site2.png" alt="Site 2 screenshot for ${result.route}">
                    </div>
                    ${result.status === 'DIFFERENT' ? `
                    <div class="screenshot">
                        <h4>Diff</h4>
                        <img src="diffs/${routeFilenameBase}_diff.png" alt="Diff image for ${result.route}">
                    </div>
                    ` : ''}
                </div>
            ` : ''}
            ${result.site1Error ? `<p>Site 1 Error: ${result.site1Error}</p>` : ''}
            ${result.site2Error ? `<p>Site 2 Error: ${result.site2Error}</p>` : ''}
        </div>
      `;
    }).join('')}
</body>
</html>
  `;
}

// Run the comparison
compareRoutes().catch(console.error);