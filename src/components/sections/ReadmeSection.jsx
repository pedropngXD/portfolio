import styles from './ReadmeSection.module.css'

const TEXT_PT = `================================================================================
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

const TEXT_EN = `================================================================================
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

export default function ReadmeSection({ t }) {
  const isEn = t?.system?.langLabel === 'EN'
  const textContent = isEn ? TEXT_EN : TEXT_PT
  const lineCount = textContent.split('\n').length

  return (
    <div className={styles.container}>
      {/* Conteúdo de Texto Puro (TXT) */}
      <pre className={styles.notepadBody}>
        {textContent}
      </pre>
    </div>
  )
}
