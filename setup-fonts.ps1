# Copies the D&D book fonts from the local Homebrewery install into ./fonts/.
# fonts/ is gitignored - these fonts are redistributed with Homebrewery but we
# keep them out of this public repo. Run once per clone:
#   powershell -ExecutionPolicy Bypass -File setup-fonts.ps1

param([string]$src = (Join-Path $PSScriptRoot '..\the_homebrewery\themes\fonts\5e'))
$dst = Join-Path $PSScriptRoot 'fonts'

$files = @(
  'Bookinsanity.woff2',
  'Bookinsanity Bold.woff2',
  'Bookinsanity Italic.woff2',
  'Bookinsanity Bold Italic.woff2',
  'Mr Eaves Small Caps.woff2',
  'Scaly Sans.woff2',
  'Scaly Sans Bold.woff2',
  'Scaly Sans Italic.woff2',
  'Scaly Sans Bold Italic.woff2',
  'Scaly Sans Caps.woff2',
  'Nodesto Caps Condensed Bold.woff2'
)

if (-not (Test-Path $src)) {
  Write-Host "Source font folder not found: $src" -ForegroundColor Red
  Write-Host "Edit `$src in this script to point at your Homebrewery themes\fonts\5e folder."
  exit 1
}

New-Item -ItemType Directory -Force -Path $dst | Out-Null

$missing = @()
foreach ($f in $files) {
  $from = Join-Path $src $f
  if (Test-Path $from) {
    Copy-Item -Path $from -Destination $dst -Force
    Write-Host "  copied  $f"
  } else {
    $missing += $f
    Write-Host "  MISSING $f" -ForegroundColor Yellow
  }
}

if ($missing.Count -gt 0) {
  Write-Host "`n$($missing.Count) font(s) missing - the dashboard will fall back to system fonts for those." -ForegroundColor Yellow
} else {
  Write-Host "`nAll fonts copied to $dst"
}
