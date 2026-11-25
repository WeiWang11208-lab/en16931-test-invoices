import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const manifest = JSON.parse(readFileSync(resolve(root, 'manifest.json'), 'utf8'));

if (!Array.isArray(manifest.fixtures) || manifest.fixtures.length !== 6) {
  throw new Error('Expected exactly 6 fixtures in manifest.json');
}

for (const item of manifest.fixtures) {
  const full = resolve(root, item.path);
  if (!existsSync(full)) {
    throw new Error(`Missing fixture file: ${item.path}`);
  }
  const xml = readFileSync(full, 'utf8').trim();
  if (!xml.startsWith('<?xml')) {
    throw new Error(`Invalid XML header in: ${item.path}`);
  }
  if (item.syntax === 'UBL-2.1' && !xml.includes('<ubl:Invoice')) {
    throw new Error(`Expected UBL Invoice root in: ${item.path}`);
  }
  if (item.syntax === 'CII' && !xml.includes('<rsm:CrossIndustryInvoice')) {
    throw new Error(`Expected CII CrossIndustryInvoice root in: ${item.path}`);
  }
  if (item.expectedErrors.includes('BR-DE-15') && xml.includes('<cbc:BuyerReference>')) {
    throw new Error(`BR-DE-15 fixture must omit cbc:BuyerReference: ${item.path}`);
  }
}

console.log(`OK: Verified ${manifest.fixtures.length} EN 16931 fixtures against manifest.json.`);
