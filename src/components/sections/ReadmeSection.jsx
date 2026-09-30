import { useState, useEffect } from 'react'
import styles from './ReadmeSection.module.css'

const TEXT_DESKTOP_PT = `================================================================================
  README.TXT — BEM-VINDO AO PEDRO OS (v2.0)
  Portfólio Interativo & Experiência Desktop • Pedro Moser
================================================================================

[ DICA DE OURO: EXPERIÊNCIA COMPLETA EM TELA CHEIA (F11) ]
--------------------------------------------------------------------------------
Para ter a experiência completa de um sistema operacional desktop, pressione
a tecla [ F11 ] no seu teclado!

Dessa forma, as barras do seu navegador são ocultadas e o pedroOs ocupa 100% da
sua tela, ativando recursos como:
  • Barra de tarefas dinâmica com auto-hide ao encostar o mouse na borda inferior;
  • Janelas maximizadas ocupando toda a área de trabalho;
  • Transições fluidas e movimentação livre de janelas e ícones.

--------------------------------------------------------------------------------
[ 📱 ACESSO MOBILE: EXPERIÊNCIA DEDICADA ESTILO IPHONE ]
--------------------------------------------------------------------------------
Você sabia que este portfólio possui uma versão mobile completa estilo iOS?

Acesse este mesmo link no seu celular (ou redimensione a janela do seu navegador
para menos de 768px de largura) para vivenciar:
  • Interface mobile com Dock translúcida, Home Indicator e widgets de perfil;
  • Multitarefa fluido no estilo App Switcher do iOS com navegação por abas;
  • Janelas em formato Bottom Sheet modal com gestos táteis e pull-to-dismiss;
  • Filtros deslizáveis com affordance de blur na Stack Técnica.

--------------------------------------------------------------------------------
[ PRINCIPAIS RECURSOS & FUNCIONALIDADES ]
--------------------------------------------------------------------------------

1. ÁREA DE TRABALHO & ÍCONES LIVRES:
   - Você pode arrastar e soltar livremente qualquer ícone pela tela.
   - Clique com o botão direito no papel de parede para:
       * Alinhar todos os ícones à grade automaticamente;
       * Alternar entre Modo Escuro e Modo Claro.

2. GERENCIAMENTO DE JANELAS:
   - Mova as janelas arrastando pela barra de título superior.
   - Redimensione pelas bordas e cantos inferiores.
   - Controle pelas bolinhas superiores:
       * [x] Fechar janela;
       * [-] Minimizar para a barra de tarefas;
       * [+] Maximizar em tela cheia (cobre toda a tela abaixo da barra superior).

3. BARRA DE TAREFAS DINÂMICA (DOCK):
   - Estilo híbrido Windows & macOS.
   - Apps abertos aparecem na barra de tarefas mesmo se não estiverem fixados.
   - Ao fechar uma janela que não estava fixada, ela sai da barra automaticamente.
   - Clique com o botão direito nos ícones da barra para:
       * Fechar janela;
       * Fixar ou Desafixar da barra de tarefas;
       * Restaurar atalhos padrão.
   - Em janelas maximizadas, a barra se recolhe e reaparece ao aproximar o mouse
     da borda inferior da tela.

4. SISTEMA DE ÁUDIO & SONS DO SISTEMA:
   - Feedback sonoro em ações como abrir, fechar e minimizar janelas.
   - Controle de volume, silenciar (mute) e teste de áudio pelo ícone na barra
     de menus superior.

5. BILINGUISMO (PT / EN):
   - Alterne o idioma a qualquer momento clicando no botão PT/EN no canto superior.
   - Todas as janelas, textos e termos do sistema são adaptados em tempo real.

6. CURRÍCULO & PROJETOS NATIVOS:
   - Abra o arquivo "currículo.pdf" para visualizar o documento PDF oficial
     embutido diretamente em uma janela nativa.
   - Explore as seções de Experiência, Stack Técnica, Formação e Projetos.`

