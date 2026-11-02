$ErrorActionPreference = 'Stop'
$fontRoot = Join-Path $PSScriptRoot '../src/app/fonts'
New-Item -ItemType Directory -Path $fontRoot -Force | Out-Null
$fonts = @{
  'dm-sans' = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap'
  'cormorant' = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400..600&display=swap'
  'cormorant-italic' = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@1,400..600&display=swap'
}
foreach ($entry in $fonts.GetEnumerator()) {
  $css = (Invoke-WebRequest -UseBasicParsing -Uri $entry.Value -Headers @{ 'User-Agent' = 'Mozilla/5.0' }).Content
  $urls = [regex]::Matches($css, 'https://fonts.gstatic.com/[^)]+')
  $url = $urls[$urls.Count - 1].Value
  $extension = if ($url -match '\.woff2$') { '.woff2' } elseif ($url -match '\.woff$') { '.woff' } else { '.ttf' }
  Invoke-WebRequest -Uri $url -OutFile (Join-Path $fontRoot ($entry.Key + $extension))
  Write-Output ($entry.Key + $extension)
}
