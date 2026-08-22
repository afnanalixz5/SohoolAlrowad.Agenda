import { Router, type IRouter } from "express";
import { ReplitConnectors } from "@replit/connectors-sdk";

const router: IRouter = Router();
const connectors = new ReplitConnectors();
const recipient = "sohoolalrowad101@gmail.com";
const requestWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestsByIp = new Map<string, { count: number; startedAt: number }>();

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function requiredText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

router.post("/interest", async (req, res) => {
  const sender = process.env.RESEND_FROM_EMAIL?.trim();
  const name = requiredText(req.body?.name);
  const email = requiredText(req.body?.email);
  const phone = requiredText(req.body?.phone);
  const program = requiredText(req.body?.program);
  const date = requiredText(req.body?.date);
  const city = requiredText(req.body?.city);
  const mode = requiredText(req.body?.mode);

  if (!name || !email || !phone || !program || !date || !city || !mode) {
    res.status(400).json({ message: "الرجاء تعبئة جميع البيانات المطلوبة." });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ message: "يرجى إدخال بريد إلكتروني صحيح." });
    return;
  }

  if (!sender) {
    res.status(503).json({ message: "نموذج التسجيل غير جاهز للإرسال حالياً. تواصل مع قسم المبيعات." });
    return;
  }

  if (name.length > 120 || email.length > 160 || phone.length > 40 || program.length > 240) {
    res.status(400).json({ message: "تجاوزت إحدى البيانات الحد المسموح." });
    return;
  }

  const now = Date.now();
  const ip = req.ip || "unknown";
  const current = requestsByIp.get(ip);
  const bucket = !current || now - current.startedAt > requestWindowMs
    ? { count: 0, startedAt: now }
    : current;
  bucket.count += 1;
  requestsByIp.set(ip, bucket);

  if (bucket.count > maxRequestsPerWindow) {
    res.status(429).json({ message: "تم تجاوز عدد المحاولات المؤقتاً. يرجى المحاولة لاحقاً أو التواصل مع المبيعات." });
    return;
  }

  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    program: escapeHtml(program),
    date: escapeHtml(date),
    city: escapeHtml(city),
    mode: escapeHtml(mode),
  };

  try {
    const response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `اهتمام جديد بالبرنامج: ${program}`,
        html: `
          <div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;line-height:1.8;color:#182945">
            <h2>اهتمام جديد ببرنامج تدريبي</h2>
            <p><strong>الاسم:</strong> ${safe.name}</p>
            <p><strong>البريد الإلكتروني:</strong> ${safe.email}</p>
            <p><strong>رقم الجوال:</strong> ${safe.phone}</p>
            <hr />
            <p><strong>البرنامج:</strong> ${safe.program}</p>
            <p><strong>التاريخ:</strong> ${safe.date}</p>
            <p><strong>المدينة:</strong> ${safe.city}</p>
            <p><strong>طريقة الحضور:</strong> ${safe.mode}</p>
          </div>
        `,
      }),
    });

    if (!response.ok) {
      const details = await response.text().catch(() => "");
      req.log?.error({ status: response.status, details }, "Resend rejected interest email");
      res.status(502).json({ message: "تعذر إرسال الطلب حالياً. حاول مرة أخرى أو تواصل مع المبيعات." });
      return;
    }

    res.status(202).json({ message: "تم إرسال بيانات الاهتمام بنجاح." });
  } catch (error) {
    req.log?.error({ err: error }, "Failed to send interest email");
    res.status(502).json({ message: "تعذر إرسال الطلب حالياً. حاول مرة أخرى أو تواصل مع المبيعات." });
  }
});

export default router;