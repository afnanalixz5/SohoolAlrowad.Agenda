export type Mode = "حضوري" | "عن بعد" | "حضوري / عن بعد" | "هجين";

export type Program = {
  id: string;
  date: string;
  month: string;
  monthOrder: number;
  day: string;
  name: string;
  mode: Mode;
  city: string;
  days: number;
  durationLabel: string;
  image: string;
  imageAlt: string;
  logoKeys: string[];
  logoLabels: string[];
  isHadafFunded: boolean;
  overview: string;
  axes: string[];
  audience: string;
  tags: string[];
  certification: string;
};

export const partnerLogos: Record<string, { src: string; alt: string }> = {
  suhool: { src: "/images/suhool-logo.png", alt: "شعار سهول الرواد" },
  ibta: { src: "/images/partners/ibta.png", alt: "شعار IBTA" },
  cbp: { src: "/images/partners/cbp.png", alt: "شعار CBP" },
  lmi: { src: "/images/partners/lmi.jpeg", alt: "شعار LMI" },
  oceg: { src: "/images/partners/oceg.png", alt: "شعار OCEG" },
  osha: { src: "/images/partners/osha.png", alt: "شعار OSHA" },
  pmi: { src: "/images/partners/pmi.jpeg", alt: "شعار PMI" },
  microsoft: { src: "/images/partners/microsoft.png", alt: "شعار Microsoft" },
  powerbi: { src: "/images/partners/powerbi.jpeg", alt: "شعار Power BI" },
  comptia: { src: "/images/partners/comptia.png", alt: "شعار CompTIA" },
  security: { src: "/images/partners/security-plus.jpeg", alt: "شعار CompTIA Security+" },
  network: { src: "/images/partners/network-plus.jpeg", alt: "شعار CompTIA Network+" },
  comptiaA: { src: "/images/partners/comptia-a.jpeg", alt: "شعار CompTIA A+" },
  hadaf: { src: "/images/partners/hadaf.png", alt: "شعار صندوق تنمية الموارد البشرية هدف" },
  kingAbdulaziz: { src: "/images/partners/king-abdulaziz.png", alt: "شعار جامعة الملك عبدالعزيز" },
};

type Content = Pick<Program, "overview" | "axes" | "audience" | "tags" | "certification" | "imageAlt">;

