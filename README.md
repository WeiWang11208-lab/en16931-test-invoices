# EN 16931 / XRechnung / ZUGFeRD / Factur-X Test Invoices

Curated **synthetic** European e-invoicing test fixtures (both compliant and intentionally broken samples) for QA testing ERP exports, XML validators, and compliance pipelines.

All company names, addresses, VAT IDs, Leitweg-IDs, and bank identifiers in this repository are **100% synthetic test fixtures** derived from deterministic test generators (`Nordwerk Software GmbH`, `Atelier Lumière SAS`, `Brandt & Söhne Maschinenbau KG`, and public documentation test IBANs). Zero real taxpayer or financial records are included.

---

## Sample Fixture Quick Matrix

| Fixture File | Syntax & Profile | Expected Status | Triggered Rule ID(s) | Description |
| :--- | :--- | :---: | :--- | :--- |
| [`valid/xrechnung-3.0-ubl-standard.xml`](./valid/xrechnung-3.0-ubl-standard.xml) | OASIS UBL 2.1 (`XRechnung 3.0`) | **PASS** | — | German B2G invoice (`19%` VAT) with valid `Leitweg-ID` (`991-12345-67`) |
| [`valid/zugferd-en16931-cii-de-mixed-vat.xml`](./valid/zugferd-en16931-cii-de-mixed-vat.xml) | UN/CEFACT CII (`ZUGFeRD / Factur-X EN 16931`) | **PASS** | — | Domestic German B2B invoice mixing `19%` and `7%` VAT rates |
| [`valid/facturx-en16931-cii-cross-border.xml`](./valid/facturx-en16931-cii-cross-border.xml) | UN/CEFACT CII (`Factur-X / ZUGFeRD EN 16931`) | **PASS** | — | Cross-border `DE → FR` B2B invoice with German place-of-supply VAT (`19%`) |
| [`invalid/br-co-14-vat-total-mismatch.xml`](./invalid/br-co-14-vat-total-mismatch.xml) | UN/CEFACT CII (`EN 16931`) | **FAIL** | `BR-CO-14` | `BT-110` (`TaxTotalAmount = 260.00`) does not equal sum of `BG-23` VAT breakdown (`285.00`) |
| [`invalid/br-co-15-due-payable-mismatch.xml`](./invalid/br-co-15-due-payable-mismatch.xml) | UN/CEFACT CII (`EN 16931`) | **FAIL** | `BR-CO-15` | `BT-112` (`GrandTotalAmount = 1795.00`) does not equal `BT-109 (1500.00) + BT-110 (285.00)` |
| [`invalid/br-de-15-missing-leitweg-id.xml`](./invalid/br-de-15-missing-leitweg-id.xml) | OASIS UBL 2.1 (`XRechnung 3.0`) | **FAIL** | `BR-DE-15` | Missing mandatory German `cbc:BuyerReference` (`BT-10` / Leitweg-ID); passes raw UBL XSD but fails XRechnung business rules |

---

## One-Click Verification

### Option 1: Zero-Upload Browser Validation (No Java Required)
Drop any XML file from `valid/` or `invalid/` directly into the client-side browser validator at **[VeriXML](https://verixml.com/en/)** ([English Validator](https://verixml.com/en/validator) · [Deutsch / ZUGFeRD Validator](https://verixml.com/de/) · [DE Validator Direkt](https://verixml.com/de/zugferd-validator)):
- Files are parsed and validated **100% locally in browser memory** with zero server uploads.
- You will see exact rule IDs (`BR-CO-14`, `BR-CO-15`, `BR-DE-15`), expected vs actual decimal values, and human-readable remediation hints in English, German, or French.

### Option 2: Local Manifest & XML Sanity Check (CLI)
Run the included zero-dependency check script with [Bun](https://bun.sh) or Node.js 20+:

```bash
bun scripts/verify-manifest.mjs
# or
node scripts/verify-manifest.mjs
```

---

## License
- Synthetic XML test fixtures & `manifest.json`: **[CC0-1.0](./LICENSE-DATA)** (Public Domain Dedication)
- Verification script (`scripts/`): **[MIT](./LICENSE-CODE)**
