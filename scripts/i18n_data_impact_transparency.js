/**
 * GERAÇÃO DOS MÓDULOS DE IMPACTO, TRANSPARÊNCIA E DOAÇÕES
 * impact, transparency, donations nos 6 idiomas:
 * pt-BR, en-US, es-ES, fr-FR, de-DE, ja-JP
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
// 1. IMPACT
// ==========================================
const impact = {
  'pt-BR': {
    header: {
      title: "Painel de Impacto Social Multi-anual",
      subtitle: "Métricas auditadas e evolução contínua da atuação territorial do Instituto Nova Esperança (2023–2026)."
    },
    fiscal_year_prefix: "Exercício Fiscal e Social",
    status_target: "Meta Anual",
    status_audited: "Auditado",
    timeline_aria: "Selecione o ano para análise",
    indicators: {
      beneficiaries: "Pessoas Atendidas Diretamente",
      meals: "Refeições Balanceadas Distribuídas",
      pedagogical_kits: "Kits Pedagógicos Entregues",
      trained_women: "Mulheres Capacitadas Profissionalmente",
      workshops: "Oficinas Socioeducativas Realizadas",
      families_assisted: "Famílias Acompanhadas Continuamente",
      school_attendance: "Frequência Escolar dos Alunos",
      project_approval: "Índice de Retenção e Aprovação",
      funds_in_projects: "Recursos Aplicados na Atividade-fim"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "em relação ao ano anterior",
    chart: {
      title: "Evolução do Alcance Social (2023–2026)",
      subtitle: "Crescimento contínuo do número total de pessoas atendidas e investimento aplicado.",
      aria_label: "Gráfico de evolução anual de pessoas atendidas de 2023 a 2026",
      legend_beneficiaries: "Pessoas Atendidas",
      legend_investment: "Investimento Aplicado"
    },
    table: {
      title: "Tabela Demonstrativa de Indicadores de Impacto (2023–2026)",
      caption: "Dados consolidados da atuação social do Instituto Nova Esperança com conformidade WCAG AAA",
      col_metric: "Indicador / Métrica",
      col_2023: "2023 (Realizado)",
      col_2024: "2024 (Realizado)",
      col_2025: "2025 (Consolidado)",
      col_2026: "2026 (Projeção / Meta)"
    }
  },
  'en-US': {
    header: {
      title: "Multi-Year Social Impact Dashboard",
      subtitle: "Audited performance metrics and continuous regional growth of Instituto Nova Esperança (2023–2026)."
    },
    fiscal_year_prefix: "Fiscal & Social Year",
    status_target: "Annual Target",
    status_audited: "Audited",
    timeline_aria: "Select year for analysis",
    indicators: {
      beneficiaries: "Direct Beneficiaries Supported",
      meals: "Nutritious Meals Distributed",
      pedagogical_kits: "Educational Kits Delivered",
      trained_women: "Women Completing Job Training",
      workshops: "Socio-Educational Workshops Held",
      families_assisted: "Families in Continuous Support",
      school_attendance: "Student School Attendance Rate",
      project_approval: "Retention & Academic Pass Rate",
      funds_in_projects: "Resources Deployed in Direct Programs"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "compared to previous year",
    chart: {
      title: "Evolution of Social Outreach (2023–2026)",
      subtitle: "Continuous growth in total individuals served and programmatic funding deployed.",
      aria_label: "Line chart showing annual outreach progression from 2023 to 2026",
      legend_beneficiaries: "People Supported",
      legend_investment: "Direct Investment"
    },
    table: {
      title: "Consolidated Social Impact Table (2023–2026)",
      caption: "Consolidated programmatic metrics for Instituto Nova Esperança under WCAG AAA accessibility",
      col_metric: "Indicator / Metric",
      col_2023: "2023 (Audited)",
      col_2024: "2024 (Audited)",
      col_2025: "2025 (Consolidated)",
      col_2026: "2026 (Target Projection)"
    }
  },
  'es-ES': {
    header: {
      title: "Panel Multianual de Impacto Social",
      subtitle: "Indicadores auditados y evolución comunitaria del Instituto Nova Esperança (2023–2026)."
    },
    fiscal_year_prefix: "Ejercicio Fiscal y Social",
    status_target: "Meta Anual",
    status_audited: "Auditado",
    timeline_aria: "Seleccione el año para el análisis",
    indicators: {
      beneficiaries: "Personas Atendidas Directamente",
      meals: "Comidas Balanceadas Servidas",
      pedagogical_kits: "Kits Pedagógicos Entregados",
      trained_women: "Mujeres Capacitadas Laboralmente",
      workshops: "Talleres Socioeducativos Realizados",
      families_assisted: "Familias Acompañadas Mensualmente",
      school_attendance: "Asistencia Escolar de los Alumnos",
      project_approval: "Tasa de Retención y Aprobación",
      funds_in_projects: "Recursos Aplicados a la Actividad Social"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "respecto al ejercicio anterior",
    chart: {
      title: "Evolución del Alcance Social (2023–2026)",
      subtitle: "Crecimiento sostenido del total de beneficiarios y de la inversión territorial.",
      aria_label: "Gráfico de evolución anual de beneficiarios de 2023 a 2026",
      legend_beneficiaries: "Personas Atendidas",
      legend_investment: "Inversión Aplicada"
    },
    table: {
      title: "Tabla de Indicadores de Impacto (2023–2026)",
      caption: "Datos consolidados de la labor social del Instituto Nova Esperança según directrices WCAG AAA",
      col_metric: "Indicador / Métrica",
      col_2023: "2023 (Realizado)",
      col_2024: "2024 (Realizado)",
      col_2025: "2025 (Consolidado)",
      col_2026: "2026 (Meta / Proyección)"
    }
  },
  'fr-FR': {
    header: {
      title: "Tableau de Bord Pluriannuel d'Impact Social",
      subtitle: "Indicateurs audités et dynamique de développement de l'Instituto Nova Esperança (2023–2026)."
    },
    fiscal_year_prefix: "Exercice Fiscal et Social",
    status_target: "Objectif Annuel",
    status_audited: "Audité",
    timeline_aria: "Sélectionnez l'année à analyser",
    indicators: {
      beneficiaries: "Personnes Directement Accompagnées",
      meals: "Repas Sains Distribués",
      pedagogical_kits: "Kits Pédagogiques Fournis",
      trained_women: "Femmes Formées Professionnellement",
      workshops: "Ateliers Socio-Éducatifs Organisés",
      families_assisted: "Familles Suivies Régulièrement",
      school_attendance: "Assiduité Scolaire des Jeunes",
      project_approval: "Taux de Réussite et Rétention",
      funds_in_projects: "Ressources Affectées aux Projets Directs"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "par rapport à l'année précédente",
    chart: {
      title: "Évolution du Rayonnement Social (2023–2026)",
      subtitle: "Progression continue du nombre de bénéficiaires et des investissements engagés.",
      aria_label: "Graphique d'évolution annuelle des bénéficiaires de 2023 à 2026",
      legend_beneficiaries: "Personnes Accompagnées",
      legend_investment: "Investissement Réalisé"
    },
    table: {
      title: "Tableau Récapitulatif d'Impact (2023–2026)",
      caption: "Données consolidées de l'action sociale de l'Instituto Nova Esperança certifiées WCAG AAA",
      col_metric: "Indicateur Clé",
      col_2023: "2023 (Constaté)",
      col_2024: "2024 (Constaté)",
      col_2025: "2025 (Consolidé)",
      col_2026: "2026 (Projection / Cible)"
    }
  },
  'de-DE': {
    header: {
      title: "Mehrjähriges Wirkungs-Dashboard",
      subtitle: "Geprüfte Kennzahlen und kontinuierliche Entwicklung des Instituto Nova Esperança (2023–2026)."
    },
    fiscal_year_prefix: "Geschäfts- und Sozialjahr",
    status_target: "Jahresziel",
    status_audited: "Geprüft",
    timeline_aria: "Jahr für die Auswertung auswählen",
    indicators: {
      beneficiaries: "Direkt Geförderte Menschen",
      meals: "Ausgegebene Vollwertmahlzeiten",
      pedagogical_kits: "Verteilte Schul- und Lernpakete",
      trained_women: "Frauen mit Berufsqualifizierung",
      workshops: "Durchgeführte Bildungsworkshops",
      families_assisted: "Kontinuierlich Betreute Familien",
      school_attendance: "Regelmäßige Schulbesuchsquote",
      project_approval: "Schulerfolgs- und Verbleibquote",
      funds_in_projects: "Mittelverwendung in Förderprojekten"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "im Vergleich zum Vorjahr",
    chart: {
      title: "Entwicklung der Sozialen Reichweite (2023–2026)",
      subtitle: "Stetiger Anstieg der erreichten Zielgruppen und der geleisteten Förderinvestitionen.",
      aria_label: "Liniendiagramm der jährlichen Reichweitenentwicklung von 2023 bis 2026",
      legend_beneficiaries: "Erreichte Personen",
      legend_investment: "Projektinvestitionen"
    },
    table: {
      title: "Übersichtstabelle der Wirkungsindikatoren (2023–2026)",
      caption: "Konsolidierte Daten zur sozialen Arbeit des Instituto Nova Esperança nach WCAG AAA Standard",
      col_metric: "Indikator / Kennzahl",
      col_2023: "2023 (Geprüft)",
      col_2024: "2024 (Geprüft)",
      col_2025: "2025 (Konsolidiert)",
      col_2026: "2026 (Zielwert / Prognose)"
    }
  },
  'ja-JP': {
    header: {
      title: "社会的インパクト年次ダッシュボード",
      subtitle: "ノヴァ・エスペランサ研究所の監査済み活動実績と地域発展の推移（2023年〜2026年）。"
    },
    fiscal_year_prefix: "会計・社会事業年度",
    status_target: "年間目標値",
    status_audited: "監査済み",
    timeline_aria: "分析対象の年度を選択",
    indicators: {
      beneficiaries: "直接支援を受けた受益者数",
      meals: "提供した栄養バランス給食数",
      pedagogical_kits: "配布した学習教材セット数",
      trained_women: "就労訓練を修了した女性の数",
      workshops: "開催した社会教育ワークショップ数",
      families_assisted: "継続支援を行う家庭の総数",
      school_attendance: "支援児童の学校出席率",
      project_approval: "学業継続率・進級率",
      funds_in_projects: "社会事業活動への直接投入額"
    },
    growth_badge_positive_prefix: "+",
    growth_vs_previous: "前年度比の伸び率",
    chart: {
      title: "社会的影響力の推移（2023年〜2026年）",
      subtitle: "支援対象者数および現場への直接投資額の継続的な拡大推移を示しています。",
      aria_label: "2023年から2026年にかけての受益者推移を示す折れ線グラフ",
      legend_beneficiaries: "支援対象者数",
      legend_investment: "直接投入資金"
    },
    table: {
      title: "主要活動成果指標 一覧表（2023年〜2026年）",
      caption: "ノヴァ・エスペランサ研究所の年次活動実績まとめ（WCAG AAA適合）",
      col_metric: "成果指標 / 項目",
      col_2023: "2023年（実績・監査済）",
      col_2024: "2024年（実績・監査済）",
      col_2025: "2025年（確定値）",
      col_2026: "2026年（目標予測値）"
    }
  }
};

saveModule('impact', impact);

// ==========================================
// 2. TRANSPARENCY
// ==========================================
const transparency = {
  'pt-BR': {
    header: {
      title: "Portal da Transparência Ativa",
      subtitle: "Balanços auditados, origem das receitas e prestação de contas conforme normas CFC / ITG 2002."
    },
    stat_revenue: "Total Arrecadado",
    stat_applied: "Recursos Aplicados",
    stat_efficiency: "Taxa em Projetos Sociais",
    stat_beneficiaries: "Beneficiários Atendidos",
    revenue_section: {
      title: "Origem das Receitas",
      subtitle: "Fontes de Financiamento Sustentável",
      categories: {
        individual_donations: "Doações Individuais",
        institutional_partnerships: "Parcerias Institucionais",
        public_grants: "Editais e Fundações",
        corporate_esg: "Investimento Social Corporativo (ESG)",
        investments_other: "Rendimentos e Outras Receitas"
      }
    },
    expense_section: {
      title: "Distribuição de Despesas",
      subtitle: "Metodologia CFC / ITG 2002",
      categories: {
        projects: "Projetos Socioeducativos (Atividade-fim)",
        administrative: "Governança e Administração",
        fundraising: "Captação de Recursos (Fundraising)",
        communication: "Comunicação e Relatórios Públicos",
        operations: "Operações e Manutenção Predial"
      }
    },
    table: {
      title: "Demonstrativo Contábil Completo",
      caption: "Balanço anual discriminado e auditado do Instituto Nova Esperança",
      col_category: "Rubrica Orçamentária",
      col_value: "Valor Aplicado",
      col_percentage: "Proporção (%)"
    },
    reports_section: {
      title: "Documentos Oficiais & Relatórios de Auditoria",
      subtitle: "Arquivos abertos para download com assinatura dos contadores e parecer independente.",
      btn_download: "Baixar PDF"
    }
  },
  'en-US': {
    header: {
      title: "Active Transparency & Financial Audit",
      subtitle: "Audited financial statements, revenue streams, and fund allocation under international non-profit standards."
    },
    stat_revenue: "Total Revenue Raised",
    stat_applied: "Total Funds Deployed",
    stat_efficiency: "Social Program Efficiency",
    stat_beneficiaries: "Direct Beneficiaries Served",
    revenue_section: {
      title: "Revenue Sources",
      subtitle: "Sustainable Financing Streams",
      categories: {
        individual_donations: "Individual Donations",
        institutional_partnerships: "Institutional Partnerships",
        public_grants: "Foundations & Public Grants",
        corporate_esg: "Corporate Social Investment (ESG)",
        investments_other: "Financial Returns & Other Income"
      }
    },
    expense_section: {
      title: "Expense Breakdown",
      subtitle: "Accounting Framework CFC / ITG 2002",
      categories: {
        projects: "Direct Socio-Educational Programs (Core Mission)",
        administrative: "Governance & Administration",
        fundraising: "Resource Development & Fundraising",
        communication: "Communications & Public Reporting",
        operations: "Facility Operations & Maintenance"
      }
    },
    table: {
      title: "Full Financial Statement",
      caption: "Audited annual breakdown of Instituto Nova Esperança financial allocation",
      col_category: "Budget Line Item",
      col_value: "Allocated Amount",
      col_percentage: "Share (%)"
    },
    reports_section: {
      title: "Official Governance & Audit Reports",
      subtitle: "Certified public disclosure files signed by independent certified accountants.",
      btn_download: "Download PDF"
    }
  },
  'es-ES': {
    header: {
      title: "Portal de Transparencia Activa",
      subtitle: "Balances auditados, origen de ingresos y destino de fondos según directrices CFC / ITG 2002."
    },
    stat_revenue: "Total Recaudado",
    stat_applied: "Recursos Aplicados",
    stat_efficiency: "Tasa en Programas Sociales",
    stat_beneficiaries: "Beneficiarios Atendidos",
    revenue_section: {
      title: "Origen de los Ingresos",
      subtitle: "Fuentes de Financiamiento Sostenible",
      categories: {
        individual_donations: "Donaciones Individuales",
        institutional_partnerships: "Alianzas Institucionales",
        public_grants: "Convocatorias y Fundaciones",
        corporate_esg: "Inversión Social Corporativa (ESG)",
        investments_other: "Rendimientos y Otros Ingresos"
      }
    },
    expense_section: {
      title: "Distribución del Gasto",
      subtitle: "Metodología CFC / ITG 2002",
      categories: {
        projects: "Proyectos Socioeducativos (Misión Directa)",
        administrative: "Gobernanza y Administración",
        fundraising: "Captación de Fondos (Fundraising)",
        communication: "Comunicación y Rendición Pública",
        operations: "Operaciones y Mantenimiento Edilicio"
      }
    },
    table: {
      title: "Estado Contable Detallado",
      caption: "Balance anual certificado del Instituto Nova Esperança",
      col_category: "Partida Presupuestaria",
      col_value: "Monto Aplicado",
      col_percentage: "Porcentaje (%)"
    },
    reports_section: {
      title: "Documentos Oficiales e Informes de Auditoría",
      subtitle: "Archivos públicos de descarga con firma contable y dictamen independiente.",
      btn_download: "Descargar PDF"
    }
  },
  'fr-FR': {
    header: {
      title: "Portail de Transparence Financière",
      subtitle: "Comptes audités, sources de financement et traçabilité des dépenses conformes aux normes CFC / ITG 2002."
    },
    stat_revenue: "Total Collecté",
    stat_applied: "Ressources Engagées",
    stat_efficiency: "Affectation aux Projets Sociaux",
    stat_beneficiaries: "Bénéficiaires Accompagnés",
    revenue_section: {
      title: "Origine des Recettes",
      subtitle: "Modèle de Financement Durable",
      categories: {
        individual_donations: "Dons de Particuliers",
        institutional_partnerships: "Partenariats Institutionnels",
        public_grants: "Subventions et Fondations",
        corporate_esg: "Investissement Social d'Entreprise (RSE)",
        investments_other: "Produits Financiers et Autres Recettes"
      }
    },
    expense_section: {
      title: "Répartition des Dépenses",
      subtitle: "Méthodologie Comptable CFC / ITG 2002",
      categories: {
        projects: "Actions Socio-Éducatives (Cœur de Mission)",
        administrative: "Gouvernance et Administration",
        fundraising: "Collecte de Fonds et Développement",
        communication: "Communication et Rapports Publics",
        operations: "Fonctionnement et Entretien des Locaux"
      }
    },
    table: {
      title: "Bilan Comptable Récapitulatif",
      caption: "Comptabilité annuelle certifiée de l'Instituto Nova Esperança",
      col_category: "Poste Budgétaire",
      col_value: "Montant Affecté",
      col_percentage: "Part (%)"
    },
    reports_section: {
      title: "Rapports d'Activité et Documents d'Audit",
      subtitle: "Documents officiels certifiés disponibles en téléchargement libre.",
      btn_download: "Télécharger PDF"
    }
  },
  'de-DE': {
    header: {
      title: "Portal für Finanztransparenz",
      subtitle: "Geprüfte Jahresabschlüsse, Mittelherkunft und Nachweis der Mittelverwendung (CFC / ITG 2002)."
    },
    stat_revenue: "Gesamteinnahmen",
    stat_applied: "Eingesetzte Mittel",
    stat_efficiency: "Förderquote in Projekten",
    stat_beneficiaries: "Unterstützte Personen",
    revenue_section: {
      title: "Herkunft der Mittel",
      subtitle: "Nachhaltige Finanzierungsstruktur",
      categories: {
        individual_donations: "Private Einzelspenden",
        institutional_partnerships: "Institutionelle Partnerschaften",
        public_grants: "Stiftungsgelder und Förderprogramme",
        corporate_esg: "Unternehmenskooperationen (ESG)",
        investments_other: "Erträge und Sonstige Einnahmen"
      }
    },
    expense_section: {
      title: "Aufteilung der Ausgaben",
      subtitle: "Rechnungslegungsmethode CFC / ITG 2002",
      categories: {
        projects: "Sozialpädagogische Projekte (Satzungszweck)",
        administrative: "Leitung und Verwaltung",
        fundraising: "Mittelbeschaffung (Fundraising)",
        communication: "Öffentlichkeitsarbeit und Berichte",
        operations: "Betriebs- und Gebäudekosten"
      }
    },
    table: {
      title: "Vollständige Jahresrechnung",
      caption: "Geprüfter Jahresabschluss des Instituto Nova Esperança",
      col_category: "Haushaltsposition",
      col_value: "Eingesetzter Betrag",
      col_percentage: "Anteil (%)"
    },
    reports_section: {
      title: "Offizielle Dokumente & Prüfberichte",
      subtitle: "Offizielle Rechenschaftsberichte mit Bestätigungsvermerk unabhängiger Wirtschaftsprüfer.",
      btn_download: "PDF Herunterladen"
    }
  },
  'ja-JP': {
    header: {
      title: "情報公開・財務情報ポータル",
      subtitle: "公認会計士監査済みの財務諸表、資金調達の内訳、使途報告（CFC / ITG 2002会計基準準拠）。"
    },
    stat_revenue: "年間総受入額",
    stat_applied: "事業投入総額",
    stat_efficiency: "社会事業活動費比率",
    stat_beneficiaries: "年間総支援者数",
    revenue_section: {
      title: "収入の構成内訳",
      subtitle: "持続可能な財政基盤",
      categories: {
        individual_donations: "個人からの寄付金",
        institutional_partnerships: "助成機関・団体提携金",
        public_grants: "公的助成金・財団拠出金",
        corporate_esg: "企業による社会的投資（ESG）",
        investments_other: "運用益・その他雑収入"
      }
    },
    expense_section: {
      title: "支出の分配内訳",
      subtitle: "CFC / ITG 2002会計基準に基づく分類",
      categories: {
        projects: "教育・福祉事業費（本来活動費）",
        administrative: "法人管理運営費",
        fundraising: "資金調達・広報活動費",
        communication: "情報開示・年次報告書作成費",
        operations: "施設維持・運営拠点管理費"
      }
    },
    table: {
      title: "年次決算内訳表",
      caption: "ノヴァ・エスペランサ研究所の監査済み年次財務諸表",
      col_category: "勘定科目 / 項目",
      col_value: "支出金額",
      col_percentage: "構成比率 (%)"
    },
    reports_section: {
      title: "公式情報公開文書・年次監査報告書",
      subtitle: "独立公認会計士の署名付き監査報告書をPDF形式で全文ダウンロードいただけます。",
      btn_download: "PDFをダウンロード"
    }
  }
};

saveModule('transparency', transparency);

// ==========================================
// 3. DONATIONS
// ==========================================
const donations = {
  'pt-BR': {
    header: {
      title: "Doações e Investimento Social",
      subtitle: "Sua contribuição transforma vidas com prestação de contas transparente e impacto auditado."
    },
    frequency: {
      once: "Doação Única",
      monthly: "Mensal Recorrente",
      annual: "Aporte Anual"
    },
    step1_title: "1. Escolha a Periodicidade",
    step2_title: "2. Selecione o Valor & Simule o Impacto",
    step2_desc: "Escolha um dos patamares de contribuição ou digite um valor personalizado:",
    step3_title: "3. Escolha o Método de Pagamento",
    tiers: {
      t30: "Garante 1 kit pedagógico individual com caderno, lápis e materiais didáticos para o letramento infantil.",
      t60: "Fornece alimentação saudável e balanceada para uma criança durante um mês letivo completo.",
      t150: "Financia oficinas de reforço escolar e letramento digital para dois jovens em situação de vulnerabilidade.",
      t500: "Mantém insumos e capacitação técnica de panificação ou costura para uma família inteira.",
      t1000: "Aporte institucional estratégico que viabiliza conectividade e equipamentos para um laboratório comunitário."
    },
    custom_placeholder: "Outro valor (R$)",
    disclaimer: "Aviso: Os impactos exibidos são estimativas demonstrativas baseadas na média histórica de custos operacionais das ações do Instituto.",
    pix: {
      title: "Pagamento Instantâneo via PIX",
      copy_code: "Copiar Código PIX",
      copied: "Código PIX copiado para a área de transferência!",
      expires: "Chave gerada válida para liquidação instantânea",
      instructions: "Abra o aplicativo do seu banco, selecione a opção PIX Copia e Cola e confirme a operação."
    },
    card: {
      title: "Cartão de Crédito Nacional ou Internacional",
      name_placeholder: "Nome impresso no cartão",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "MM/AA",
      cvv_placeholder: "CVV",
      btn_pay: "Concluir Doação Segura"
    }
  },
  'en-US': {
    header: {
      title: "Donations & Philanthropic Giving",
      subtitle: "Your generous gift transforms lives with verifiable accountability and audited community impact."
    },
    frequency: {
      once: "One-Time Gift",
      monthly: "Monthly Support",
      annual: "Annual Pledge"
    },
    step1_title: "1. Select Frequency",
    step2_title: "2. Choose Amount & Simulate Impact",
    step2_desc: "Select a suggested contribution tier or enter a custom donation amount:",
    step3_title: "3. Choose Payment Method",
    tiers: {
      t30: "Provides 1 comprehensive student kit with notebooks, stationery, and literacy learning materials.",
      t60: "Ensures nutritious, freshly prepared meals for a child throughout an entire school month.",
      t150: "Funds after-school academic tutoring and digital literacy classes for two vulnerable youth.",
      t500: "Covers equipment and vocational culinary or textile job training for an entire family.",
      t1000: "Strategic institutional contribution sustaining digital hardware and connectivity for a community lab."
    },
    custom_placeholder: "Custom amount (R$ / USD)",
    disclaimer: "Notice: Stated social impacts are demonstrative estimates based on historical operational cost averages of the Institute's programs.",
    pix: {
      title: "Instant Digital Transfer (PIX Brazil)",
      copy_code: "Copy PIX Code",
      copied: "PIX code successfully copied to clipboard!",
      expires: "QR code and digital string valid for instant settlement",
      instructions: "Open your banking app, choose 'PIX Copia e Cola', paste the code, and confirm transfer."
    },
    card: {
      title: "Credit or Debit Card",
      name_placeholder: "Cardholder name",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "MM/YY",
      cvv_placeholder: "CVC",
      btn_pay: "Complete Secure Donation"
    }
  },
  'es-ES': {
    header: {
      title: "Donaciones e Inversión Social",
      subtitle: "Su aporte transforma vidas con rigurosa rendición de cuentas e impacto verificado."
    },
    frequency: {
      once: "Donación Única",
      monthly: "Aporte Mensual",
      annual: "Aporte Anual"
    },
    step1_title: "1. Seleccione la Periodicidad",
    step2_title: "2. Elija el Monto y Simule el Impacto",
    step2_desc: "Seleccione uno de los niveles de contribución o ingrese una cantidad personalizada:",
    step3_title: "3. Elija el Medio de Pago",
    tiers: {
      t30: "Asegura 1 kit escolar completo con cuadernos, útiles y material de alfabetización infantil.",
      t60: "Proporciona alimentación saludable y equilibrada a un niño durante todo un mes lectivo.",
      t150: "Financia tutorías escolares y talleres de informática básica para dos jóvenes del barrio.",
      t500: "Cubre insumos y capacitación técnica en panadería o costura para una familia completa.",
      t1000: "Aporte institucional estratégico que permite equipar y dotar de internet a un aula comunitaria."
    },
    custom_placeholder: "Otro importe (R$)",
    disclaimer: "Aviso: Los impactos indicados son estimaciones orientativas calculadas a partir de los costes medios de operación del Instituto.",
    pix: {
      title: "Pago Instantáneo vía PIX (Brasil)",
      copy_code: "Copiar Código PIX",
      copied: "¡Código PIX copiado al portapapeles!",
      expires: "Código generado válido para acreditación inmediata",
      instructions: "Abra la aplicación de su entidad financiera, elija PIX Copia y Pega y confirme la operación."
    },
    card: {
      title: "Tarjeta de Crédito o Débito",
      name_placeholder: "Nombre impreso en la tarjeta",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "MM/AA",
      cvv_placeholder: "CVV",
      btn_pay: "Confirmar Donación Segura"
    }
  },
  'fr-FR': {
    header: {
      title: "Dons et Mécénat Solidaire",
      subtitle: "Votre soutien transforme durablement des vies avec une traçabilité comptable certifiée."
    },
    frequency: {
      once: "Don Ponctuel",
      monthly: "Don Mensuel",
      annual: "Engagement Annuel"
    },
    step1_title: "1. Choisissez la Périodicité",
    step2_title: "2. Choisissez le Montant & Simulez l'Impact",
    step2_desc: "Sélectionnez un palier suggéré ou saisissez un montant personnalisé :",
    step3_title: "3. Choisissez Votre Mode de Règlement",
    tiers: {
      t30: "Finance 1 kit scolaire complet avec cahiers, fournitures et manuels d'apprentissage de la lecture.",
      t60: "Garantit des déjeuners sains et équilibrés pour un enfant pendant un mois scolaire entier.",
      t150: "Prend en charge le soutien scolaire et l'apprentissage numérique de deux collégiens défavorisés.",
      t500: "Finance l'équipement et la formation professionnelle qualifiante en boulangerie pour un foyer entier.",
      t1000: "Contribution stratégique pérenne finançant le matériel informatique d'un espace numérique partagé."
    },
    custom_placeholder: "Autre montant (R$ / EUR)",
    disclaimer: "Information : Les équivalences d'impact mentionnées constituent des estimations moyennes basées sur les coûts réels de nos actions de terrain.",
    pix: {
      title: "Paiement Instantané PIX (Brésil)",
      copy_code: "Copier le Code PIX",
      copied: "Code PIX copié dans le presse-papiers !",
      expires: "Chaîne numérique active pour un règlement immédiat",
      instructions: "Ouvrez votre application bancaire, sélectionnez 'PIX Copia e Cola', collez le code et validez."
    },
    card: {
      title: "Carte Bancaire Sécurisée",
      name_placeholder: "Nom du titulaire",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "MM/AA",
      cvv_placeholder: "CVC",
      btn_pay: "Valider le Don Sécurisé"
    }
  },
  'de-DE': {
    header: {
      title: "Spenden und Förderbeiträge",
      subtitle: "Ihre Hilfe stiftet nachhaltige Zukunftsperspektiven mit transparenter Mittelverwendung."
    },
    frequency: {
      once: "Einmalige Spende",
      monthly: "Monatlicher Beitrag",
      annual: "Jährliche Zuwendung"
    },
    step1_title: "1. Spendendauer Wählen",
    step2_title: "2. Förderbetrag Wählen & Wirkung Simulieren",
    step2_desc: "Wählen Sie einen Vorschlagswert oder tragen Sie einen Wunschbetrag ein:",
    step3_title: "3. Zahlungsart Festlegen",
    tiers: {
      t30: "Ermöglicht 1 komplettes Lernpaket mit Heften, Stiften und Schulmaterialien für Grundschulkinder.",
      t60: "Sichert die ausgewogene tägliche Schulspeisung eines Kindes für einen gesamten Unterrichtsmonat.",
      t150: "Finanziert schulische Nachhilfe und grundlegende IT-Kurse für zwei benachteiligte Jugendliche.",
      t500: "Deckt Werkzeuge und die vollständige handwerkliche Ausbildung einer ganzen Familie ab.",
      t1000: "Strategischer Investitionsbeitrag für Hardware und Internetverbindung in einem Stadtteillabor."
    },
    custom_placeholder: "Individueller Betrag (R$ / EUR)",
    disclaimer: "Hinweis: Die dargestellten Auswirkungen sind statistische Modellrechnungen auf Basis durchschnittlicher Programmkosten des Instituts.",
    pix: {
      title: "Sofortüberweisung via PIX (Brasilien)",
      copy_code: "PIX-Code Kopieren",
      copied: "PIX-Code erfolgreich kopiert!",
      expires: "Code für sofortige Buchung generiert",
      instructions: "Öffnen Sie Ihre Bank-App, wählen Sie 'PIX Copia e Cola' und bestätigen Sie die Überweisung."
    },
    card: {
      title: "Kreditkarte",
      name_placeholder: "Name auf der Karte",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "MM/JJ",
      cvv_placeholder: "Prüfziffer",
      btn_pay: "Sichere Spende Abschließen"
    }
  },
  'ja-JP': {
    header: {
      title: "ご寄付・支援のご案内",
      subtitle: "皆様の温かいご支援は、厳正な会計監査と情報公開のもと、現地の確かな希望へと変わります。"
    },
    frequency: {
      once: "今回のみの寄付",
      monthly: "毎月の継続支援",
      annual: "年次での協賛"
    },
    step1_title: "1. 寄付の頻度を選択",
    step2_title: "2. 金額の選択と成果のシミュレーション",
    step2_desc: "以下の目安金額を選択するか、自由な金額を入力してください：",
    step3_title: "3. お支払い方法の選択",
    tiers: {
      t30: "児童1名分のノート、筆記具、読書教材を含む学習基礎キット1式を提供できます。",
      t60: "子ども1名に対し、丸1か月間の栄養バランスの取れた給食を届けることができます。",
      t150: "困難な環境にある青少年2名分の放課後補習とITリテラシー講座を支援できます。",
      t500: "1世帯全体の生活自立を促す製パンまたは裁縫の本格的な職業訓練費用を賄えます。",
      t1000: "地域学習拠点におけるコンピュータ機器と通信インフラを整備・維持する戦略的拠出金となります。"
    },
    custom_placeholder: "任意の寄付金額（ブラジル・レアル）",
    disclaimer: "【ご案内】表示されている支援成果は、当研究所の過去の平均事業経費に基づく試算モデルです。",
    pix: {
      title: "PIX即時決済（ブラジル国内向け）",
      copy_code: "PIXコードをコピー",
      copied: "PIX決済コードをクリップボードにコピーしました！",
      expires: "即時決済用の有効コードです",
      instructions: "銀行アプリで「PIX Copia e Cola」を選択し、コピーしたコードを貼り付けて送金を確定してください。"
    },
    card: {
      title: "クレジットカード決済",
      name_placeholder: "カード名義人氏名（ローマ字）",
      number_placeholder: "0000 0000 0000 0000",
      expiry_placeholder: "月/年",
      cvv_placeholder: "セキュリティコード",
      btn_pay: "安全に寄付を完了する"
    }
  }
};

saveModule('donations', donations);

console.log('Módulos impact, transparency e donations gravados com sucesso para os 6 idiomas!');
