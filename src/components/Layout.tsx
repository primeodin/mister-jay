import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { isMuted, toggleMute } from '../lib/audio';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [muted, setMutedState] = useState(isMuted);
  const location = useLocation();
  const isHome = location.pathname === '/';

  function handleMute() {
    setMutedState(toggleMute());
  }

  return (
    <div className={`app${isHome ? ' app--home' : ''}`}>
      <div className="film-grain" aria-hidden="true" />
      <header className="hud-header">
        <Link to="/" className="hud-brand">
          <span className="hud-brand-mark" aria-hidden="true">MJ</span>
          <div>
            <span className="hud-brand-name">Mister Jay</span>
            <span className="hud-brand-sub stamp">FOR JAY</span>
          </div>
        </Link>
        <button
          type="button"
          className="hud-mute"
          onClick={handleMute}
          aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
        >
          {muted ? '🔇' : '🔊'}
        </button>
      </header>
      <main className="main">{children}</main>
      <footer className="hud-footer stamp">
        QUIET DEDICATION — SHOP SKILLS PASSED DOWN
      </footer>
    </div>
  );
}
