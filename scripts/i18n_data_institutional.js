/**
 * GERAÇÃO DOS MÓDULOS INSTITUCIONAIS PARA OS 6 IDIOMAS:
 * home, about, contact, faq, accessibility, forms
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT_DIR, 'lang');
const LANGUAGES = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

function saveModule(moduleName, dataMap) {
  LANGUAGES.forEach(lang => {
    const dir = path.join(LANG_DIR, lang);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, `${moduleName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(dataMap[lang], null, 2), 'utf8');
    console.log(`✓ Gravado: lang/${lang}/${moduleName}.json`);
  });
}

// ==========================================
// 1. HOME
// ==========================================
const home = {
  'pt-BR': {
    hero: {
      badge: "Transformação Territorial • Valparaíso de Goiás",
      title: "Construindo Dignidade, Educação e Futuro no Entorno do DF",
      subtitle: "Atuamos na raiz da vulnerabilidade social através de educação integral, segurança alimentar e inclusão produtiva para milhares de famílias.",
      cta_donate: "Fazer Doação",
      cta_projects: "Conhecer Projetos",
      stat_people: "12.480+",
      stat_people_label: "Pessoas Atendidas",
      stat_meals: "145.000+",
      stat_meals_label: "Refeições Distribuídas",
      stat_efficiency: "91.2%",
      stat_efficiency_label: "Eficiência em Projetos",
      stat_hours: "18.400h",
      stat_hours_label: "Horas de Voluntariado"
    },
    pillars: {
      title: "Nossos Quatro Pilares de Atuação",
      subtitle: "Uma metodologia integrada desenhada para romper os ciclos intergeracionais de pobreza.",
      p1_title: "Educação Integral",
      p1_desc: "Reforço escolar, letramento digital e acolhimento para crianças e adolescentes.",
      p2_title: "Segurança Nutricional",
      p2_desc: "Alimentação saudável, hortas urbanas comunitárias e dignidade à mesa.",
      p3_title: "Renda & Trabalho",
      p3_desc: "Cursos profissionalizantes, microcrédito orientado e emancipação feminina.",
      p4_title: "Coesão Comunitária",
      p4_desc: "Fortalecimento de lideranças de bairro, mutirões e infraestrutura local."
    },
    impact_preview: {
      title: "Impacto Auditável e Mensurável",
      subtitle: "Cada real investido é acompanhado com rigor contábil e métricas públicas de evolução social.",
      cta: "Acessar Painel de Impacto"
    },
    transparency_preview: {
      title: "Transparência Ativa",
      subtitle: "Prestação de contas aberta em conformidade com as diretrizes do CFC / ITG 2002.",
      cta: "Ver Balanços e Relatórios"
    },
    volunteer_cta: {
      title: "Faça Parte da Mudança",
      subtitle: "Doe seu tempo, conhecimento e empatia para transformar a realidade da nossa comunidade.",
      cta: "Seja Voluntário"
    }
  },
  'en-US': {
    hero: {
      badge: "Community Empowerment • Federal District Suburbs",
      title: "Building Dignity, Education, and Sustainable Futures",
      subtitle: "Tackling social vulnerability at its roots through comprehensive education, food security, and workforce inclusion for vulnerable families.",
      cta_donate: "Donate Now",
      cta_projects: "Explore Programs",
      stat_people: "12,480+",
      stat_people_label: "People Supported",
      stat_meals: "145,000+",
      stat_meals_label: "Meals Distributed",
      stat_efficiency: "91.2%",
      stat_efficiency_label: "Program Efficiency Rate",
      stat_hours: "18,400h",
      stat_hours_label: "Volunteer Hours"
    },
    pillars: {
      title: "Our Four Strategic Pillars",
      subtitle: "An integrated framework engineered to break the intergenerational cycles of poverty.",
      p1_title: "Comprehensive Education",
      p1_desc: "Academic tutoring, digital literacy, and socio-emotional care for youth.",
      p2_title: "Nutritional Security",
      p2_desc: "Wholesome food supply, community agroecological gardens, and meal equity.",
      p3_title: "Income & Livelihood",
      p3_desc: "Technical job training, microfinance mentorship, and female financial autonomy.",
      p4_title: "Community Cohesion",
      p4_desc: "Neighborhood leadership development, cooperative efforts, and infrastructure."
    },
    impact_preview: {
      title: "Auditable and Measurable Impact",
      subtitle: "Every resource deployed is tracked with strict financial governance and public metric evolution.",
      cta: "View Impact Dashboard"
    },
    transparency_preview: {
      title: "Active Transparency",
      subtitle: "Open accountability in full alignment with international and national non-profit audit standards.",
      cta: "View Audit Reports"
    },
    volunteer_cta: {
      title: "Be the Catalyst for Change",
      subtitle: "Dedicate your skills, time, and empathy to create lasting grassroots transformation.",
      cta: "Become a Volunteer"
    }
  },
  'es-ES': {
    hero: {
      badge: "Transformación Comunitaria • Periferia del DF",
      title: "Construyendo Dignidad, Educación y Futuro Sostenible",
      subtitle: "Abordamos la vulnerabilidad social en su raíz mediante educación integral, soberanía nutricional e inclusión laboral para miles de familias.",
      cta_donate: "Hacer una Donación",
      cta_projects: "Conocer Proyectos",
      stat_people: "12.480+",
      stat_people_label: "Personas Atendidas",
      stat_meals: "145.000+",
      stat_meals_label: "Comidas Servidas",
      stat_efficiency: "91.2%",
      stat_efficiency_label: "Tasa en Actividad Social",
      stat_hours: "18.400h",
      stat_hours_label: "Horas de Voluntariado"
    },
    pillars: {
      title: "Nuestros Cuatro Ejes Estratégicos",
      subtitle: "Una metodología integral diseñada para quebrar los ciclos intergeneracionales de vulnerabilidad.",
      p1_title: "Educación Integral",
      p1_desc: "Tutoría escolar, alfabetización digital y acompañamiento socioemocional a jóvenes.",
      p2_title: "Seguridad Nutricional",
      p2_desc: "Alimentación saludable, huertos urbanos agroecológicos y dignidad alimentaria.",
      p3_title: "Ingreso y Empleo",
      p3_desc: "Capacitación técnica, microemprendimiento tutelado e independencia económica femenina.",
      p4_title: "Cohesión Comunitaria",
      p4_desc: "Empoderamiento vecinal, mejoras barriales y fortalecimiento de liderazgos de base."
    },
    impact_preview: {
      title: "Impacto Verificable y Medible",
      subtitle: "Cada aporte se supervisa con estricto control contable y evolución abierta de indicadores.",
      cta: "Ver Panel de Impacto"
    },
    transparency_preview: {
      title: "Transparencia Activa",
      subtitle: "Rendición de cuentas pública en conformidad con los estándares contables del sector social.",
      cta: "Consultar Balances y Cuentas"
    },
    volunteer_cta: {
      title: "Súmate al Cambio Positivo",
      subtitle: "Comparte tus conocimientos, tiempo y compromiso para transformar nuestra comunidad.",
      cta: "Hacerse Voluntario"
    }
  },
  'fr-FR': {
    hero: {
      badge: "Impact Territorial • Périphérie de Brasília",
      title: "Construire la Dignité, l'Éducation et l'Avenir Durable",
      subtitle: "Agir à la racine de la précarité par l'éducation globale, la sécurité nutritionnelle et l'émancipation productive des familles vulnérables.",
      cta_donate: "Faire un Don",
      cta_projects: "Découvrir les Programmes",
      stat_people: "12 480+",
      stat_people_label: "Personnes Accompagnées",
      stat_meals: "145 000+",
      stat_meals_label: "Repas Distribués",
      stat_efficiency: "91,2%",
      stat_efficiency_label: "Affectation Directe aux Projets",
      stat_hours: "18 400h",
      stat_hours_label: "Heures de Bénévolat"
    },
    pillars: {
      title: "Nos Quatre Piliers d'Action",
      subtitle: "Une approche systémique conçue pour rompre durablement la transmission de la pauvreté.",
      p1_title: "Éducation Intégrale",
      p1_desc: "Soutien scolaire continu, culture numérique et suivi bienveillant de la jeunesse.",
      p2_title: "Sécurité Nutritionnelle",
      p2_desc: "Repas équilibrés, jardins partagés agroécologiques et souveraineté alimentaire.",
      p3_title: "Revenu & Insertion",
      p3_desc: "Formations certifiantes, microfinance éthique et autonomie financière des mères.",
      p4_title: "Cohésion Citoyenne",
      p4_desc: "Gouvernance participative, chantiers solidaires et dynamisation de quartier."
    },
    impact_preview: {
      title: "Impact Mesurable et Audité",
      subtitle: "Chaque ressource mobilisée fait l'objet d'un suivi comptable rigoureux et d'indicateurs publics.",
      cta: "Consulter le Tableau de Bord"
    },
    transparency_preview: {
      title: "Transparence Exemplaire",
      subtitle: "Publication exhaustive des bilans financiers certifiés par des auditeurs indépendants.",
      cta: "Accéder aux Rapports Publics"
    },
    volunteer_cta: {
      title: "Rejoignez Notre Équipe Solidaire",
      subtitle: "Mettez votre expertise et votre générosité au service du développement communautaire.",
      cta: "Devenir Bénévole"
    }
  },
  'de-DE': {
    hero: {
      badge: "Sozialer Wandel • Region Brasília",
      title: "Würde, Bildung und Zukunftschancen Nachhaltig Fördern",
      subtitle: "Gezielte Bekämpfung sozialer Ungleichheit durch ganzheitliche Bildung, Ernährungssicherheit und wirtschaftliche Unabhängigkeit.",
      cta_donate: "Jetzt Spenden",
      cta_projects: "Projekte Entdecken",
      stat_people: "12.480+",
      stat_people_label: "Geförderte Menschen",
      stat_meals: "145.000+",
      stat_meals_label: "Ausgegebene Mahlzeiten",
      stat_efficiency: "91,2%",
      stat_efficiency_label: "Quote in Projekten",
      stat_hours: "18.400h",
      stat_hours_label: "Ehrenamtsstunden"
    },
    pillars: {
      title: "Unsere Vier Strategischen Säulen",
      subtitle: "Ein praxiserprobtes Konzept, um den Kreislauf von Armut generationenübergreifend zu durchbrechen.",
      p1_title: "Ganzheitliche Bildung",
      p1_desc: "Individuelle schulische Förderung, digitale Bildung und sozialpädagogische Betreuung.",
      p2_title: "Ernährungssouveränität",
      p2_desc: "Gesunde Mahlzeiten, ökologische Gemeinschaftsgärten und gezielte Ernährungshilfe.",
      p3_title: "Einkommen & Arbeit",
      p3_desc: "Fachliche Ausbildung, Mikrokredite und Stärkung der wirtschaftlichen Selbstständigkeit.",
      p4_title: "Gemeinschaftsstärkung",
      p4_desc: "Lokale Partizipation, Bürgerinitiativen und Verbesserung der Infrastruktur vor Ort."
    },
    impact_preview: {
      title: "Auditierbare und Messbare Wirkung",
      subtitle: "Transparente Nachverfolgung jedes Förderbeitrags mit externer Wirtschaftsprüfung.",
      cta: "Wirkungs-Dashboard Öffnen"
    },
    transparency_preview: {
      title: "Aktive Transparenz",
      subtitle: "Offenlegung sämtlicher Jahresabschlüsse nach strengen Gemeinnützigkeitsstandards.",
      cta: "Finanzberichte Einsehen"
    },
    volunteer_cta: {
      title: "Werden Sie Teil der Veränderung",
      subtitle: "Bringen Sie Ihre Fähigkeiten und Ihre Zeit für eine gerechtere Zukunft ein.",
      cta: "Jetzt Mitmachen"
    }
  },
  'ja-JP': {
    hero: {
      badge: "地域社会の変革 • 首都直轄区周縁部",
      title: "尊厳、教育、そして持続可能な未来を築く",
      subtitle: "包括的教育、食料安全保障、職業自立支援を通じて、困窮層の根本的な貧困の連鎖を断ち切ります。",
      cta_donate: "寄付で支援する",
      cta_projects: "活動プログラムを見る",
      stat_people: "12,480名+",
      stat_people_label: "支援を受けた人々の数",
      stat_meals: "145,000食+",
      stat_meals_label: "提供した栄養食の数",
      stat_efficiency: "91.2%",
      stat_efficiency_label: "社会活動費への配分率",
      stat_hours: "18,400時間",
      stat_hours_label: "ボランティア活動時間"
    },
    pillars: {
      title: "活動を支える4つの重点分野",
      subtitle: "世代を超えて続く貧困の連鎖を克服するための総合的なアプローチ。",
      p1_title: "包括的基礎教育",
      p1_desc: "放課後学習支援、デジタルリテラシー教育、青少年への精神的ケア。",
      p2_title: "食料・栄養保障",
      p2_desc: "栄養バランスの取れた食事提供、地域農園の育成、食の自給支援。",
      p3_title: "就労・経済自立",
      p3_desc: "実践的職業訓練、小規模起業支援、女性世帯主の経済的自立促進。",
      p4_title: "地域連帯の醸成",
      p4_desc: "住民主導のリーダーシップ育成、共同修繕活動、住環境改善。"
    },
    impact_preview: {
      title: "検証可能な社会的インパクト",
      subtitle: "すべての資金使途と成果指標を客観的に測定し、公表しています。",
      cta: "活動成果ダッシュボード"
    },
    transparency_preview: {
      title: "能動的な情報公開",
      subtitle: "独立した第三者監査に基づく財務報告書をすべて開示しています。",
      cta: "財務報告書を閲覧する"
    },
    volunteer_cta: {
      title: "未来をつくる活動に参加しませんか",
      subtitle: "あなたの経験、知識、情熱が地域社会の確かな希望となります。",
      cta: "ボランティアに応募する"
    }
  }
};

saveModule('home', home);

// ==========================================
// 2. ABOUT
// ==========================================
const about = {
  'pt-BR': {
    header: {
      title: "História, Princípios e Governança",
      subtitle: "Conheça as bases éticas, a trajetória de impacto e as lideranças que conduzem o Instituto Nova Esperança."
    },
    manifesto: {
      title: "Nosso Manifesto Institucional",
      p1: "Acreditamos que a dignidade humana não é concessão, mas direito inalienável. Nascemos da indignação ativa diante da desigualdade estrutural que marginaliza comunidades do Entorno do Distrito Federal.",
      p2: "Trabalhamos ao lado das famílias, não apenas por elas. Nossa missão é oferecer ferramentas metodológicas, apoio pedagógico e oportunidades econômicas para que cada pessoa seja arquiteta de seu próprio destino."
    },
    history: {
      title: "Trajetória de Realizações",
      t2020: "Fundação em Valparaíso de Goiás em resposta direta ao colapso alimentar durante a crise sanitária.",
      t2022: "Inauguração do polo de reforço escolar e lançamento das primeiras hortas agroecológicas comunitárias.",
      t2024: "Estruturação dos cursos técnicos profissionalizantes de panificação, corte industrial e inclusão digital.",
      t2026: "Mais de 12.480 beneficiários assistidos, auditoria independente com 91,2% de eficiência social e expansão territorial."
    },
    mission_vision: {
      mission_title: "Nossa Missão",
      mission_text: "Desenvolver o potencial humano de comunidades em vulnerabilidade por meio da educação emancipatória, soberania alimentar e geração de trabalho digno.",
      vision_title: "Nossa Visão",
      vision_text: "Ser referência nacional e internacional em governança ética, transparência contábil e métodos escaláveis de erradicação da extrema pobreza periférica.",
      values_title: "Nossos Valores",
      v1_title: "Transparência Radical",
      v1_desc: "Prestação de contas pública, dados abertos e tolerância zero a desvios.",
      v2_title: "Equidade & Inclusão",
      v2_desc: "Acesso universal sem distinção de gênero, raça, credo ou origem social.",
      v3_title: "Soberania Comunitária",
      v3_desc: "Escuta atenta e protagonismo das lideranças locais em cada decisão.",
      v4_title: "Excelência Técnica",
      v4_desc: "Metodologias pedagógicas e sociais avaliadas por evidências mensuráveis."
    },
    governance: {
      title: "Conselho Diretor & Governança",
      subtitle: "Profissionais dedicados com atuação comprovada nas áreas social, jurídica, pedagógica e contábil.",
      d1_role: "Diretora-Presidente",
      d1_name: "Jardy Silva",
      d1_bio: "Especialista em Gestão de Políticas Públicas e Desenvolvimento Territorial com 15 anos de dedicação ao terceiro setor.",
      d2_role: "Coordenadora Pedagógica",
      d2_name: "Dra. Helena Ribeiro",
      d2_bio: "Doutora em Educação pela UnB, pesquisadora de letramento em periferias e autora de metodologias de ensino inclusivo.",
      d3_role: "Diretor Financeiro & Compliance",
      d3_name: "Marcelo Pires",
      d3_bio: "Auditor contábil com pós-graduação em Governança Corporativa e membro ativo do Conselho Fiscal."
    },
    compliance: {
      title: "Conformidade Ética e Registros Públicos",
      text: "Operamos em conformidade irrestrita com as Leis 13.019/2014 (MROSC) e 9.608/1998 (Voluntariado), com certidões negativas de débito permanentemente atualizadas.",
      cert_statute: "Estatuto Social Registrado em Cartório de Registro Civil",
      cert_audit: "Auditoria Contábil Independente em Padrão CFC",
      cert_tax: "Regularidade Fiscal Plena perante Receita Federal e Município"
    }
  },
  'en-US': {
    header: {
      title: "History, Ethics, and Governance",
      subtitle: "Learn about our foundational principles, impact trajectory, and leadership team driving Instituto Nova Esperança."
    },
    manifesto: {
      title: "Our Institutional Manifesto",
      p1: "We believe human dignity is not a concession, but an inalienable human right. We were born out of active indignation towards structural inequality that marginalizes communities in the Federal District Suburbs.",
      p2: "We work alongside families, not merely for them. Our commitment is to provide methodologies, educational scaffolding, and economic avenues so every individual becomes the builder of their own future."
    },
    history: {
      title: "Milestones of Impact",
      t2020: "Established in Valparaíso de Goiás as a grassroots response to nutritional insecurity during the global crisis.",
      t2022: "Inauguration of the tutoring educational hub and rollout of our first community agroecological gardens.",
      t2024: "Implementation of certified technical training programs in industrial baking, textiles, and computer science.",
      t2026: "Over 12,480 people supported, independent external audit confirming 91.2% social efficiency, and regional expansion."
    },
    mission_vision: {
      mission_title: "Our Mission",
      mission_text: "To cultivate human potential in marginalized communities through emancipatory education, nutritional security, and dignified livelihoods.",
      vision_title: "Our Vision",
      vision_text: "To stand as an international benchmark for ethical governance, financial transparency, and scalable strategies to eradicate extreme urban poverty.",
      values_title: "Our Core Values",
      v1_title: "Radical Transparency",
      v1_desc: "Public accounts, open data, and uncompromising zero tolerance for misconduct.",
      v2_title: "Equity & Inclusion",
      v2_desc: "Universal dignity free from any bias based on gender, race, faith, or origin.",
      v3_title: "Community Sovereignty",
      v3_desc: "Deep active listening and frontline community leadership in every programmatic choice.",
      v4_title: "Evidence-Based Excellence",
      v4_desc: "Rigorous socio-pedagogical methodologies measured through empirical data."
    },
    governance: {
      title: "Executive Leadership & Board",
      subtitle: "Experienced professionals dedicated to social justice, legal compliance, pedagogy, and financial stewardship.",
      d1_role: "Executive Director & Founder",
      d1_name: "Jardy Silva",
      d1_bio: "Public Policy and Regional Development Specialist with over 15 years leading non-profit initiatives.",
      d2_role: "Head of Educational Programs",
      d2_name: "Dr. Helena Ribeiro",
      d2_bio: "Ph.D. in Education from the University of Brasília (UnB), researcher in community literacy, and curriculum developer.",
      d3_role: "Chief Financial & Compliance Officer",
      d3_name: "Marcelo Pires",
      d3_bio: "Certified public accountant specializing in non-profit corporate governance and ethical compliance."
    },
    compliance: {
      title: "Ethical Compliance & Official Registry",
      text: "Operating in strict adherence to Brazilian non-profit statutory law and international anti-corruption best practices, maintaining active tax clearance certifications.",
      cert_statute: "Official Bylaws Certified in Public Civil Registry",
      cert_audit: "Independent External Audit aligned with International Accounting Standards",
      cert_tax: "Comprehensive Federal, State, and Municipal Tax Clearance"
    }
  },
  'es-ES': {
    header: {
      title: "Historia, Principios y Gobernanza",
      subtitle: "Conozca los pilares éticos, la trayectoria de impacto y los líderes que guían al Instituto Nova Esperança."
    },
    manifesto: {
      title: "Nuestro Manifiesto Institucional",
      p1: "Sostenemos que la dignidad humana es un derecho fundamental innegociable. Nacimos de la acción directa frente a la desigualdad que vulnera a los sectores periféricos del Distrito Federal.",
      p2: "Trabajamos codo a codo con las familias. Nuestro objetivo es aportar herramientas metodológicas, educación de calidad y capacitación laboral para que cada persona sea protagonista de su propia emancipación."
    },
    history: {
      title: "Trayectoria de Transformación",
      t2020: "Fundación en Valparaíso de Goiás para atender la crisis alimentaria inmediata en barrios vulnerables.",
      t2022: "Apertura del centro de apoyo educativo y cultivo de los primeros huertos comunitarios agroecológicos.",
      t2024: "Consolidación de cursos de oficio en corte industrial, panificación y alfabetización digital.",
      t2026: "Más de 12.480 personas beneficiadas, auditoría independiente con 91,2% de inversión social directa y expansión comunitaria."
    },
    mission_vision: {
      mission_title: "Nuestra Misión",
      mission_text: "Desarrollar el potencial humano de familias vulnerables a través de educación transformadora, seguridad alimentaria y empleo digno.",
      vision_title: "Nuestra Visión",
      vision_text: "Ser referente internacional en transparencia contable, gobernanza ética y modelos escalables contra la pobreza extrema.",
      values_title: "Nuestros Valores",
      v1_title: "Transparencia Absoluta",
      v1_desc: "Información financiera pública, datos abiertos y rigor administrativo.",
      v2_title: "Equidad e Inclusión",
      v2_desc: "Acceso universal sin discriminación de género, raza, religión o procedencia.",
      v3_title: "Autonomía Comunitaria",
      v3_desc: "Escucha activa y liderazgo vecinal en cada etapa de los proyectos.",
      v4_title: "Rigor Técnico",
      v4_desc: "Metodologías sociales auditadas y evaluadas en base a resultados comprobables."
    },
    governance: {
      title: "Consejo Directivo y Gobierno",
      subtitle: "Profesionales comprometidos con amplia experiencia en gestión pública, pedagogía, derecho y contabilidad.",
      d1_role: "Directora Ejecutiva",
      d1_name: "Jardy Silva",
      d1_bio: "Especialista en Políticas Públicas y Desarrollo Social con 15 años de liderazgo en el tercer sector.",
      d2_role: "Coordinadora Pedagógica",
      d2_name: "Dra. Helena Ribeiro",
      d2_bio: "Doctora en Educación por la Universidad de Brasília (UnB), investigadora de alfabetización comunitaria.",
      d3_role: "Director de Finanzas y Compliance",
      d3_name: "Marcelo Pires",
      d3_bio: "Auditor colegiado con posgrado en Gobernanza Institucional y fiscalización de entidades sociales."
    },
    compliance: {
      title: "Cumplimiento Ético y Registros Legales",
      text: "Operamos bajo estricto cumplimiento del marco legal de organizaciones sin fines de lucro, con certificados de solvencia fiscal siempre al día.",
      cert_statute: "Estatuto Social Inscrito en Registro Público Notarial",
      cert_audit: "Auditoría Contable Externa conforme a Normas Internacionales",
      cert_tax: "Regularidad Tributaria Plena ante Órganos Estatales y Federales"
    }
  },
  'fr-FR': {
    header: {
      title: "Histoire, Valeurs et Gouvernance",
      subtitle: "Découvrez les engagements éthiques, la trajectoire d'impact et l'équipe qui anime l'Instituto Nova Esperança."
    },
    manifesto: {
      title: "Notre Manifeste Institutionnel",
      p1: "Nous croyons fermement que la dignité humaine est un droit inaliénable. Notre action est née d'un engagement déterminé face aux inégalités sociales frappant les périphéries urbaines.",
      p2: "Nous agissons aux côtés des familles. Notre mission est d'offrir les compétences éducatives et les perspectives économiques indispensables pour que chacun construise son avenir en toute autonomie."
    },
    history: {
      title: "Grandes Étapes de Notre Action",
      t2020: "Création à Valparaíso de Goiás en réponse urgente aux pénuries alimentaires durant la crise mondiale.",
      t2022: "Inauguration du pôle socio-éducatif et aménagement des premiers potagers communautaires écologiques.",
      t2024: "Lancement des formations techniques qualifiantes (boulangerie artisanale, couture et numérique).",
      t2026: "Plus de 12 480 bénéficiaires directs, audit externe certifiant 91,2% d'affectation aux projets de terrain."
    },
    mission_vision: {
      mission_title: "Notre Mission",
      mission_text: "Libérer le potentiel humain des populations vulnérables grâce à une éducation émancipatrice, la sécurité nutritionnelle et l'accès à des emplois décents.",
      vision_title: "Notre Vision",
      vision_text: "Devenir un modèle d'excellence et d'éthique pour l'éradication durable de l'extrême pauvreté en milieu périurbain.",
      values_title: "Nos Valeurs",
      v1_title: "Transparence Totale",
      v1_desc: "Comptabilité ouverte, intégrité absolue et traçabilité de chaque euro investi.",
      v2_title: "Équité et Inclusion",
      v2_desc: "Respect inconditionnel et égalité d'accès sans distinction de genre, d'origine ou de croyance.",
      v3_title: "Souveraineté Locale",
      v3_desc: "Prise de décision participative valorisant la voix et l'expérience des habitants.",
      v4_title: "Exigence Méthodologique",
      v4_desc: "Évaluation scientifique et continue des résultats pédagogiques et sociaux."
    },
    governance: {
      title: "Direction et Conseil d'Administration",
      subtitle: "Une équipe pluridisciplinaire au service de la gestion éthique, de l'éducation et de la rigueur financière.",
      d1_role: "Directrice Générale",
      d1_name: "Jardy Silva",
      d1_bio: "Spécialiste en politiques publiques et développement territorial fort de 15 ans d'engagement associatif.",
      d2_role: "Directrice Pédagogique",
      d2_name: "Dre Helena Ribeiro",
      d2_bio: "Docteure en sciences de l'éducation (UnB), spécialiste de l'alphabétisation en milieu populaire.",
      d3_role: "Directeur Financier & Déontologie",
      d3_name: "Marcelo Pires",
      d3_bio: "Expert-comptable diplômé en gouvernance des organisations de l'économie sociale et solidaire."
    },
    compliance: {
      title: "Conformité Légale et Engagements Publics",
      text: "Fonctionnement rigoureux conforme aux réglementations nationales des ONG et aux normes internationales anti-fraude.",
      cert_statute: "Statuts Déposés au Registre Civil des Personnes Morales",
      cert_audit: "Audit Financier Indépendant Annuel Certifié",
      cert_tax: "Situation Fiscale Régulière au Niveau Fédéral et Local"
    }
  },
  'de-DE': {
    header: {
      title: "Geschichte, Werte und Leitung",
      subtitle: "Erfahren Sie mehr über unsere ethischen Grundlagen, bisherige Erfolge und das Führungsteam des Instituto Nova Esperança."
    },
    manifesto: {
      title: "Unser Institutionelles Manifest",
      p1: "Wir sind überzeugt: Menschliche Würde ist kein Privileg, sondern ein unveräußerliches Grundrecht. Unsere Arbeit entstand aus dem festen Willen, strukturelle Ungleichheiten in benachteiligten Vorstädten zu überwinden.",
      p2: "Wir arbeiten partnerschaftlich mit den Familien. Unser Ziel ist es, Wissen, Fertigkeiten und wirtschaftliche Chancen bereitzustellen, damit Menschen ihr Leben selbstbestimmt gestalten können."
    },
    history: {
      title: "Meilensteine Unserer Arbeit",
      t2020: "Gründung in Valparaíso de Goiás zur direkten Linderung der akuten Ernährungsnot während der Pandemie.",
      t2022: "Eröffnung des Bildungsförderzentrums und Anlage der ersten ökologischen Gemeinschaftsgärten.",
      t2024: "Aufbau anerkannter Ausbildungslehrgänge in Handwerk, Textilproduktion und IT-Grundlagen.",
      t2026: "Über 12.480 unterstützte Menschen, externe Prüfung mit 91,2 % Projektaufwandsquote und nachhaltiges Wachstum."
    },
    mission_vision: {
      mission_title: "Unsere Mission",
      mission_text: "Entfaltung der menschlichen Potenziale in marginalisierten Gemeinschaften durch emanzipatorische Bildung, Ernährungssicherheit und faire Arbeitsmöglichkeiten.",
      vision_title: "Unsere Vision",
      vision_text: "Ein international anerkanntes Vorbild für transparente Non-Profit-Governance und skalierbare Ansätze zur Armutsbekämpfung zu sein.",
      values_title: "Unsere Werte",
      v1_title: "Radikale Transparenz",
      v1_desc: "Vollständige Offenlegung der Mittelverwendung und konsequente Kontrollmechanismen.",
      v2_title: "Chancengleichheit",
      v2_desc: "Diskriminierungsfreier Zugang für alle Menschen unabhängig von Herkunft oder Geschlecht.",
      v3_title: "Lokale Selbstbestimmung",
      v3_desc: "Aktive Mitgestaltung der Projekte durch die Bewohnerinnen und Bewohner vor Ort.",
      v4_title: "Fachliche Qualität",
      v4_desc: "Wissenschaftlich fundierte pädagogische Methoden mit messbaren Erfolgen."
    },
    governance: {
      title: "Vorstand und Geschäftsführung",
      subtitle: "Erfahrene Fachkräfte aus Sozialarbeit, Pädagogik, Recht und Wirtschaftsprüfung.",
      d1_role: "Geschäftsführende Vorsitzende",
      d1_name: "Jardy Silva",
      d1_bio: "Expertin für Sozialpolitik und Kommunalentwicklung mit 15 Jahren Führungserfahrung im Non-Profit-Sektor.",
      d2_role: "Pädagogische Leitung",
      d2_name: "Dr. Helena Ribeiro",
      d2_bio: "Promovierte Erziehungswissenschaftlerin (UnB), Autorin partizipativer Bildungskonzepte.",
      d3_role: "Leiter Finanzen & Compliance",
      d3_name: "Marcelo Pires",
      d3_bio: "Wirtschaftsprüfer mit Spezialisierung auf transparente Verbandssteuerung und Rechnungslegung."
    },
    compliance: {
      title: "Rechtliche Anerkennung und Satzung",
      text: "Volle Gemeinnützigkeit nach brasilianischem Verbandsrecht mit lückenlos nachgewiesener steuerlicher Unbedenklichkeit.",
      cert_statute: "Amtlich Beglaubigte und Registrierte Vereinssatzung",
      cert_audit: "Unabhängiger Prüfbericht nach Internationalen Rechnungslegungsstandards",
      cert_tax: "Steuerliche Unbedenklichkeitsbescheinigungen Aller Ebenen"
    }
  },
  'ja-JP': {
    header: {
      title: "沿革・活動理念・ガバナンス",
      subtitle: "ノヴァ・エスペランサ研究所の倫理基準、これまでの歩み、そして運営を率いる役員陣をご紹介します。"
    },
    manifesto: {
      title: "私たちの宣言（マニフェスト）",
      p1: "人間の尊厳は決して施しではなく、誰もが生まれながらに持つ不可侵の権利です。私たちは首都圏近郊のコミュニティが直面する格差を解消するために立ち上がりました。",
      p2: "私たちは住民の皆さんと共に歩みます。一方的な援助ではなく、教育と職業訓練を通じて、一人ひとりが自らの手で未来を切り拓くための力を育みます。"
    },
    history: {
      title: "これまでの主な歩み",
      t2020: "危機的な食料困窮に対応するため、ゴイアス州ヴァウパライゾにて設立。",
      t2022: "放課後学習支援拠点の開設、および持続可能な地域菜園プログラムの開始。",
      t2024: "製パン・縫製・ITリテラシーに関する実践的な技術訓練コースを開講。",
      t2026: "支援対象者12,480名を達成。独立監査による社会事業配分率91.2%を維持し、活動を拡大中。"
    },
    mission_vision: {
      mission_title: "私たちの使命（ミッション）",
      mission_text: "質の高い教育、栄養改善、そして尊厳ある就労機会を通じて、周縁地域の人々の可能性を最大限に引き出します。",
      vision_title: "目指す未来（ビジョン）",
      vision_text: "徹底した情報公開と倫理的ガバナンスを備え、都市周縁部の貧困撲滅モデルとして国際的に信頼される団体を目指します。",
      values_title: "行動指針（コアバリュー）",
      v1_title: "徹底した透明性",
      v1_desc: "財務データの完全公開と、使途の厳格な追跡管理を行います。",
      v2_title: "公平性と包摂",
      v2_desc: "性別、出自、信条に関わらず、すべての人が等しく機会を得られる場をつくります。",
      v3_title: "地域の主体性",
      v3_desc: "住民自身の声に耳を傾け、地域の主体的な意思決定を尊重します。",
      v4_title: "高い専門性と実証性",
      v4_desc: "客観的なデータと測定可能な指標に基づいた教育・社会事業を実践します。"
    },
    governance: {
      title: "役員および運営体制",
      subtitle: "社会開発、教育学、法律、財務管理の各分野で実績を持つ専門家が運営を支えています。",
      d1_role: "代表理事（創設者）",
      d1_name: "ジャーディ・シルバ",
      d1_bio: "公共政策および地域社会開発の専門家。非営利組織の運営に15年以上携わる。",
      d2_role: "教育統括ディレクター",
      d2_name: "エレナ・リベイロ博士",
      d2_bio: "ブラジリア大学（UnB）教育学博士。周縁コミュニティにおける識字教育の研究者。",
      d3_role: "財務・コンプライアンス統括",
      d3_name: "マルセロ・ピレス",
      d3_bio: "公認会計士。非営利法人のガバナンスおよび厳正な会計監査を専門とする。"
    },
    compliance: {
      title: "法令遵守と公的認証",
      text: "ブラジル非営利法人関連法に完全準拠し、公認会計士監査報告書および納税証明書を常時最新に維持しています。",
      cert_statute: "公証役場にて正式登録された法人定款",
      cert_audit: "独立公認会計士による年次財務監査報告書",
      cert_tax: "連邦・州・市町村における完全な納税証明"
    }
  }
};

saveModule('about', about);

// ==========================================
// 3. CONTACT
// ==========================================
const contact = {
  'pt-BR': {
    header: {
      title: "Canais de Atendimento e Localização",
      subtitle: "Estamos à disposição para atender doadores, voluntários, empresas parceiras e a comunidade."
    },
    info: {
      address_title: "Sede Territorial",
      address_val: "Quadra 12, Lote 04 — Céu Azul, Valparaíso de Goiás — GO, CEP 72871-012",
      hours_title: "Horário de Funcionamento",
      hours_val: "Segunda a Sexta: 08h às 18h | Sábado: 08h às 12h (Oficinas Comunitárias)",
      phone_title: "Telefone e WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "E-mail Geral",
      email_val: "contato@instituonovaresperanca.org.br",
      ombudsman_title: "Ouvidoria & Canal de Ética",
      ombudsman_val: "ouvidoria@instituonovaresperanca.org.br",
      press_title: "Assessoria de Imprensa",
      press_val: "imprensa@instituonovaresperanca.org.br"
    },
    territory: {
      title: "Presença no Entorno do Distrito Federal",
      desc: "Nossa atuação abrange polos periféricos com alta densidade demográfica e demanda por equipamentos públicos de assistência social e reforço educacional."
    }
  },
  'en-US': {
    header: {
      title: "Contact Channels & Headquarters",
      subtitle: "We welcome donors, volunteers, corporate partners, researchers, and community members."
    },
    info: {
      address_title: "Territorial Headquarters",
      address_val: "Quadra 12, Lote 04 — Céu Azul, Valparaíso de Goiás — GO, Postal Code 72871-012, Brazil",
      hours_title: "Operating Hours",
      hours_val: "Monday to Friday: 8:00 AM – 6:00 PM | Saturday: 8:00 AM – 12:00 PM (Workshops)",
      phone_title: "Phone & WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "General Inquiries",
      email_val: "contact@instituonovaresperanca.org.br",
      ombudsman_title: "Ombudsman & Ethics Hotline",
      ombudsman_val: "ombudsman@instituonovaresperanca.org.br",
      press_title: "Media & Press Office",
      press_val: "press@instituonovaresperanca.org.br"
    },
    territory: {
      title: "Our Footprint in the Federal District Suburbs",
      desc: "Targeting high-density suburban communities with pressing demand for public educational infrastructure and family assistance."
    }
  },
  'es-ES': {
    header: {
      title: "Canales de Contacto y Ubicación",
      subtitle: "Estamos a disposición de donantes, voluntarios, empresas aliadas y miembros de la comunidad."
    },
    info: {
      address_title: "Sede Territorial",
      address_val: "Quadra 12, Lote 04 — Céu Azul, Valparaíso de Goiás — GO, CP 72871-012, Brasil",
      hours_title: "Horario de Atención",
      hours_val: "Lunes a Viernes: 08:00 a 18:00 | Sábado: 08:00 a 12:00 (Talleres Comunitarios)",
      phone_title: "Teléfono y WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "Correo Electrónico General",
      email_val: "contacto@instituonovaresperanca.org.br",
      ombudsman_title: "Defensoría y Canal Ético",
      ombudsman_val: "defensoria@instituonovaresperanca.org.br",
      press_title: "Prensa y Comunicaciones",
      press_val: "prensa@instituonovaresperanca.org.br"
    },
    territory: {
      title: "Presencia en el Entorno del Distrito Federal",
      desc: "Nuestra labor cubre barrios periféricos con alta necesidad de refuerzo escolar y seguridad nutricional comunitaria."
    }
  },
  'fr-FR': {
    header: {
      title: "Coordonnées et Siège Social",
      subtitle: "Nous sommes à l'écoute des donateurs, bénévoles, entreprises partenaires et de la communauté."
    },
    info: {
      address_title: "Siège Opérationnel",
      address_val: "Quadra 12, Lote 04 — Céu Azul, Valparaíso de Goiás — GO, Code Postal 72871-012, Brésil",
      hours_title: "Heures d'Ouverture",
      hours_val: "Du lundi au vendredi : 08h00 – 18h00 | Samedi : 08h00 – 12h00 (Ateliers)",
      phone_title: "Téléphone & WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "Courriel Général",
      email_val: "contact@instituonovaresperanca.org.br",
      ombudsman_title: "Médiation et Comité d'Éthique",
      ombudsman_val: "ethique@instituonovaresperanca.org.br",
      press_title: "Relations Presse",
      press_val: "presse@instituonovaresperanca.org.br"
    },
    territory: {
      title: "Implantation en Périphérie de Brasília",
      desc: "Nos actions ciblent les quartiers prioritaires nécessitant un soutien éducatif continu et une aide alimentaire d'urgence."
    }
  },
  'de-DE': {
    header: {
      title: "Kontakt und Standort",
      subtitle: "Wir stehen Förderern, Freiwilligen, Kooperationspartnern und der Gemeinschaft jederzeit zur Verfügung."
    },
    info: {
      address_title: "Projektstandort & Geschäftsstelle",
      address_val: "Quadra 12, Lote 04 — Céu Azul, Valparaíso de Goiás — GO, PLZ 72871-012, Brasilien",
      hours_title: "Öffnungszeiten",
      hours_val: "Montag bis Freitag: 08:00 – 18:00 Uhr | Samstag: 08:00 – 12:00 Uhr (Workshops)",
      phone_title: "Telefon & WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "Allgemeine E-Mail",
      email_val: "kontakt@instituonovaresperanca.org.br",
      ombudsman_title: "Ombudsstelle & Ethikbeirat",
      ombudsman_val: "ombudsstelle@instituonovaresperanca.org.br",
      press_title: "Pressekontakt",
      press_val: "presse@instituonovaresperanca.org.br"
    },
    territory: {
      title: "Regionale Präsenz im Großraum Brasília",
      desc: "Unsere Maßnahmen konzentrieren sich auf dicht besiedelte Vorstädte mit hohem Förderbedarf in Bildung und Versorgung."
    }
  },
  'ja-JP': {
    header: {
      title: "お問い合わせ・アクセス",
      subtitle: "寄付者の皆様、ボランティア、連携企業、地域の皆様からのご連絡をお待ちしております。"
    },
    info: {
      address_title: "本部所在地",
      address_val: "ブラジル・ゴイアス州ヴァウパライゾ・デ・ゴイアス セウ・アズール地区 第12街区 04番地 郵便番号 72871-012",
      hours_title: "受付時間",
      hours_val: "月曜日〜金曜日：08:00〜18:00 | 土曜日：08:00〜12:00（地域ワークショップ実施）",
      phone_title: "電話番号・WhatsApp",
      phone_val: "+55 (61) 98765-4321",
      email_title: "代表メールアドレス",
      email_val: "contact@instituonovaresperanca.org.br",
      ombudsman_title: "外部通報窓口・倫理委員会",
      ombudsman_val: "ethics@instituonovaresperanca.org.br",
      press_title: "広報・報道関係者窓口",
      press_val: "press@instituonovaresperanca.org.br"
    },
    territory: {
      title: "連邦直轄区近郊における支援ネットワーク",
      desc: "公的支援が十分に行き届いていない人口密集地区を中心に、学習・栄養支援を展開しています。"
    }
  }
};

saveModule('contact', contact);

// ==========================================
// 4. FAQ
// ==========================================
const faq = {
  'pt-BR': {
    header: {
      title: "Perguntas Frequentes (FAQ)",
      subtitle: "Esclareça dúvidas comuns sobre doações, voluntariado, prestação de contas e projetos sociais."
    },
    categories: {
      all: "Todas as Perguntas",
      donations: "Doações & Recursos",
      volunteer: "Voluntariado",
      projects: "Projetos & Atendimento",
      governance: "Governança & Parcerias"
    },
    items: [
      {
        q: "Como o Instituto Nova Esperança garante que a minha doação chega a quem precisa?",
        a: "Mantemos uma taxa de eficiência social superior a 90%, o que significa que mais de 90 centavos de cada real arrecadado financiam diretamente a atividade-fim. Todas as despesas e receitas são auditadas independentemente e publicadas no Portal da Transparência."
      },
      {
        q: "Posso deduzir minha doação do Imposto de Renda?",
        a: "Sim. Pessoas físicas e jurídicas tributadas pelo lucro real podem destinar percentuais de seus tributos via fundos dos direitos da criança e adolescente (FMDCA) e leis federais de incentivo."
      },
      {
        q: "Como funciona o processo de seleção para voluntários?",
        a: "Nosso assistente online em 7 etapas mapeia suas habilidades e disponibilidade. Em seguida, agendamos uma conversa de alinhamento ético e realizamos uma capacitação introdutória sobre proteção e salvaguarda."
      },
      {
        q: "Empresas podem criar cotas personalizadas de investimento social (ESG)?",
        a: "Sim. Oferecemos cotas institucionais e personalizadas a partir de R$ 1.000 até mais de R$ 100.000 para fundos patrimoniais, com relatórios trimestrais no padrão internacional GRI."
      },
      {
        q: "Onde ocorrem as atividades com as crianças e jovens?",
        a: "Nossos projetos são sediados em polos territoriais próprios e comunitários situados em Valparaíso de Goiás e Cidade Ocidental, com acompanhamento diário de nossa equipe multiprofissional."
      },
      {
        q: "Qualquer pessoa pode visitar a sede do Instituto?",
        a: "Sim! Acreditamos na transparência aberta. As visitas institucionais podem ser agendadas previamente através de nossa página de contato para garantir a salvaguarda e a rotina pedagógica dos atendidos."
      }
    ]
  },
  'en-US': {
    header: {
      title: "Frequently Asked Questions (FAQ)",
      subtitle: "Find clear answers about financial contributions, volunteering, social programs, and governance."
    },
    categories: {
      all: "All Questions",
      donations: "Giving & Finances",
      volunteer: "Volunteering",
      projects: "Programs & Impact",
      governance: "Governance & ESG"
    },
    items: [
      {
        q: "How does Instituto Nova Esperança ensure my contribution reaches those in need?",
        a: "We maintain a social efficiency rate exceeding 90%, meaning over 90 cents of every dollar donated directly funds core community programs. Every income stream and expenditure is independently audited and publicly released."
      },
      {
        q: "Are donations tax-deductible?",
        a: "Yes. In Brazil and through international partner fiscal sponsorships, corporate entities and individuals can deduct eligible contributions under applicable non-profit fiscal incentive laws."
      },
      {
        q: "How does the volunteer recruitment and onboarding process work?",
        a: "Our 7-step digital assistant registers your skills and schedule availability. We then schedule an interview and complete safeguarding training before field assignment."
      },
      {
        q: "Can corporate partners create bespoke ESG impact tiers?",
        a: "Yes. We offer structured corporate sponsorships ranging from R$ 1,000 up to endowment gifts exceeding R$ 100,000, accompanied by quarterly GRI-aligned impact reports."
      },
      {
        q: "Where do youth and child activities take place?",
        a: "All activities are held in dedicated community learning hubs in Valparaíso de Goiás and Cidade Ocidental, supervised by our licensed educators and social workers."
      },
      {
        q: "Can visitors tour the Institute's facilities?",
        a: "Yes! We practice radical open transparency. Site visits can be scheduled in advance through our contact page to respect child safeguarding protocols."
      }
    ]
  },
  'es-ES': {
    header: {
      title: "Preguntas Frecuentes (FAQ)",
      subtitle: "Encuentre respuestas claras sobre donaciones, voluntariado, rendición de cuentas y programas sociales."
    },
    categories: {
      all: "Todas las Preguntas",
      donations: "Donaciones y Finanzas",
      volunteer: "Voluntariado",
      projects: "Proyectos y Atención",
      governance: "Gobernanza y Alianzas"
    },
    items: [
      {
        q: "¿Cómo garantiza el Instituto que mi donación llegue a quienes realmente la necesitan?",
        a: "Mantenemos una eficiencia social superior al 90%, lo que asegura que más de 90 centavos de cada real donado se destinen directamente a las actividades pedagógicas y nutricionales sobre el terreno."
      },
      {
        q: "¿Se pueden deducir las donaciones del impuesto a la renta?",
        a: "Sí. Tanto personas jurídicas como físicas pueden canalizar donaciones amparadas en incentivos fiscales previstos en la legislación correspondiente."
      },
      {
        q: "¿Cómo es el proceso para incorporarse como voluntario?",
        a: "Completando nuestro asistente digital en 7 pasos donde se indican habilidades e intereses. Luego coordinamos una entrevista formativa y un taller sobre salvaguardia infantil."
      },
      {
        q: "¿Pueden las empresas patrocinar proyectos con criterios ESG?",
        a: "Sí. Contamos con paquetes de inversión corporativa desde aportes iniciales hasta fondos de preservación patrimonial, con informes trimestrales auditados bajo estándar GRI."
      },
      {
        q: "¿Dónde se desarrollan las clases y talleres infantiles?",
        a: "En nuestros centros comunitarios ubicados en Valparaíso de Goiás, equipados con aulas de refuerzo escolar, cocinas solidarias y laboratorios digitales."
      },
      {
        q: "¿Se pueden visitar las instalaciones del Instituto?",
        a: "¡Por supuesto! Promovemos la transparencia abierta. Solo solicitamos agendar la visita con anticipación para resguardar la privacidad y el aprendizaje de los alumnos."
      }
    ]
  },
  'fr-FR': {
    header: {
      title: "Foire Aux Questions (FAQ)",
      subtitle: "Toutes les réponses à vos questions sur les dons, le bénévolat, nos actions de terrain et la gouvernance."
    },
    categories: {
      all: "Toutes les Questions",
      donations: "Dons & Financement",
      volunteer: "Bénévolat",
      projects: "Programmes Sociaux",
      governance: "Gouvernance & RSE"
    },
    items: [
      {
        q: "Comment s'assurer que mon don bénéficie directement aux familles accompagnées ?",
        a: "Notre taux d'efficacité sociale dépasse 90 %, ce qui signifie que plus de 90 centimes par euro collecté financent directement nos actions pédagogiques et de sécurité alimentaire."
      },
      {
        q: "Les dons sont-ils éligibles à des réductions fiscales ?",
        a: "Oui. Les entreprises et les particuliers peuvent bénéficier des dispositifs légaux de déduction fiscale applicables aux organismes sans but lucratif reconnus."
      },
      {
        q: "Comment se déroule l'intégration des bénévoles ?",
        a: "Un formulaire d'inscription en 7 étapes permet d'évaluer vos compétences. Nous organisons ensuite un entretien d'accueil et une formation obligatoire sur la protection des mineurs."
      },
      {
        q: "Les entreprises peuvent-elles cofinancer des programmes spécifiques (RSE) ?",
        a: "Absolument. Nous proposons des conventions partenariales adaptées aux enjeux RSE, avec des indicateurs d'impact audités conformes aux standards internationaux GRI."
      },
      {
        q: "Où se déroulent les ateliers périscolaires et les repas partagés ?",
        a: "Dans nos locaux communautaires sécurisés à Valparaíso de Goiás, encadrés en permanence par des éducateurs diplômés et des travailleurs sociaux."
      },
      {
        q: "Est-il possible de visiter les centres du projet sur place ?",
        a: "Oui ! Nous prônons une politique de portes ouvertes responsable. Les visites sont organisées sur rendez-vous préalable pour préserver le rythme d'apprentissage des enfants."
      }
    ]
  },
  'de-DE': {
    header: {
      title: "Häufig Gestellte Fragen (FAQ)",
      subtitle: "Wichtige Antworten zu Spendenabwicklung, Ehrenamt, Bildungsförderung und Finanztransparenz."
    },
    categories: {
      all: "Alle Fragen",
      donations: "Spenden & Finanzen",
      volunteer: "Ehrenamt",
      projects: "Projekte & Förderung",
      governance: "Governance & ESG"
    },
    items: [
      {
        q: "Wie wird garantiert, dass Spenden direkt bei den Betroffenen ankommen?",
        a: "Mit einer Programmförderquote von über 90 % fließen mehr als 90 Cent jedes gespendeten Betrags unmittelbar in Mahlzeiten, Schulmaterialien und Ausbildungsmodule vor Ort."
      },
      {
        q: "Sind Spenden steuerlich abzugsfähig?",
        a: "Ja. Spenden können im Rahmen der jeweils geltenden steuerlichen Bestimmungen für gemeinnützige Zuwendungen geltend gemacht werden."
      },
      {
        q: "Wie läuft die Bewerbung für ein Ehrenamt ab?",
        a: "Über unseren 7-stufigen Online-Fragebogen erfassen wir Ihre Fachgebiete. Anschließend erfolgt ein persönliches Kennenlernen und eine Sicherheitsschulung zum Kindeswohl."
      },
      {
        q: "Können Unternehmen gezielte ESG-Partnerschaften eingehen?",
        a: "Ja. Wir bieten maßgeschneiderte Kooperationspakete mit vierteljährlichen Wirkungsberichten nach dem internationalen GRI-Berichtsstandard."
      },
      {
        q: "Wo finden die Schulungen und Bildungsangebote statt?",
        a: "In unseren festen Gemeindezentren in Valparaíso de Goiás unter kontinuierlicher Anleitung durch qualifiziertes pädagogisches Fachpersonal."
      },
      {
        q: "Besteht die Möglichkeit, das Institut vor Ort zu besuchen?",
        a: "Selbstverständlich! Wir pflegen transparente Türen. Aus Rücksicht auf den ungestörten Unterrichtsbetrieb bitten wir um vorherige Terminabstimmung."
      }
    ]
  },
  'ja-JP': {
    header: {
      title: "よくあるご質問（FAQ）",
      subtitle: "ご寄付の手続き、ボランティア参加、事業内容、情報公開に関する主な質問にお答えします。"
    },
    categories: {
      all: "すべての質問",
      donations: "寄付・財務について",
      volunteer: "ボランティアについて",
      projects: "支援事業について",
      governance: "ガバナンス・ESG"
    },
    items: [
      {
        q: "寄付金が確実に現地に届く仕組みはどうなっていますか？",
        a: "当団体では活動費の90%以上を直接的な社会事業（子どもたちの教育・食事・職業訓練）に充当しています。すべての収支は公認会計士による年次監査を受け、ウェブ上で開示されています。"
      },
      {
        q: "寄付金控除の対象になりますか？",
        a: "現地の法令および国際的な提携支援制度に基づき、所定の税制優遇措置を受けることができます。詳細はお問い合わせください。"
      },
      {
        q: "ボランティアへの応募手順を教えてください。",
        a: "オンラインの7ステップ登録フォームから希望分野をご登録いただき、事前面談と子どもの安全保護に関する研修を経て活動に参加いただきます。"
      },
      {
        q: "企業によるESGパートナーシップやスポンサー契約は可能ですか？",
        a: "はい。小規模な協賛から恒久基金への拠出まで多様な連携モデルを用意しており、国際基準（GRI）に沿った成果報告書を定期提出します。"
      },
      {
        q: "子どもたちの支援拠点はどこにありますか？",
        a: "ゴイアス州ヴァウパライゾ市内の地域拠点にて、常駐の指導員とソーシャルワーカーが日々の学習支援と給食提供を実施しています。"
      },
      {
        q: "現地の活動拠点を訪問・見学することはできますか？",
        a: "はい、可能です。子どもたちの学習環境と安全を守るため、事前に連絡フォームより見学予約をお願いしております。"
      }
    ]
  }
};

saveModule('faq', faq);

// ==========================================
// 5. ACCESSIBILITY
// ==========================================
const accessibility = {
  'pt-BR': {
    header: {
      title: "Declaração de Acessibilidade Digital",
      subtitle: "Compromisso integral com a inclusão e conformidade com as diretrizes W3C / WCAG 2.2 AAA."
    },
    statement: {
      title: "Nosso Compromisso com o Acesso Universal",
      text: "O Instituto Nova Esperança desenvolveu esta plataforma para garantir navegação plena e equitativa a todas as pessoas, independentemente de limitações visuais, motoras, auditivas ou cognitivas."
    },
    shortcuts: {
      title: "Teclas de Atalho de Teclado",
      s1: "Alt + 1: Pular direto para o Conteúdo Principal",
      s2: "Alt + 2: Pular para a Navegação Principal",
      s3: "Ctrl + K ou /: Abrir Busca Global Instantânea",
      s4: "Alt + C: Alternar Modo de Alto Contraste",
      s5: "Alt + D: Alternar Tipografia para Dislexia",
      s6: "Esc: Fechar modais, janelas e painéis abertos"
    },
    feedback: {
      title: "Canal Direto de Acessibilidade",
      desc: "Caso encontre qualquer obstáculo técnico ou dificuldade de navegação, informe nossa equipe de desenvolvimento.",
      btn: "Reportar Barreira de Acessibilidade"
    }
  },
  'en-US': {
    header: {
      title: "Digital Accessibility Statement",
      subtitle: "Uncompromising commitment to universal inclusion and W3C / WCAG 2.2 AAA standard compliance."
    },
    statement: {
      title: "Universal Access Commitment",
      text: "Instituto Nova Esperança engineered this digital platform to ensure an equitable, frictionless experience for all people regardless of physical, visual, auditory, or cognitive abilities."
    },
    shortcuts: {
      title: "Keyboard Shortcuts",
      s1: "Alt + 1: Skip directly to Main Content",
      s2: "Alt + 2: Skip directly to Main Navigation",
      s3: "Ctrl + K or /: Open Instant Global Search",
      s4: "Alt + C: Toggle High Contrast Mode",
      s5: "Alt + D: Toggle Dyslexia-Friendly Font",
      s6: "Esc: Close open modals, drawers, and overlays"
    },
    feedback: {
      title: "Accessibility Assistance Channel",
      desc: "If you encounter any barrier or technical difficulty navigating this site, please let our engineering team know.",
      btn: "Report an Accessibility Issue"
    }
  },
  'es-ES': {
    header: {
      title: "Declaración de Accesibilidad Web",
      subtitle: "Compromiso absoluto con la inclusión digital conforme a las pautas W3C / WCAG 2.2 AAA."
    },
    statement: {
      title: "Compromiso con el Acceso Sin Barreras",
      text: "El Instituto Nova Esperança diseñó este portal para ofrecer una navegación accesible a cualquier usuario, sin importar sus capacidades sensoriales, motoras o cognitivas."
    },
    shortcuts: {
      title: "Atajos de Teclado",
      s1: "Alt + 1: Saltar directamente al Contenido Principal",
      s2: "Alt + 2: Saltar al Menú de Navegación",
      s3: "Ctrl + K o /: Abrir Búsqueda Global",
      s4: "Alt + C: Activar Alto Contraste",
      s5: "Alt + D: Activar Tipografía para Dislexia",
      s6: "Esc: Cerrar ventanas modales y paneles"
    },
    feedback: {
      title: "Canal de Soporte en Accesibilidad",
      desc: "Si detecta alguna dificultad o barrera en el sitio, comuníquelo a nuestro equipo técnico para su inmediata corrección.",
      btn: "Notificar Problema de Accesibilidad"
    }
  },
  'fr-FR': {
    header: {
      title: "Déclaration d'Accessibilité Numérique",
      subtitle: "Engagement ferme en faveur de l'inclusion universelle et conformité stricte WCAG 2.2 AAA."
    },
    statement: {
      title: "Accès Équitable Pour Tous",
      text: "L'Instituto Nova Esperança a conçu ce portail afin d'offrir une navigation intuitive et accessible à chacun, quelles que soient ses capacités physiques, sensorielles ou cognitives."
    },
    shortcuts: {
      title: "Raccourcis Clavier Utiles",
      s1: "Alt + 1 : Accéder directement au contenu principal",
      s2: "Alt + 2 : Accéder au menu de navigation",
      s3: "Ctrl + K ou / : Ouvrir la recherche globale",
      s4: "Alt + C : Basculer en mode contraste élevé",
      s5: "Alt + D : Activer la police adaptée à la dyslexie",
      s6: "Échap : Fermer les fenêtres modales et panneaux"
    },
    feedback: {
      title: "Signalement d'Obstacles Numériques",
      desc: "Si vous rencontrez une difficulté d'accessibilité sur notre site, veuillez en faire part à notre équipe technique.",
      btn: "Signaler un Défaut d'Accessibilité"
    }
  },
  'de-DE': {
    header: {
      title: "Erklärung zur Barrierefreiheit",
      subtitle: "Konsequente Umsetzung barrierefreier digitaler Teilhabe nach den W3C / WCAG 2.2 AAA-Richtlinien."
    },
    statement: {
      title: "Unser Einsatz für uneingeschränkten Zugang",
      text: "Das Instituto Nova Esperança stellt sicher, dass dieses Portal von allen Menschen unabhängig von motorischen, visuellen oder kognitiven Fähigkeiten optimal genutzt werden kann."
    },
    shortcuts: {
      title: "Tastaturkürzel",
      s1: "Alt + 1: Direkt zum Hauptinhalt springen",
      s2: "Alt + 2: Direkt zur Hauptnavigation springen",
      s3: "Ctrl + K oder /: Globale Sofortsuche öffnen",
      s4: "Alt + C: Kontrastmodus umschalten",
      s5: "Alt + D: Legasthenie-Schriftart aktivieren",
      s6: "Esc: Modale Dialoge und Menüs schließen"
    },
    feedback: {
      title: "Feedback zur Barrierefreiheit",
      desc: "Sollten Sie auf technische Hürden stoßen, informieren Sie bitte unser Entwicklungsteam zur zeitnahen Behebung.",
      btn: "Barriere Melden"
    }
  },
  'ja-JP': {
    header: {
      title: "ウェブアクセシビリティ方針",
      subtitle: "すべての利用者への情報保障とW3C / WCAG 2.2 AAA基準への適合を目指しています。"
    },
    statement: {
      title: "誰もが快適に利用できるサイトづくり",
      text: "ノヴァ・エスペランサ研究所は、視覚・聴覚・身体機能・認知の違いに関わらず、すべての人が等しく利用できるデジタル環境を構築しています。"
    },
    shortcuts: {
      title: "便利なキーボードショートカット",
      s1: "Alt + 1：メインコンテンツへ直接移動",
      s2: "Alt + 2：ナビゲーションメニューへ移動",
      s3: "Ctrl + K または /：全体検索ウィンドウを開く",
      s4: "Alt + C：ハイコントラスト表示の切り替え",
      s5: "Alt + D：ディスレクシア対応フォントの切り替え",
      s6: "Esc：開いているモーダルやパネルを閉じる"
    },
    feedback: {
      title: "アクセシビリティ改善窓口",
      desc: "サイト利用中に不都合や障壁がございましたら、技術担当チームまでお気軽にご意見をお寄せください。",
      btn: "アクセシビリティの問題を報告する"
    }
  }
};

saveModule('accessibility', accessibility);

// ==========================================
// 6. FORMS
// ==========================================
const forms = {
  'pt-BR': {
    fields: {
      name: "Nome Completo",
      email: "E-mail de Contato",
      phone: "Telefone / WhatsApp",
      cpf: "CPF",
      cnpj: "CNPJ da Empresa",
      company: "Razão Social / Nome da Empresa",
      interest_area: "Área de Interesse",
      availability: "Disponibilidade de Horário",
      message: "Mensagem ou Proposta",
      partnership_type: "Modalidade de Parceria"
    },
    placeholders: {
      name: "Digite seu nome completo",
      email: "exemplo@dominio.com.br",
      phone: "(61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "Nome da sua organização",
      message: "Compartilhe detalhes sobre seu objetivo ou proposta..."
    },
    validation: {
      required: "Este campo é de preenchimento obrigatório.",
      invalid_email: "Por favor, insira um endereço de e-mail válido.",
      invalid_phone: "Por favor, digite um número com DDD válido.",
      invalid_cpf: "CPF inválido. Verifique os números digitados.",
      invalid_cnpj: "CNPJ inválido. Verifique os números digitados."
    },
    buttons: {
      submit: "Enviar Dados",
      submitting: "Processando envio...",
      success_title: "Formulário Enviado com Sucesso!",
      success_desc: "Agradecemos seu contato. Nossa equipe responderá em até 48 horas úteis.",
      error_title: "Não foi possível enviar",
      error_desc: "Ocorreu um erro na transmissão. Por favor, tente novamente."
    }
  },
  'en-US': {
    fields: {
      name: "Full Name",
      email: "Email Address",
      phone: "Phone / WhatsApp",
      cpf: "Taxpayer ID (CPF)",
      cnpj: "Corporate ID (CNPJ)",
      company: "Organization / Company Name",
      interest_area: "Area of Interest",
      availability: "Time Availability",
      message: "Message or Partnership Proposal",
      partnership_type: "Partnership Model"
    },
    placeholders: {
      name: "Enter your full name",
      email: "name@domain.com",
      phone: "+55 (61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "Your corporate or non-profit name",
      message: "Share details about your objectives or ideas..."
    },
    validation: {
      required: "This field is required.",
      invalid_email: "Please enter a valid email address.",
      invalid_phone: "Please enter a valid telephone number.",
      invalid_cpf: "Invalid Tax ID. Please verify digits.",
      invalid_cnpj: "Invalid Corporate ID. Please verify digits."
    },
    buttons: {
      submit: "Submit Information",
      submitting: "Processing submission...",
      success_title: "Successfully Submitted!",
      success_desc: "Thank you for reaching out. Our team will get back to you within 48 business hours.",
      error_title: "Submission Failed",
      error_desc: "An error occurred while sending your request. Please try again."
    }
  },
  'es-ES': {
    fields: {
      name: "Nombre Completo",
      email: "Correo Electrónico",
      phone: "Teléfono / WhatsApp",
      cpf: "Documento de Identidad (CPF)",
      cnpj: "Identificación Fiscal (CNPJ)",
      company: "Razón Social o Empresa",
      interest_area: "Área de Interés",
      availability: "Disponibilidad Horaria",
      message: "Mensaje o Propuesta",
      partnership_type: "Modalidad de Alianza"
    },
    placeholders: {
      name: "Escriba su nombre completo",
      email: "nombre@ejemplo.com",
      phone: "+55 (61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "Nombre de su entidad o empresa",
      message: "Comparta detalles sobre sus objetivos o consultas..."
    },
    validation: {
      required: "Este campo es obligatorio.",
      invalid_email: "Por favor, ingrese un correo electrónico válido.",
      invalid_phone: "Por favor, ingrese un número de teléfono válido.",
      invalid_cpf: "Documento no válido. Revise los números.",
      invalid_cnpj: "Identificación fiscal no válida. Revise los dígitos."
    },
    buttons: {
      submit: "Enviar Formulario",
      submitting: "Enviando datos...",
      success_title: "¡Formulario Enviado con Éxito!",
      success_desc: "Gracias por contactarnos. Le responderemos en un plazo máximo de 48 horas laborables.",
      error_title: "Error al Enviar",
      error_desc: "Ocurrió una falla durante el envío. Por favor, reintente en unos instantes."
    }
  },
  'fr-FR': {
    fields: {
      name: "Nom Complet",
      email: "Adresse Courriel",
      phone: "Téléphone / WhatsApp",
      cpf: "Numéro d'Identité Fiscale (CPF)",
      cnpj: "Identifiant Entreprise (CNPJ)",
      company: "Raison Sociale / Entreprise",
      interest_area: "Domaine d'Intérêt",
      availability: "Disponibilités",
      message: "Message ou Proposition",
      partnership_type: "Type de Partenariat"
    },
    placeholders: {
      name: "Entrez votre nom et prénom",
      email: "contact@domaine.fr",
      phone: "+55 (61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "Nom de votre organisation",
      message: "Détaillez votre demande ou votre projet..."
    },
    validation: {
      required: "Ce champ est obligatoire.",
      invalid_email: "Veuillez saisir une adresse courriel valide.",
      invalid_phone: "Veuillez saisir un numéro de téléphone valide.",
      invalid_cpf: "Identifiant fiscal non valide.",
      invalid_cnpj: "Numéro d'entreprise non valide."
    },
    buttons: {
      submit: "Envoyer ma Demande",
      submitting: "Transmission en cours...",
      success_title: "Demande Transmise avec Succès !",
      success_desc: "Merci pour votre message. Nos équipes reviendront vers vous sous 48h ouvrées.",
      error_title: "Échec de l'Envoi",
      error_desc: "Une erreur est survenue lors de l'envoi. Merci de renouveler votre tentative."
    }
  },
  'de-DE': {
    fields: {
      name: "Vollständiger Name",
      email: "E-Mail-Adresse",
      phone: "Telefon / WhatsApp",
      cpf: "Steuernummer (CPF)",
      cnpj: "Handelsregisternummer (CNPJ)",
      company: "Firma / Organisation",
      interest_area: "Interessensbereich",
      availability: "Verfügbarkeit",
      message: "Nachricht oder Projektvorschlag",
      partnership_type: "Art der Partnerschaft"
    },
    placeholders: {
      name: "Vor- und Nachname eingeben",
      email: "name@domain.de",
      phone: "+55 (61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "Name Ihres Unternehmens",
      message: "Beschreiben Sie kurz Ihr Anliegen..."
    },
    validation: {
      required: "Dieses Feld ist erforderlich.",
      invalid_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      invalid_phone: "Bitte geben Sie eine gültige Telefonnummer an.",
      invalid_cpf: "Ungültige Steuernummer.",
      invalid_cnpj: "Ungültige Registernummer."
    },
    buttons: {
      submit: "Formular Absenden",
      submitting: "Daten werden übermittelt...",
      success_title: "Erfolgreich Übermittelt!",
      success_desc: "Vielen Dank für Ihre Nachricht. Wir melden uns innerhalb von 48 Arbeitsstunden.",
      error_title: "Fehler beim Absenden",
      error_desc: "Die Datenübertragung ist fehlgeschlagen. Bitte versuchen Sie es erneut."
    }
  },
  'ja-JP': {
    fields: {
      name: "お名前（氏名）",
      email: "メールアドレス",
      phone: "電話番号 / WhatsApp",
      cpf: "納税者番号（CPF）",
      cnpj: "法人番号（CNPJ）",
      company: "法人名・団体名",
      interest_area: "関心のある分野",
      availability: "参加可能な時間帯",
      message: "お問い合わせ内容・ご提案",
      partnership_type: "連携の形態"
    },
    placeholders: {
      name: "お名前を入力してください",
      email: "example@domain.jp",
      phone: "+55 (61) 98765-4321",
      cpf: "000.000.000-00",
      cnpj: "00.000.000/0001-00",
      company: "ご所属の企業・団体名",
      message: "ご相談内容の詳細をご記入ください..."
    },
    validation: {
      required: "この項目は入力必須です。",
      invalid_email: "有効なメールアドレスを入力してください。",
      invalid_phone: "有効な電話番号を入力してください。",
      invalid_cpf: "納税者番号の形式が正しくありません。",
      invalid_cnpj: "法人番号の形式が正しくありません。"
    },
    buttons: {
      submit: "送信する",
      submitting: "送信処理中...",
      success_title: "送信が完了いたしました",
      success_desc: "お問い合わせありがとうございます。2営業日以内に担当よりご連絡いたします。",
      error_title: "送信に失敗しました",
      error_desc: "通信エラーが発生しました。時間をおいて再度お試しください。"
    }
  }
};

saveModule('forms', forms);

console.log('Todos os 6 módulos institucionais foram gravados com sucesso para os 6 idiomas!');
