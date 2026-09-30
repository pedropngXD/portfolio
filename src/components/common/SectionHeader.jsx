export default function SectionHeader({ title, subtitle, className = '' }) {
  return (
    <div className={`flex flex-col gap-1.5 w-full items-center text-center sm:items-start sm:text-left ${className}`}>
      <h2
        className="text-xl font-bold tracking-tight"
        style={{ color: 'var(--window-text-primary)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-sm leading-relaxed max-w-3xl"
          style={{ color: 'var(--window-text-secondary)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
