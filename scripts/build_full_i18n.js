/**
 * INSTITUTO NOVA ESPERANÇA — GERADOR DE INTERNACIONALIZAÇÃO INTEGRAL V7.2+
 * Criação da estrutura canônica modular em /lang/ para 6 idiomas:
 * pt-BR, en-US, es-ES, fr-FR, de-DE, ja-JP
 * 12 módulos por idioma:
 * common, home, about, projects, impact, donations, blog, transparency, contact, faq, accessibility, forms
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT_DIR, 'lang');

const LANGUAGES = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
const MODULES = [
  'common',
  'home',
  'about',
  'projects',
  'impact',
  'donations',
  'blog',
  'transparency',
  'contact',
  'faq',
  'accessibility',
  'forms'
];

console.log('Iniciando geração dos módulos de internacionalização integral...');

// 1. COMMON MODULE
const common = {
  'pt-BR': {
    nav: {
      home: "Início",
      about: "Quem Somos",
      projects: "Projetos",
      impact: "Nosso Impacto",
      companies: "Empresas",
      volunteer: "Voluntariado",
      transparency: "Transparência",
      blog: "Blog",
      contact: "Contato",
      donate: "Doar Agora",
      faq: "Perguntas Frequentes"
    },
    search: {
      placeholder: "Pesquisar no Instituto (Ctrl+K)...",
      modal_title: "Pesquisar no Instituto Nova Esperança",
      input_aria: "Campo de pesquisa global",
      no_results: "Nenhum resultado para",
      hint: "Tente utilizar termos mais gerais como \"educação\", \"alimentação\" ou \"doação\".",
      nav_hint: "Navegação: ↑ ↓ para mover • Enter para selecionar",
      esc_close: "Esc para fechar",
      categories: {
        projects: "Projetos",
        blog: "Notícias & Blog",
        transparency: "Transparência & Contabilidade",
        donations: "Doações & Como Apoiar",
        faq: "Dúvidas Frequentes"
      }
    },
    a11y: {
      tools: "Ferramentas de Acessibilidade",
      font_decrease: "Diminuir fonte (A-)",
      font_default: "Fonte padrão (A)",
      font_increase: "Aumentar fonte (A+)",
      high_contrast: "Alto Contraste",
      dark_mode: "Modo Escuro",
      dyslexia_font: "Fonte para Dislexia",
      underline_links: "Sublinhar Links",
      reset: "Redefinir Padrões",
      shortcuts_hint: "Atalhos: Alt+1 Conteúdo | Alt+2 Menu | Alt+C Contraste | Ctrl+K Busca"
    },
    skip: {
      content: "Pular para o conteúdo principal",
      nav: "Pular para a navegação primária",
      footer: "Pular para o rodapé"
    },
    footer: {
      mission_summary: "Transformação social contínua através de educação integral, segurança alimentar e capacitação profissional no Entorno do Distrito Federal.",
      col_institutional: "Institucional",
      col_programs: "Programas",
      col_support: "Como Apoiar",
      col_contact: "Atendimento",
      rights: "© 2026 Instituto Nova Esperança. Todos os direitos reservados.",
      privacy: "Privacidade",
      cookies: "Cookies",
      accessibility: "Acessibilidade",
      governance: "Governança & Estatuto",
      address_short: "Valparaíso de Goiás — GO | Entorno do DF"
    },
    states: {
      loading: "Carregando informações...",
      error_title: "Não foi possível carregar os dados",
      error_desc: "Ocorreu uma falha temporária. Por favor, verifique sua conexão ou tente novamente.",
      empty_title: "Nenhum item encontrado",
      empty_desc: "Tente redefinir seus filtros ou pesquisar com termos mais abrangentes.",
      offline_title: "Modo Offline",
      offline_desc: "Você está sem conexão. Exibindo dados locais seguros salvos em cache.",
      btn_retry: "Tentar novamente",
      btn_clear_filters: "Limpar filtros"
    },
    toast: {
      link_copied: "Link copiado para a área de transferência com sucesso!",
      form_success: "Sua mensagem foi enviada com sucesso! Retornaremos em breve.",
      form_error: "Por favor, corrija os erros nos campos antes de enviar.",
      offline_notice: "Conexão perdida. A plataforma continuará operando offline.",
      online_restored: "Conexão restabelecida. Dados sincronizados com sucesso."
    },
    cookie: {
      title: "Gestão de Privacidade & Cookies",
      message: "Utilizamos cookies necessários para navegação, acessibilidade e análise de tráfego anônimo em conformidade com a LGPD.",
      accept: "Aceitar Todos",
      decline: "Apenas Essenciais",
      preferences: "Preferências"
    },
    lang_name: "Português (Brasil)"
  },
  'en-US': {
    nav: {
      home: "Home",
      about: "About Us",
      projects: "Programs",
      impact: "Our Impact",
      companies: "Corporate ESG",
      volunteer: "Volunteer",
      transparency: "Transparency",
      blog: "Blog",
      contact: "Contact",
      donate: "Donate Now",
      faq: "FAQ"
    },
    search: {
      placeholder: "Search the Institute (Ctrl+K)...",
      modal_title: "Search Instituto Nova Esperança",
      input_aria: "Global search field",
      no_results: "No results found for",
      hint: "Try using broader terms such as \"education\", \"nutrition\" or \"donation\".",
      nav_hint: "Navigation: ↑ ↓ to navigate • Enter to select",
      esc_close: "Esc to close",
      categories: {
        projects: "Programs",
        blog: "News & Insights",
        transparency: "Transparency & Audits",
        donations: "Donations & Giving",
        faq: "Frequently Asked Questions"
      }
    },
    a11y: {
      tools: "Accessibility Tools",
      font_decrease: "Decrease font size (A-)",
      font_default: "Default font size (A)",
      font_increase: "Increase font size (A+)",
      high_contrast: "High Contrast",
      dark_mode: "Dark Mode",
      dyslexia_font: "Dyslexia Friendly Font",
      underline_links: "Underline Links",
      reset: "Reset Defaults",
      shortcuts_hint: "Shortcuts: Alt+1 Content | Alt+2 Menu | Alt+C Contrast | Ctrl+K Search"
    },
    skip: {
      content: "Skip to main content",
      nav: "Skip to primary navigation",
      footer: "Skip to footer"
    },
    footer: {
      mission_summary: "Continuous social transformation through comprehensive education, food security, and professional empowerment in the Federal District Suburbs.",
      col_institutional: "Institutional",
      col_programs: "Programs",
      col_support: "Ways to Give",
      col_contact: "Contact",
      rights: "© 2026 Instituto Nova Esperança. All rights reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookie Settings",
      accessibility: "Accessibility Statement",
      governance: "Governance & Bylaws",
      address_short: "Valparaíso de Goiás — GO | Federal District Suburbs"
    },
    states: {
      loading: "Loading information...",
      error_title: "Unable to load data",
      error_desc: "A temporary error occurred. Please check your network connection or try again.",
      empty_title: "No items found",
      empty_desc: "Try clearing your filters or searching with broader terms.",
      offline_title: "Offline Mode",
      offline_desc: "You are currently disconnected. Displaying secure cached local data.",
      btn_retry: "Try again",
      btn_clear_filters: "Clear filters"
    },
    toast: {
      link_copied: "Link successfully copied to clipboard!",
      form_success: "Your message has been sent successfully! We will get back to you shortly.",
      form_error: "Please correct the errors in the highlighted fields before submitting.",
      offline_notice: "Connection lost. The platform will continue operating in offline mode.",
      online_restored: "Connection reestablished. Data synchronized successfully."
    },
    cookie: {
      title: "Privacy & Cookie Management",
      message: "We use essential cookies for seamless navigation, accessibility, and anonymous metrics in strict compliance with data privacy regulations.",
      accept: "Accept All",
      decline: "Essential Only",
      preferences: "Preferences"
    },
    lang_name: "English (US)"
  },
  'es-ES': {
    nav: {
      home: "Inicio",
      about: "Quiénes Somos",
      projects: "Proyectos",
      impact: "Nuestro Impacto",
      companies: "Empresas ESG",
      volunteer: "Voluntariado",
      transparency: "Transparencia",
      blog: "Blog",
      contact: "Contacto",
      donate: "Donar Ahora",
      faq: "Preguntas Frecuentes"
    },
    search: {
      placeholder: "Buscar en el Instituto (Ctrl+K)...",
      modal_title: "Buscar en el Instituto Nova Esperança",
      input_aria: "Campo de búsqueda global",
      no_results: "No se encontraron resultados para",
      hint: "Intente utilizar términos más generales como \"educación\", \"nutrición\" o \"donación\".",
      nav_hint: "Navegación: ↑ ↓ para mover • Enter para seleccionar",
      esc_close: "Esc para cerrar",
      categories: {
        projects: "Proyectos",
        blog: "Noticias y Artículos",
        transparency: "Transparencia y Cuentas",
        donations: "Donaciones y Apoyo",
        faq: "Preguntas Frecuentes"
      }
    },
    a11y: {
      tools: "Herramientas de Accesibilidad",
      font_decrease: "Disminuir fuente (A-)",
      font_default: "Fuente predeterminada (A)",
      font_increase: "Aumentar fuente (A+)",
      high_contrast: "Alto Contraste",
      dark_mode: "Modo Oscuro",
      dyslexia_font: "Fuente para Dislexia",
      underline_links: "Subrayar Enlaces",
      reset: "Restablecer Valores",
      shortcuts_hint: "Atajos: Alt+1 Contenido | Alt+2 Menú | Alt+C Contraste | Ctrl+K Búsqueda"
    },
    skip: {
      content: "Saltar al contenido principal",
      nav: "Saltar al menú de navegación",
      footer: "Saltar al pie de página"
    },
    footer: {
      mission_summary: "Transformación social continua a través de educación integral, seguridad alimentaria y capacitación técnica en la periferia del Distrito Federal.",
      col_institutional: "Institucional",
      col_programs: "Programas",
      col_support: "Cómo Ayudar",
      col_contact: "Atención",
      rights: "© 2026 Instituto Nova Esperança. Todos los derechos reservados.",
      privacy: "Privacidad",
      cookies: "Cookies",
      accessibility: "Accesibilidad",
      governance: "Gobernanza y Estatutos",
      address_short: "Valparaíso de Goiás — GO | Entorno del DF"
    },
    states: {
      loading: "Cargando información...",
      error_title: "No se pudieron cargar los datos",
      error_desc: "Ocurrió un error temporal. Por favor, revise su conexión o intente nuevamente.",
      empty_title: "No se encontraron elementos",
      empty_desc: "Intente limpiar los filtros o realizar una búsqueda con términos más amplios.",
      offline_title: "Modo Fuera de Línea",
      offline_desc: "Está desconectado. Mostrando datos seguros guardados en memoria caché.",
      btn_retry: "Reintentar",
      btn_clear_filters: "Limpiar filtros"
    },
    toast: {
      link_copied: "¡Enlace copiado al portapapeles con éxito!",
      form_success: "¡Su mensaje fue enviado con éxito! Nos comunicaremos a la brevedad.",
      form_error: "Por favor, corrija los campos señalados antes de enviar el formulario.",
      offline_notice: "Conexión perdida. La plataforma seguirá funcionando sin conexión.",
      online_restored: "Conexión restablecida. Datos sincronizados con éxito."
    },
    cookie: {
      title: "Gestión de Privacidad y Cookies",
      message: "Utilizamos cookies indispensables para la navegación accesible y métricas anónimas en conformidad con las leyes de protección de datos.",
      accept: "Aceptar Todas",
      decline: "Solo Esenciales",
      preferences: "Preferencias"
    },
    lang_name: "Español"
  },
  'fr-FR': {
    nav: {
      home: "Accueil",
      about: "Qui Sommes-Nous",
      projects: "Programmes",
      impact: "Notre Impact",
      companies: "Entreprises ESG",
      volunteer: "Bénévolat",
      transparency: "Transparence",
      blog: "Blog",
      contact: "Contact",
      donate: "Faire un Don",
      faq: "Foire Aux Questions"
    },
    search: {
      placeholder: "Rechercher sur le site (Ctrl+K)...",
      modal_title: "Recherche sur l'Instituto Nova Esperança",
      input_aria: "Champ de recherche global",
      no_results: "Aucun résultat trouvé pour",
      hint: "Essayez des termes plus larges tels que \"éducation\", \"nutrition\" ou \"don\".",
      nav_hint: "Navigation : ↑ ↓ pour naviguer • Entrée pour sélectionner",
      esc_close: "Échap pour fermer",
      categories: {
        projects: "Programmes",
        blog: "Actualités & Blog",
        transparency: "Transparence & Comptes",
        donations: "Dons & Soutien",
        faq: "Questions Fréquentes"
      }
    },
    a11y: {
      tools: "Outils d'Accessibilité",
      font_decrease: "Diminuer la police (A-)",
      font_default: "Police par défaut (A)",
      font_increase: "Agrandir la police (A+)",
      high_contrast: "Contraste Élevé",
      dark_mode: "Mode Sombre",
      dyslexia_font: "Police pour Dyslexie",
      underline_links: "Souligner les Liens",
      reset: "Réinitialiser",
      shortcuts_hint: "Raccourcis : Alt+1 Contenu | Alt+2 Menu | Alt+C Contraste | Ctrl+K Recherche"
    },
    skip: {
      content: "Passer au contenu principal",
      nav: "Passer à la navigation principale",
      footer: "Passer au pied de page"
    },
    footer: {
      mission_summary: "Transformation sociale durable par l'éducation intégrale, la sécurité alimentaire et l'émancipation économique en périphérie de Brasília.",
      col_institutional: "Institutionnel",
      col_programs: "Programmes",
      col_support: "Comment Aider",
      col_contact: "Contact",
      rights: "© 2026 Instituto Nova Esperança. Tous droits réservés.",
      privacy: "Confidentialité",
      cookies: "Cookies",
      accessibility: "Accessibilité",
      governance: "Gouvernance & Statuts",
      address_short: "Valparaíso de Goiás — GO | Périphérie du DF"
    },
    states: {
      loading: "Chargement des informations...",
      error_title: "Impossible de charger les données",
      error_desc: "Une erreur temporaire est survenue. Veuillez vérifier votre connexion ou réessayer.",
      empty_title: "Aucun élément trouvé",
      empty_desc: "Essayez de réinitialiser vos filtres ou d'élargir vos termes de recherche.",
      offline_title: "Mode Hors Ligne",
      offline_desc: "Vous êtes actuellement déconnecté. Données locales sécurisées en cache.",
      btn_retry: "Réessayer",
      btn_clear_filters: "Effacer les filtres"
    },
    toast: {
      link_copied: "Lien copié dans le presse-papiers avec succès !",
      form_success: "Votre message a bien été envoyé ! Nous vous répondrons rapidement.",
      form_error: "Veuillez corriger les champs obligatoires avant de soumettre.",
      offline_notice: "Connexion perdue. La plateforme continue de fonctionner hors ligne.",
      online_restored: "Connexion rétablie. Données synchronisées avec succès."
    },
    cookie: {
      title: "Gestion de la Confidentialité et des Cookies",
      message: "Nous utilisons des cookies essentiels pour garantir une navigation fluide, l'accessibilité et des mesures anonymes conformément au RGPD.",
      accept: "Tout Accepter",
      decline: "Essentiels Uniquement",
      preferences: "Préférences"
    },
    lang_name: "Français"
  },
  'de-DE': {
    nav: {
      home: "Startseite",
      about: "Über Uns",
      projects: "Projekte",
      impact: "Wirkung",
      companies: "Unternehmen ESG",
      volunteer: "Ehrenamt",
      transparency: "Transparenz",
      blog: "Blog",
      contact: "Kontakt",
      donate: "Jetzt Spenden",
      faq: "FAQ"
    },
    search: {
      placeholder: "Im Institut suchen (Ctrl+K)...",
      modal_title: "Suche im Instituto Nova Esperança",
      input_aria: "Globales Suchfeld",
      no_results: "Keine Ergebnisse gefunden für",
      hint: "Versuchen Sie allgemeinere Begriffe wie \"Bildung\", \"Ernährung\" oder \"Spende\".",
      nav_hint: "Navigation: ↑ ↓ zum Bewegen • Eingabe zum Auswählen",
      esc_close: "Esc zum Schließen",
      categories: {
        projects: "Projekte",
        blog: "Nachrichten & Artikel",
        transparency: "Transparenz & Finanzen",
        donations: "Spenden & Förderung",
        faq: "Häufige Fragen"
      }
    },
    a11y: {
      tools: "Barrierefreiheits-Tools",
      font_decrease: "Schriftgröße verkleinern (A-)",
      font_default: "Standardschriftgröße (A)",
      font_increase: "Schriftgröße vergrößern (A+)",
      high_contrast: "Hoher Kontrast",
      dark_mode: "Dunkelmodus",
      dyslexia_font: "Schrift für Legasthenie",
      underline_links: "Links unterstreichen",
      reset: "Zurücksetzen",
      shortcuts_hint: "Kürzel: Alt+1 Inhalt | Alt+2 Menü | Alt+C Kontrast | Ctrl+K Suche"
    },
    skip: {
      content: "Zum Hauptinhalt springen",
      nav: "Zur Hauptnavigation springen",
      footer: "Zur Fußzeile springen"
    },
    footer: {
      mission_summary: "Kontinuierliche soziale Transformation durch ganzheitliche Bildung, Ernährungssicherheit und berufliche Qualifizierung in Brasilien.",
      col_institutional: "Über Uns",
      col_programs: "Programme",
      col_support: "Unterstützen",
      col_contact: "Kontakt",
      rights: "© 2026 Instituto Nova Esperança. Alle Rechte vorbehalten.",
      privacy: "Datenschutz",
      cookies: "Cookies",
      accessibility: "Barrierefreiheit",
      governance: "Satzung & Leitung",
      address_short: "Valparaíso de Goiás — GO | Region Brasília"
    },
    states: {
      loading: "Informationen werden geladen...",
      error_title: "Daten konnten nicht geladen werden",
      error_desc: "Ein vorübergehender Fehler ist aufgetreten. Bitte prüfen Sie Ihre Verbindung oder versuchen Sie es erneut.",
      empty_title: "Keine Einträge gefunden",
      empty_desc: "Setzen Sie Ihre Filter zurück oder nutzen Sie allgemeinere Suchbegriffe.",
      offline_title: "Offline-Modus",
      offline_desc: "Sie sind offline. Gespeicherte lokale Daten werden sicher dargestellt.",
      btn_retry: "Erneut versuchen",
      btn_clear_filters: "Filter zurücksetzen"
    },
    toast: {
      link_copied: "Link erfolgreich in die Zwischenablage kopiert!",
      form_success: "Ihre Nachricht wurde erfolgreich versendet! Wir antworten schnellstmöglich.",
      form_error: "Bitte korrigieren Sie die markierten Pflichtfelder vor dem Absenden.",
      offline_notice: "Verbindung unterbrochen. Die Plattform läuft im Offline-Modus weiter.",
      online_restored: "Verbindung wiederhergestellt. Daten erfolgreich synchronisiert."
    },
    cookie: {
      title: "Datenschutz & Cookie-Einstellungen",
      message: "Wir verwenden ausschließlich technisch notwendige Cookies für barrierefreie Navigation und anonymisierte Reichweitenmessung.",
      accept: "Alle Akzeptieren",
      decline: "Nur Notwendige",
      preferences: "Einstellungen"
    },
    lang_name: "Deutsch"
  },
  'ja-JP': {
    nav: {
      home: "ホーム",
      about: "当団体について",
      projects: "活動プログラム",
      impact: "活動成果",
      companies: "企業・ESG連携",
      volunteer: "ボランティア",
      transparency: "情報公開",
      blog: "活動ブログ",
      contact: "お問い合わせ",
      donate: "今すぐ寄付する",
      faq: "よくあるご質問"
    },
    search: {
      placeholder: "サイト内を検索 (Ctrl+K)...",
      modal_title: "ノヴァ・エスペランサ研究所 サイト内検索",
      input_aria: "全体検索入力欄",
      no_results: "該当する結果が見つかりませんでした：",
      hint: "「教育」「栄養支援」「寄付」などのキーワードでお試しください。",
      nav_hint: "操作方法：↑ ↓ キーで移動 • Enter で選択",
      esc_close: "Esc キーで閉じる",
      categories: {
        projects: "活動プログラム",
        blog: "ブログ・最新記事",
        transparency: "情報公開・財務諸表",
        donations: "寄付・支援方法",
        faq: "よくあるご質問"
      }
    },
    a11y: {
      tools: "アクセシビリティ設定",
      font_decrease: "文字サイズを小さく (A-)",
      font_default: "標準文字サイズ (A)",
      font_increase: "文字サイズを大きく (A+)",
      high_contrast: "ハイコントラスト表示",
      dark_mode: "ダークモード表示",
      dyslexia_font: "読みやすい支援フォント",
      underline_links: "リンクの下線強調",
      reset: "設定を初期化",
      shortcuts_hint: "ショートカット：Alt+1 本文へ | Alt+2 メニュー | Alt+C コントラスト | Ctrl+K 検索"
    },
    skip: {
      content: "メインコンテンツへスキップ",
      nav: "主要ナビゲーションへスキップ",
      footer: "フッター情報へスキップ"
    },
    footer: {
      mission_summary: "ブラジル首都圏周縁部における包括的教育、食料安全保障、職業訓練を通じた持続的な社会変革を推進しています。",
      col_institutional: "団体情報",
      col_programs: "活動分野",
      col_support: "ご支援方法",
      col_contact: "お問い合わせ",
      rights: "© 2026 ノヴァ・エスペランサ研究所. All rights reserved.",
      privacy: "プライバシーポリシー",
      cookies: "Cookie設定",
      accessibility: "アクセシビリティ方針",
      governance: "ガバナンス・定款",
      address_short: "ヴァウパライゾ・デ・ゴイアス (首都連邦直轄区近郊)"
    },
    states: {
      loading: "情報を読み込んでいます...",
      error_title: "データを読み込めませんでした",
      error_desc: "一時的な通信エラーが発生しました。接続を確認のうえ、再試行してください。",
      empty_title: "該当する項目が見つかりませんでした",
      empty_desc: "検索条件を変更するか、より一般的な語句でお試しください。",
      offline_title: "オフライン動作中",
      offline_desc: "インターネット未接続です。保存されている安全なキャッシュデータを表示しています。",
      btn_retry: "再読み込み",
      btn_clear_filters: "条件をクリア"
    },
    toast: {
      link_copied: "リンクをクリップボードにコピーしました！",
      form_success: "お問い合わせを受け付けました。担当者より折り返しご連絡いたします。",
      form_error: "必須項目をご確認のうえ、再度送信してください。",
      offline_notice: "通信が切断されました。オフラインモードで継続利用可能です。",
      online_restored: "通信が復旧しました。最新データを同期しました。"
    },
    cookie: {
      title: "プライバシーとCookieポリシー",
      message: "当サイトでは、快適な閲覧、アクセシビリティの向上、および匿名アクセス解析のために必要なCookieを使用しています。",
      accept: "すべて同意",
      decline: "必要最小限のみ",
      preferences: "設定詳細"
    },
    lang_name: "日本語"
  }
};

// Writes module files
function saveModule(moduleName, dataMap) {
  LANGUAGES.forEach(lang => {
    const dir = path.join(LANG_DIR, lang);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const filePath = path.join(dir, `${moduleName}.json`);
    fs.writeFileSync(filePath, JSON.stringify(dataMap[lang], null, 2), 'utf8');
    console.log(`✓ Gravado: lang/${lang}/${moduleName}.json`);
  });
}

saveModule('common', common);
console.log('Módulo common gravado com sucesso para os 6 idiomas.');