const TEXT_DESKTOP_EN = `================================================================================
  README.TXT — WELCOME TO PEDRO OS (v2.0)
  Interactive Portfolio & Desktop Experience • Pedro Moser
================================================================================

[ PRO TIP: FULLSCREEN IMMERSIVE EXPERIENCE (F11) ]
--------------------------------------------------------------------------------
To get the authentic experience of a desktop operating system, press the [ F11 ]
key on your keyboard!

This hides your browser's navigation bars and renders pedroOs across 100% of
your display, unlocking:
  • Dynamic taskbar with auto-hide when hovering the bottom screen edge;
  • Maximized windows covering the full desktop viewport;
  • Fluid window transitions, floating icons, and desktop sound effects.

--------------------------------------------------------------------------------
[ 📱 MOBILE ACCESS: DEDICATED IPHONE / iOS EXPERIENCE ]
--------------------------------------------------------------------------------
Did you know that this portfolio also features a dedicated mobile operating system?

Open this same link on your smartphone (or resize your browser window below 768px)
to discover:
  • Mobile interface featuring frosted glass Dock, Home Indicator, and profile widgets;
  • Multitasking iOS App Switcher with touchable app previews;
  • Modal Bottom Sheet windows with gesture physics and pull-to-dismiss;
  • Touch-friendly swipeable filters in the Tech Stack section.

--------------------------------------------------------------------------------
[ KEY FEATURES & CAPABILITIES ]
--------------------------------------------------------------------------------

1. DESKTOP WORKSPACE & ICONS:
   - Drag and drop any icon anywhere across the desktop.
   - Right-click the desktop wallpaper to:
       * Auto-align all icons to the desktop grid;
       * Switch between Dark Mode and Light Mode.

2. WINDOW MANAGEMENT:
   - Drag windows by their top title bar.
   - Resize from any edge or corner.
   - Window controls:
       * [x] Close window;
       * [-] Minimize to taskbar;
       * [+] Maximize (occupies full screen below top menu bar).

3. DYNAMIC TASKBAR (DOCK):
   - Hybrid Windows & macOS design.
   - Open apps appear in the taskbar even if unpinned.
   - When an unpinned app is closed, it leaves the taskbar automatically.
   - Right-click any app in the dock to:
       * Close window;
       * Pin or Unpin from taskbar;
       * Reset default dock shortcuts.
   - In maximized window mode, the taskbar auto-hides and reveals upon 
     hovering the cursor at the bottom edge of the screen.

4. INTERACTIVE SYSTEM AUDIO:
   - Sound feedback when opening, closing, or minimizing windows.
   - Speaker control in the top MenuBar to adjust volume, mute, or test audio.

5. BILINGUAL SUPPORT (PT / EN):
   - Switch language anytime by clicking the PT / EN toggle in the top bar.
   - All windows, sections, and system texts update instantly.

6. NATIVE RESUME & PROJECTS:
   - Open "resume.pdf" to inspect the official PDF document embedded directly.
   - Browse Experience, Tech Stack, Education, and live interactive projects.`

const TEXT_MOBILE_PT = `================================================================================
  README.TXT — BEM-VINDO AO PEDRO OS MOBILE (v2.0)
  Experiência Nativa Estilo iOS / iPhone • Pedro Moser
================================================================================

[ 💻 DICA DE OURO: ACESSE NO COMPUTADOR PARA O SO DESKTOP! ]
--------------------------------------------------------------------------------
Você sabia que este portfólio possui uma experiência completa de Sistema
Operacional Desktop projetada para computadores e notebooks?

Acesse este mesmo link no seu computador para desbloquear:
  • Janelas flutuantes com controles reais (minimizar, maximizar, redimensionar
    e arrastar livremente pela tela);
  • Modo Imersivo F11 em tela cheia com barra de tarefas oculta dinâmica;
  • Área de trabalho livre com ícones arrastáveis e alinhamento à grade;
  • Efeitos sonoros reais de sistema (abertura, fechamento e minimização);
  • Barra de menus superior com relógio, conectividade e controle de áudio.

--------------------------------------------------------------------------------
[ GUIA DE RECURSOS & FUNCIONALIDADES DO MODELO MOBILE ]
--------------------------------------------------------------------------------

1. TELA INICIAL (HOME SCREEN):
   - Grid de aplicativos com ícones responsivos e cores sincronizadas com o
     interior de cada aplicativo.
   - Widget de Perfil interativo no topo com foto, curso na Unisinos, status de
     disponibilidade e cargo atual.
   - Dock inferior flutuante em vidro fosco (frosted glass) com atalhos para:
       * GitHub;
       * LinkedIn;
       * E-mail profissional (com cópia direta para a área de transferência);
       * Alternador de idioma (PT / EN).

2. MULTITAREFA & APP SWITCHER (ESTILO iOS):
   - Toque na barra branca inferior (Home Indicator) na tela inicial ou na base
     dos apps para abrir o alternador de multitarefa.
   - Navegação por carrossel horizontal fluido com prévia interativa de cada app.
   - Arraste um card para cima para fechá-lo individualmente.
   - Toque no botão "Limpar Tudo" para fechar todas as abas abertas de uma só vez.

3. NAVEGAÇÃO & GESTOS NOS APPS (BOTTOM SHEET):
   - Janelas abrem no formato de gaveta modal nativa (Bottom Sheet).
   - Rolagem vertical 100% suave com aceleração e inércia do navegador mobile.
   - Deslize o dedo para baixo a partir do topo do app para fechar por gesto
     (Pull-to-Dismiss), ou utilize o botão superior "Voltar".
   - Barra Home Indicator fixa na base para retornar à tela inicial com um toque.

4. SEÇÃO STACK TÉCNICA OTIMIZADA:
   - Carrossel de filtros por categoria com rolagem horizontal tátil e efeito
     de desvanecimento suave (blur) indicando a continuidade do conteúdo.

5. STATUS CHECK — TELEMETRIA EM TEMPO REAL:
   - Dashboard com status de saúde de serviços em nuvem e IA.
   - Botão direto de "Abrir no Navegador" para interagir com o app em tela inteira.

6. BILINGUISMO & TEMA:
   - Alterne entre Português e Inglês com um toque no ícone de tradução da Dock.
   - Suporte completo a Modo Escuro e Modo Claro com contraste e legibilidade.`

