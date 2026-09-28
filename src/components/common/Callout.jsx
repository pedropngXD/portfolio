import React from 'react'

export default function Callout({
  icon = '💡',
  borderColor = 'var(--accent-stack)',
  bgColor = 'rgba(16, 185, 129, 0.08)',
  children,
  className = ''
}) {
  return (
    <div
      className={`flex items-center gap-2.5 p-3 rounded-lg border-l-3 text-xs w-full leading-relaxed ${className}`}
      style={{
        background: bgColor,
        borderLeftColor: borderColor,
        color: 'var(--window-text-secondary)'
      }}
    >
      {icon && (
        <span aria-hidden="true" className="text-sm shrink-0">
          {icon}
        </span>
      )}
      <div className="flex-1">{children}</div>
    </div>
  )
}
