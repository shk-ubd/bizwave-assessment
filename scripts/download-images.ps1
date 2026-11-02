$ErrorActionPreference = 'Stop'
$imageRoot = Join-Path $PSScriptRoot '../public/images'
$photos = @{
  'hero' = 'photo-1516483638261-f4dbaf036963'
  'maldives' = 'photo-1514282401047-d79a71a590e8'
  'istanbul' = 'photo-1524231757912-21f4fe3a7200'
  'dubai' = 'photo-1512453979798-5ea266f8880c'
  'paris' = 'photo-1502602898657-3e91760cbb34'
  'tokyo' = 'photo-1540959733332-eab4deabeeaf'
  'london' = 'photo-1513635269975-59663e0ac1ad'
  'hotel' = 'photo-1566073771259-6a8506099945'
  'stay' = 'photo-1571896349842-33c89424de2d'
  'flight' = 'photo-1436491865332-7a61a109cc05'
  'visa' = 'photo-1488646953014-85cb44e25828'
  'car' = 'photo-1503376780353-7e6692767b70'
  'economy' = 'photo-1549317661-bd32c8ce0db2'
  'suv' = 'photo-1519641471654-76ce0107ad1b'
  'portrait' = 'photo-1580489944761-15a19d654956'
}
foreach ($entry in $photos.GetEnumerator()) {
  $width = if ($entry.Key -eq 'hero') { 2200 } else { 1000 }
  $uri = 'https://images.unsplash.com/' + $entry.Value + '?auto=format&fit=crop&w=' + $width + '&q=85'
  Invoke-WebRequest -Uri $uri -OutFile (Join-Path $imageRoot ($entry.Key + '.jpg'))
  Write-Output ($entry.Key + ': downloaded')
}
