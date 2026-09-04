import { useMemo, useState, type FormEvent } from "react";
import { useCreateRegistration } from "@workspace/api-client-react";
import { partnerLogos, programs as currentPrograms, type Mode, type Program } from "@/data/programs";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  Clock3,
  Compass,
  ExternalLink,
  GraduationCap,
  Headphones,
  Linkedin,
  MapPin,
  MessageCircle,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  X,
  type LucideIcon,
} from "lucide-react";

const googleFormBaseUrl =
  "https://docs.google.com/forms/d/e/1FAIpQLSfvebMSrSXD8JiqH7xnac_Coqw9pohZo_0BiMEF3kIdM92ogA/viewform";

function buildPrefilledGoogleFormUrl({
  program,
  name,
  email,
  phone,
}: {
  program: string;
  name: string;
  email: string;
  phone: string;
}) {
  const url = new URL(googleFormBaseUrl);
  url.searchParams.set("usp", "pp_url");
  url.searchParams.set("entry.1800771850", program);
  url.searchParams.set("entry.425654170", name);
  url.searchParams.set("entry.1966726233", email);
  url.searchParams.set("entry.143496574", phone);
  return url.toString();
}

const legacyPrograms = [
  {
    id: "p01",
    date: "24/8/2026",
    month: "أغسطس",
    monthOrder: 8,
    day: "24",
    name: "الاستشراف الاستراتيجي وصناعة الجاهزية المستقبلية",
    mode: "حضوري",
    city: "تركيا - إسطنبول",
    days: 5,
    overview: "برنامج حضوري متقدم يُعقد في إسطنبول، يؤهل القيادات لاستشراف المستقبل وبناء الجاهزية المؤسسية للتعامل مع المتغيرات والفرص القادمة.",
    axes: ["مفاهيم الاستشراف الاستراتيجي", "أدوات ومنهجيات استشراف المستقبل", "بناء سيناريوهات مستقبلية", "تحويل الاستشراف إلى خطط تنفيذية", "قياس الجاهزية المؤسسية للمستقبل"],
    audience: "القيادات الاستراتيجية العليا، مسؤولو التخطيط والابتكار المؤسسي.",
    tags: ["استشراف", "تخطيط مستقبلي", "قيادة"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p02",
    date: "25/8/2026",
    month: "أغسطس",
    monthOrder: 8,
    day: "25",
    name: "التخطيط الاستراتيجي للموارد البشرية",
    mode: "حضوري",
    city: "جدة",
    days: 3,
    overview: "برنامج يؤهل المشاركين لبناء استراتيجية الموارد البشرية وربطها بالتوجهات الاستراتيجية العامة للمؤسسة، بما يحقق التوافق بين رأس المال البشري وأهداف الأعمال.",
    axes: ["مدخل إلى التخطيط الاستراتيجي للموارد البشرية", "تحليل احتياجات القوى العاملة", "التخطيط للاستقطاب والاستبقاء", "ربط استراتيجية الموارد البشرية بأهداف المؤسسة", "قياس أثر استراتيجية الموارد البشرية"],
    audience: "مسؤولو ومديرو الموارد البشرية، فرق التخطيط المؤسسي.",
    tags: ["موارد بشرية", "تخطيط استراتيجي"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p03",
    date: "6/9/2026",
    month: "سبتمبر",
    monthOrder: 9,
    day: "06",
    name: "محترف أعمال القيادة الإدارية CBP",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 3,
    overview: "برنامج معتمد ضمن مسار محترف الأعمال (CBP) يطوّر مهارات القيادة الإدارية العملية: التخطيط، اتخاذ القرار، وإدارة فرق العمل بكفاءة في بيئات العمل المؤسسية.",
    axes: ["أساسيات القيادة الإدارية", "اتخاذ القرار وحل المشكلات", "إدارة وتحفيز فرق العمل", "التفويض والمساءلة", "قياس الأداء القيادي"],
    audience: "المدراء ورؤساء الأقسام والقيادات الإدارية الطموحة للحصول على اعتماد CBP.",
    tags: ["قيادة", "إدارة", "CBP"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p04",
    date: "13/9/2026",
    month: "سبتمبر",
    monthOrder: 9,
    day: "13",
    name: "محترف أعمال إدارة المشاريع CBP",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج معتمد ضمن مسار CBP يؤهل المشاركين لإدارة المشاريع باحتراف وفق أفضل الممارسات العالمية، من التخطيط وحتى التسليم والإغلاق.",
    axes: ["دورة حياة المشروع", "تخطيط النطاق والجدول الزمني", "إدارة الموارد والتكلفة", "إدارة المخاطر في المشاريع", "المتابعة والتقييم والإغلاق"],
    audience: "مديرو المشاريع ومنسقوها، فرق التخطيط والتنفيذ، الراغبون في اعتماد CBP.",
    tags: ["إدارة مشاريع", "CBP", "تخطيط"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p05",
    date: "13/9/2026",
    month: "سبتمبر",
    monthOrder: 9,
    day: "13",
    name: "أخصائي إدارة المخاطر",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 3,
    overview: "برنامج متخصص يؤهل المشاركين لتحديد المخاطر المؤسسية وتقييمها ووضع خطط للاستجابة لها، بما يحمي المؤسسة ويعزز استمرارية أعمالها.",
    axes: ["مدخل إلى إدارة المخاطر المؤسسية", "تحديد وتصنيف المخاطر", "تقييم وتحليل المخاطر", "استراتيجيات الاستجابة للمخاطر", "متابعة ومراجعة سجل المخاطر"],
    audience: "مسؤولو إدارة المخاطر، فرق التدقيق والامتثال والجودة.",
    tags: ["إدارة مخاطر", "حوكمة"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p06",
    date: "20/9/2026",
    month: "سبتمبر",
    monthOrder: 9,
    day: "20",
    name: "محترف أعمال خدمة العملاء CBP",
    mode: "حضوري / عن بعد",
    city: "جدة",
    days: 3,
    overview: "برنامج معتمد ضمن مسار CBP يطوّر مهارات التعامل مع العملاء وإدارة تجربتهم، بما يرفع مستوى الرضا والولاء تجاه المؤسسة.",
    axes: ["أساسيات خدمة العملاء الاحترافية", "فهم احتياجات وتوقعات العميل", "التعامل مع الشكاوى والاعتراضات", "قياس رضا العملاء", "بناء ولاء العملاء طويل الأمد"],
    audience: "فرق خدمة العملاء، مراكز الاتصال، موظفو التواصل المباشر مع الجمهور.",
    tags: ["خدمة عملاء", "CBP", "تجربة العميل"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p07",
    date: "27/9/2026",
    month: "سبتمبر",
    monthOrder: 9,
    day: "27",
    name: "أخصائي صحة وسلامة",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 3,
    overview: "برنامج متخصص يؤهل المشاركين لتطبيق معايير الصحة والسلامة المهنية داخل بيئات العمل المختلفة، والحد من الحوادث والإصابات.",
    axes: ["أساسيات الصحة والسلامة المهنية", "تقييم مخاطر بيئة العمل", "إجراءات الوقاية والسلامة", "التعامل مع الحوادث والطوارئ", "أنظمة السلامة المحلية والدولية"],
    audience: "مسؤولو السلامة، مشرفو المواقع والعمليات.",
    tags: ["صحة وسلامة", "بيئة عمل"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p08",
    date: "4/10/2026",
    month: "أكتوبر",
    monthOrder: 10,
    day: "04",
    name: "إدارة المخاطر والحوكمة والالتزام GRCP",
    mode: "عن بعد",
    city: "عن بُعد",
    days: 5,
    overview: "برنامج احترافي يؤهل المشاركين لفهم منظومة الحوكمة وإدارة المخاطر والالتزام (GRC) وتطبيقها داخل المؤسسات، بما يعزز قدرة الجهة على الامتثال للأنظمة وحماية أصولها.",
    axes: ["مدخل إلى الحوكمة المؤسسية", "أطر إدارة المخاطر المؤسسية", "بناء برنامج الالتزام التنظيمي", "الربط بين الحوكمة والمخاطر والالتزام", "دراسات حالة تطبيقية GRC"],
    audience: "مسؤولو الحوكمة والامتثال، إدارات المخاطر، القيادات الإدارية العليا.",
    tags: ["حوكمة", "إدارة مخاطر", "التزام"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p09",
    date: "11/10/2026",
    month: "أكتوبر",
    monthOrder: 10,
    day: "11",
    name: "أدوات الذكاء الاصطناعي للإنتاجية في بيئة العمل",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 3,
    overview: "برنامج عملي مكثف يعرّف المشاركين على أبرز أدوات الذكاء الاصطناعي التوليدي وتطبيقاتها العملية لرفع الإنتاجية اليومية في بيئة العمل المكتبي والإداري.",
    axes: ["مقدمة في أدوات الذكاء الاصطناعي التوليدي", "أتمتة المهام الإدارية المتكررة", "صياغة الأوامر (Prompting) الفعالة", "تطبيقات عملية على مهام العمل اليومية", "اعتبارات الاستخدام الآمن والأخلاقي"],
    audience: "الموظفون الإداريون، فرق التسويق والمحتوى، أي موظف يسعى لرفع كفاءته باستخدام الذكاء الاصطناعي.",
    tags: ["ذكاء اصطناعي", "إنتاجية", "أدوات رقمية"],
    certificate: "شهادة محلية معتمدة",
  },
  {
    id: "p10",
    date: "11/10/2026",
    month: "أكتوبر",
    monthOrder: 10,
    day: "11",
    name: "محترف أعمال إدارة المشاريع CBP",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج معتمد ضمن مسار CBP يؤهل المشاركين لإدارة المشاريع باحتراف وفق أفضل الممارسات العالمية، من التخطيط وحتى التسليم والإغلاق.",
    axes: ["دورة حياة المشروع", "تخطيط النطاق والجدول الزمني", "إدارة الموارد والتكلفة", "إدارة المخاطر في المشاريع", "المتابعة والتقييم والإغلاق"],
    audience: "مديرو المشاريع ومنسقوها، فرق التخطيط والتنفيذ، الراغبون في اعتماد CBP.",
    tags: ["إدارة مشاريع", "CBP", "تخطيط"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p11",
    date: "18/10/2026",
    month: "أكتوبر",
    monthOrder: 10,
    day: "18",
    name: "أساسيات الأمن السيبراني CompTIA Security+",
    mode: "عن بعد",
    city: "عن بُعد",
    days: 5,
    overview: "برنامج تقني معتمد يؤهل المشاركين لفهم أساسيات الأمن السيبراني والحصول على شهادة CompTIA Security+ الدولية، عبر التدريب عن بُعد.",
    axes: ["مفاهيم الأمن السيبراني الأساسية", "التهديدات والهجمات الشائعة", "أمن الشبكات والأنظمة", "إدارة الهوية والوصول", "التحضير لاختبار Security+"],
    audience: "العاملون في تقنية المعلومات، الراغبون في دخول مجال الأمن السيبراني.",
    tags: ["أمن سيبراني", "CompTIA", "تقنية معلومات"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p12",
    date: "18/10/2026",
    month: "أكتوبر",
    monthOrder: 10,
    day: "18",
    name: "شهادة كومبتيا أساسيات الشبكات + CompTIA Network+",
    mode: "حضوري",
    city: "المجر - بودابست",
    days: 5,
    overview: "برنامج حضوري مكثف يؤهل المشاركين للحصول على شهادة CompTIA Network+ الدولية، مع تدريب عملي على تصميم الشبكات وإدارتها واستكشاف أعطالها.",
    axes: ["أساسيات الشبكات ومكوناتها", "بروتوكولات الشبكات", "تصميم وتهيئة الشبكات", "استكشاف أعطال الشبكات وإصلاحها", "التحضير لاختبار Network+"],
    audience: "فنيو ومهندسو الشبكات، العاملون في الدعم الفني وتقنية المعلومات.",
    tags: ["شبكات", "CompTIA", "تقنية معلومات"],
    certificate: "شهادة احترافية دولية",
  },
  {
    id: "p13",
    date: "1/11/2026",
    month: "نوفمبر",
    monthOrder: 11,
    day: "01",
    name: "تحليل البيانات باستخدام Power BI",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 4,
    overview: "برنامج عملي يؤهل المشاركين لاستخدام أداة Power BI في تحليل البيانات وبناء لوحات معلومات تفاعلية تدعم اتخاذ القرار المؤسسي.",
    axes: ["مدخل إلى Power BI وربط مصادر البيانات", "تنظيف البيانات وتحويلها", "بناء التقارير ولوحات المعلومات", "التصور البياني الفعال للبيانات", "نشر التقارير ومشاركتها"],
    audience: "محللو البيانات، فرق التقارير والأداء، أي موظف يتعامل مع البيانات بشكل دوري.",
    tags: ["تحليل بيانات", "Power BI", "اتخاذ قرار"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p14",
    date: "8/11/2026",
    month: "نوفمبر",
    monthOrder: 11,
    day: "08",
    name: "الصحة والسلامة المهنية OSHA",
    mode: "حضوري / عن بعد",
    city: "الخبر",
    days: 5,
    overview: "برنامج معتمد وفق معايير OSHA الدولية يؤهل المشاركين لفهم أسس الصحة والسلامة المهنية وتطبيقها في بيئات العمل المختلفة.",
    axes: ["مبادئ الصحة والسلامة المهنية", "تحديد وتقييم المخاطر في موقع العمل", "معدات الوقاية الشخصية", "التعامل مع حالات الطوارئ", "متطلبات الامتثال لمعايير OSHA"],
    audience: "مسؤولو السلامة، مشرفو المواقع، فرق الموارد البشرية والعمليات.",
    tags: ["سلامة مهنية", "OSHA", "بيئة عمل"],
    certificate: "شهادة دولية OSHA",
  },
  {
    id: "p15",
    date: "15/11/2026",
    month: "نوفمبر",
    monthOrder: 11,
    day: "15",
    name: "التخطيط الاستراتيجي والحوكمة المؤسسية",
    mode: "حضوري",
    city: "ماليزيا - كوالالمبور",
    days: 3,
    overview: "برنامج حضوري يؤهل القيادات لبناء الخطط الاستراتيجية المؤسسية وربطها بأطر الحوكمة، بما يضمن التنفيذ الفعّال وتحقيق الأهداف المؤسسية.",
    axes: ["منهجية التخطيط الاستراتيجي", "تحليل البيئة الداخلية والخارجية", "بناء الأهداف والمبادرات الاستراتيجية", "الحوكمة المؤسسية ودورها في التنفيذ", "متابعة الأداء الاستراتيجي"],
    audience: "القيادات العليا والوسطى، مسؤولو التخطيط والتطوير المؤسسي.",
    tags: ["تخطيط استراتيجي", "حوكمة", "إدارة عليا"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p16",
    date: "22/11/2026",
    month: "نوفمبر",
    monthOrder: 11,
    day: "22",
    name: "محترف ريادة الأعمال للشباب CYBP",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج معتمد ضمن مسار CBP موجّه للشباب الراغبين في دخول عالم ريادة الأعمال، يغطي أساسيات بناء المشروع من الفكرة وحتى الانطلاق.",
    axes: ["مدخل إلى ريادة الأعمال", "بناء نموذج العمل التجاري", "دراسة الجدوى الأولية", "التسويق للمشاريع الناشئة", "التمويل ومصادره للمشاريع الناشئة"],
    audience: "الشباب وأصحاب الأفكار الريادية، الراغبون في تأسيس مشاريعهم الخاصة.",
    tags: ["ريادة أعمال", "CBP", "مشاريع ناشئة"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p17",
    date: "6/12/2026",
    month: "ديسمبر",
    monthOrder: 12,
    day: "06",
    name: "القيادة في إدارة الأداء والنتائج المؤسسية",
    mode: "حضوري",
    city: "بريطانيا - لندن",
    days: 3,
    overview: "برنامج حضوري متقدم يُعقد في لندن، يركز على تطوير مهارات القيادة في إدارة أداء الأفراد والفرق وربطه بتحقيق النتائج المؤسسية المستهدفة.",
    axes: ["أسس إدارة الأداء المؤسسي", "تحديد مؤشرات الأداء الرئيسية KPIs", "حوارات الأداء والتغذية الراجعة", "معالجة تدني الأداء", "ربط الأداء بالنتائج الاستراتيجية"],
    audience: "القيادات التنفيذية والإدارية، مسؤولو تقييم الأداء المؤسسي.",
    tags: ["إدارة أداء", "قيادة", "نتائج مؤسسية"],
    certificate: "شهادة حضور معتمدة من سهول الرواد",
  },
  {
    id: "p18",
    date: "13/12/2026",
    month: "ديسمبر",
    monthOrder: 12,
    day: "13",
    name: "محترف أعمال إدارة المشاريع PMP",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج معتمد لإدارة المشاريع الاحترافية (PMP) يؤهل المشاركين لتطبيق منهجيات إدارة المشاريع الحديثة من التخطيط وحتى التسليم.",
    axes: ["دورة حياة المشروع الاحترافية", "تخطيط وجدولة المشاريع", "إدارة الموارد والميزانية", "إدارة الجودة والمخاطر", "إغلاق المشروع وتوثيق الدروس المستفادة"],
    audience: "مديرو ومنسقو المشاريع، الراغبون في اعتماد PMP.",
    tags: ["إدارة مشاريع", "PMP", "تخطيط"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p19",
    date: "20/12/2026",
    month: "ديسمبر",
    monthOrder: 12,
    day: "20",
    name: "فني حاسب آلي CompTIA A+",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج تقني معتمد يؤهل المشاركين للحصول على شهادة CompTIA A+ الدولية، ويغطي أساسيات صيانة الأجهزة والأنظمة والدعم الفني.",
    axes: ["مكونات الحاسب الآلي وصيانتها", "أنظمة التشغيل الشائعة", "استكشاف الأعطال وإصلاحها", "أساسيات الشبكات والاتصال", "التحضير لاختبار CompTIA A+"],
    audience: "فنيو الدعم الفني، الراغبون في دخول مجال تقنية المعلومات.",
    tags: ["دعم فني", "CompTIA", "صيانة أجهزة"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p20",
    date: "20/12/2026",
    month: "ديسمبر",
    monthOrder: 12,
    day: "20",
    name: "محترف أعمال خدمة العملاء CBP",
    mode: "حضوري / عن بعد",
    city: "جدة",
    days: 3,
    overview: "برنامج معتمد ضمن مسار CBP يطوّر مهارات التعامل مع العملاء وإدارة تجربتهم، بما يرفع مستوى الرضا والولاء تجاه المؤسسة.",
    axes: ["أساسيات خدمة العملاء الاحترافية", "فهم احتياجات وتوقعات العميل", "التعامل مع الشكاوى والاعتراضات", "قياس رضا العملاء", "بناء ولاء العملاء طويل الأمد"],
    audience: "فرق خدمة العملاء، مراكز الاتصال، موظفو التواصل المباشر مع الجمهور.",
    tags: ["خدمة عملاء", "CBP", "تجربة العميل"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
  {
    id: "p21",
    date: "27/12/2026",
    month: "ديسمبر",
    monthOrder: 12,
    day: "27",
    name: "أخصائي تكنولوجيا الحاسب الآلي CBP",
    mode: "حضوري / عن بعد",
    city: "الرياض",
    days: 5,
    overview: "برنامج معتمد ضمن مسار CBP يؤهل المشاركين لإدارة الجوانب التقنية للحاسب الآلي داخل بيئة العمل المؤسسية، من الأجهزة إلى الأنظمة والدعم الفني.",
    axes: ["أساسيات تكنولوجيا المعلومات المؤسسية", "إدارة الأجهزة والأنظمة", "الدعم الفني لمستخدمي الأعمال", "أمن المعلومات الأساسي", "اعتماد أفضل الممارسات التقنية"],
    audience: "فرق تقنية المعلومات والدعم الفني في المؤسسات.",
    tags: ["تقنية معلومات", "CBP", "دعم فني"],
    certificate: "شهادة احترافية دولية أو شهادة محلية معتمدة حسب المسار المختار",
  },
];

const programs = currentPrograms;
const months = ["الكل", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
const modeFilters: Array<"الكل" | Mode> = ["الكل", "حضوري", "عن بعد", "حضوري / عن بعد", "هجين"];

function normalize(value: string) {
  return value.trim().toLowerCase().replace(/[إأآا]/g, "ا").replace(/[ى]/g, "ي").replace(/[ة]/g, "ه");
}

function programDate(program: Program) {
  const [day, month, year] = program.date.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function modeTone(mode: Mode) {
  if (mode === "حضوري") return { color: "#9c6b1c", background: "#f7ecd3", icon: MapPin };
  if (mode === "عن بعد") return { color: "#256b63", background: "#dff0e9", icon: Compass };
  return { color: "#405385", background: "#e5e8f3", icon: Sparkles };
}

function ProgramCard({ program, onOpen }: { program: Program; onOpen: () => void }) {
  const tone = modeTone(program.mode);
  const ModeIcon = tone.icon;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative flex min-h-[390px] flex-col overflow-hidden rounded-[22px] border border-[#ded8cc] bg-[#fffdf8] p-0 text-right shadow-[0_12px_30px_rgba(31,43,62,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#b3924b] hover:shadow-[0_20px_44px_rgba(31,43,62,0.12)] focus:outline-none focus:ring-2 focus:ring-[#c79e46] focus:ring-offset-2"
    >
      <div className="absolute right-0 top-0 h-1 w-full bg-[#d7b45b] opacity-60 transition duration-300 group-hover:opacity-100" />
      <div className="relative h-[154px] overflow-hidden bg-[#172945]">
        <img src={program.image} alt={program.imageAlt} className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1d35]/90 via-[#0e1d35]/10 to-transparent" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-3">
          <div className="flex h-[54px] w-[54px] shrink-0 flex-col items-center justify-center rounded-2xl bg-[#182945]/95 text-[#f5d98b] shadow-lg">
            <span className="font-[var(--font-display)] text-[21px] font-black leading-none">{program.day}</span>
            <span className="mt-1 text-[10px] font-semibold text-[#d9c99c]">{program.month}</span>
          </div>
          {program.isHadafFunded && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#fffdf8]/95 px-2.5 py-1.5 text-[10px] font-black text-[#18365c]">
              <img src={partnerLogos.hadaf.src} alt="" className="h-4 w-4 object-contain" />
              مستردة من هدف
            </span>
          )}
        </div>
        <div className="absolute inset-x-4 bottom-3 flex items-end justify-between gap-3">
          <div className="flex max-w-[72%] items-center gap-1.5 overflow-hidden rounded-xl border border-white/15 bg-[#fffdf8]/95 px-2 py-1.5">
            {program.logoKeys.map((key, index) => (
              <img key={key} src={partnerLogos[key].src} alt={program.logoLabels[index]} title={program.logoLabels[index]} className="h-6 max-w-[72px] object-contain" />
            ))}
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-bold" style={{ color: tone.color, background: tone.background }}>
            <ModeIcon size={12} strokeWidth={2.2} />
            {program.mode}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-[var(--font-display)] text-[18px] font-black leading-[1.55] text-[#182945] transition-colors group-hover:text-[#9b731e]">{program.name}</h3>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[12px] text-[#73766f]">
          <span className="inline-flex items-center gap-1.5"><MapPin size={14} />{program.city}</span>
          <span className="inline-flex items-center gap-1.5"><Clock3 size={14} />{program.durationLabel}</span>
        </div>
        <div className="mt-auto flex items-center justify-end border-t border-dashed border-[#e2ded4] pt-4">
          <span className="inline-flex items-center gap-1 text-[13px] font-black text-[#182945] transition duration-300 group-hover:gap-2 group-hover:text-[#ac811e]">
            عرض التفاصيل <ArrowLeft size={15} />
          </span>
        </div>
      </div>
    </button>
  );
}

export function Home() {
  const [query, setQuery] = useState("");
  const [month, setMonth] = useState("الكل");
  const [mode, setMode] = useState<"الكل" | Mode>("الكل");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [interestProgram, setInterestProgram] = useState<Program | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [interestError, setInterestError] = useState("");
  
  const createRegistration = useCreateRegistration();
  const interestSubmitting = createRegistration.isPending;

  const filteredPrograms = useMemo(() => {
    const normalizedQuery = normalize(query);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return programs
      .filter((program) => {
        const searchable = normalize([program.name, program.city, ...program.tags].join(" "));
        const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
        const matchesMonth = month === "الكل" || program.month === month;
        const matchesMode = mode === "الكل" || program.mode === mode || (mode === "حضوري" && program.mode === "حضوري / عن بعد") || (mode === "عن بعد" && program.mode === "حضوري / عن بعد");
        return matchesQuery && matchesMonth && matchesMode;
      })
      .sort((first, second) => {
        const firstDate = programDate(first).getTime();
        const secondDate = programDate(second).getTime();
        const firstIsPast = firstDate < today.getTime();
        const secondIsPast = secondDate < today.getTime();
        if (firstIsPast !== secondIsPast) return firstIsPast ? 1 : -1;
        return firstDate - secondDate;
      });
  }, [mode, month, query]);

  const selectedProgram = selectedId ? programs.find((program) => program.id === selectedId) ?? null : null;
  const nextProgram = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return programs
      .filter((program) => programDate(program) >= today)
      .sort((first, second) => programDate(first).getTime() - programDate(second).getTime())[0] ?? programs[0];
  }, []);
  const grouped = useMemo(() => {
    const sections: Array<{ month: string; items: Program[] }> = [];
    filteredPrograms.forEach((program) => {
      const section = sections.find((candidate) => candidate.month === program.month);
      if (section) {
        section.items.push(program);
      } else {
        sections.push({ month: program.month, items: [program] });
      }
    });
    return sections;
  }, [filteredPrograms]);

  const scrollToPrograms = () => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth", block: "start" });
  
  const openInterest = (program: Program) => {
    setSelectedId(null);
    window.location.assign(
      buildPrefilledGoogleFormUrl({
        program: program.name,
        name: "",
        email: "",
        phone: "",
      }),
    );
  };
  
  const submitInterest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formPhone.trim()) return;
    if (!interestProgram) return;
    setInterestError("");
    
    createRegistration.mutate(
      {
        data: {
          name: formName.trim(),
          email: formEmail.trim(),
          phone: formPhone.trim(),
          program: interestProgram.name,
          date: interestProgram.date,
          city: interestProgram.city,
          mode: interestProgram.mode,
        },
      },
      {
        onSuccess: () => {
          setInterestSent(true);
          window.location.assign(
            buildPrefilledGoogleFormUrl({
              program: interestProgram.name,
              name: formName.trim(),
              email: formEmail.trim(),
              phone: formPhone.trim(),
            }),
          );
        },
        onError: (error) => {
          setInterestError(error.message || "تعذر إرسال الطلب حالياً. حاول مرة أخرى.");
        },
      }
    );
  };

  return (
    <main dir="rtl" className="min-h-[100dvh] overflow-x-hidden bg-[#f4efe5] text-[#182945]" style={{ fontFamily: "var(--font-sans, 'Tahoma', sans-serif)", ["--font-display" as string]: "var(--font-sans, 'Tahoma', sans-serif)" }}>
      <style>{`
        @keyframes suhool-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .suhool-rise { animation: suhool-rise .7s cubic-bezier(.2,.7,.2,1) both; }
        .suhool-delay-1 { animation-delay: .1s; } .suhool-delay-2 { animation-delay: .2s; } .suhool-delay-3 { animation-delay: .3s; }
        .suhool-grid { background-image: linear-gradient(rgba(236,222,190,.19) 1px, transparent 1px), linear-gradient(90deg, rgba(236,222,190,.19) 1px, transparent 1px); background-size: 28px 28px; }
        ::selection { background: #d9b65c; color: #182945; }
      `}</style>

      <div className="bg-[#d9b65c] px-5 py-2 text-center text-[11px] font-bold tracking-[.05em] text-[#182945] md:text-[12px]">
         الخطة التدريبية لعام 2026م · اختر مسارك القادم بثقة
      </div>

      <header className="relative isolate overflow-hidden bg-[#101f38] text-[#faf5e9]">
        <div className="absolute inset-0 -z-10 opacity-50 suhool-grid" />
        <div className="mx-auto max-w-[1240px] px-5 md:px-8">
          <nav className="flex min-h-[82px] items-center justify-between gap-5 border-b border-white/10">
             <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 text-right focus:outline-none focus:ring-2 focus:ring-[#d7b45b] focus:ring-offset-2 focus:ring-offset-[#101f38]">
               <span className="flex h-14 w-[82px] items-center justify-center overflow-hidden rounded-2xl bg-[#f8f4eb] p-1 shadow-[0_8px_24px_rgba(215,180,91,.22)]">
                 <img src="/images/suhool-logo.png" alt="شعار سهول الرواد" className="h-full w-full object-contain" />
               </span>
               <span className="hidden sm:block">
                 <span className="block font-[var(--font-display)] text-[16px] font-black leading-6">معهد سهول الرواد العالي للتدريب</span>
                 <span className="block text-[10px] tracking-[.04em] text-[#c6cbd7]">الخطة التدريبية 2026م</span>
               </span>
            </button>
            <div className="hidden items-center gap-8 text-[13px] font-bold text-[#d6d9df] md:flex">
              <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="transition hover:text-[#f0cf76]">الرئيسية</button>
              <button type="button" onClick={scrollToPrograms} className="transition hover:text-[#f0cf76]">البرامج القادمة</button>
              <button type="button" onClick={scrollToPrograms} className="transition hover:text-[#f0cf76]">الخطة الشهرية</button>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={scrollToPrograms} className="hidden rounded-full bg-[#d7b45b] px-5 py-2.5 text-[12px] font-black text-[#101f38] transition hover:bg-[#efd181] sm:block">استكشف البرامج</button>
              <button type="button" aria-label="فتح القائمة" onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl border border-white/15 p-2.5 text-[#f7ebc6] md:hidden"><Menu size={19} /></button>
            </div>
          </nav>
          {menuOpen && (
            <div className="grid gap-1 border-b border-white/10 py-3 text-[13px] font-bold md:hidden">
              <button type="button" onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="rounded-xl px-3 py-3 text-right hover:bg-white/10">الرئيسية</button>
              <button type="button" onClick={() => { setMenuOpen(false); scrollToPrograms(); }} className="rounded-xl px-3 py-3 text-right hover:bg-white/10">البرامج القادمة</button>
              <button type="button" onClick={() => { setMenuOpen(false); scrollToPrograms(); }} className="rounded-xl px-3 py-3 text-right hover:bg-white/10">الخطة الشهرية</button>
            </div>
          )}
           <div className="grid gap-9 py-11 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-16">
            <div className="suhool-rise">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d7b45b]/35 bg-[#d7b45b]/10 px-3.5 py-2 text-[11px] font-bold text-[#f0cf76]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d7b45b]" />
                الخطة التدريبية 2026
              </div>
              <h1 className="max-w-[680px] font-[var(--font-display)] text-[clamp(34px,5vw,62px)] font-black leading-[1.16] tracking-[-.04em]">
                ابدأ رحلتك<br /><span className="text-[#e2bd62]">الاحترافية الآن.</span>
              </h1>
              <p className="mt-6 max-w-[560px] text-[15px] leading-8 text-[#c8ced8] md:text-[17px]">
                تصفّح جدول البرامج التدريبية حسب الشهر، واختر الموعد والمسار الذي يناسب أهدافك المهنية.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button type="button" onClick={scrollToPrograms} className="inline-flex items-center gap-2 rounded-full bg-[#d7b45b] px-6 py-3.5 text-[13px] font-black text-[#101f38] shadow-[0_12px_25px_rgba(215,180,91,.15)] transition hover:-translate-y-0.5 hover:bg-[#efd181] focus:outline-none focus:ring-2 focus:ring-[#efd181] focus:ring-offset-2 focus:ring-offset-[#101f38]">تصفح الخطة الشهرية <ArrowLeft size={16} /></button>
                <span className="inline-flex items-center gap-2 px-2 text-[12px] font-bold text-[#c8ced8]"><CalendarDays size={15} className="text-[#d7b45b]" /> أغسطس — ديسمبر 2026</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[450px] suhool-rise suhool-delay-2">
              <div className="relative overflow-hidden rounded-[30px] border border-white/15 bg-[#172945] p-6 shadow-[0_28px_60px_rgba(0,0,0,.2)]">
                <div className="relative flex items-center justify-between border-b border-white/10 pb-5">
                  <span className="text-[11px] font-bold tracking-[.12em] text-[#9ba9bd]">NEXT IN THE CALENDAR</span>
                  <CalendarDays size={18} className="text-[#d7b45b]" />
                </div>
                <div className="relative flex items-end gap-5 py-8">
                   <div className="font-[var(--font-display)] text-[72px] font-black leading-[.8] text-[#f6df9a]">{nextProgram.day}</div>
                  <div className="pb-1">
                     <div className="text-[13px] font-bold text-[#f6f0de]">{nextProgram.month} 2026</div>
                     <div className="mt-1 text-[11px] text-[#9ba9bd]">{nextProgram.city} · {nextProgram.durationLabel}</div>
                  </div>
                </div>
                <div className="relative rounded-2xl bg-[#0e1d35] p-4">
                  <div className="text-[11px] font-bold text-[#d7b45b]">البرنامج الأبرز</div>
                   <div className="mt-2 font-[var(--font-display)] text-[17px] font-black leading-7 text-[#f6f0de]">{nextProgram.name}</div>
                   {nextProgram.isHadafFunded && <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#fffdf8]/95 px-2.5 py-1.5 text-[10px] font-black text-[#18365c]"><img src={partnerLogos.hadaf.src} alt="" className="h-4 w-4 object-contain" />مستردة من هدف</div>}
                   <button type="button" onClick={() => setSelectedId(nextProgram.id)} className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[#cbd2df] transition hover:text-[#f0cf76]">تعرف على البرنامج <ArrowLeft size={14} /></button>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-2xl border border-[#e9d7a8] bg-[#f7f1e1] px-4 py-3 text-[#182945] shadow-[0_14px_28px_rgba(0,0,0,.15)]">
                <ShieldCheck size={19} className="text-[#ae8123]" />
                 <span className="text-[11px] font-bold leading-4">نتميز بتمكين<br /><b className="text-[12px]">القيادات</b></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-[#ded8cc] bg-[#fbf8f1]">
         <div className="mx-auto grid max-w-[1240px] grid-cols-2 divide-x divide-[#ded8cc] divide-x-reverse sm:grid-cols-3 md:px-8">
          {([
            [String(programs.length).padStart(2, "0"), "برنامجاً مهنياً", GraduationCap],
            [String(new Set(programs.map((program) => program.city).filter((city) => city !== "—")).size).padStart(2, "0"), "مدن ومحطات عالمية", Compass],
            ["03", "مسارات تعلّم", Target],
          ] as Array<[string, string, LucideIcon]>).map(([value, label, StatIcon], index) => {
             return <div key={String(label)} className={`flex items-center gap-3 px-5 py-5 md:px-7 ${index > 1 ? "border-t border-[#ded8cc] sm:border-t-0" : ""}`}>
              <StatIcon size={19} className="shrink-0 text-[#b18328]" />
              <div><div className="font-[var(--font-display)] text-[23px] font-black text-[#182945]">{value}</div><div className="text-[11px] font-bold text-[#777a73]">{label}</div></div>
            </div>;
          })}
        </div>
      </section>

      <section id="programs" className="scroll-mt-8 bg-[#e9e2d4] px-5 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-[1240px]">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3 text-[11px] font-black tracking-[.15em] text-[#a67a21]"><span className="h-px w-8 bg-[#a67a21]" />الخطة التدريبية</div>
              <h2 className="font-[var(--font-display)] text-[clamp(30px,4vw,48px)] font-black leading-[1.2] tracking-[-.03em] text-[#182945]">الخطة التدريبية 2026م<br /><span className="text-[#a67a21]">شهراً بعد شهر.</span></h2>
            </div>
             <p className="max-w-[310px] text-[13px] leading-7 text-[#6d716b]">اختر الشهر لتظهر لك مواعيد البرامج، المدن، وطريقة الحضور في مكان واحد.</p>
          </div>

          <div className="mt-12 rounded-[26px] border border-[#d8d0c2] bg-[#f8f4eb] p-4 shadow-[0_12px_25px_rgba(31,43,62,.04)] md:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <label className="relative flex min-w-0 flex-1 items-center">
                <Search size={18} className="absolute right-4 text-[#87887f]" />
                <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث باسم البرنامج، المدينة، أو المهارة..." className="h-12 w-full rounded-2xl border border-[#ded8cc] bg-[#fffdf8] pr-11 pl-10 text-[13px] text-[#182945] outline-none transition placeholder:text-[#a2a198] focus:border-[#b28a34] focus:ring-2 focus:ring-[#d7b45b]/30" />
                {query && <button type="button" aria-label="مسح البحث" onClick={() => setQuery("")} className="absolute left-3 rounded-full p-1 text-[#87887f] hover:bg-[#ebe4d7] hover:text-[#182945]"><X size={15} /></button>}
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0">
                <span className="shrink-0 text-[11px] font-black text-[#76786f]">نوع الحضور:</span>
                {modeFilters.map((filter) => <button key={filter} type="button" onClick={() => setMode(filter)} className={`shrink-0 rounded-full border px-3.5 py-2 text-[11px] font-bold transition ${mode === filter ? "border-[#182945] bg-[#182945] text-[#f5e7bd]" : "border-[#ded8cc] bg-[#fffdf8] text-[#74776f] hover:border-[#b28a34] hover:text-[#182945]"}`}>{filter}</button>)}
              </div>
            </div>
            <div className="mt-5 flex items-center gap-2 overflow-x-auto border-t border-[#e2dbcf] pt-4">
              <span className="shrink-0 text-[11px] font-black text-[#76786f]">عرض الخطة:</span>
              {months.map((filter) => <button key={filter} type="button" onClick={() => setMonth(filter)} className={`shrink-0 rounded-full px-4 py-2 text-[12px] font-bold transition ${month === filter ? "bg-[#d7b45b] text-[#182945]" : "text-[#74776f] hover:bg-[#eee7da] hover:text-[#182945]"}`}>{filter}{filter !== "الكل" && <span className="mr-1 text-[10px] opacity-60">{programs.filter((program) => program.month === filter).length}</span>}</button>)}
            </div>
          </div>

          <div className="mt-9 flex items-center justify-between">
            <div className="text-[13px] text-[#6d716b]">عرض <strong className="font-[var(--font-display)] text-[18px] text-[#182945]">{filteredPrograms.length}</strong> برنامجاً متاحاً</div>
            {(query || month !== "الكل" || mode !== "الكل") && <button type="button" onClick={() => { setQuery(""); setMonth("الكل"); setMode("الكل"); }} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#a67a21] hover:text-[#182945]">إعادة ضبط الفلاتر <X size={14} /></button>}
          </div>

          {grouped.length > 0 ? <div className="mt-5 space-y-12">{grouped.map((section) => <section key={section.month}>
            <div className="mb-4 flex items-center gap-3 border-b border-[#d7d0c3] pb-3">
              <h3 className="font-[var(--font-display)] text-[21px] font-black text-[#182945]">{section.month} 2026</h3>
              <span className="rounded-full bg-[#f8f4eb] px-3 py-1 text-[11px] font-bold text-[#85867e]">{section.items.length} برامج</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{section.items.map((program) => <ProgramCard key={program.id} program={program} onOpen={() => setSelectedId(program.id)} />)}</div>
          </section>)}</div> : <div className="mt-5 rounded-[24px] border border-dashed border-[#c8c0b2] bg-[#f8f4eb] px-6 py-20 text-center"><Search size={30} className="mx-auto text-[#b28a34]" /><h3 className="mt-4 font-[var(--font-display)] text-[20px] font-black text-[#182945]">لا توجد نتائج مطابقة</h3><p className="mt-2 text-[13px] text-[#777a73]">جرّب اسماً آخر أو أعد ضبط الفلاتر لعرض كل البرامج.</p><button type="button" onClick={() => { setQuery(""); setMonth("الكل"); setMode("الكل"); }} className="mt-5 rounded-full bg-[#182945] px-5 py-2.5 text-[12px] font-bold text-[#f5e7bd] transition hover:bg-[#243a60]">عرض كل البرامج</button></div>}
        </div>
      </section>

       <section className="bg-[#182945] px-5 py-20 text-[#f8f1df] md:px-8 md:py-24">
        <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-[1fr_auto] md:items-center">
           <div>
             <div className="mb-4 flex items-center gap-3 text-[11px] font-black tracking-[.15em] text-[#e4c774]"><span className="h-px w-8 bg-[#e4c774]" />للتسجيل والاستفسار</div>
             <h2 className="max-w-[680px] font-[var(--font-display)] text-[clamp(29px,4vw,47px)] font-black leading-[1.25]">تواصل معنا<br /><span className="text-[#e4c774]">للتسجيل.</span></h2>
             <p className="mt-5 max-w-[580px] text-[14px] leading-7 text-[#bec6d0]">للتسجيل في البرامج التدريبية والاستفسار عن المواعيد، يسعد فريق المبيعات بخدمتكم.</p>
             <a href="https://www.sohoolalrowad.com/" target="_blank" rel="noreferrer" className="mt-5 inline-flex max-w-full items-center gap-2 rounded-2xl border border-[#d7b45b]/45 bg-[#d7b45b]/10 px-4 py-3 text-[12px] font-bold leading-6 text-[#f6e7b8] transition hover:border-[#d7b45b] hover:bg-[#d7b45b]/20"><ExternalLink size={16} className="shrink-0" /><span>لمزيد من البرامج التدريبية، سجّل في المنصة التدريبية لمعهد سهول الرواد العالي للتدريب</span></a>
             <div className="mt-4 flex flex-wrap gap-3 text-[14px] font-black text-[#f6e7b8]">
               <a href="tel:0595928796" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-[#d7b45b] hover:text-[#efd181]"><Phone size={15} />0595928796</a>
               <a href="tel:0595928812" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-[#d7b45b] hover:text-[#efd181]"><Phone size={15} />0595928812</a>
                <a href="https://wa.me/966595928812" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#29c46a] px-4 py-2 text-white transition hover:bg-[#20ad5b]"><MessageCircle size={15} />واتساب 0595928812</a>
                <a href="https://www.linkedin.com/in/sohool-al-rowad-training-company-1190522a6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 transition hover:border-[#d7b45b] hover:text-[#efd181]"><Linkedin size={15} />LinkedIn</a>
             </div>
           </div>
           <button type="button" onClick={scrollToPrograms} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d7b45b] px-7 py-4 text-[13px] font-black text-[#182945] transition hover:-translate-y-1 hover:bg-[#efd181]">العودة إلى الخطة <ArrowLeft size={17} /></button>
        </div>
      </section>

      <footer className="bg-[#101f38] px-5 py-10 text-[#aeb7c4] md:px-8">
        <div className="mx-auto flex max-w-[1240px] flex-col gap-7 md:flex-row md:items-end md:justify-between">
           <div><div className="flex items-center gap-3"><span className="flex h-11 w-[64px] items-center justify-center overflow-hidden rounded-xl bg-[#f8f4eb] p-1"><img src="/images/suhool-logo.png" alt="شعار معهد سهول الرواد" className="h-full w-full object-contain" /></span><div><div className="font-[var(--font-display)] text-[15px] font-black text-[#f5e7bd]">معهد سهول الرواد العالي للتدريب</div><div className="mt-1 text-[10px] text-[#8591a3]">Suhool Al-Ruwad Institute for Training</div></div></div><p className="mt-5 max-w-[390px] text-[12px] leading-6 text-[#8591a3]">الخطة التدريبية 2026م — برامج مهنية مرتبة حسب الشهر لتختار موعدك ومسارك بثقة.</p></div>
          <div className="text-right text-[11px] leading-6 text-[#8591a3]"><div>الخطة التدريبية تُحدّث دورياً</div><div>© سهول الرواد للتدريب والتطوير 2026</div></div>
        </div>
      </footer>

      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#101b2d]/60 p-0 backdrop-blur-sm md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="تفاصيل البرنامج">
          <button type="button" aria-label="إغلاق التفاصيل" onClick={() => setSelectedId(null)} className="absolute inset-0 cursor-default" />
          <article className="relative max-h-[92dvh] w-full max-w-[980px] overflow-y-auto rounded-t-[28px] bg-[#f8f4eb] shadow-[0_30px_80px_rgba(0,0,0,.25)] md:rounded-[28px]">
            <div className="relative overflow-hidden bg-[#101f38] px-6 pb-8 pt-7 text-[#f8f1df] md:px-10 md:pt-8">
              <img src={selectedProgram.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-l from-[#101f38]/95 via-[#101f38]/90 to-[#101f38]/70" />
              <div className="absolute left-0 top-0 h-full w-1/2 bg-[#d7b45b]/5" />
              <button type="button" onClick={() => setSelectedId(null)} aria-label="إغلاق" className="absolute left-5 top-5 rounded-full border border-white/15 p-2 text-[#cbd2df] transition hover:bg-white/10 hover:text-white"><X size={18} /></button>
              <div className="relative flex flex-wrap items-center gap-3 text-[11px] font-bold text-[#e1c36f]"><span className="rounded-full bg-[#d7b45b]/15 px-3 py-1.5">{selectedProgram.mode}</span><span>{selectedProgram.month} 2026</span>{selectedProgram.isHadafFunded && <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5"><img src={partnerLogos.hadaf.src} alt="" className="h-4 w-4 object-contain" />مستردة من هدف</span>}</div>
              <h2 className="relative mt-5 max-w-[720px] font-[var(--font-display)] text-[clamp(25px,4vw,40px)] font-black leading-[1.35]">{selectedProgram.name}</h2>
              <div className="relative mt-7 flex flex-wrap gap-2">
                {([[MapPin, selectedProgram.city], [CalendarDays, selectedProgram.date], [Clock3, selectedProgram.durationLabel]] as Array<[LucideIcon, string]>).map(([DetailIcon, value]) => <span key={String(value)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-[#cbd2df]"><DetailIcon size={14} className="text-[#e0bd65]" />{value}</span>)}
              </div>
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                {selectedProgram.logoKeys.map((key, index) => <span key={key} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/90 px-2.5 py-1.5"><img src={partnerLogos[key].src} alt={selectedProgram.logoLabels[index]} className="h-8 max-w-[110px] object-contain" /></span>)}
              </div>
            </div>
            <div className="grid gap-7 p-6 md:grid-cols-[1.35fr_.75fr] md:p-10">
              <div>
                <div className="border-b border-[#e1dbd0] pb-7"><h3 className="flex items-center gap-2 font-[var(--font-display)] text-[18px] font-black text-[#182945]"><span className="h-5 w-1 rounded-full bg-[#d7b45b]" />نبذة عن البرنامج</h3><p className="mt-4 text-[14px] leading-8 text-[#646c6a]">{selectedProgram.overview}</p></div>
                <div className="pt-7"><h3 className="flex items-center gap-2 font-[var(--font-display)] text-[18px] font-black text-[#182945]"><span className="h-5 w-1 rounded-full bg-[#d7b45b]" />محاور البرنامج</h3><ol className="mt-4 grid gap-3">{selectedProgram.axes.map((axis, index) => <li key={axis} className="flex items-start gap-3 text-[13px] leading-6 text-[#646c6a]"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#182945] font-[var(--font-display)] text-[11px] font-black text-[#e0bd65]">{String(index + 1).padStart(2, "0")}</span>{axis}</li>)}</ol></div>
                <div className="mt-7 rounded-[22px] border border-[#e0d9cb] bg-[#fffdf8] p-5"><h3 className="flex items-center gap-2 font-[var(--font-display)] text-[18px] font-black text-[#182945]"><span className="h-5 w-1 rounded-full bg-[#d7b45b]" />الاعتماد والتمويل</h3><p className="mt-3 text-[13px] leading-7 text-[#646c6a]">{selectedProgram.certification}</p><div className="mt-4 flex flex-wrap gap-2">{selectedProgram.logoKeys.map((key, index) => <span key={key} className="inline-flex items-center gap-2 rounded-xl border border-[#e5dfd4] bg-[#fffdf8] px-2.5 py-2"><img src={partnerLogos[key].src} alt={selectedProgram.logoLabels[index]} className="h-8 max-w-[105px] object-contain" /></span>)}{selectedProgram.isHadafFunded && <span className="inline-flex items-center gap-2 rounded-xl border border-[#d7e1ee] bg-[#edf4fb] px-2.5 py-2 text-[11px] font-black text-[#234a76]"><img src={partnerLogos.hadaf.src} alt={partnerLogos.hadaf.alt} className="h-8 w-8 object-contain" />مستردة من هدف</span>}</div><div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#d7eadc] bg-[#f0faf2] px-3 py-2.5"><span className="text-[17px] font-black tracking-[-.06em] text-[#20a66a]">tabby</span><span className="text-[11px] font-bold leading-5 text-[#47735a]">خيارات دفع مرنة متاحة حسب شروط الجهة</span></div></div>
              </div>
              <aside className="space-y-4">
                <div className="rounded-[22px] border border-[#e0d9cb] bg-[#fffdf8] p-5"><h3 className="font-[var(--font-display)] text-[17px] font-black text-[#182945]">معلومات سريعة</h3><div className="mt-4 space-y-3 text-[12px]"><div className="flex justify-between gap-4 border-b border-dashed border-[#e2ded4] pb-3"><span className="text-[#888a82]">الفئة المستهدفة</span><b className="max-w-[150px] text-left leading-5 text-[#182945]">{selectedProgram.audience}</b></div><div className="flex justify-between gap-4"><span className="text-[#888a82]">المدرب</span><b className="text-left text-[#182945]">فريق مدربين معتمدين</b></div></div></div>
                <div className="rounded-[22px] bg-[#e9dfc4] p-5"><h3 className="font-[var(--font-display)] text-[16px] font-black text-[#182945]">يستهدف مهارات</h3><div className="mt-3 flex flex-wrap gap-2">{selectedProgram.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f8f1df] px-3 py-1.5 text-[11px] font-bold text-[#7b601e]">{tag}</span>)}</div></div>
                 <div className="rounded-[22px] bg-[#182945] p-5 text-[#f8f1df]"><h3 className="font-[var(--font-display)] text-[17px] font-black">للتفاصيل والتسجيل</h3><p className="mt-2 text-[12px] leading-6 text-[#bfc8d4]">للتسجيل في البرنامج التدريبي أو معرفة التفاصيل، تواصل معنا مباشرة:</p><div className="mt-3 grid gap-2 text-[13px] font-black text-[#f4d982]"><a href="tel:0595928796" className="inline-flex items-center gap-2 transition hover:text-white"><Phone size={14} />0595928796</a><a href="tel:0595928812" className="inline-flex items-center gap-2 transition hover:text-white"><Phone size={14} />0595928812</a></div><div className="mt-4 grid gap-2"><a href="https://wa.me/966595928812" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#29c46a] py-3 text-[12px] font-black text-white transition hover:bg-[#20ad5b]"><MessageCircle size={15} />تواصل واتساب</a><a href="https://www.linkedin.com/in/sohool-al-rowad-training-company-1190522a6" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 py-3 text-[12px] font-black text-[#e7d38f] transition hover:border-[#d7b45b] hover:text-white"><Linkedin size={15} />تابعنا على LinkedIn</a></div><button type="button" onClick={() => openInterest(selectedProgram)} className="mt-3 w-full rounded-full bg-[#d7b45b] py-3 text-[12px] font-black text-[#182945] transition hover:bg-[#efd181]">سجّل اهتمامك</button></div>
              </aside>
            </div>
          </article>
        </div>
      )}

      {interestProgram && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#101b2d]/65 p-0 backdrop-blur-sm md:items-center md:p-6" role="dialog" aria-modal="true" aria-label="تسجيل الاهتمام">
          <button type="button" aria-label="إغلاق نموذج الاهتمام" onClick={() => setInterestProgram(null)} className="absolute inset-0 cursor-default" />
          <div className="relative w-full max-w-[520px] rounded-t-[28px] bg-[#fffdf8] p-6 shadow-[0_30px_80px_rgba(0,0,0,.25)] md:rounded-[28px] md:p-8">
            <button type="button" onClick={() => setInterestProgram(null)} aria-label="إغلاق" className="absolute left-5 top-5 rounded-full p-2 text-[#73766f] transition hover:bg-[#eee7da] hover:text-[#182945]"><X size={18} /></button>
            {interestSent ? <div className="py-8 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff0e9] text-[#256b63]"><Check size={30} /></div><h2 className="mt-5 font-[var(--font-display)] text-[24px] font-black text-[#182945]">وصل اهتمامك بنجاح</h2><p className="mx-auto mt-3 max-w-[340px] text-[13px] leading-7 text-[#73766f]">شكراً {formName.split(" ")[0] || "لك"}، تم إرسال بياناتك بنجاح وسيتواصل معك فريق سهول الرواد قريباً حول برنامج «{interestProgram.name}».</p><button type="button" onClick={() => setInterestProgram(null)} className="mt-7 rounded-full bg-[#182945] px-6 py-3 text-[12px] font-black text-[#f5e7bd]">تم</button></div> : <><div className="mb-7 border-b border-[#e2ded4] pb-5"><div className="text-[11px] font-black text-[#ae8123]">للتفاصيل والتسجيل</div><h2 className="mt-2 max-w-[390px] font-[var(--font-display)] text-[22px] font-black leading-8 text-[#182945]">{interestProgram.name}</h2><p className="mt-2 text-[12px] text-[#7b7d75]">{interestProgram.date} · {interestProgram.city}</p></div><form onSubmit={submitInterest} className="space-y-4"><label className="block text-[12px] font-bold text-[#555d5d]">البرنامج التدريبي<input readOnly value={interestProgram.name} className="mt-2 h-11 w-full rounded-xl border border-[#ddd7ca] bg-[#eee9df] px-3 text-[13px] font-bold text-[#182945] outline-none" /></label><label className="block text-[12px] font-bold text-[#555d5d]">الاسم الكامل<input required value={formName} onChange={(event) => setFormName(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd7ca] bg-[#f8f4eb] px-3 text-[13px] outline-none focus:border-[#b28a34] focus:ring-2 focus:ring-[#d7b45b]/25" placeholder="اكتب اسمك" /></label><label className="block text-[12px] font-bold text-[#555d5d]">البريد الإلكتروني<input required type="email" value={formEmail} onChange={(event) => setFormEmail(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd7ca] bg-[#f8f4eb] px-3 text-[13px] outline-none focus:border-[#b28a34] focus:ring-2 focus:ring-[#d7b45b]/25" placeholder="name@company.com" /></label><label className="block text-[12px] font-bold text-[#555d5d]">رقم الجوال<input required type="tel" value={formPhone} onChange={(event) => setFormPhone(event.target.value)} className="mt-2 h-11 w-full rounded-xl border border-[#ddd7ca] bg-[#f8f4eb] px-3 text-[13px] outline-none focus:border-[#b28a34] focus:ring-2 focus:ring-[#d7b45b]/25" placeholder="05xxxxxxxx" /></label><button disabled={interestSubmitting} type="submit" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#182945] py-3.5 text-[13px] font-black text-[#f5e7bd] transition hover:bg-[#243a60] disabled:cursor-wait disabled:opacity-60">{interestSubmitting ? "جارٍ إرسال البيانات..." : "إرسال الاهتمام"} <ArrowLeft size={16} /></button>{interestError && <p role="alert" className="text-center text-[12px] font-bold leading-6 text-[#b4493e]">{interestError}</p>}<div className="rounded-2xl bg-[#f6f0e4] px-4 py-3 text-center text-[12px] font-bold text-[#73766f]"><span>للاستفسار المباشر: </span><a href="tel:0595928796" className="text-[#9b731e]">0595928796</a><span className="mx-1">أو</span><a href="tel:0595928812" className="text-[#9b731e]">0595928812</a></div></form></>}
          </div>
        </div>
      )}
    </main>
  );
}
