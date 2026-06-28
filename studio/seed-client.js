const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

const projectId = '8fihazwn';
const dataset = 'production';
const token = process.argv[2] || process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error('Error: Please provide your Sanity Write Token as an argument or set SANITY_WRITE_TOKEN env var.');
  console.error('Usage: node seed-client.js YOUR_WRITE_TOKEN');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  useCdn: false,
  apiVersion: '2024-01-01',
});

const ndjsonPath = path.join(__dirname, 'seed.ndjson');
if (!fs.existsSync(ndjsonPath)) {
  console.error('Error: seed.ndjson not found in the same folder.');
  process.exit(1);
}

const lines = fs.readFileSync(ndjsonPath, 'utf8').split('\n').filter(Boolean);
const docs = lines.map(line => JSON.parse(line));

async function seed() {
  console.log(`Starting seed of ${docs.length} documents into Sanity dataset "${dataset}"...`);
  const transaction = client.transaction();
  
  for (const doc of docs) {
    transaction.createOrReplace(doc);
  }
  
  try {
    await transaction.commit();
    console.log('🎉 Successfully seeded all portfolio data to Sanity!');
  } catch (err) {
    console.error('❌ Failed to seed data:', err);
  }
}

seed();
