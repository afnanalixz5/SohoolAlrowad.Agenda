import { Router, type IRouter } from "express";
import { CreateRegistrationBody, CreateRegistrationResponse } from "@workspace/api-zod";
import { db, registrationsTable } from "@workspace/db";

const router: IRouter = Router();
const requestWindowMs = 15 * 60 * 1000;
const maxRequestsPerWindow = 5;
const requestsByIp = new Map<string, { count: number; startedAt: number }>();

function cleanText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

router.post("/registrations", async (req, res): Promise<void> => {
  const now = Date.now();
  const ip = req.ip || "unknown";
  const current = requestsByIp.get(ip);
  const bucket = !current || now - current.startedAt > requestWindowMs
    ? { count: 0, startedAt: now }
    : current;

  bucket.count += 1;
  requestsByIp.set(ip, bucket);

  if (bucket.count > maxRequestsPerWindow) {
    res.status(429).json({ message: "تم تجاوز عدد المحاولات المؤقتاً. يرجى المحاولة لاحقاً." });
    return;
  }

  const parsed = CreateRegistrationBody.safeParse({
    name: cleanText(req.body?.name),
    email: cleanText(req.body?.email),
    phone: cleanText(req.body?.phone),
    program: cleanText(req.body?.program),
    date: cleanText(req.body?.date),
    city: cleanText(req.body?.city),
    mode: cleanText(req.body?.mode),
  });

  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "Invalid registration request");
    res.status(400).json({ message: "يرجى تعبئة جميع البيانات المطلوبة بشكل صحيح." });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed.data.email)) {
    res.status(400).json({ message: "يرجى إدخال بريد إلكتروني صحيح." });
    return;
  }

  try {
    const registrationData = parsed.data as {
      name: string;
      email: string;
      phone: string;
      program: string;
      date: string;
      city: string;
      mode: string;
    };
    const [registration] = await db
      .insert(registrationsTable)
      .values(registrationData)
      .returning();

    res.status(201).json(CreateRegistrationResponse.parse(registration));
  } catch (error) {
    req.log.error({ err: error }, "Failed to save registration");
    res.status(500).json({ message: "تعذر حفظ التسجيل حالياً. يرجى المحاولة مرة أخرى." });
  }
});

export default router;