const content: Record<string, Content> = {
  foresight: {
    overview: "برنامج قيادي يساعد المشاركين على قراءة المتغيرات وبناء سيناريوهات مستقبلية وتحويلها إلى جاهزية مؤسسية قابلة للتنفيذ.",
    axes: ["مفاهيم الاستشراف الاستراتيجي", "أدوات ومنهجيات استشراف المستقبل", "بناء السيناريوهات", "تحويل الاستشراف إلى خطط", "قياس الجاهزية المؤسسية"],
    audience: "القيادات الاستراتيجية ومسؤولو التخطيط والابتكار المؤسسي.",
    tags: ["استشراف", "تخطيط مستقبلي", "قيادة"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "قيادات سعودية في ورشة استشراف استراتيجي",
  },
  hr: {
    overview: "برنامج عملي لبناء استراتيجية الموارد البشرية وربطها بالتوجهات المؤسسية واحتياجات القوى العاملة في سوق العمل السعودي.",
    axes: ["تحليل احتياجات القوى العاملة", "التخطيط للاستقطاب والاستبقاء", "ربط الموارد البشرية بالأهداف", "مؤشرات رأس المال البشري", "خطة تنفيذ استراتيجية"],
    audience: "مديرو ومسؤولو الموارد البشرية وفرق التخطيط المؤسسي.",
    tags: ["موارد بشرية", "تخطيط استراتيجي", "رأس مال بشري"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "مختصو موارد بشرية سعوديون في جلسة تخطيط",
  },
  leadership: {
    overview: "مسار CBP احترافي يطوّر مهارات القيادة الإدارية واتخاذ القرار وإدارة الفرق، مع تطبيقات عملية في بيئة العمل.",
    axes: ["أساسيات القيادة الإدارية", "اتخاذ القرار وحل المشكلات", "إدارة وتحفيز الفرق", "التفويض والمساءلة", "قياس الأداء القيادي"],
    audience: "المدراء ورؤساء الأقسام والقيادات الإدارية الطموحة.",
    tags: ["قيادة", "إدارة", "CBP"],
    certification: "شهادة محترف أعمال دولية من IBTA وCBP",
    imageAlt: "قادة أعمال سعوديون في ورشة قيادة",
  },
  project: {
    overview: "برنامج CBP تطبيقي لإدارة المشاريع باحتراف، من تحديد النطاق والجدول إلى إدارة المخاطر والمتابعة والإغلاق.",
    axes: ["دورة حياة المشروع", "تخطيط النطاق والجدول", "إدارة الموارد والتكلفة", "إدارة مخاطر المشاريع", "المتابعة والتقييم والإغلاق"],
    audience: "مديرو المشاريع ومنسقوها وفرق التخطيط والتنفيذ.",
    tags: ["إدارة مشاريع", "CBP", "تخطيط"],
    certification: "شهادة محترف أعمال دولية من IBTA وCBP",
    imageAlt: "مديرو مشاريع سعوديون يخططون لمشروع مؤسسي",
  },
  risk: {
    overview: "برنامج متخصص لبناء سجل مخاطر مؤسسي وتحليل الاحتمالات والأثر واختيار الاستجابات المناسبة لتعزيز استمرارية الأعمال.",
    axes: ["مفاهيم إدارة المخاطر", "تحديد وتصنيف المخاطر", "التقييم والتحليل", "استراتيجيات الاستجابة", "المتابعة والمراجعة"],
    audience: "مسؤولو المخاطر والتدقيق والامتثال والجودة.",
    tags: ["إدارة مخاطر", "حوكمة", "امتثال"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "مختصو مخاطر سعوديون يراجعون مصفوفة مخاطر",
  },
  customer: {
    overview: "مسار CBP يرفع مهارات التعامل مع العملاء وإدارة التجربة ومعالجة الشكاوى وبناء الولاء في المؤسسات الخدمية.",
    axes: ["أساسيات خدمة العملاء", "فهم توقعات العميل", "إدارة الشكاوى", "قياس الرضا", "بناء ولاء العملاء"],
    audience: "فرق خدمة العملاء ومراكز الاتصال وموظفو التواصل المباشر.",
    tags: ["خدمة عملاء", "CBP", "تجربة العميل"],
    certification: "شهادة محترف أعمال دولية من IBTA وCBP",
    imageAlt: "فريق خدمة عملاء سعودي في تدريب عملي",
  },
  safety: {
    overview: "تدريب مهني على مبادئ السلامة والصحة المهنية، التعرف على المخاطر، ورفع جاهزية فرق العمل في المواقع.",
    axes: ["التعرف على المخاطر", "إجراءات الوقاية", "الاستجابة للطوارئ", "معدات الحماية", "ثقافة السلامة"],
    audience: "مشرفو السلامة والعمليات والموظفون في المواقع التشغيلية.",
    tags: ["سلامة مهنية", "صحة", "وقاية"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "متدربون سعوديون في تدريب الصحة والسلامة المهنية",
  },
  pmp: {
    overview: "برنامج إدارة المشاريع الاحترافية PMP يربط الممارسات العالمية بالتطبيقات العملية في المشاريع المؤسسية.",
    axes: ["مبادئ إدارة المشاريع", "إدارة النطاق والوقت", "التكلفة والجودة", "المخاطر وأصحاب المصلحة", "الاستعداد لشهادة PMP"],
    audience: "مديرو المشاريع والمهندسون وقادة فرق التنفيذ.",
    tags: ["PMP", "إدارة مشاريع", "اعتماد دولي"],
    certification: "إعداد لشهادة PMP الدولية من PMI",
    imageAlt: "مديرو مشاريع سعوديون يراجعون خطة مشروع",
  },
  grcp: {
    overview: "برنامج GRCP يعرّف المشاركين بأطر الحوكمة والمخاطر والامتثال، وبناء منظومة متكاملة للرقابة المؤسسية.",
    axes: ["مبادئ الحوكمة", "إدارة المخاطر", "الامتثال والرقابة", "الأدوار والمسؤوليات", "قياس نضج المنظومة"],
    audience: "مسؤولو الحوكمة والمخاطر والامتثال والتدقيق الداخلي.",
    tags: ["GRCP", "حوكمة", "امتثال"],
    certification: "شهادة GRCP المهنية من OCEG",
    imageAlt: "مختصو الحوكمة السعوديون في ورشة امتثال",
  },
  ai: {
    overview: "تطبيقات عملية لأدوات الذكاء الاصطناعي التي تساعد الموظفين والفرق على رفع الإنتاجية وجودة المخرجات اليومية.",
    axes: ["مفاهيم الذكاء الاصطناعي", "صياغة الأوامر الفعالة", "أتمتة المهام", "تحليل المخرجات", "الضوابط والاستخدام المسؤول"],
    audience: "الموظفون والقيادات وفرق المعرفة والتحول الرقمي.",
    tags: ["ذكاء اصطناعي", "إنتاجية", "تحول رقمي"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "موظفون سعوديون يتعلمون أدوات الذكاء الاصطناعي",
  },
  security: {
    overview: "مسار تأسيسي في أمن المعلومات والشبكات والتشفير وإدارة الوصول، مع تحضير عملي لمفاهيم CompTIA Security+.",
    axes: ["تهديدات الأمن السيبراني", "الشبكات والتشفير", "إدارة الهوية والوصول", "الاستجابة للحوادث", "التحضير للاختبار"],
    audience: "المبتدئون ومختصو تقنية المعلومات الراغبون في مسار الأمن السيبراني.",
    tags: ["CompTIA", "Security+", "أمن سيبراني"],
    certification: "تحضير لشهادة CompTIA Security+ الدولية",
    imageAlt: "متدربون سعوديون في مختبر أمن سيبراني",
  },
  network: {
    overview: "برنامج عملي لفهم بنية الشبكات والأجهزة والبروتوكولات واستكشاف الأعطال، مع تطبيقات على شهادة Network+.",
    axes: ["أساسيات الشبكات", "الأجهزة والبروتوكولات", "العناوين والاتصال", "الأمن واستكشاف الأعطال", "التحضير للاختبار"],
    audience: "فنيو الشبكات والدعم الفني وطلاب تقنية المعلومات.",
    tags: ["CompTIA", "Network+", "شبكات"],
    certification: "تحضير لشهادة CompTIA Network+ الدولية",
    imageAlt: "مختصو شبكات سعوديون في مختبر تقني",
  },
  hvac: {
    overview: "أساسيات تشغيل وصيانة أنظمة التبريد والتكييف وقراءة مكوناتها وممارسات السلامة في المواقع.",
    axes: ["مكونات أنظمة التكييف", "دورة التبريد", "التشغيل والصيانة", "تشخيص الأعطال", "السلامة وكفاءة الطاقة"],
    audience: "الفنيون والمشرفون والمهتمون بأنظمة التبريد والتكييف.",
    tags: ["تبريد", "تكييف", "صيانة"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "فنيون سعوديون يتدربون على أنظمة التكييف",
  },
  powerbi: {
    overview: "برنامج عملي لبناء لوحات مؤشرات تفاعلية وتحويل البيانات إلى تقارير واضحة تدعم القرار المؤسسي.",
    axes: ["استيراد وتنظيف البيانات", "نمذجة البيانات", "تصميم التقارير", "المؤشرات التفاعلية", "نشر لوحات Power BI"],
    audience: "محللو البيانات وفرق التقارير والقيادات المعتمدة على المؤشرات.",
    tags: ["Power BI", "بيانات", "تقارير"],
    certification: "شهادة حضور من Microsoft وPower BI",
    imageAlt: "محللو بيانات سعوديون يعرضون لوحة Power BI",
  },
  governance: {
    overview: "برنامج يربط التخطيط الاستراتيجي بأطر الحوكمة المؤسسية وبناء القرارات والسياسات القابلة للقياس.",
    axes: ["صياغة التوجه الاستراتيجي", "أطر الحوكمة", "الأدوار والصلاحيات", "مؤشرات الأداء", "خطة التحسين المؤسسي"],
    audience: "القيادات ومسؤولو التخطيط والحوكمة والتميز المؤسسي.",
    tags: ["استراتيجية", "حوكمة", "تميز مؤسسي"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "قيادات سعودية في ورشة استراتيجية وحوكمة",
  },
  riskGovernance: {
    overview: "برنامج احترافي يدمج إدارة المخاطر مع الحوكمة والامتثال لبناء قرارات مؤسسية أكثر اتزاناً.",
    axes: ["حوكمة المخاطر", "شهية المخاطر", "الرقابة والامتثال", "التقارير التنفيذية", "خطة المعالجة"],
    audience: "المختصون والقيادات في المخاطر والحوكمة والامتثال.",
    tags: ["مخاطر", "حوكمة", "امتثال"],
    certification: "شهادة حضور معتمدة من مبدعون",
    imageAlt: "مستشارون سعوديون في ورشة حوكمة ومخاطر",
  },
  transformation: {
    overview: "برنامج استشاري مكثف يجهز المشاركين لتصميم مبادرات التحول بالذكاء الاصطناعي وقيادة التغيير المؤسسي.",
    axes: ["استراتيجية الذكاء الاصطناعي", "تصميم مبادرات التحول", "إدارة التغيير", "قياس الأثر", "خارطة التنفيذ"],
    audience: "المستشارون والقيادات وفرق التحول المؤسسي.",
    tags: ["ذكاء اصطناعي", "تحول مؤسسي", "استشارات"],
    certification: "شهادة مستشار معتمد من مبدعون وجامعة الملك عبدالعزيز",
    imageAlt: "مستشارون سعوديون يناقشون تحولاً مؤسسياً بالذكاء الاصطناعي",
  },
  womenLeadership: {
    overview: "مسار قيادي يركز على تمكين القيادات النسائية وبناء التأثير وصناعة القرار في المؤسسات الحديثة.",
    axes: ["الهوية القيادية", "التأثير والتواصل", "صناعة القرار", "إدارة الفرق", "خطة النمو القيادي"],
    audience: "القيادات النسائية والمرشحات للمناصب الإشرافية والتنفيذية.",
    tags: ["قيادة نسائية", "تطوير مهني", "تأثير"],
    certification: "شهادة قيادة دولية من LMI",
    imageAlt: "قيادات نسائية سعودية في برنامج تطوير قيادي",
  },
  academicLeadership: {
    overview: "برنامج يطوّر قدرات القيادات الأكاديمية على إدارة الفرق التعليمية وصناعة الأثر ورفع جودة الأداء.",
    axes: ["القيادة الأكاديمية", "إدارة الفرق التعليمية", "جودة المخرجات", "التخطيط والاعتماد", "قياس الأثر"],
    audience: "القيادات الأكاديمية والمشرفون ومديرو المؤسسات التعليمية.",
    tags: ["قيادة أكاديمية", "تعليم", "LMI"],
    certification: "شهادة قيادة دولية من LMI",
    imageAlt: "قيادات أكاديمية سعودية في جلسة تطوير",
  },
  performance: {
    overview: "برنامج قيادي دولي يربط إدارة الأداء بالنتائج المؤسسية ويحوّل المؤشرات إلى قرارات وتحسينات مستمرة.",
    axes: ["إدارة الأداء", "مؤشرات النتائج", "المساءلة والتحفيز", "المراجعات التنفيذية", "خطط التحسين"],
    audience: "القيادات التنفيذية ومديرو الأداء والتميز المؤسسي.",
    tags: ["أداء", "نتائج", "قيادة"],
    certification: "شهادة حضور معتمدة من سهول الرواد",
    imageAlt: "قيادات سعودية تراجع مؤشرات الأداء المؤسسي",
  },
  comptiaA: {
    overview: "مسار تقني يؤهل المشاركين لفهم مكونات الحاسب وأنظمة التشغيل والصيانة والدعم الفني استعداداً لشهادة CompTIA A+.",
    axes: ["مكونات الحاسب", "أنظمة التشغيل", "استكشاف الأعطال", "أساسيات الشبكات", "التحضير لاختبار A+"],
    audience: "فنيو الدعم الفني والراغبون في دخول مجال تقنية المعلومات.",
    tags: ["CompTIA", "A+", "دعم فني"],
    certification: "تحضير لشهادة CompTIA A+ الدولية",
    imageAlt: "فنيون سعوديون يتعلمون صيانة الحاسب",
  },
  computerTechnology: {
    overview: "مسار CBP عملي لإدارة تقنيات الحاسب والدعم الفني داخل بيئة العمل المؤسسية وفق أفضل الممارسات.",
    axes: ["تكنولوجيا المعلومات المؤسسية", "إدارة الأجهزة والأنظمة", "دعم المستخدمين", "أمن المعلومات الأساسي", "أفضل الممارسات التقنية"],
    audience: "فرق تقنية المعلومات والدعم الفني في المؤسسات.",
    tags: ["تقنية معلومات", "CBP", "دعم فني"],
    certification: "شهادة محترف أعمال دولية من IBTA وCBP",
    imageAlt: "مختصو تقنية سعوديون يقدمون دعماً فنياً",
  },
  entrepreneurship: {
    overview: "برنامج CYBP يعرّف الشباب بمراحل تأسيس المشروع، فهم العميل، بناء النموذج، وإدارة خطوات الانطلاق.",
    axes: ["فكرة المشروع", "فهم السوق والعملاء", "نموذج العمل", "التسويق الأولي", "خطة الإطلاق"],
    audience: "الشباب ورواد الأعمال وأصحاب الأفكار والمشاريع الناشئة.",
    tags: ["ريادة أعمال", "CYBP", "شباب"],
    certification: "شهادة محترف أعمال الشباب CYBP من IBTA",
    imageAlt: "شباب سعوديون يطوّرون فكرة مشروع",
  },
};

type Seed = {
  id: string;
  date: string;
  month: string;
  monthOrder: number;
  day: string;
  name: string;
  mode: Mode;
  city: string;
  days: number;
  durationLabel?: string;
  kind: keyof typeof content;
  imageSlug: string;
  logoKeys: string[];
  logoLabels: string[];
  isHadafFunded?: boolean;
};

const seeds: Seed[] = [
  { id: "p01", date: "24/8/2026", month: "أغسطس", monthOrder: 8, day: "24", name: "الاستشراف الاستراتيجي وصناعة الجاهزية المستقبلية", mode: "حضوري", city: "تركيا - إسطنبول", days: 5, kind: "foresight", imageSlug: "strategic-foresight", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p02", date: "25/8/2026", month: "أغسطس", monthOrder: 8, day: "25", name: "التخطيط الاستراتيجي للموارد البشرية", mode: "حضوري", city: "جدة", days: 3, kind: "hr", imageSlug: "strategic-hr", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p03", date: "6/9/2026", month: "سبتمبر", monthOrder: 9, day: "06", name: "محترف أعمال القيادة الإدارية CBP", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "leadership", imageSlug: "cbp-leadership", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p04", date: "13/9/2026", month: "سبتمبر", monthOrder: 9, day: "13", name: "محترف أعمال إدارة المشاريع CBP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "project", imageSlug: "cbp-project", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p05", date: "13/9/2026", month: "سبتمبر", monthOrder: 9, day: "13", name: "أخصائي إدارة المخاطر", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "risk", imageSlug: "risk-management", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p06", date: "20/9/2026", month: "سبتمبر", monthOrder: 9, day: "20", name: "محترف أعمال خدمة العملاء CBP", mode: "حضوري / عن بعد", city: "جدة", days: 3, kind: "customer", imageSlug: "cbp-customer-service", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p07", date: "27/9/2026", month: "سبتمبر", monthOrder: 9, day: "27", name: "أخصائي صحة وسلامة مهنية", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "safety", imageSlug: "occupational-safety", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p08", date: "27/9/2026", month: "سبتمبر", monthOrder: 9, day: "27", name: "إدارة المشاريع الاحترافية PMP", mode: "عن بعد", city: "—", days: 5, kind: "pmp", imageSlug: "pmp", logoKeys: ["kingAbdulaziz"], logoLabels: ["مبدعون / جامعة الملك عبدالعزيز"] },
  { id: "p09", date: "4/10/2026", month: "أكتوبر", monthOrder: 10, day: "04", name: "إدارة المخاطر والحوكمة GRCP", mode: "عن بعد", city: "—", days: 5, kind: "grcp", imageSlug: "grcp", logoKeys: ["oceg"], logoLabels: ["OCEG"], isHadafFunded: true },
  { id: "p10", date: "4/10/2026", month: "أكتوبر", monthOrder: 10, day: "04", name: "محترف أعمال القيادة الإدارية CBP", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "leadership", imageSlug: "cbp-leadership", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p11", date: "11/10/2026", month: "أكتوبر", monthOrder: 10, day: "11", name: "أدوات الذكاء الاصطناعي للإنتاجية في بيئة العمل", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "ai", imageSlug: "ai-productivity", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p12", date: "11/10/2026", month: "أكتوبر", monthOrder: 10, day: "11", name: "محترف أعمال إدارة المشاريع CBP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "project", imageSlug: "cbp-project", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p13", date: "18/10/2026", month: "أكتوبر", monthOrder: 10, day: "18", name: "أساسيات الأمن السيبراني CompTIA Security+", mode: "عن بعد", city: "—", days: 5, kind: "security", imageSlug: "security-plus", logoKeys: ["comptia", "security"], logoLabels: ["CompTIA", "Security+"], isHadafFunded: true },
  { id: "p14", date: "18/10/2026", month: "أكتوبر", monthOrder: 10, day: "18", name: "شهادة كومبتيا أساسيات الشبكات Network+ + CompTIA Network+", mode: "حضوري", city: "المجر - بودابست", days: 5, kind: "network", imageSlug: "network-plus", logoKeys: ["comptia", "network"], logoLabels: ["CompTIA", "Network+"], isHadafFunded: true },
  { id: "p15", date: "18/10/2026", month: "أكتوبر", monthOrder: 10, day: "18", name: "أساسيات نظام التبريد والتكييف", mode: "حضوري / عن بعد", city: "الرياض - الدمام", days: 3, kind: "hvac", imageSlug: "hvac", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p16", date: "25/10/2026", month: "أكتوبر", monthOrder: 10, day: "25", name: "محترف أعمال خدمة العملاء CBP", mode: "حضوري / عن بعد", city: "جدة", days: 3, kind: "customer", imageSlug: "cbp-customer-service", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p17", date: "1/11/2026", month: "نوفمبر", monthOrder: 11, day: "01", name: "تحليل البيانات باستخدام Power BI", mode: "حضوري / عن بعد", city: "الخبر", days: 4, kind: "powerbi", imageSlug: "powerbi", logoKeys: ["microsoft", "powerbi"], logoLabels: ["Microsoft", "Power BI"], isHadafFunded: true },
  { id: "p18", date: "1/11/2026", month: "نوفمبر", monthOrder: 11, day: "01", name: "محترف أعمال القيادة الإدارية CBP", mode: "حضوري / عن بعد", city: "جدة", days: 3, kind: "leadership", imageSlug: "cbp-leadership", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p19", date: "8/11/2026", month: "نوفمبر", monthOrder: 11, day: "08", name: "الصحة والسلامة المهنية OSHA", mode: "حضوري / عن بعد", city: "الخبر", days: 5, kind: "safety", imageSlug: "occupational-safety", logoKeys: ["osha"], logoLabels: ["OSHA"] },
  { id: "p20", date: "8/11/2026", month: "نوفمبر", monthOrder: 11, day: "08", name: "محترف أعمال إدارة المشاريع CBP", mode: "حضوري / عن بعد", city: "الخبر", days: 5, kind: "project", imageSlug: "cbp-project", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p21", date: "15/11/2026", month: "نوفمبر", monthOrder: 11, day: "15", name: "التخطيط الاستراتيجي والحوكمة المؤسسية", mode: "حضوري", city: "ماليزيا - كوالالمبور", days: 3, kind: "governance", imageSlug: "strategic-governance", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p22", date: "15/11/2026", month: "نوفمبر", monthOrder: 11, day: "15", name: "محترف أعمال خدمة العملاء CBP", mode: "حضوري / عن بعد", city: "الرياض", days: 3, kind: "customer", imageSlug: "cbp-customer-service", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p23", date: "15/11/2026", month: "نوفمبر", monthOrder: 11, day: "15", name: "إدارة المخاطر والحوكمة", mode: "عن بعد", city: "—", days: 3, kind: "riskGovernance", imageSlug: "risk-governance", logoKeys: ["kingAbdulaziz"], logoLabels: ["مبدعون / جامعة الملك عبدالعزيز"] },
  { id: "p24", date: "15/11/2026", month: "نوفمبر", monthOrder: 11, day: "15", name: "استشاري معتمد في الذكاء الاصطناعي والتحول المؤسسي", mode: "هجين" as Mode, city: "الرياض / الدمام / جدة", days: 9, durationLabel: "9 أسابيع", kind: "transformation", imageSlug: "ai-transformation", logoKeys: ["kingAbdulaziz"], logoLabels: ["مبدعون / جامعة الملك عبدالعزيز"] },
  { id: "p25", date: "15/11/2026", month: "نوفمبر", monthOrder: 11, day: "15", name: "استشاري معتمد في الحوكمة وإدارة المخاطر", mode: "هجين" as Mode, city: "الرياض / الدمام / جدة", days: 9, durationLabel: "9 أسابيع", kind: "riskGovernance", imageSlug: "risk-governance", logoKeys: ["kingAbdulaziz"], logoLabels: ["مبدعون / جامعة الملك عبدالعزيز"] },
  { id: "p26", date: "22/11/2026", month: "نوفمبر", monthOrder: 11, day: "22", name: "التخطيط الاستراتيجي للموارد البشرية", mode: "عن بعد", city: "—", days: 3, kind: "hr", imageSlug: "strategic-hr", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p27", date: "22/11/2026", month: "نوفمبر", monthOrder: 11, day: "22", name: "أدوات الذكاء الاصطناعي للإنتاجية في بيئة العمل", mode: "عن بعد", city: "—", days: 3, kind: "ai", imageSlug: "ai-productivity", logoKeys: ["kingAbdulaziz"], logoLabels: ["مبدعون / جامعة الملك عبدالعزيز"] },
  { id: "p28", date: "22/11/2026", month: "نوفمبر", monthOrder: 11, day: "22", name: "محترف ريادة الأعمال للشباب CYBP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "entrepreneurship", imageSlug: "cbp-entrepreneurship", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p29", date: "29/11/2026", month: "نوفمبر", monthOrder: 11, day: "29", name: "برنامج القيادة النسائية الدولي", mode: "هجين" as Mode, city: "الرياض / الدمام / جدة", days: 10, kind: "womenLeadership", imageSlug: "women-leadership", logoKeys: ["lmi"], logoLabels: ["LMI"] },
  { id: "p30", date: "29/11/2026", month: "نوفمبر", monthOrder: 11, day: "29", name: "برنامج القيادة الأكاديمية الدولي", mode: "هجين" as Mode, city: "الرياض / الدمام / جدة", days: 10, kind: "academicLeadership", imageSlug: "academic-leadership", logoKeys: ["lmi"], logoLabels: ["LMI"] },
  { id: "p31", date: "6/12/2026", month: "ديسمبر", monthOrder: 12, day: "06", name: "القيادة في إدارة الأداء والنتائج المؤسسية", mode: "حضوري", city: "بريطانيا - لندن", days: 3, kind: "performance", imageSlug: "performance-leadership", logoKeys: ["suhool"], logoLabels: ["سهول الرواد"] },
  { id: "p32", date: "6/12/2026", month: "ديسمبر", monthOrder: 12, day: "06", name: "محترف أعمال القيادة الإدارية CBP", mode: "حضوري / عن بعد", city: "الخبر", days: 3, kind: "leadership", imageSlug: "cbp-leadership", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p33", date: "13/12/2026", month: "ديسمبر", monthOrder: 12, day: "13", name: "محترف أعمال إدارة المشاريع PMP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "pmp", imageSlug: "pmp", logoKeys: ["pmi"], logoLabels: ["PMI"], isHadafFunded: true },
  { id: "p34", date: "13/12/2026", month: "ديسمبر", monthOrder: 12, day: "13", name: "محترف أعمال إدارة المشاريع CBP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "project", imageSlug: "cbp-project", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p35", date: "20/12/2026", month: "ديسمبر", monthOrder: 12, day: "20", name: "فني حاسب آلي CompTIA A+", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "comptiaA", imageSlug: "comptia-a", logoKeys: ["comptia", "comptiaA"], logoLabels: ["CompTIA", "A+"], isHadafFunded: true },
  { id: "p36", date: "20/12/2026", month: "ديسمبر", monthOrder: 12, day: "20", name: "محترف أعمال خدمة العملاء CBP", mode: "حضوري / عن بعد", city: "جدة", days: 3, kind: "customer", imageSlug: "cbp-customer-service", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p37", date: "27/12/2026", month: "ديسمبر", monthOrder: 12, day: "27", name: "أخصائي تكنولوجيا الحاسب الآلي CBP", mode: "حضوري / عن بعد", city: "الرياض", days: 5, kind: "computerTechnology", imageSlug: "computer-technology", logoKeys: ["ibta", "cbp"], logoLabels: ["IBTA", "CBP"], isHadafFunded: true },
  { id: "p38", date: "8/11/2026", month: "نوفمبر", monthOrder: 11, day: "08", name: "استشاري الذكاء الاصطناعي", mode: "هجين", city: "الرياض / الدمام / جدة", days: 9, durationLabel: "9 أسابيع", kind: "transformation", imageSlug: "ai-transformation", logoKeys: ["kingAbdulaziz"], logoLabels: ["اعتماد جامعة الملك عبدالعزيز"] },
  { id: "p39", date: "6/12/2026", month: "ديسمبر", monthOrder: 12, day: "06", name: "استشاري الحوكمة وإدارة المخاطر والامتثال", mode: "هجين", city: "الرياض / الدمام / جدة", days: 9, durationLabel: "9 أسابيع", kind: "riskGovernance", imageSlug: "risk-governance", logoKeys: ["kingAbdulaziz"], logoLabels: ["اعتماد جامعة الملك عبدالعزيز"] },
];

export const programs: Program[] = seeds.map((seed) => {
  const details = content[seed.kind];
  return {
    ...seed,
    durationLabel: seed.durationLabel ?? `${seed.days} أيام`,
    isHadafFunded: seed.isHadafFunded ?? false,
    image: `/images/courses/course-${seed.imageSlug}.jpg`,
    ...details,
  };
});