const TEXT_MOBILE_EN = `================================================================================
  README.TXT — WELCOME TO PEDRO OS MOBILE (v2.0)
  Native iOS / iPhone Style Experience • Pedro Moser
================================================================================

[ 💻 PRO TIP: EXPERIENCE THE FULL DESKTOP OPERATING SYSTEM! ]
--------------------------------------------------------------------------------
Did you know that this portfolio features an authentic, fully functional
Desktop Operating System designed specifically for computers and laptops?

Open this same link on your desktop or laptop computer to unlock:
  • Floating windows with genuine OS controls (minimize, maximize, resize,
    and drag freely anywhere across the desktop);
  • Fullscreen Immersive Mode (F11) with dynamic auto-hiding taskbar;
  • Freeform desktop workspace with draggable icons and automatic grid alignment;
  • Interactive system audio feedback (window open, close, and minimize sounds);
  • Top MenuBar with live clock, network status, and master volume controls.

--------------------------------------------------------------------------------
[ MOBILE MODEL FEATURES & NAVIGATION GUIDE ]
--------------------------------------------------------------------------------

1. HOME SCREEN:
   - Grid of application icons with colors matching each app's internal palette.
   - Interactive Profile Widget at the top featuring avatar, degree at Unisinos,
     availability status, and current role.
   - Frosted glass bottom Dock with quick actions:
       * GitHub;
       * LinkedIn;
       * Professional Email (copies directly to clipboard on tap);
       * Language toggle (EN / PT).

2. MULTITASKING & APP SWITCHER (iOS STYLE):
   - Tap the white Home Indicator bar at the bottom to open the Multitask
     App Switcher.
   - Smooth horizontal swipe navigation with live preview of each open app.
   - Swipe any card upward to close it individually.
   - Tap "Clear All" to close all active background apps at once.

3. IN-APP NAVIGATION & GESTURES (BOTTOM SHEET):
   - Apps launch as native modal bottom sheets.
   - Buttery smooth vertical scrolling with native hardware-accelerated momentum.
   - Pull down firmly from the top of the app to dismiss via gesture, or tap
     the top "Back" button.
   - Dedicated Home Indicator bar anchored at the bottom to return home instantly.

4. SWIPEABLE TECH STACK SECTION:
   - Category filter tabs feature smooth touch-scrolling with an elegant blur
     gradient affordance indicating more options to swipe.

5. STATUS CHECK — REAL-TIME TELEMETRY:
   - Live health dashboard for major AI services and cloud platforms.
   - Convenient "Open in Browser" button to launch the telemetry tool directly.

6. BILINGUAL & THEME SUPPORT:
   - Switch between English and Portuguese with a single tap in the Dock.
   - Full Dark Mode and Light Mode support with optimized contrast.`

export default function ReadmeSection({ t, isMobile: isMobileProp }) {
  const [isMobileScreen, setIsMobileScreen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
    }
    return false
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = isMobileProp !== undefined ? isMobileProp : isMobileScreen
  const isEn = t?.system?.langLabel === 'EN'

  let textContent
  if (isMobile) {
    textContent = isEn ? TEXT_MOBILE_EN : TEXT_MOBILE_PT
  } else {
    textContent = isEn ? TEXT_DESKTOP_EN : TEXT_DESKTOP_PT
  }

  return (
    <div className={styles.container}>
      <pre className={styles.notepadBody}>
        {textContent}
      </pre>
    </div>
  )
}
