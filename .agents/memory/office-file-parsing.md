---
name: Parsing xlsx/docx in this environment
description: How to extract Excel/Word content when python and npm packages are unavailable
---

# Parsing Office files (xlsx / docx) here

There is **no `python3`** in this environment, and `pnpm add xlsx` fails at the
workspace root (`ERR_PNPM_ADDING_TO_ROOT`); `installLanguagePackages(["xlsx"])`
hits the same root guard. So the SheetJS/openpyxl route is not available out of the box.

**Working approach:** xlsx and docx are ZIP archives. `unzip` the file to `/tmp`, then
parse the XML directly in the `code_execution` sandbox with regex:
- Shared strings: `xl/sharedStrings.xml` → array of `<si>` (join all `<t>` runs for rich text).
- Each sheet: `xl/worksheets/sheetN.xml`; map sheet name→rId→file via `xl/_rels/workbook.xml.rels`.
- Cells: `<c r=.. s=.. t=..>`; `t="s"` → shared-string index, `t="inlineStr"`/`str` → inline,
  else numeric in `<v>`. Capture the `s` style index.
- Number formats: `s` → `cellXfs[s].numFmtId` in `xl/styles.xml`. Builtins (1,2,3,9,10,14,17,…)
  plus any `<numFmt>` custom codes (e.g. 164=`0.0%`, 165=`#,##0`). **Apply every fmtId you see**
  (`grep -o '<numFmt[^/]*/>'` to list customs) — missing 164/165 silently drops percent/comma
  formatting and leaves raw values like `367465` / `1`.
- Merged cells: `<mergeCell ref="A1:C1">` → render with rowSpan/colSpan and skip covered cells.

**Why:** faithful reproduction ("no value lost") requires reading values AND number formats;
the obvious tooling is blocked, so the unzip-and-parse-XML path is the reliable one.
