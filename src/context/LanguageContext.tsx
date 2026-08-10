"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "UA";

export const translations = {
  EN: {
    // Header & Menu
    menu: "MENU",
    close: "CLOSE ✕",
    conciergeContact: "Concierge Contact:",
    home: "HOME",
    about: "ABOUT ATELIER",
    essence: "ESSENCE LOOKBOOK",
    collection: "HAUTE COUTURE COLLECTION",
    directory: "ATELIER DIRECTORY",
    investors: "INVESTOR RELATIONS",
    philosophy: "BRAND MANIFESTO",
    appointments: "PRIVATE APPOINTMENTS",

    // Hero
    requestCatalog: "REQUEST CATALOG",
    catalogTitle: "Request Official Catalog",
    catalogDesc: "Enter your email address to receive the full high-resolution VÉLORA Haute Couture catalog, pricing dossier, and bespoke commission guide.",
    sendRequest: "Send Catalog Request",

    // About Section
    aboutEyebrow: "ATELIER HERITAGE & SCULPTURAL ART",
    aboutTitle: "About The Atelier",
    aboutSub: "The Art of Architectural Femininity",
    aboutStage1Line1: "VÉLORA is a modern women's fashion brand created in Odesa, Ukraine.",
    aboutStage2Line1: "The brand is dedicated to designing elegant, feminine, and contemporary dresses for women who want to express their confidence, beauty, and individuality.",
    aboutStage3Line1: "VÉLORA combines European elegance with modern feminine design, creating pieces that are sophisticated, attractive, and unforgettable.",
    craftsmanshipTitle: "Bespoke Corsetry Geometry",
    craftsmanshipDesc: "Every corset is sculpted by hand using internal architectural boning and French silk tulle.",
    silkTitle: "Architectural Silk Sculpting",
    silkDesc: "Heavy Italian silk satin draped directly onto customized client forms to eliminate fitting friction.",
    heritageTitle: "Rare Heritage Craftsmanship",
    heritageDesc: "Handcrafted in our master Odesa atelier by master seamstresses with over 20 years of experience.",

    // Lookbook (FullSizeScrollerStepper)
    lookbookEyebrow: "LOOKBOOK • ESSENCE OF VÉLORA",
    lookbookTitle: "Sculptural Silhouette Showcase",
    look01Name: "AURA NOCTURNE",
    look01Sub: "Midnight Tulle & Hand-Embroidered Lace Gown",
    look01Desc: "A statement evening masterpiece featuring an architectural lace corset bodice, hand-sewn crystal beadwork, a multi-layered cascading midnight tulle skirt, and a daring high leg slit.",
    look02Name: "SOLARIS ECLIPSE",
    look02Sub: "Ivory Silk Crepe & Gold Leaf Embroidery",
    look02Desc: "Modern architectural elegance with a deep tailored plunge neckline, bespoke metallic gold floral filigree along the waistline, and an elongated fluid drape with high front slit.",
    look03Name: "TERRA CONTEMPORANEA",
    look03Sub: "Chocolate Mocha Ribbed Knit Column Dress",
    look03Desc: "Sophisticated day-to-evening silhouette rendered in ultra-soft ribbed knit. High mock neck with delicate micro-button detailing and an effortless side walking slit.",
    uponRequest: "Upon Request",
    exploreSilhouette: "EXPLORE SILHOUETTE",
    commissionLook: "COMMISSION LOOK",
    lookDetails: "Look Specifications",
    fittingDuration: "Fitting Duration: 12-16 Business Days",

    // Collection Section
    collectionEyebrow: "EXCLUSIVITY & PERFECTION",
    collectionTitle: "Haute Couture Collection",
    collectionDesc: "Explore bespoke creations, evening gowns, and contemporary luxury tailored to your individual silhouette. Every piece is handcrafted in our Odesa atelier.",
    viewDetails: "View Details",
    allCategories: "ALL CATEGORIES",
    coutureTab: "HAUTE COUTURE",
    eveningTab: "ATELIER EVENING",
    knitTab: "CONTEMPORARY KNIT",
    bridalTab: "BRIDAL BESPOKE",

    // Atelier Directory Section
    atelierEyebrow: "VÉLORA MAISON DIRECTORY",
    atelierTitle: "Atelier Lines & Horizons",
    allLines: "ALL LINES (12)",
    coutureLines: "COUTURE (4)",
    seasonalLines: "SEASONAL (4)",
    accessoriesLines: "ACCESSORIES (4)",
    eveningDresses: "Evening Dresses",
    eveningDressesNote: "Red carpet & gala silk gowns",
    cocktailDresses: "Cocktail Dresses",
    cocktailDressesNote: "Architectural reception silhouettes",
    luxuryDaywear: "Luxury Daywear",
    luxuryDaywearNote: "Tailored silk & crepe daywear",
    businessFashion: "Business & Office Fashion",
    businessFashionNote: "Executive wool suits & blazers",
    winterCollections: "Winter Collections",
    winterCollectionsNote: "Velvet coats & cashmere capes",
    outerwear: "Outerwear",
    outerwearNote: "Double-face cashmere outerwear",
    knitwear: "Knitwear",
    knitwearNote: "Cashmere & merino rib knits",
    resortWear: "Resort Wear",
    resortWearNote: "Chiffon kaftans & linen sets",
    premiumAccessories: "Premium Accessories",
    premiumAccessoriesNote: "Silk scarves & leather belts",
    luxuryHandbags: "Luxury Handbags",
    luxuryHandbagsNote: "Structured leather clutches",
    footwear: "Footwear",
    footwearNote: "Satin heels & leather boots",
    fineJewelry: "Fine Jewelry & Sculptures",
    fineJewelryNote: "24K gold filigree & heirloom art",

    // Investors Section
    investorEyebrow: "VÉLORA CAPITAL & STRATEGIC GROWTH",
    investorTitle: "Strategic Investment Opportunities",
    investorDesc: "Participate in the global expansion of Ukraine's premiere haute couture maison. Scaling flagship salons in Sydney, Dubai, Odesa, and Kyiv.",
    calculatorTitle: "Return & Scaling Calculator",
    targetCapital: "Target Investment Capital:",
    projectedReturn: "Projected Return:",
    projectedRoi: "Projected ROI Multiplier:",
    capacityGrowth: "Production Capacity Growth:",
    requestDeck: "REQUEST INVESTOR DOSSIER →",
    whyInvestTitle: "Why Invest in VÉLORA?",
    whyInvest1Title: "High Margin Luxury Segment",
    whyInvest1Desc: "Operating at 75%+ gross margins across bespoke couture commissions and fine art sculptures.",
    whyInvest2Title: "Global Ultra-High-Net-Worth Reach",
    whyInvest2Desc: "Established private client base across Sydney, Dubai, Odesa, and Kyiv.",
    whyInvest3Title: "Proprietary 3D Silhouette Tech",
    whyInvest3Desc: "Digital fitting technology enabling remote custom orders with zero fitting error.",
    deckModalTitle: "Request Private Investor Dossier",
    deckModalDesc: "Please provide your credentials below to receive the confidential investment memorandum and financial model.",

    // Philosophy Section
    philosophyEyebrow: "BRAND MANIFESTO & PHILOSOPHY",
    philosophyTitle: "Our Philosophy",
    philosophyQuote: '"We believe that modern femininity is about confidence."',
    womanCanBe: "A WOMAN CAN BE:",
    elegant: "ELEGANT",
    elegantDesc: "Expressing effortless grace, refined proportion, and understated luxury.",
    feminine: "FEMININE",
    feminineDesc: "Embracing softness and fluidity with structural strength and poise.",
    confident: "CONFIDENT",
    confidentDesc: "Standing tall in bespoke architecture tailored to your unique silhouette.",
    seductive: "SEDUCTIVE",
    seductiveDesc: "Captivating attention with subtle cutouts, sculpted drapes, and allure.",
    powerful: "POWERFUL",
    powerfulDesc: "Commanding respect through unmistakable presence and uncompromised quality.",

    // Contact Section
    contactEyebrow: "PRIVATE COMMISSIONS & FITTINGS",
    contactTitle: "Connect With VÉLORA",
    contactSub: "Schedule an initial private consultation with our master tailors or connect directly with our creative director.",
    leadership: "Creative Direction",
    walidTitle: "FOUNDER & CREATIVE DIRECTOR",
    walidQuote: "“Every bespoke gown is a personal commitment to architectural perfection, engineered to capture your silhouette at its most radiant moment.”",
    salonsLabel: "Flagship Salons:",
    salons: "Sydney • Dubai • Odesa • Kyiv",
    formTitle: "Request Private Appointment",
    formSub: "Provide your details below to schedule an initial consultation with our senior master tailors.",
    namePlaceholder: "Your Full Name *",
    emailPlaceholder: "Email Address *",
    phonePlaceholder: "Phone / WhatsApp",
    preferredLocation: "Preferred Fitting Location:",
    submitInquiry: "Submit Bespoke Inquiry →",
    inquiryReceived: "Inquiry Received",
    thankYou: "Thank you! Your private fitting inquiry has been logged. Our Senior Concierge will contact you within 24 hours.",

    // Footer & Legal Modals
    cities: "SYDNEY • DUBAI • ODESA • KYIV",
    directLine: "Direct Concierge Line:",
    emailLabel: "Concierge Email:",
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    charter: "Bespoke Fitting Charter",
    copyright: "VÉLORA HAUTE COUTURE MAISON. ALL RIGHTS RESERVED.",
    closeDocument: "CLOSE DOCUMENT",
    termsModalTitle: "TERMS OF SERVICE & ATELIER POLICY",
    terms1: "1. Bespoke Commissions: Every VÉLORA gown or sculpture is handcrafted specifically for the client upon confirmation of the private fitting charter.",
    terms2: "2. Fitting Schedules: Private fitting sessions at Sydney, Dubai, Odesa, or Kyiv salons must be reserved 14 business days in advance.",
    terms3: "3. Intellectual Property: All original silhouette designs, corsetry geometry, and 3D gown sculpture renderings remain the sole intellectual property of VÉLORA Atelier.",
    privacyModalTitle: "PRIVACY POLICY & CLIENT CONFIDENTIALITY",
    privacy1: "1. Data Protection: All personal measurements, fitting photos, and contact records are encrypted under European GDPR standards.",
    privacy2: "2. Absolute Confidentiality: Client identities, wedding details, and custom order specifications are never disclosed to third parties.",
    privacy3: "3. Digital Fittings: 3D body scans captured during digital fitting consultations are stored securely and never shared.",
    charterModalTitle: "BESPOKE FITTING CHARTER",
    charter1: "1. Individual Patternmaking: A dedicated master pattern is sculpted for every client, guaranteeing a flawless silhouette.",
    charter2: "2. Material Guarantee: Only 100% pure silk, French lace, and Italian velvet sourced directly from heritage European mills are utilized.",
    charter3: "3. Lifetime Preservation: Every VÉLORA commission includes a complimentary preservation dossier and museum-grade garment care guide.",
  },

  UA: {
    // Header & Menu
    menu: "МЕНЮ",
    close: "ЗАКРИТИ ✕",
    conciergeContact: "Консьєрж-Служба:",
    home: "ГОЛОВНА",
    about: "ПРО АТЕЛЬЄ",
    essence: "ЛУКБУК",
    collection: "КОЛЕКЦІЯ",
    directory: "КАТАЛОГ ЛІНІЙ",
    investors: "ІНВЕСТОРАМ",
    philosophy: "МАНІФЕСТ БРЕНДУ",
    appointments: "ПРИВАТНИЙ ЗАПИС",

    // Hero
    requestCatalog: "ЗАПИТАТИ КАТАЛОГ",
    catalogTitle: "Запитати Офіційний Каталог",
    catalogDesc: "Введіть вашу електронну пошту, щоб отримати повний каталог VÉLORA Haute Couture високої роздільної здатності, прайс-досьє та гайд з індивідуального замовлення.",
    sendRequest: "Надіслати Запит",

    // About Section
    aboutEyebrow: "СПАДЩИНА АТЕЛЬЄ ТА СКУЛЬПТУРНЕ МИСТЕЦТВО",
    aboutTitle: "Про Наше Ательє",
    aboutSub: "Мистецтво Архітектурної Жіночності",
    aboutStage1Line1: "VÉLORA — це сучасний бренд жіночого одягу, створений в Одесі, Україна.",
    aboutStage2Line1: "Бренд присвячений створенню елегантних, жіночних та сучасних суконь для жінок, які прагнуть підкреслити свою впевненість, красу та індивідуальність.",
    aboutStage3Line1: "VÉLORA поєднує європейську елегантність із сучасним жіночним дизайном, створюючи вироби, що є витонченими, привабливими та незабутніми.",
    craftsmanshipTitle: "Архітектура Корсетної Геометрії",
    craftsmanshipDesc: "Кожен корсет створюється вручну з використанням внутрішніх архітектурних косточок та французького шовкового тюлю.",
    silkTitle: "Скульптурування з Архітектурного Шовку",
    silkDesc: "Важкий італійський шовковий сатин драпується безпосередньо на персональні форми клієнтки для ідеальної посадки.",
    heritageTitle: "Рідкісна Майстерність Спадщини",
    heritageDesc: "Виготовляється вручну в нашому головному Одеському ательє майстрами з понад 20-річним досвідом.",

    // Lookbook (FullSizeScrollerStepper)
    lookbookEyebrow: "ЛУКБУК • ДУША VÉLORA",
    lookbookTitle: "Показ Скульптурних Силуетів",
    look01Name: "AURA NOCTURNE",
    look01Sub: "Нічна Сукня з Нічного Тюлю та Мережива Ручної Роботи",
    look01Desc: "Вечірній шедевр із мереживним корсетним ліфом архітектурної форми, ручною вишивкою кришталевим бісером, багатошаровою каскадною спідницею з нічного тюлю та витонченим високим розрізом.",
    look02Name: "SOLARIS ECLIPSE",
    look02Sub: "Молочний Шовковий Креп та Золота Вишивка",
    look02Desc: "Сучасна архітектурна елегантність із глибоким витонченим вирізом, металізованою золотою філігранню вздовж лінії талії та видовженим струмливим драпуванням із високим розрізом.",
    look03Name: "TERRA CONTEMPORANEA",
    look03Sub: "Сукня-Колона з В'язаного Шоколадного Трикотажу",
    look03Desc: "Витончений силует для дня та вечора з ультрам'якого трикотажу в рубчик. Високий комір із делікатними мікрогудзиками та елегантний бічний розріз для комфортної ходи.",
    uponRequest: "За Запитом",
    exploreSilhouette: "ДОСЛІДИТИ СИЛУЕТ",
    commissionLook: "ЗАМОВИТИ ОБРАЗ",
    lookDetails: "Специфікація Образу",
    fittingDuration: "Термін Примірки: 12-16 Робочих Днів",

    // Collection Section
    collectionEyebrow: "ЕКСКЛЮЗИВНІСТЬ ТА ДОСКОНАЛІСТЬ",
    collectionTitle: "Колекція Haute Couture",
    collectionDesc: "Відкрийте для себе ексклюзивні кутюрні вироби, вечірні сукні та сучасну розкіш, створену за вашим індивідуальним силуетом. Кожен виріб створюється вручну в нашому Одеському ательє.",
    viewDetails: "Переглянути Деталі",
    allCategories: "УСІ КАТЕГОРІЇ",
    coutureTab: "HAUTE COUTURE",
    eveningTab: "ВЕЧІРНІ СУКНІ",
    knitTab: "СУЧАСНИЙ ТРИКОТАЖ",
    bridalTab: "ВЕСІЛЬНИЙ КУТЮР",

    // Atelier Directory Section
    atelierEyebrow: "КАТАЛОГ БУДИНКУ VÉLORA",
    atelierTitle: "Лінії Ательє та Перспективи",
    allLines: "УСІ ЛІНІЇ (12)",
    coutureLines: "КУТЮР (4)",
    seasonalLines: "СЕЗОННІ (4)",
    accessoriesLines: "АКСЕСУАРИ (4)",
    eveningDresses: "Вечірні Сукні",
    eveningDressesNote: "Кутюрні шовкові сукні для червоної доріжки",
    cocktailDresses: "Коктейльні Сукні",
    cocktailDressesNote: "Архітектурні силуети для прийомів",
    luxuryDaywear: "Розкішний Денний Одяг",
    luxuryDaywearNote: "Витончений шовковий та креповий одяг",
    businessFashion: "Діловий та Офісний Стиль",
    businessFashionNote: "Ексклюзивні вовняні костюми та блейзери",
    winterCollections: "Зимові Колекції",
    winterCollectionsNote: "Оксамитові пальта та кашемірові накидки",
    outerwear: "Верхній Одяг",
    outerwearNote: "Двосторонній кашеміровий верхній одяг",
    knitwear: "Трикотаж",
    knitwearNote: "Кашеміровий та мериносовий трикотаж в рубчик",
    resortWear: "Круїзна Колекція",
    resortWearNote: "Шифонові кафтани та лляні комплекти",
    premiumAccessories: "Преміальні Аксесуари",
    premiumAccessoriesNote: "Шовкові хустки та шкіряні ремені",
    luxuryHandbags: "Розкішні Сумки",
    luxuryHandbagsNote: "Структуровані шкіряні клатчі",
    footwear: "Взуття",
    footwearNote: "Атласні туфлі на підборах та шкіряні чоботи",
    fineJewelry: "Ювелірні Вироби та Скульптури",
    fineJewelryNote: "Золота філігрань 24K та сімейні реліквії",

    // Investors Section
    investorEyebrow: "КАПІТАЛ ТА СТРАТЕГІЧНЕ ЗРОСТАННЯ VÉLORA",
    investorTitle: "Стратегічні Інвестиційні Можливості",
    investorDesc: "Беріть участь у глобальному розширенні провідного українського будинку Haute Couture. Масштабування флагманських салонів у Сіднеї, Дубаї, Одесі та Києві.",
    calculatorTitle: "Калькулятор Дохідності та Масштабування",
    targetCapital: "Цільовий Інвестиційний Капітал:",
    projectedReturn: "Прогнозований Дохід:",
    projectedRoi: "Прогнозований Мультиплікатор ROI:",
    capacityGrowth: "Зростання Виробничої Потужності:",
    requestDeck: "ЗАПИТАТИ ІНВЕСТИЦІЙНИЙ МЕМОРАНДУМ →",
    whyInvestTitle: "Чому Варто Інвестувати в VÉLORA?",
    whyInvest1Title: "Високомаржинальний Сегмент Розкоші",
    whyInvest1Desc: "Операційна маржа 75%+ за індивідуальними кутюрними замовленнями та мистецькими скульптурами.",
    whyInvest2Title: "Глобальне Охоплення Ultra-High-Net-Worth Клієнтів",
    whyInvest2Desc: "Сформована база приватних клієнтів у Сіднеї, Дубаї, Одесі та Києві.",
    whyInvest3Title: "Запатентні 3D-Технології Силуету",
    whyInvest3Desc: "Технологія цифрової примірки для віддалених індивідуальних замовлень з нульовою похибкою.",
    deckModalTitle: "Запитати Приватний Інвестиційний Меморандум",
    deckModalDesc: "Будь ласка, вкажіть ваші дані нижче, щоб отримати конфіденційний меморандум та фінансову модель.",

    // Philosophy Section
    philosophyEyebrow: "МАНІФЕСТ БРЕНДУ ТА ФІЛОСОФІЯ",
    philosophyTitle: "Наша Філософія",
    philosophyQuote: '«Ми віримо, що сучасна жіночність — це впевненість.»',
    womanCanBe: "ЖІНКА МОЖЕ БУТИ:",
    elegant: "ЕЛЕГАНТНОЮ",
    elegantDesc: "Втілення невимушеної грації, витончених пропорцій та стриманої розкоші.",
    feminine: "ЖІНОЧНОЮ",
    feminineDesc: "Поєднання ніжності та плинності зі структурною силою і витонченістю.",
    confident: "ВПЕВНЕНОЮ",
    confidentDesc: "Горда і велична в кутюрній архітектурі, створеній за вашим унікальним силуетом.",
    seductive: "ЗВАБЛИВОЮ",
    seductiveDesc: "Приваблює увагу делікатними вирізами, скульптурним драпуванням та шармом.",
    powerful: "СИЛЬНОЮ",
    powerfulDesc: "Викликає повагу завдяки незаперечній присутності та безкомпромісній якості.",

    // Contact Section
    contactEyebrow: "ПРИВАТНІ ЗАМОВЛЕННЯ ТА ПРИМІРКИ",
    contactTitle: "Зв'яжіться з VÉLORA",
    contactSub: "Запишіться на первинну приватну консультацію з нашими майстрами або зв'яжіться безпосередньо з креативним директором.",
    leadership: "Креативне Керівництво",
    walidTitle: "ЗАСНОВНИК ТА КРЕАТИВНИЙ ДИРЕКТОР",
    walidQuote: "«Кожна кутюрна сукня — це особисте зобов'язання досягти архітектурної досконалості, покликане підкреслити ваш силует у найсяйніший момент.»",
    salonsLabel: "Флагманські Салони:",
    salons: "Сідней • Дубай • Одеса • Київ",
    formTitle: "Записатися на Приватну Примірку",
    formSub: "Вкажіть ваші дані нижче, щоб запланувати консультацію з провідними майстрами нашого ательє.",
    namePlaceholder: "Ваше Повне Ім'я *",
    emailPlaceholder: "Електронна Пошта *",
    phonePlaceholder: "Телефон / WhatsApp",
    preferredLocation: "Обране Місце Примірки:",
    submitInquiry: "Надіслати Запит →",
    inquiryReceived: "Запит Отримано",
    thankYou: "Дякуємо! Ваш запит на приватну примірку успішно зареєстровано. Наш старший консьєрж зв'яжеться з вами протягом 24 годин.",

    // Footer & Legal Modals
    cities: "СІДНЕЙ • ДУБАЙ • ОДЕСА • КИЇВ",
    directLine: "Пряма Лінія Консьєржа:",
    emailLabel: "Email Консьєржа:",
    terms: "Умови Обслуговування",
    privacy: "Політика Конфіденційності",
    charter: "Статут Приватної Примірки",
    copyright: "ДІМ VÉLORA HAUTE COUTURE. УСІ ПРАВА ЗАХИЩЕНІ.",
    closeDocument: "ЗАКРИТИ ДОКУМЕНТ",
    termsModalTitle: "УМОВИ ОБСЛУГОВУВАННЯ ТА СТАТУТ АТЕЛЬЄ",
    terms1: "1. Індивідуальні Замовлення: Кожна сукня або скульптура VÉLORA виготовляється вручну спеціально для клієнтки після підтвердження приватного статуту примірки.",
    terms2: "2. Графік Примірок: Приватні сесії примірки в салонах Сіднея, Дубая, Одеси або Києва повинні бути зарезервовані за 14 робочих днів.",
    terms3: "3. Інтелектуальна Власність: Усі оригінальні дизайни силуетів, корсетна геометрія та 3D-моделі суконь залишаються виключною інтелектуальною власністю Ательє VÉLORA.",
    privacyModalTitle: "ПОЛІТИКА КОНФІДЕНЦІЙНОСТІ КЛІЄНТІВ",
    privacy1: "1. Захист Даних: Усі персональні виміри, фотографії з примірок та контактні записи зашифровані відповідно до європейських стандартів GDPR.",
    privacy2: "2. Абсолютна Конфіденційність: Особисті дані клієнтів, деталі весілля та специфікації індивідуальних замовлень ніколи не розголошуються третім особам.",
    privacy3: "3. Цифрові Примірки: 3D-скани тіла, отримані під час цифрових консультацій, зберігаються на захищених серверах і не передаються стороннім організаціям.",
    charterModalTitle: "СТАТУТ ПРИВАТНОЇ ПРИМІРКИ",
    charter1: "1. Персональне Лекало: Для кожної клієнтки розробляється індивідуальне авторське лекало, що гарантує бездоганну посадку по фігурі.",
    charter2: "2. Гарантія Матеріалів: Використовуються тільки 100% натуральний шовк, французьке мереживо та італійський оксамит безпосередньо з історичних мануфактур Європи.",
    charter3: "3. Довічне Збереження: Кожне замовлення VÉLORA включає компліментарне досьє зі збереження та музейне керівництво з догляду за виробом.",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.EN) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "EN",
  setLanguage: () => {},
  t: (key) => translations.EN[key] || key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("velora_lang") as Language;
    if (saved === "EN" || saved === "UA") {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("velora_lang", lang);
  };

  const t = (key: keyof typeof translations.EN): string => {
    return translations[language][key] || translations.EN[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
