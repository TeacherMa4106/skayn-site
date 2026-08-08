$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
Push-Location $projectRoot

try {
  Write-Host '===== Skayn Site Precheck =====' -ForegroundColor Cyan
  npm run precheck
  if ($LASTEXITCODE -ne 0) {
    throw "Precheck failed with exit code $LASTEXITCODE"
  }
  Write-Host 'All checks passed.' -ForegroundColor Green
}
finally {
  Pop-Location
}

