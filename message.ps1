# رسالة تسليم الصفحة للعميل (واتساب) — تُطبع وتُنسخ للحافظة
# الاستخدام:  .\message.ps1 ahmad
param([Parameter(Mandatory=$true)][string]$Name)

$Name = $Name.ToLower() -replace '[^a-z0-9-]', ''
if (-not (Test-Path (Join-Path $PSScriptRoot $Name))) { Write-Error "ما فيه عميل باسم $Name"; exit 1 }

$msg = @"
السلام عليكم، صفحتك في بابي جاهزة:
https://babi-sa.com/$Name/

افتحها وتأكد من كل شي، ولو تبي تعديل رد علي هنا.

عشان يشوفها المندوب: الصق الرابط مرة وحدة في ملاحظات عنوانك بتطبيقات التوصيل (جاهز، هنقرستيشن، نون، أمازون...). الطريقة مع نص جاهز للنسخ:
https://babi-sa.com/use/?n=$Name
"@

Write-Host ""
Write-Host $msg
Write-Host ""
try { Set-Clipboard -Value $msg; Write-Host "(الرسالة منسوخة، الصقها في واتساب العميل)" -ForegroundColor Green } catch {}
