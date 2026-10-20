import Link from "next/link";
export default function NotFound() {
  return (
    <main className="shell section" id="main">
      <p className="eyebrow">404</p>
      <h1>
        A wrong turn.
        <br />
        <em>A fresh start.</em>
      </h1>
      <Link className="button dark" href="/">
        Back to Brew & Co.
      </Link>
    </main>
  );
}
