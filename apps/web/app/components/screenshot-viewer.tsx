import { useRef } from 'react';
import { X, Expand } from 'lucide-react';
export function ScreenshotViewer({
  src,
  alt,
  phone = false,
}: {
  src: string;
  alt: string;
  phone?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={`case-image screenshot-trigger ${phone ? 'case-phone' : ''}`}
        onClick={() => dialog.current?.showModal()}
        aria-label={`Expand screenshot: ${alt}`}
      >
        <img src={src} alt={alt} width={1200} height={800} />
        <span className="zoom-badge">
          <Expand size={15} /> Inspect screenshot
        </span>
      </button>
      <dialog
        ref={dialog}
        className="image-dialog"
        aria-label="Project screenshot"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="image-dialog-header">
          <span>{alt}</span>
          <button
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close screenshot"
          >
            <X size={21} />
          </button>
        </div>
        <img src={src} alt={alt} />
      </dialog>
    </>
  );
}
