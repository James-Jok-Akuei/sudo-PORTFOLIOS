import { useParams, Link } from "react-router-dom";
import { useContent, useLang } from "../i18n/LanguageContext.jsx";

// Minimal placeholder for the /work/:slug route so showcase links resolve.
// The full sample page with per-route SEO/OG tags is built in step 4.
export default function WorkSample() {
  const { slug } = useParams();
  const { dir } = useLang();
  const { work, workSample } = useContent();
  const sample = work.items.find((w) => w.slug === slug);
  const rtl = dir === "rtl";

  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-5 py-24 sm:px-8">
      <Link
        to="/"
        className="font-mono text-xs text-text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden="true">{rtl ? "→" : "←"}</span> {workSample.back}
      </Link>

      {sample ? (
        <>
          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {sample.category}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold tracking-tight text-text">
            {sample.title}
          </h1>
          <p className="mt-4 text-text-muted">{sample.summary}</p>
          <p className="mt-10 font-mono text-xs text-text-muted">
            {workSample.comingSoon}
          </p>
        </>
      ) : (
        <>
          <h1 className="mt-10 font-heading text-3xl font-bold text-text">
            {workSample.notFoundTitle}
          </h1>
          <p className="mt-4 text-text-muted">{workSample.notFoundBody}</p>
        </>
      )}
    </div>
  );
}
