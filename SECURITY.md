# Release security

This fictional café has no accounts, payment processing, order delivery or server-side submission. The bag lives in memory. No secrets or environment variables are required.

The ignore files exclude environment files, tokens, private keys, certificates, keystores, dependency folders, build outputs and Vercel state. Run npm audit, typecheck, lint and production build before publication; see QA.md for actual results.

The app sets nosniff, DENY framing, a strict referrer policy and restrictive browser permission headers. Publish only after explicit owner approval. Automated scans do not guarantee the absence of all possible issues.
