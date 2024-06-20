const { chromium } = require('playwright');

async function runPlaywright(url, userAgent, locale, timezone) {
    const browser = await chromium.launch({
		headless: false,
		args: ['--disable-gpu'] // NOTE: control GPU
	});
    
    //const defaultUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36';
    
	// Create a new browser context icognito
	const context = await browser.newContext({
		userAgent: userAgent, // Use the custom User-Agent
        locale: locale, // Use the custom locale
        timezoneId: timezone, // Use the custom timezone
	});

	// Create a new browser page
	const page = await context.newPage();

	// Override navigator.getBattery to block battery information
	await page.addInitScript(() => {

		Object.defineProperty(navigator, 'hardwareConcurrency', {
			get() {
			  return 8; // Set this to whatever you want the hardware concurrency to be
			}
		  });

		// NOTE: block battery information
		window.navigator.getBattery = undefined;

		// NOTE: block connection information
		Object.defineProperty(navigator, 'connection', {
			get: () => undefined
		});

		// NOTE: block keyboard information
		Object.defineProperty(navigator, 'keyboard', {
			get: () => undefined
		});

		// NOTE: block platform information
		Object.defineProperty(navigator, 'platform', {
			get: () => { return 'Win32' }
		});

		// NOTE: Randomize common canvas fingerprinting methods by randomizing the pixel data
		(function () {
			CanvasRenderingContext2D.prototype.getImageData = function (a) {
				return function () {
					console.log('Context');
					spoofFromContext(this, a);
					return a.apply(this, arguments);
				};
			}(CanvasRenderingContext2D.prototype.getImageData);

			HTMLCanvasElement.prototype.toDataURL = (function () {
				var original = HTMLCanvasElement.prototype.toDataURL;
				return function () {
					spoof(this);
					return original.apply(this, arguments);
				};
			})();

			function spoof(canvas) {
				var ctx = canvas.getContext('2d');
				spoofFromContext(ctx);
			}

			function spoofFromContext(ctx, a) {
				if (!a) a = ctx.getImageData;
				var data = a.call(ctx, 0, 0, ctx.canvas.width, ctx.canvas.height);
				for (var c = 0; c < data.data.length; c = c + 4) {
					var r = data.data[c];
					var g = data.data[c + 1];
					var b = data.data[c + 2];
					var a = data.data[c + 3];

					if (a != 0) {
						data.data[c] = r - Math.random();
						data.data[c + 1] = g - Math.random();
						data.data[c + 2] = b - Math.random();
						data.data[c + 3] = a - Math.random();
					}
				}
				ctx.putImageData(data, 0, 0);
				console.log('Spoofed');
			}
		})();

		// NOTE: Randomize the offsetHeight and offsetWidth properties of the HTMLElement to prevent fonts fingerprinting method
		let rand = {
			"noise": function () {
				let SIGN = Math.random() < Math.random() ? -1 : 1;
				return Math.floor(Math.random() + SIGN * Math.random());
			},
			"sign": function () {
				const tmp = [-1, -1, -1, -1, -1, -1, +1, -1, -1, -1];
				const index = Math.floor(Math.random() * tmp.length);
				return tmp[index];
			}
		};
		Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
			get() {
				const height = Math.floor(this.getBoundingClientRect()
					.height);
				const valid = height && rand.sign() === 1;
				const result = valid ? height + rand.noise() : height;

				return result;
			}
		});
		Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
			get() {
				const width = Math.floor(this.getBoundingClientRect()
					.width);
				const valid = width && rand.sign() === 1;
				const result = valid ? width + rand.noise() : width;

				return result;
			}
		});

	});

	// Enable request interception
	await page.route('**/*', (route) => {
		const request = route.request();
		const headers = { ...request.headers() };

		// NOTE: Remove the If-None-Match header
		delete headers['If-None-Match'];
		

		// NOTE: control Accept-Encoding
		headers['Accept-Encoding'] = 'gzip, deflate, br';

		// NOTE: Control Accept
		headers['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8';

		// Continue the request with modified headers
		route.continue({ headers });
	});

	await page.setViewportSize({
		width: 1920, height: 1080, // NOTE: control screen resolution
	});

	// Navigate to the website
	await page.goto(url);
	// await page.goto('https://browserleaks.com/canvas');
}

module.exports = { runPlaywright };