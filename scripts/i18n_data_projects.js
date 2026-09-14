/**
 * GERAÇÃO DO MÓDULO PROJECTS PARA OS 6 IDIOMAS:
 * pt-BR, en-US, es-ES, fr-FR, de-DE, ja-JP
 * Tradução integral dos 4 grandes programas socioeducativos.
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

const projects = {
  'pt-BR': {
    header: {
      title: "Programas Estruturantes de Impacto Social",
      subtitle: "Soluções territoriais contínuas voltadas à emancipação humana, cidadania e quebra da vulnerabilidade extrema."
    },
    filters: {
      all: "Todos os Programas",
      education: "Educação Integral",
      nutrition: "Segurança Alimentar",
      income: "Inclusão Produtiva",
      infrastructure: "Infraestrutura Comunitária"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos — Educação & Cidadania",
        category: "Educação Integral",
        area: "Educação, Letramento e Juventude",
        summary: "Reforço escolar continuado em língua portuguesa e matemática, oficinas de letramento digital, robótica livre e acolhimento socioemocional para crianças e jovens.",
        territory: "Valparaíso de Goiás (Bairros Céu Azul, Anhanguera e Ipanema)",
        description: "O programa atua no contraturno escolar com metodologia participativa, garantindo acompanhamento psicopedagógico individual e envolvimento ativo das famílias.",
        objectives: "Reduzir a defasagem idade-série, erradicar a evasão escolar e desenvolver o raciocínio lógico-científico em crianças e jovens de escolas públicas.",
        targets: "Atender 4.500 estudantes ao ano, manter a evasão escolar abaixo de 2% e preparar 100% dos alunos do ensino fundamental para olimpíadas do conhecimento.",
        indicators: [
          { label: "Evasão Escolar Reduzida", value: "< 1.8%" },
          { label: "Alunos com Menção OBMEP", value: "18" },
          { label: "Horas/aula de Reforço ao Ano", value: "1.840h" }
        ],
        status: "Ativo / Em Expansão",
        cta_donate: "Apoiar Este Projeto",
        cta_volunteer: "Ser Tutor Voluntário"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma — Nutrição & Hortas Urbanas",
        category: "Segurança Alimentar",
        area: "Soberania Alimentar, Agroecologia e Saúde",
        summary: "Combate à insegurança alimentar crônica por meio de cozinhas comunitárias solidárias, hortas agroecológicas no cerrado e educação para o aproveitamento integral dos alimentos.",
        territory: "Valparaíso de Goiás e Cidade Ocidental",
        description: "Modelo circular que une compra direta de pequenos agricultores familiares, manejo de hortas urbanas em terrenos ociosos e fornecimento diário de refeições ricas em nutrientes.",
        objectives: "Garantir refeições balanceadas para crianças e idosos em extrema vulnerabilidade, combatendo a desnutrição infantil e promovendo autonomia alimentar.",
        targets: "Distribuir mais de 150.000 refeições ao ano, implantar 5 novas hortas escolares e capacitar 300 famílias em compostagem e agricultura urbana sustentável.",
        indicators: [
          { label: "Refeições Balanceadas / Ano", value: "145.000" },
          { label: "Famílias com Hortas Ativas", value: "240" },
          { label: "Toneladas de Alimentos Frescos", value: "68 ton" }
        ],
        status: "Ativo / Contínuo",
        cta_donate: "Doar Refeições",
        cta_volunteer: "Apoiar nas Hortas"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro — Inclusão Produtiva e Trabalho",
        category: "Inclusão Produtiva",
        area: "Qualificação Profissional, Trabalho e Empreendedorismo",
        summary: "Cursos técnicos profissionalizantes em corte industrial, confeitaria artesanal e tecnologia, com orientação de microcrédito e formalização MEI.",
        territory: "Região Metropolitana do Entorno do DF",
        description: "Formação acelerada focada nas demandas reais de contratação do polo logístico e comercial, priorizando mães solos e chefes de família sem renda fixa.",
        objectives: "Promover a autonomia econômica de famílias em vulnerabilidade, estimulando o empreendedorismo comunitário e a inserção no mercado formal.",
        targets: "Capacitar 2.000 pessoas ao ano, alcançar taxa de formalização como MEI superior a 60% e incubar 50 novos microempreendimentos comunitários.",
        indicators: [
          { label: "Egressos Formalizados (MEI)", value: "64%" },
          { label: "Microempresas Incubadas", value: "42" },
          { label: "Aumento Médio de Renda Familiar", value: "+74%" }
        ],
        status: "Ativo / Em Turmas",
        cta_donate: "Financiar Bolsas",
        cta_volunteer: "Ser Mentor Profissional"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva — Infraestrutura & Coesão Social",
        category: "Infraestrutura Comunitária",
        area: "Desenvolvimento Territorial e Cidadania",
        summary: "Mobilização de moradores para revitalização de praças públicas, iluminação comunitária, mutirões de melhoria habitacional e assembleias de bairro.",
        territory: "Valparaíso de Goiás (Pólos Céu Azul e Anhanguera)",
        description: "Metodologia de urbanismo social onde os próprios moradores diagnosticam os desafios de seus bairros e executam projetos conjuntos de recuperação urbana.",
        objectives: "Fortalecer o tecido social, reduzir índices de violência por meio da ocupação positiva dos espaços públicos e estimular o senso de corresponsabilidade.",
        targets: "Revitalizar 8 espaços públicos comunitários ao ano, envolver 500 moradores em mutirões e estruturar conselhos locais atuantes.",
        indicators: [
          { label: "Espaços Públicos Recuperados", value: "12" },
          { label: "Moradores Mobilizados em Mutirões", value: "620" },
          { label: "Redução de Ocorrências no Entorno", value: "-38%" }
        ],
        status: "Ativo / Territorial",
        cta_donate: "Apoiar Reformas",
        cta_volunteer: "Participar do Mutirão"
      }
    ]
  },
  'en-US': {
    header: {
      title: "Strategic Community Impact Programs",
      subtitle: "Continuous grassroots solutions focused on human emancipation, civic participation, and eradicating extreme poverty."
    },
    filters: {
      all: "All Programs",
      education: "Comprehensive Education",
      nutrition: "Nutritional Security",
      income: "Productive Inclusion",
      infrastructure: "Community Infrastructure"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos — Education & Citizenship",
        category: "Comprehensive Education",
        area: "Education, Literacy, and Youth Development",
        summary: "After-school academic tutoring in mathematics and reading, computer science workshops, open-source robotics, and mental health support for youth.",
        territory: "Valparaíso de Goiás (Céu Azul, Anhanguera, and Ipanema Neighborhoods)",
        description: "A participatory after-school educational program ensuring individualized socio-pedagogical guidance and active parental involvement.",
        objectives: "Close the educational achievement gap, eliminate school dropouts, and nurture analytical thinking in public school students.",
        targets: "Serve 4,500 students annually, sustain dropout rates below 2%, and prepare 100% of elementary students for academic competitions.",
        indicators: [
          { label: "School Dropout Reduced to", value: "< 1.8%" },
          { label: "Math Olympiad Awardees", value: "18" },
          { label: "Tutoring Classroom Hours / Year", value: "1,840h" }
        ],
        status: "Active / Expanding",
        cta_donate: "Support This Program",
        cta_volunteer: "Become a Tutor"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma — Nutrition & Urban Farms",
        category: "Nutritional Security",
        area: "Food Sovereignty, Agroecology, and Health",
        summary: "Combating chronic food insecurity through community kitchens, urban agroecological farms, and comprehensive nutrition education.",
        territory: "Valparaíso de Goiás and Cidade Ocidental",
        description: "A circular local model pairing direct procurement from family farmers, urban farm management on vacant lots, and daily nutritious meal distribution.",
        objectives: "Ensure wholesome meals for vulnerable youth and seniors, eliminate child malnutrition, and promote sustainable nutritional sovereignty.",
        targets: "Deliver over 150,000 nutritious meals annually, establish 5 new school gardens, and train 300 households in urban composting.",
        indicators: [
          { label: "Nutritious Meals Served / Year", value: "145,000" },
          { label: "Active Community Micro-Farms", value: "240" },
          { label: "Harvested Fresh Produce", value: "68 tons" }
        ],
        status: "Active / Continuous",
        cta_donate: "Sponsor Meals",
        cta_volunteer: "Help at Urban Farms"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro — Livelihoods & Work",
        category: "Productive Inclusion",
        area: "Vocational Training, Employment, and Entrepreneurship",
        summary: "Certified technical training in industrial textile design, commercial baking, and technology, supported by microfinance mentorship.",
        territory: "Federal District Suburbs Metropolitan Area",
        description: "Accelerated job training tailored to actual labor market demands in regional logistics hubs, prioritizing single mothers and low-income families.",
        objectives: "Achieve lasting economic self-sufficiency for vulnerable households through small business incubation and formal job placement.",
        targets: "Train 2,000 individuals annually, attain micro-enterprise formalization rates above 60%, and incubate 50 new neighborhood cooperatives.",
        indicators: [
          { label: "Graduates Formally Registered", value: "64%" },
          { label: "Incubated Small Businesses", value: "42" },
          { label: "Average Family Income Growth", value: "+74%" }
        ],
        status: "Active / Enrollment Open",
        cta_donate: "Fund Scholarships",
        cta_volunteer: "Become a Business Mentor"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva — Infrastructure & Social Cohesion",
        category: "Community Infrastructure",
        area: "Regional Development and Civic Engagement",
        summary: "Mobilizing local residents for public park restoration, solar street lighting, collective housing improvements, and neighborhood forums.",
        territory: "Valparaíso de Goiás (Céu Azul and Anhanguera Hubs)",
        description: "A social urbanism framework where community members identify their neighborhood priorities and jointly execute public space revitalizations.",
        objectives: "Reinforce community social fabric, curb urban violence through vibrant public gathering spaces, and foster civic responsibility.",
        targets: "Revitalize 8 public neighborhood spaces annually, engage 500 residents in mutual aid cleanups, and maintain active district boards.",
        indicators: [
          { label: "Public Spaces Revitalized", value: "12" },
          { label: "Residents Engaged in Action Days", value: "620" },
          { label: "Incident Reduction in Target Areas", value: "-38%" }
        ],
        status: "Active / Grassroots",
        cta_donate: "Fund Upgrades",
        cta_volunteer: "Join Action Days"
      }
    ]
  },
  'es-ES': {
    header: {
      title: "Programas Estratégicos de Impacto Social",
      subtitle: "Soluciones comunitarias continuas enfocadas en la emancipación humana, la ciudadanía activa y la superación de la pobreza extrema."
    },
    filters: {
      all: "Todos los Programas",
      education: "Educación Integral",
      nutrition: "Seguridad Alimentaria",
      income: "Inclusión Laboral",
      infrastructure: "Infraestructura Comunitaria"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos — Educación y Ciudadanía",
        category: "Educación Integral",
        area: "Educación, Alfabetización y Juventud",
        summary: "Tutorías escolares en matemáticas y lengua materna, alfabetización digital, robótica comunitaria y acompañamiento emocional para jóvenes.",
        territory: "Valparaíso de Goiás (Barrios Céu Azul, Anhanguera e Ipanema)",
        description: "Programa extracurricular participativo que brinda atención psicopedagógica personalizada y promueve la participación activa de los padres.",
        objectives: "Reducir el rezago escolar, eliminar el abandono temprano y desarrollar el pensamiento crítico en estudiantes de centros públicos.",
        targets: "Atender a 4.500 alumnos al año, mantener la deserción escolar por debajo del 2% y preparar a los estudiantes para olimpiadas académicas.",
        indicators: [
          { label: "Deserción Escolar Reducida", value: "< 1.8%" },
          { label: "Alumnos Premiados en Olimpiadas", value: "18" },
          { label: "Horas de Refuerzo Anuales", value: "1.840h" }
        ],
        status: "Activo / En Expansión",
        cta_donate: "Apoyar este Proyecto",
        cta_volunteer: "Ser Tutor Voluntario"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma — Nutrición y Huertos Urbanos",
        category: "Seguridad Alimentaria",
        area: "Soberanía Alimentaria, Agroecología y Salud",
        summary: "Lucha contra la inseguridad alimentaria mediante comedores solidarios, huertos agroecológicos urbanos y educación para el consumo saludable.",
        territory: "Valparaíso de Goiás y Ciudad Ocidental",
        description: "Circuito virtuoso que combina compra directa a campesinos locales, cultivo en solares recuperados y provisión diaria de menús equilibrados.",
        objectives: "Garantizar comidas nutritivas a niños y adultos mayores vulnerables, erradicando la desnutrición y promoviendo la autonomía alimentaria.",
        targets: "Distribuir más de 150.000 raciones anuales, crear 5 huertos escolares y formar a 300 familias en agricultura ecológica urbana.",
        indicators: [
          { label: "Comidas Balanceadas al Año", value: "145.000" },
          { label: "Familias con Huertos Activos", value: "240" },
          { label: "Toneladas de Alimentos Cosechados", value: "68 ton" }
        ],
        status: "Activo / Continuo",
        cta_donate: "Donar Raciones",
        cta_volunteer: "Ayudar en Huertos"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro — Inclusión Productiva y Empleo",
        category: "Inclusión Laboral",
        area: "Capacitación Técnica, Empleo y Emprendimiento",
        summary: "Cursos profesionales en confección textil, panadería y nuevas tecnologías, respaldados con asesoría en microcréditos para el autoempleo.",
        territory: "Región Metropolitana del Entorno del DF",
        description: "Formación intensiva alineada con las demandas de contratación del parque logístico e industrial, priorizando a madres solteras.",
        objectives: "Facilitar la autonomía económica familiar fomentando pequeños negocios sostenibles y la inserción laboral formal.",
        targets: "Formar a 2.000 personas al año, alcanzar un 60% de formalización de microempresas e incubar 50 iniciativas de negocio.",
        indicators: [
          { label: "Egresados Registrados en Régimen Formal", value: "64%" },
          { label: "Microempresas Incubadas", value: "42" },
          { label: "Aumento Promedio de Ingresos", value: "+74%" }
        ],
        status: "Activo / Matrícula Abierta",
        cta_donate: "Financiar Becas",
        cta_volunteer: "Ser Mentor Profesional"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva — Infraestructura y Cohesión Social",
        category: "Infraestructura Comunitaria",
        area: "Desarrollo Local y Participación Ciudadana",
        summary: "Movilización vecinal para rehabilitar plazas públicas, iluminación comunitaria, jornadas de mejora de viviendas y asambleas barriales.",
        territory: "Valparaíso de Goiás (Polos Céu Azul y Anhanguera)",
        description: "Urbanismo social donde los propios vecinos diagnostican las prioridades de sus barrios y ejecutan mejoras colectivas en el entorno común.",
        objectives: "Reconstruir el tejido social vecinal, prevenir la violencia urbana y fomentar la corresponsabilidad en el cuidado barrial.",
        targets: "Rehabilitar 8 espacios públicos cada año, convocar a 500 vecinos en jornadas comunitarias y consolidar comités barriales activos.",
        indicators: [
          { label: "Espacios Públicos Recuperados", value: "12" },
          { label: "Vecinos Movilizados en Jornadas", value: "620" },
          { label: "Reducción de Incidentes en la Zona", value: "-38%" }
        ],
        status: "Activo / Comunitario",
        cta_donate: "Apoyar Obras",
        cta_volunteer: "Participar en Jornadas"
      }
    ]
  },
  'fr-FR': {
    header: {
      title: "Programmes Structurants d'Impact Social",
      subtitle: "Des actions de terrain continues pour l'émancipation humaine, la citoyenneté active et la sortie durable de la grande précarité."
    },
    filters: {
      all: "Tous les Programmes",
      education: "Éducation Intégrale",
      nutrition: "Sécurité Alimentaire",
      income: "Insertion Productive",
      infrastructure: "Infrastructures Locales"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos — Éducation & Citoyenneté",
        category: "Éducation Intégrale",
        area: "Éducation, Alphabétisation et Jeunesse",
        summary: "Soutien scolaire intensif en lecture et calcul, ateliers d'informatique, robotique libre et suivi psychologique pour les élèves défavorisés.",
        territory: "Valparaíso de Goiás (Quartiers Céu Azul, Anhanguera et Ipanema)",
        description: "Dispositif périscolaire reposant sur une pédagogie bienveillante, un suivi individuel et une étroite coopération avec les parents.",
        objectives: "Combler le retard scolaire accumulé, prévenir le décrochage et développer l'esprit critique des enfants des écoles publiques.",
        targets: "Accompagner 4 500 élèves par an, maintenir le taux d'abandon scolaire sous 2% et encourager les vocations scientifiques.",
        indicators: [
          { label: "Décrochage Scolaire Inférieur à", value: "< 1.8%" },
          { label: "Élèves Primés aux Concours", value: "18" },
          { label: "Heures de Soutien / An", value: "1 840h" }
        ],
        status: "Actif / En Développement",
        cta_donate: "Soutenir ce Projet",
        cta_volunteer: "Devenir Tuteur Bénévole"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma — Nutrition & Jardins Partagés",
        category: "Sécurité Alimentaire",
        area: "Souveraineté Alimentaire, Agroécologie et Santé",
        summary: "Lutte contre la malnutrition chronique grâce à des cantines solidaires, des jardins potagers urbains et des ateliers d'alimentation saine.",
        territory: "Valparaíso de Goiás et Cidade Ocidental",
        description: "Circuit court solidaire combinant approvisionnement direct auprès de petits maraîchers locaux et distribution de déjeuners nutritifs.",
        objectives: "Garantir un apport nutritionnel sain aux enfants et personnes âgées isolées, tout en favorisant l'autonomie vivrière des quartiers.",
        targets: "Servir plus de 150 000 repas équilibrés par an, créer 5 potagers scolaires et former 300 foyers au maraîchage biologique.",
        indicators: [
          { label: "Repas Équilibrés Servis / An", value: "145 000" },
          { label: "Potagers Partagés Actifs", value: "240" },
          { label: "Tonnes de Légumes Récoltées", value: "68 ton" }
        ],
        status: "Actif / Continu",
        cta_donate: "Offrir des Repas",
        cta_volunteer: "Aider aux Jardins"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro — Insertion & Économie Sociale",
        category: "Insertion Productive",
        area: "Formation Professionnelle, Emploi et Micro-entrepreneuriat",
        summary: "Formations techniques en confection textile, boulangerie artisanale et bureautique, complétées par un accompagnement au microcrédit.",
        territory: "Agglomération de la Périphérie de Brasília",
        description: "Parcours certifiants courts adaptés aux besoins immédiats des entreprises de la zone logistique, destinés en priorité aux mères isolées.",
        objectives: "Assurer l'indépendance financière durable des ménages par l'accès à des emplois stables ou la création de micro-entreprises.",
        targets: "Former 2 000 stagiaires par an, dépasser 60% d'immatriculation d'activités indépendantes et incuber 50 ateliers coopératifs.",
        indicators: [
          { label: "Diplômés Immatriculés Déclarés", value: "64%" },
          { label: "Activités Artisanales Incubées", value: "42" },
          { label: "Hausse Moyenne du Revenu Foyer", value: "+74%" }
        ],
        status: "Actif / Inscriptions Ouvertes",
        cta_donate: "Financer des Bourses",
        cta_volunteer: "Devenir Mentor Pro"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva — Aménagement & Solidarité",
        category: "Infrastructures Locales",
        area: "Développement Territorial et Mobilisation Citoyenne",
        summary: "Chantiers collectifs de réhabilitation d'espaces verts, sécurisation de l'éclairage public et réunions de quartier participatives.",
        territory: "Valparaíso de Goiás (Secteurs Céu Azul et Anhanguera)",
        description: "Urbanisme participatif où les résidents identifient eux-mêmes les urgences de leur cadre de vie et mènent des travaux de réaménagement.",
        objectives: "Retisser le lien social de proximité, prévenir les tensions urbaines par l'appropriation positive des places publiques.",
        targets: "Réhabiliter 8 espaces publics par an, réunir 500 bénévoles sur les chantiers et pérenniser des conseils de quartier représentatifs.",
        indicators: [
          { label: "Espaces Publics Rénovés", value: "12" },
          { label: "Habitants Mobilisés sur Chantiers", value: "620" },
          { label: "Baisse des Incidents de Quartier", value: "-38%" }
        ],
        status: "Actif / Participatif",
        cta_donate: "Financer les Travaux",
        cta_volunteer: "Participer aux Chantiers"
      }
    ]
  },
  'de-DE': {
    header: {
      title: "Strukturierte Programme mit Sozialer Wirkung",
      subtitle: "Langfristige Förderansätze für menschliche Selbstbestimmung, Bildungsgerechtigkeit und die Überwindung extremer Armut."
    },
    filters: {
      all: "Alle Programme",
      education: "Ganzheitliche Bildung",
      nutrition: "Ernährungssicherheit",
      income: "Arbeit & Einkommen",
      infrastructure: "Kommunale Infrastruktur"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos — Bildung und Bürgerrechte",
        category: "Ganzheitliche Bildung",
        area: "Bildung, Alphabetisierung und Jugendförderung",
        summary: "Schulische Nachhilfe in Mathematik und Sprache, IT-Kompetenzen, Robotik-Workshops und psychologische Betreuung für Kinder und Jugendliche.",
        territory: "Valparaíso de Goiás (Stadtteile Céu Azul, Anhanguera und Ipanema)",
        description: "Ein nachschulisches Betreuungsprogramm mit partizipativem Ansatz, individuellen Lernplänen und enger Einbindung der Eltern.",
        objectives: "Bildungsdefizite abbauen, Schulabbrüche verhindern und wissenschaftliches Denkvermögen an öffentlichen Regelschulen stärken.",
        targets: "4.500 Kinder jährlich betreuen, Schulabbruchquote unter 2% halten und Teilnahmen an Schülerwettbewerben fördern.",
        indicators: [
          { label: "Schulabbruchquote Gesenkt auf", value: "< 1.8%" },
          { label: "Preisträger Schülerwettbewerbe", value: "18" },
          { label: "Förderstunden pro Jahr", value: "1.840h" }
        ],
        status: "Aktiv / Im Ausbau",
        cta_donate: "Projekt Unterstützen",
        cta_volunteer: "Lernbegleiter Werden"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma — Ernährung & Stadtgärten",
        category: "Ernährungssicherheit",
        area: "Ernährungssouveränität, Agrarökologie und Gesundheit",
        summary: "Hilfe gegen Mangelernährung durch solidarische Suppenküchen, ökologische Stadtgärten und Schulungen zur vollwertigen Speisenzubereitung.",
        territory: "Valparaíso de Goiás und Cidade Ocidental",
        description: "Ein lokaler Kreislauf aus direktem Zukauf von Kleinbauern, Anbau auf ungenutzten Flächen und täglicher Speiseversorgung Bedürftiger.",
        objectives: "Gesunde Ernährung für Kinder und Senioren sicherstellen, Mangelernährung beenden und eigenständige Versorgung stärken.",
        targets: "Über 150.000 Mahlzeiten jährlich ausgeben, 5 neue Schulgärten anlegen und 300 Familien in biologischem Gartenbau schulen.",
        indicators: [
          { label: "Gesunde Mahlzeiten pro Jahr", value: "145.000" },
          { label: "Aktive Gartenprojekte", value: "240" },
          { label: "Erntemenge Frisches Gemüse", value: "68 ton" }
        ],
        status: "Aktiv / Fortlaufend",
        cta_donate: "Mahlzeiten Spenden",
        cta_volunteer: "Im Garten Mithelfen"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro — Berufliche Integration",
        category: "Arbeit & Einkommen",
        area: "Berufsausbildung, Arbeitsmarkt und Existenzgründung",
        summary: "Zertifizierte Fachkurse im Schneiderhandwerk, Bäckereiwesen und PC-Anwendungen mit anschließender Begleitung bei Existenzgründungen.",
        territory: "Metropolregion im Umland von Brasília",
        description: "Praxisorientierte Kurzzeitausbildungen abgestimmt auf den realen Arbeitskräftebedarf des regionalen Logistik- und Dienstleistungssektors.",
        objectives: "Dauerhafte wirtschaftliche Selbstständigkeit gefährdeter Haushalte durch Vermittlung in den ersten Arbeitsmarkt fördern.",
        targets: "2.000 Absolventen jährlich schulen, über 60% formale Gewerbeanmeldungen erreichen und 50 Kleinstbetriebe begleiten.",
        indicators: [
          { label: "Absolventen mit Gewerbeschein", value: "64%" },
          { label: "Geförderte Mikrobetriebe", value: "42" },
          { label: "Mittlerer Familieneinkommenszuwachs", value: "+74%" }
        ],
        status: "Aktiv / Kurse Laufen",
        cta_donate: "Stipendien Fördern",
        cta_volunteer: "Mentoring Übernehmen"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva — Infrastruktur & Nachbarschaft",
        category: "Kommunale Infrastruktur",
        area: "Gemeindeentwicklung und Bürgerengagement",
        summary: "Aktivierung der Anwohner zur Verschönerung öffentlicher Plätze, Beleuchtung dunkler Zonen und gemeinsamer Instandsetzung von Wohnraum.",
        territory: "Valparaíso de Goiás (Quartiere Céu Azul und Anhanguera)",
        description: "Partizipative Stadtteilentwicklung: Nachbarn ermitteln Herausforderungen ihres Wohnumfeldes und beheben Mängel in Eigenregie.",
        objectives: "Den sozialen Zusammenhalt festigen, Kriminalität durch belebte Plätze vorbeugen und bürgerschaftliches Verantwortungsgefühl wecken.",
        targets: "8 öffentliche Plätze jährlich instand setzen, 500 Anwohner in Aktionstage einbinden und Bürgerbeiräte etablieren.",
        indicators: [
          { label: "Aufgewertete Öffentliche Räume", value: "12" },
          { label: "Aktive Teilnehmende an Aktionstagen", value: "620" },
          { label: "Rückgang Lokaler Zwischenfälle", value: "-38%" }
        ],
        status: "Aktiv / Vor Ort",
        cta_donate: "Renovierung Fördern",
        cta_volunteer: "Bei Aktionstagen Helfen"
      }
    ]
  },
  'ja-JP': {
    header: {
      title: "社会的インパクトを生み出す重点プログラム",
      subtitle: "個人の尊厳、市民としての自立、そして極度の貧困を克服するための地域密着型の持続的ソリューション。"
    },
    filters: {
      all: "すべてのプログラム",
      education: "包括的基礎教育",
      nutrition: "食料・栄養保障",
      income: "就労・経済自立",
      infrastructure: "地域生活基盤の改善"
    },
    programs: [
      {
        id: "novos-caminhos",
        slug: "novos-caminhos",
        name: "Novos Caminhos（新たな道）— 教育と市民権",
        category: "包括的基礎教育",
        area: "基礎学習支援・識字教育・青少年育成",
        summary: "放課後補習（算数・国語）、デジタルリテラシー講座、オープンソースロボット工作、心理カウンセリングを提供。",
        territory: "ゴイアス州ヴァウパライゾ市（セウ・アズール、アンニャンゲラ、イパネマ地区）",
        description: "参加型教育手法を用い、個別指導計画の作成と保護者の積極的な関与を促す放課後学習支援事業です。",
        objectives: "学業遅滞の解消、早期中退の防止、公立学校に通う子どもたちの論理的・科学的思考力の向上を目指します。",
        targets: "年間4,500名の子どもを支援し、中退率を2%未満に維持するとともに、各種学力コンテストへの全員参加を促します。",
        indicators: [
          { label: "学校中退率の抑制実績", value: "< 1.8%" },
          { label: "数学オリンピック入賞者数", value: "18名" },
          { label: "年間補習授業時間数", value: "1,840時間" }
        ],
        status: "活動中 / 拡大フェーズ",
        cta_donate: "この事業を寄付で支援する",
        cta_volunteer: "学習サポーターに応募する"
      },
      {
        id: "prato-transforma",
        slug: "prato-transforma",
        name: "Prato que Transforma（命を育む一皿）— 栄養と都市農園",
        category: "食料・栄養保障",
        area: "食料主権・アグロエコロジー・健康推進",
        summary: "子ども食堂の運営、遊休地を活用した都市型生態菜園の育成、食材を余すことなく活用する栄養教育を実施。",
        territory: "ゴイアス州ヴァウパライゾ市およびシダーデ・オシデンタウ市",
        description: "地元小規模農家からの直接買い付けと地域農園での無農薬栽培を組み合わせ、栄養満点な食事を毎日提供する循環モデルです。",
        objectives: "困難な状況にある児童や高齢者にバランスの取れた食事を提供し、乳幼児の栄養失調を根絶します。",
        targets: "年間15万食以上の提供、学校菜園5か所の新設、300世帯への堆肥化および家庭菜園技術の普及を目指します。",
        indicators: [
          { label: "年間栄養給食提供実績", value: "145,000食" },
          { label: "運営中のコミュニティ農園", value: "240か所" },
          { label: "年間新鮮野菜収穫量", value: "68トン" }
        ],
        status: "活動中 / 継続実施",
        cta_donate: "給食支援に寄付する",
        cta_volunteer: "農園活動に参加する"
      },
      {
        id: "renda-futuro",
        slug: "renda-futuro",
        name: "Renda e Futuro（収入と未来）— 就労訓練と所得向上",
        category: "就労・経済自立",
        area: "職業訓練・就労支援・小規模起業支援",
        summary: "工業縫製、製パン・製菓、IT技術の実践的職業訓練を行い、個人事業主（MEI）としての開業・起業を伴走支援。",
        territory: "連邦直轄区近郊大都市圏全域",
        description: "近隣の物流・商業拠点が求める実践的スキルを身につける集中講座。シングルマザーの女性を最優先で受け入れています。",
        objectives: "困窮世帯の経済的自立を促し、起業支援と正規雇用への就職を実現することで貧困の悪循環を解消します。",
        targets: "年間2,000名への職業教育修了、個人事業主開業率60%以上の達成、小規模ビジネス50件のインキュベーション。",
        indicators: [
          { label: "個人事業主登録（起業）率", value: "64%" },
          { label: "伴走支援中の小規模事業体", value: "42件" },
          { label: "修了生世帯の平均所得向上率", value: "+74%" }
        ],
        status: "活動中 / 受講生募集中",
        cta_donate: "受講奨学金を支援する",
        cta_volunteer: "キャリアメンターに応募する"
      },
      {
        id: "comunidade-viva",
        slug: "comunidade-viva",
        name: "Comunidade Viva（息づく地域）— 住環境改善と地域連帯",
        category: "地域生活基盤の改善",
        area: "地域開発・住民主体のまちづくり",
        summary: "公共広場の改修、防犯照明の設置、住宅改善ボランティア、住民集会を通じた地域主導の環境改善運動。",
        territory: "ゴイアス州ヴァウパライゾ市（セウ・アズール、アンニャンゲラ地区）",
        description: "住民自らが地域課題を発見し、みんなの力で公園や公共スペースを再生するソーシャル・アーバニズムの実践です。",
        objectives: "住民間の連帯感を高め、公共空間の積極的利活用によって治安を改善し、住み続けられる地域をつくります。",
        targets: "年間8か所の公共スペースの改修、住民500名が参加する共同清掃活動の実施、住民協議会の定着化。",
        indicators: [
          { label: "改修・再生した公共スペース数", value: "12か所" },
          { label: "共同作業に参加した地域住民数", value: "620名" },
          { label: "対象地域におけるトラブル減少率", value: "-38%" }
        ],
        status: "活動中 / 住民主導",
        cta_donate: "修繕資材費を支援する",
        cta_volunteer: "共同作業ボランティアに参加"
      }
    ]
  }
};

saveModule('projects', projects);

console.log('Módulo projects gravado com sucesso para os 6 idiomas!');
