import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app">
      <header className="header">
        <Link to="/" className="header-brand">
          <span className="header-icon" aria-hidden="true">🔧</span>
          <div>
            <h1 className="header-title">Mister Jay</h1>
            <p className="header-tagline">For Jay</p>
          </div>
        </Link>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>Quiet dedication — shop skills passed down.</p>
      </footer>
    </div>
  );
}
