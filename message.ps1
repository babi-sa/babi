# رسائل واتساب للعميل — تُطبع وتُنسخ للحافظة
# الاستخدام:
#   .\message.ps1 ahmad "أحمد"                    ← رسالة التسليم (مع طلب الدفع خلال 3 أيام)
#   .\message.ps1 ahmad "أحمد" -Paid              ← رسالة التسليم لعميل دفع مسبقًا
#   .\message.ps1 ahmad "أحمد" -Kind reminder     ← تذكير بالدفع (اليوم 3)
#   .\message.ps1 ahmad "أحمد" -Kind lock         ← إشعار إيقاف الصفحة (اليوم 5)
#   .\message.ps1 ahmad "أحمد" -Kind thanks       ← شكر بعد وصول التحويل
#   أضف -F لصيغة المؤنث
param(
  [Parameter(Mandatory=$true)][string]$Name,
  [string]$Customer = "",
  [ValidateSet("deliver","reminder","lock","thanks")][string]$Kind = "deliver",
  [switch]$F,
  [switch]$Paid
)

$Name = $Name.ToLower() -replace '[^a-z0-9-]', ''
if (-not (Test-Path (Join-Path $PSScriptRoot $Name))) { Write-Error "ما فيه عميل باسم $Name"; exit 1 }

function W($male, $female) { if ($script:F) { $female } else { $male } }
$hi = if ($Customer) { "السلام عليكم $Customer 👋🌷" } else { "السلام عليكم 👋🌷" }
$url = "https://babi-sa.com/$Name/"
$pay = @"
🏦 الراجحي: SA38 8000 0461 6080 1028 3325
📱 STC Pay: 0553102171
(باسم سليمان الحمادي)
"@

switch ($Kind) {
"deliver" {
$payBlock = ""
if (-not $Paid) {
$payBlock = @"

💳 $(W 'جرّبها' 'جرّبيها') مع طلباتك، وإذا عجبتك $(W 'حوّل' 'حوّلي') 29 ريال خلال 3 أيام على:
$pay

"@
}
$msg = @"
$hi
صفحتك في بابي جاهزة 🎉🚪

👇 رابطك الخاص:
$url

📲 $(W 'افتحها وتأكد' 'افتحيها وتأكدي') إن كل شي تمام، ولو $(W 'تبي' 'تبين') أي تعديل $(W 'ردّ' 'ردّي') علي هنا وأعدّله لك ✍️

🛵 عشان يشوفها المندوب:
$(W 'الصق' 'الصقي') الرابط مرة وحدة في ملاحظات عنوانك بتطبيقات التوصيل (جاهز، هنقرستيشن، نون، أمازون...)
الطريقة خطوة بخطوة مع نص جاهز للنسخ 👇
https://babi-sa.com/use/?n=$Name
$payBlock
ومن اليوم… المندوب يوصل لبابك بدون ولا اتصال 😌📦
شكرًا لثقتك 🤍
"@
}
"reminder" {
$msg = @"
$hi
إن شاء الله صفحتك عجبتك وسهّلت على المندوب 🚪✨
$url

تذكير لطيف: باقي يومين على دفع الـ 29 ريال 💳
$pay

وإذا عندك أي ملاحظة على الصفحة $(W 'قول' 'قولي') لي وأعدّلها لك ✍️ 🤍
"@
}
"lock" {
$msg = @"
$hi
انتهت مهلة الدفع، وتم إيقاف صفحتك مؤقتًا ⏸️
$url

$(W 'حوّل' 'حوّلي') 29 ريال وأرجّعها لك على طول، ونفس الرابط ما يتغير 🌷
$pay
"@
}
"thanks" {
$msg = @"
$hi
وصل التحويل، شكرًا لك 🤍
صفحتك صارت دائمة ✅
$url

ولو $(W 'احتجت' 'احتجتي') أي تعديل بأي وقت، أنا موجود ✍️
"@
}
}

Write-Host ""
Write-Host $msg
Write-Host ""
try { Set-Clipboard -Value $msg; Write-Host "(الرسالة منسوخة، الصقها في واتساب العميل)" -ForegroundColor Green } catch {}
