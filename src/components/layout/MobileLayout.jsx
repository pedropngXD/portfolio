import React from 'react'
import MobilePlaceholder from '../MobilePlaceholder'

/**
 * Layout da Versão Mobile do Portfólio
 * Estruturado para permitir a adição gradual de novos apps móveis no futuro
 */
export default function MobileLayout({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onNotify,
  t
}) {
  return (
    <div className="w-full min-h-screen min-h-[100dvh] flex flex-col">
      {/* Componente atual: Aviso de sistema em construção e contatos */}
      <MobilePlaceholder
        lang={lang}
        onToggleLang={onToggleLang}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onNotify={onNotify}
        t={t}
      />
    </div>
  )
}
