import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  isRouteErrorResponse,
  useRouteError,
  useNavigationType,
} from 'react-router';
import { ExperienceMotion, ReadingProgress, PageSurface } from './components/experience-motion';
import { useEffect, useRef } from 'react';
import { Header, Footer } from './components/layout';
import { CursorBubble } from './components/cursor-bubble';
import './styles.css';
import './refinements.css';
import './modern.css';
import './polish.css';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0c0f12" />
        <link rel="icon" href="/favicon.svg" />
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{const t=localStorage.getItem('portfolio-theme');if(t==='light')document.documentElement.dataset.theme='light'}catch{}`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
export default function App() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(location.pathname);
  useEffect(() => {
    if (previousPath.current !== location.pathname && navigationType !== 'POP' && !location.hash) {
      document.getElementById('main')?.focus({ preventScroll: true });
    }
    previousPath.current = location.pathname;
  }, [location.pathname, location.hash, navigationType]);
  useEffect(() => {
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
  }, [location.pathname, location.hash]);
  return (
    <ExperienceMotion>
      <ReadingProgress />
      <Header />
      <PageSurface key={location.pathname}>
        <Outlet />
      </PageSurface>
      <Footer />
      <CursorBubble />
    </ExperienceMotion>
  );
}
export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <div className="error-page shell">
      <p className="eyebrow">SOMETHING WENT WRONG</p>
      <h1>
        {isRouteErrorResponse(error) && error.status === 404
          ? 'This page took a different path.'
          : 'A little interruption.'}
      </h1>
      <p>You can still reach me at mayankgupta17may@gmail.com.</p>
      <a className="button" href="/">
        Back to home
      </a>
    </div>
  );
}
