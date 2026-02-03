import * as cheerio from 'cheerio';
import axios from 'axios';

const args = process.argv.slice(2, 4);

// Check are args exist
if (!args[0] || !args[1]) {
    console.log('Please provide two arguments. Example: npm start https://website.com/example #exampleId');
    process.exit(0);
}

// Check is first arg a valid url
try {
    new URL(args[0]);
} catch (e) {
    console.log('First argument must be a valid URL. Example: https://website.com/example');
    process.exit(0);
}

// Check is second arg a valid CSS selector
const cssSelectorPattern = /^(?:[a-zA-Z0-9\s*[\]()="'#.:>+~^$|*,-]|\\[0-9a-fA-F]{1,6}|\\. )+$/;
if (!cssSelectorPattern.test(args[1])) {
    console.log('First argument must be an url. Example: https://website.com/example');
    process.exit(0);
}

const url = new URL(args[0]);
const selector = args[1];

// Load page
const data = await parsePage(url)
const $ = cheerio.load(data);

// Check is there an element, matching selector
 if ($(selector).text().trim()) {
     console.log($(selector).text().trim())
 }
// Else returning error
else {
    console.log(`No elements matching ${selector} at page ${url}`);
}

async function parsePage(url) {
    try {
        return (await axios.get(url)).data;
    } catch (e) {
        console.error('Failed to load a page. Please, check your connection, verify url and retry.');
        throw e;
    }
}