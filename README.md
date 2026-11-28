# EN 16931 / XRechnung / ZUGFeRD / Factur-X Test Invoices

Curated **synthetic** European e-invoicing test fixtures (both compliant and intentionally broken samples) for QA testing ERP exports, XML validators, and compliance pipelines.

All company names, addresses, VAT IDs, Leitweg-IDs, and bank identifiers in this repository are **100% synthetic test fixtures** derived from deterministic test generators (`Nordwerk Software GmbH`, `Atelier Lumière SAS`, `Brandt & Söhne Maschinenbau KG`, and public documentation test IBANs). Zero real taxpayer or financial records are included.

---

## Sample Fixture Quick Matrix (8 Fixtures)

| Fixture File | Syntax & Profile | Expected Status | Triggered Rule ID(s) | Description |
| :--- | :--- | :---: | :--- | :--- |
| [`valid/xrechnung-3.0-ubl-standard.xml`](./valid/xrechnung-3.0-ubl-standard.xml) | OASIS UBL 2.1 (`XRechnung 3.0`) | **PASS** | — | German B2G invoice (`19%` VAT) with valid `Leitweg-ID` (`991-12345-67`) |
| [`valid/xrechnung-3.0-cii-b2g-leitweg.xml`](./valid/xrechnung-3.0-cii-b2g-leitweg.xml) | UN/CEFACT CII (`XRechnung 3.0`) | **PASS** | — | German B2G `XRechnung 3.0` in CII syntax with `BT-10` Leitweg-ID (`991-1234512345-06`), Peppol `0204` EndpointID, and `BR-DE-2/5/6/7` seller contact |
| [`valid/zugferd-en16931-cii-de-mixed-vat.xml`](./valid/zugferd-en16931-cii-de-mixed-vat.xml) | UN/CEFACT CII (`ZUGFeRD / Factur-X EN 16931`) | **PASS** | — | Domestic German B2B invoice mixing `19%` and `7%` VAT rates |
| [`valid/facturx-en16931-cii-cross-border.xml`](./valid/facturx-en16931-cii-cross-border.xml) | UN/CEFACT CII (`Factur-X / ZUGFeRD EN 16931`) | **PASS** | — | Cross-border `DE → FR` B2B invoice with German place-of-supply VAT (`19%`) |
| [`invalid/br-co-14-vat-total-mismatch.xml`](./invalid/br-co-14-vat-total-mismatch.xml) | UN/CEFACT CII (`EN 16931`) | **FAIL** | `BR-CO-14` | `BT-110` (`TaxTotalAmount = 260.00`) does not equal sum of `BG-23` VAT breakdown (`285.00`) |
| [`invalid/br-co-15-due-payable-mismatch.xml`](./invalid/br-co-15-due-payable-mismatch.xml) | UN/CEFACT CII (`EN 16931`) | **FAIL** | `BR-CO-15` | `BT-112` (`GrandTotalAmount = 1795.00`) does not equal `BT-109 (1500.00) + BT-110 (285.00)` |
| [`invalid/br-co-16-amount-due-mismatch.xml`](./invalid/br-co-16-amount-due-mismatch.xml) | UN/CEFACT CII (`EN 16931`) | **FAIL** | `BR-CO-16` | `BT-115` (`DuePayableAmount = 1750.00`) does not equal `BT-112 (1785.00) - BT-113 + BT-114` |
| [`invalid/br-de-15-missing-leitweg-id.xml`](./invalid/br-de-15-missing-leitweg-id.xml) | OASIS UBL 2.1 (`XRechnung 3.0`) | **FAIL** | `BR-DE-15` | Missing mandatory German `cbc:BuyerReference` (`BT-10` / Leitweg-ID); passes raw UBL XSD but fails XRechnung business rules |

---

## One-Click Verification & Reference Guides

### Option 1: Zero-Upload Browser Validation & Viewing (No Java Required)
Drop any XML or hybrid PDF/A-3 file directly into the 100% client-side browser workbench at **[VeriXML](https://verixml.com/en/)**:
- **English**: [EN 16931 Validator](https://verixml.com/en/validator) · [Fixing EN 16931 Errors](https://verixml.com/en/guides/en16931-errors) · [XML to PDF Viewer](https://verixml.com/en/xml-to-pdf)
- **Deutsch (DE)**: [XRechnung 3.0.2 Validator](https://verixml.com/de/xrechnung-validator) · [ZUGFeRD Validator](https://verixml.com/de/zugferd-validator) · [ZUGFeRD Viewer](https://verixml.com/de/zugferd-viewer) · [Leitweg-ID & Peppol-ID Ratgeber](https://verixml.com/de/ratgeber/leitweg-id-und-peppol-id) · [ZUGFeRD & XRechnung Beispiel XML](https://verixml.com/de/ratgeber/zugferd-beispiel-xml)
- **Français (FR)**: [Validateur Factur-X en ligne](https://verixml.com/fr/validateur-factur-x) · [Guide PDP & Chorus Pro Code Service](https://verixml.com/fr/guides/pdp-chorus-pro-code-service-factur-x) · [Facturation électronique auto-entrepreneur](https://verixml.com/fr/facturation-electronique-auto-entrepreneur-gratuit)

Files are parsed and validated **100% locally in browser memory** with zero server uploads, showing exact rule IDs (`BR-CO-14`, `BR-CO-15`, `BR-CO-16`, `BR-DE-15`), expected vs actual decimal values, and localized remediation hints in English, German, and French.

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
