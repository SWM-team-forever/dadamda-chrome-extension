const puppeteer = require('puppeteer');
let browser, page;

const puppeteerArgs = [
    `--disable-extensions-except=${__dirname}`,
    `--load-extension=${__dirname}`,
    '--disable-features=DialMediaRouteProvider',
];

describe('Google Login', () => {

    beforeEach(async function () {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 200,
            args: puppeteerArgs
        });
        [page] = await browser.pages();
    });

    afterEach(() => browser.close());

    it('displays popup', (async () => {
        const targets = await browser.targets();
        const extensionTarget = targets.find(target => target.type() === 'service_worker');
        const partialExtensionUrl = extensionTarget.url() || '';
        const [, , extensionId] = partialExtensionUrl.split('/');

        const extensionUrl = `chrome-extension://${extensionId}/assets/login/login.html`;

        await page.goto(extensionUrl, {waitUntil: ['domcontentloaded', "networkidle2"]});

        const popupHeading = await page.$eval('title', (e => e.innerText));
        expect(popupHeading).toEqual('Dadamda Login');
    }));

});
