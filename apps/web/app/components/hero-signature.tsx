import { HoverWord } from './hover-word';

export function SignatureWords({ interactive = false }: { interactive?: boolean }) {
  return (
    <>
      <span className="hero-greeting">Hi, I’m</span>
      <span className="name-mask">
        <span className="name-word">{interactive ? <HoverWord text="Mayank" /> : 'Mayank'}</span>
      </span>{' '}
      <span className="name-mask">
        <span className="name-word name-accent">
          {interactive ? <HoverWord text="Gupta." /> : 'Gupta.'}
        </span>
      </span>
    </>
  );
}

export function HeroSignature() {
  return (
    <div className="signature-stage">
      <h1 className="hero-name" aria-label="Hi, I’m Mayank Gupta.">
        <span aria-hidden="true"><SignatureWords interactive /></span>
      </h1>
    </div>
  );
}
