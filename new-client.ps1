# إنشاء مجلد عميل جديد في بابي
# الاستخدام:  .\new-client.ps1 ahmad
param([Parameter(Mandatory=$true)][string]$Name)

$root = $PSScriptRoot
$Name = $Name.ToLower() -replace '[^a-z0-9-]', ''
if (-not $Name) { Write-Error "الاسم يجب أن يكون حروفًا إنجليزية وأرقامًا فقط"; exit 1 }
$dir = Join-Path $root $Name
if (Test-Path $dir) { Write-Error "المجلد $Name موجود مسبقًا"; exit 1 }

New-Item -ItemType Directory -Path (Join-Path $dir "images") | Out-Null
Copy-Item (Join-Path $root "t\client-index.html") (Join-Path $dir "index.html")
Copy-Item (Join-Path $root "t\data.template.json") (Join-Path $dir "data.json")

Write-Host ""
Write-Host "تم إنشاء العميل: $Name" -ForegroundColor Green
Write-Host "1) ضع الصور الثلاث في:  $Name\images\   (house.jpg, gate.jpg, apartment-door.jpg)"
Write-Host "2) عدّل البيانات في:     $Name\data.json"
Write-Host "3) ارفع:  git add $Name; git commit -m 'client: $Name'; git push"
Write-Host "الرابط بعد الرفع:  https://$Name.babi.sa  أو  https://babi.sa/$Name/"
