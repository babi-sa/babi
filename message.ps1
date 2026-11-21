# رسالة تسليم الصفحة للعميل (واتساب) — تُطبع وتُنسخ للحافظة
# الاستخدام:  .\message.ps1 ahmad "أحمد"        (عميل)
#             .\message.ps1 hajar "هاجر" -F      (عميلة: صيغة المؤنث)
param(
  [Parameter(Mandatory=$true)][string]$Name,
  [string]$Customer = "",
  [switch]$F
)

$Name = $Name.ToLower() -replace '[^a-z0-9-]', ''
if (-not (Test-Path (Join-Path $PSScriptRoot $Name))) { Write-Error "ما فيه عميل باسم $Name"; exit 1 }

$hi = if ($Customer) { "السلام عليكم $Customer 👋🌷" } else { "السلام عليكم 👋🌷" }
if ($F) { $open = "افتحيها وتأكدي"; $want = "تبين"; $reply = "ردّي"; $paste = "الصقي" }
else    { $open = "افتحها وتأكد";   $want = "تبي";  $reply = "ردّ";  $paste = "الصق" }

$msg = @"
$hi
صفحتك في بابي جاهزة 🎉🚪

👇 رابطك الخاص:
https://babi-sa.com/$Name/

📲 $open إن كل شي تمام، ولو $want أي تعديل $reply علي هنا وأعدّله لك ✍️

🛵 عشان يشوفها المندوب:
$paste الرابط مرة وحدة في ملاحظات عنوانك بتطبيقات التوصيل (جاهز، هنقرستيشن، نون، أمازون...)
الطريقة خطوة بخطوة مع نص جاهز للنسخ 👇
https://babi-sa.com/use/?n=$Name

ومن اليوم… المندوب يوصل لبابك بدون ولا اتصال 😌📦
شكرًا لثقتك 🤍
"@

Write-Host ""
Write-Host $msg
Write-Host ""
try { Set-Clipboard -Value $msg; Write-Host "(الرسالة منسوخة، الصقها في واتساب العميل)" -ForegroundColor Green } catch {}
