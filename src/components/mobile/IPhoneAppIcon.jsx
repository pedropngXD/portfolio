/**
 * IPhoneAppIcon.jsx
 * Componente dedicado que renderiza os gráficos nativos de ícones no estilo oficial iOS / iPhone.
 * Inclui os detalhes e silhuetas que tornam cada app instantaneamente reconhecível no ecossistema Apple:
 * - Notas (Apple Notes): Bloco de notas pautado com cabeçalho amarelo âmbar.
 * - Arquivos / PDF (Apple Files): Documento branco com dobra superior (dog-ear) e tag vermelha.
 * - Contatos (Apple Contacts): Livro de contatos com silhueta humana e marcadores alfabéticos A/B/C/D.
 * - Stack / Ajustes: Processador Apple Silicon com barramento de pinos e símbolo de código < / >.
 * - Carteira / Experiência: Cartões sobrepostos com tarja magnética e chip EMV dourado.
 * - Formação: Capelo de formatura acadêmico com cordão e borla dourada.
 * - App Store (Projetos): A clássica interseção de instrumentos artesanais (régua, pincel e lápis) formando a letra 'A'.
 * - Saúde (Status Check): Onda eletrocardiograma (ECG) neon verde com brilho e batimento cardíaco.
 */

export default function IPhoneAppIcon({ appId, size = 32 }) {
  switch (appId) {
    case 'readme':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Folha de anotações com cantos arredondados e sombra suave */}
          <rect
            x="7"
            y="4"
            width="22"
            height="28"
            rx="3.5"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.18))"
          />
          {/* Cabeçalho amarelo âmbar clássico do Apple Notes */}
          <path
            d="M7 7.5a3.5 3.5 0 0 1 3.5-3.5h15a3.5 3.5 0 0 1 3.5 3.5V11H7V7.5z"
            fill="#f59e0b"
          />
          {/* Linhas pautadas horizontais do caderno */}
          <line
            x1="11"
            y1="16"
            x2="25"
            y2="16"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.75"
          />
          <line
            x1="11"
            y1="21"
            x2="25"
            y2="21"
            stroke="#cbd5e1"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="11"
            y1="26"
            x2="19"
            y2="26"
            stroke="#cbd5e1"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'resume':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Folha branca com o canto superior direito dobrado estilo Adobe / Files */}
          <path
            d="M9 5a3 3 0 0 1 3-3h9l7 7v20a3 3 0 0 1-3 3H12a3 3 0 0 1-3-3V5z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />
          {/* Aba dobrada com sombreamento de relevo */}
          <path d="M21 2v5a2 2 0 0 0 2 2h5" fill="#e2e8f0" />
          {/* Linhas e indicador do documento */}
          <rect x="13" y="14" width="8" height="2.5" rx="1.25" fill="#ef4444" />
          <line
            x1="13"
            y1="20"
            x2="23"
            y2="20"
            stroke="#94a3b8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <line
            x1="13"
            y1="24.5"
            x2="23"
            y2="24.5"
            stroke="#cbd5e1"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      )

    case 'about':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Abas laterais de índice alfabético (A, B, C, D) como no app Contatos do iOS */}
          <rect x="27.5" y="8" width="2.5" height="3.5" rx="1" fill="#ff453a" />
          <rect x="27.5" y="13" width="2.5" height="3.5" rx="1" fill="#ffd60a" />
          <rect x="27.5" y="18" width="2.5" height="3.5" rx="1" fill="#30d158" />
          <rect x="27.5" y="23" width="2.5" height="3.5" rx="1" fill="#0a84ff" />

          {/* Silhueta humana centralizada em branco */}
          <circle
            cx="17"
            cy="13.5"
            r="4.8"
            fill="#ffffff"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          />
          <path
            d="M9.5 27.5c0-4.2 3.4-7.5 7.5-7.5s7.5 3.3 7.5 7.5"
            fill="#ffffff"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          />
        </svg>
      )

    case 'stack':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Pinos conectores externos do barramento */}
          <line x1="13" y1="3" x2="13" y2="7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="18" y1="3" x2="18" y2="7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="23" y1="3" x2="23" y2="7" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

          <line x1="13" y1="29" x2="13" y2="33" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="18" y1="29" x2="18" y2="33" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="23" y1="29" x2="23" y2="33" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

          <line x1="3" y1="13" x2="7" y2="13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="3" y1="18" x2="7" y2="18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="3" y1="23" x2="7" y2="23" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

          <line x1="29" y1="13" x2="33" y2="13" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="29" y1="18" x2="33" y2="18" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
          <line x1="29" y1="23" x2="33" y2="23" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

          {/* Encapsulamento cerâmico do chip */}
          <rect x="7" y="7" width="22" height="22" rx="4" fill="rgba(255,255,255,0.22)" stroke="#ffffff" strokeWidth="1.5" />
          {/* Núcleo de processamento interno */}
          <rect x="11.5" y="11.5" width="13" height="13" rx="2.5" fill="#ffffff" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          {/* Símbolo de código < / > gravado no silício */}
          <path
            d="M15 16l-2 2 2 2M21 16l2 2-2 2M19 15l-2 6"
            stroke="#059669"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )

    case 'experience':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Cartão de fundo sobreposto estilo Apple Wallet */}
          <rect x="8" y="7" width="20" height="13" rx="2.5" fill="#34d399" opacity="0.85" />
          {/* Cartão frontal principal */}
          <rect
            x="5.5"
            y="12"
            width="25"
            height="17"
            rx="3"
            fill="#ffffff"
            filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))"
          />
          {/* Tarja de segurança superior */}
          <rect x="5.5" y="15" width="25" height="3" fill="#0284c7" opacity="0.85" />
          {/* Chip EMV de pagamento dourado */}
          <rect x="8.5" y="21" width="4.5" height="3.5" rx="0.8" fill="#f59e0b" />
          {/* Linhas elegantes de relevo */}
          <line x1="16" y1="22.5" x2="26" y2="22.5" stroke="#94a3b8" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      )

    case 'contact':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Losango superior do capelo acadêmico */}
          <polygon
            points="18,7 32,14 18,21 4,14"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />
          {/* Arco inferior da touca de formatura */}
          <path
            d="M10 18v5.5c0 3.5 3.5 6 8 6s8-2.5 8-6V18"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Cordão e borla de honra dourada */}
          <path d="M29 15.5v8" stroke="#fef08a" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="29" cy="24.5" r="1.5" fill="#fef08a" />
        </svg>
      )

    case 'projects':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* O icônico símbolo 'A' da Apple App Store formado pelo cruzamento de instrumentos */}
          {/* Haste esquerda (régua) */}
          <line
            x1="11"
            y1="28"
            x2="24"
            y2="8"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          />
          {/* Haste direita (lápis) */}
          <line
            x1="25"
            y1="28"
            x2="12"
            y2="8"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          />
          {/* Barra horizontal cruzada (pincel) */}
          <line
            x1="9"
            y1="21"
            x2="27"
            y2="21"
            stroke="#ffffff"
            strokeWidth="3.2"
            strokeLinecap="round"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.2))"
          />
        </svg>
      )

    case 'status-check':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Linha eletrocardiograma (ECG) neon estilo Apple Health */}
          <path
            d="M5 18h6l2.5-7 5 14 4-10 2.5 5.5 2-2.5H31"
            fill="none"
            stroke="#30d158"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="drop-shadow(0 0 5px rgba(48,209,88,0.85))"
          />
        </svg>
      )

    case 'github':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          <path
            d="M18 7a11 11 0 0 0-3.48 21.43c.55.1.75-.24.75-.53v-1.87c-3.06.66-3.7-1.48-3.7-1.48-.5-1.28-1.22-1.62-1.22-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.03 1.13a10.5 10.5 0 0 1 5.52 0c2.1-1.43 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.22-2.57 5.15-5.02 5.42.39.34.74 1 .74 2.03v3.01c0 .3.2.64.76.53A11 11 0 0 0 18 7z"
            fill="#ffffff"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
          />
        </svg>
      )

    case 'linkedin':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* O clássico 'in' do LinkedIn com tipografia e sombra suave */}
          <circle cx="10.5" cy="11.5" r="2.2" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.25))" />
          <rect x="8.5" y="15.5" width="4" height="11.5" rx="1.2" fill="#ffffff" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.25))" />
          <path
            d="M15 15.5h3.8v1.8h.1c.5-1 1.9-2.1 3.9-2.1 4.1 0 4.9 2.7 4.9 6.2V27h-4v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V27H15V15.5z"
            fill="#ffffff"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.25))"
          />
        </svg>
      )

    case 'email':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Envelope Apple Mail em relevo branco */}
          <rect
            x="6"
            y="9.5"
            width="24"
            height="17"
            rx="3.5"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))"
          />
          {/* Aba do envelope */}
          <path
            d="M7 11.5l10.2 7.2a1.5 1.5 0 0 0 1.6 0L29 11.5"
            stroke="#0a84ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="7.5" y1="24.5" x2="13.5" y2="18.5" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="28.5" y1="24.5" x2="22.5" y2="18.5" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )

    case 'settings-translate':
    case 'translate':
      return (
        <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
          {/* Balão 1: Letra 'A' */}
          <path
            d="M6 8h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-3l-4 3.5V22H6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z"
            fill="#ffffff"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
          />
          {/* Letra A estilizada dentro do balão */}
          <path
            d="M10 18l2.5-6h1L16 18h-1.3l-.7-1.8h-2.9L10.4 18H10zm2-3.1h2.1l-1-2.7h-.1l-1 2.7z"
            fill="#007aff"
          />

          {/* Balão 2 sobreposto: Tradução '文' / Idioma */}
          <path
            d="M18 13h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-2v3.5l-4-3.5h-6a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3z"
            fill="#38bdf8"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
          />
          {/* Caractere 文 (Universal de tradução) */}
          <path
            d="M22 17h6M25 15.5v1.8M24.8 19.5c-1 1.6-2.2 2.7-3.8 3.3M24.2 20.2c.8.8 2 2.1 3.6 2.6"
            stroke="#ffffff"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      )

    default:
      return null
  }
}
