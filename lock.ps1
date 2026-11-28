# قفل صفحة عميل (عدم الدفع) أو فتحها — لا يحذف أي بيانات
# الاستخدام:  .\lock.ps1 ahmad            ← قفل
#             .\lock.ps1 ahmad -Unlock    ← فتح
# بعدها:      git add ahmad; git commit -m "lock: ahmad"; git push
param([Parameter(Mandatory=$true)][string]$Name, [switch]$Unlock)

$Name = $Name.ToLower() -replace '[^a-z0-9-]', ''
$file = Join-Path $PSScriptRoot "$Name\data.json"
if (-not (Test-Path $file)) { Write-Error "ما فيه عميل باسم $Name"; exit 1 }

$utf8 = New-Object System.Text.UTF8Encoding($false)
$text = [IO.File]::ReadAllText($file, $utf8)
$text = $text -replace '(?m)^\s*"locked"\s*:\s*true\s*,\s*\r?\n', ''
if (-not $Unlock) { $text = $text -replace '^\s*\{', "{`n  `"locked`": true," }
[IO.File]::WriteAllText($file, $text, $utf8)

if ($Unlock) { Write-Host "تم فتح صفحة $Name" -ForegroundColor Green }
else { Write-Host "تم قفل صفحة $Name (المندوب يشوف: هذه الصفحة غير متاحة حاليًا)" -ForegroundColor Yellow }
Write-Host "ارفع:  git add $Name; git commit -m 'lock: $Name'; git push"
