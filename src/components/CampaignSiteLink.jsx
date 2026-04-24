import { useState, useRef, useEffect } from 'react';

export default function CampaignSiteLink({ website, websiteEn, websiteFr, style, label = 'Campaign site' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const enUrl = website || websiteEn;

  useEffect(() => {
    if (!open) return;
    function handleOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  if (!enUrl && !websiteFr) return null;

  if (!websiteFr) {
    return (
      <a href={enUrl} target="_blank" rel="noopener noreferrer" style={style}>
        {label}
      </a>
    );
  }

  return (
    <span ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          ...style,
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {label}
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          marginTop: '4px',
          background: 'white',
          border: '1px solid var(--colour-grey-200)',
          borderRadius: '6px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
          minWidth: '140px',
          zIndex: 100,
          overflow: 'hidden',
        }}>
          {enUrl && (
            <a
              href={enUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '8px 14px',
                fontSize: 'var(--text-sm)',
                color: 'var(--colour-grey-800)',
                textDecoration: 'none',
              }}
            >
              English
            </a>
          )}
          <a
            href={websiteFr}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            style={{
              display: 'block',
              padding: '8px 14px',
              fontSize: 'var(--text-sm)',
              color: 'var(--colour-grey-800)',
              textDecoration: 'none',
              borderTop: enUrl ? '1px solid var(--colour-grey-100)' : 'none',
            }}
          >
            Français
          </a>
        </div>
      )}
    </span>
  );
}
