"use client";
import { useRef, useState } from "react";
import { LazyMotion, m, useReducedMotion } from "motion/react";
const loadFeatures = () => import("./motion-features").then(module=>module.default);
import {
  ArrowDown,
  ArrowUpRight,
  ShoppingBag,
  Plus,
  Minus,
  X,
  Menu,
  Check,
  ArrowRight,
  Coffee,
} from "lucide-react";
import { products, categories, money, type Category } from "@/data/menu";
import { CoffeeArt } from "./coffee-art";
export function Storefront() {
  const [category, setCategory] = useState<Category>("All");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobile, setMobile] = useState(false);
  const [receipt, setReceipt] = useState<{
    total: number;
    count: number;
  } | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const reduced = useReducedMotion();
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce(
    (sum, p) => sum + p.price * (cart[p.id] || 0),
    0,
  );
  const visible = products.filter(
    (p) => category === "All" || p.category === category,
  );
  function add(id: string) {
    setReceipt(null);
    setCart((prev) => ({ ...prev, [id]: Math.min((prev[id] || 0) + 1, 20) }));
  }
  function subtract(id: string) {
    setCart((prev) => {
      const next = { ...prev };
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }
  function checkout() {
    if (!count) return;
    setReceipt({ total, count });
    setCart({});
  }
  return (
    <LazyMotion features={loadFeatures}>
      <div className="demo-banner">
        CONCEPT / DEMO PROJECT <span>·</span> A fictional coffee shop. No real
        orders or payments.
      </div>
      <header className="brew-header shell">
        <a className="wordmark" href="#home">
          brew<span>&</span>co<span className="wordmark-dot">.</span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#menu">The menu</a>
          <a href="#story">Our story</a>
          <a href="#visit">Visit us</a>
        </nav>
        <div className="header-actions">
          <button
            className="cart-toggle"
            onClick={() => dialog.current?.showModal()}
            aria-label={`Open bag, ${count} items`}
          >
            <ShoppingBag size={18} />
            <span>Bag</span>
            <b>{count}</b>
          </button>
          <button
            className="mobile-toggle"
            aria-expanded={mobile}
            aria-controls="mobile-menu"
            aria-label={mobile ? "Close navigation" : "Open navigation"}
            onClick={() => setMobile(!mobile)}
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
        {mobile && (
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[
              ["The menu", "menu"],
              ["Our story", "story"],
              ["Visit us", "visit"],
            ].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMobile(false)}>
                {label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
      </header>
      <main id="main">
        <section className="hero shell" id="home">
          <m.div
            initial={reduced ? false : {y:10}}
            animate={{ y: 0 }}
            transition={{ duration: reduced ? 0 : 0.6 }}
            className="hero-copy"
          >
            <p className="eyebrow">
              <span />
              GOOD COFFEE. GOOD COMPANY.
            </p>
            <h1>
              Your daily pause,
              <br />
              <em>beautifully brewed.</em>
            </h1>
            <p className="hero-sub">
              For the early risers, the daydreamers, and everyone in between. A
              little more care in every cup.
            </p>
            <a className="button dark" href="#menu">
              Find your favourite
              <ArrowUpRight size={18} />
            </a>
            <div className="hero-foot">
              <span className="small-icon">
                <Coffee size={21} />
              </span>
              <p>
                Thoughtfully made.
                <br />
                <strong>Best enjoyed slowly.</strong>
              </p>
            </div>
          </m.div>
          <div className="hero-visual">
            <span className="art-note">THE EVERYDAY, ELEVATED</span>
            <div className="hero-art-wrap">
              <CoffeeArt hero />
            </div>
            <div className="coffee-stamp">
              <span>BREWED WITH</span>
              <Coffee size={23} />
              <span>A LITTLE CARE</span>
            </div>
            <span className="hero-visual-caption">01 / THE FLAT WHITE</span>
            <span className="vertical-caption">A MOMENT WORTH TAKING</span>
          </div>
        </section>
        <div className="values-strip">
          <div className="shell">
            <span>Freshly brewed</span>
            <i>✳</i>
            <span>A slower kind of morning</span>
            <i>✳</i>
            <span>Something for everyone</span>
            <i>✳</i>
            <span>Made with care</span>
          </div>
        </div>
        <section className="menu-section shell section" id="menu">
          <div className="section-head">
            <div>
              <p className="eyebrow">THE GOOD STUFF</p>
              <h2>
                A cup for <em>your kind of day.</em>
              </h2>
            </div>
            <p>
              Familiar favourites. A few new rituals.
              <br />
              All prices are illustrative, in USD.
            </p>
          </div>
          <div className="menu-toolbar">
            <div className="categories" aria-label="Drink categories">
              {categories.map((c) => (
                <button
                  key={c}
                  aria-pressed={category === c}
                  className={category === c ? "active" : ""}
                  onClick={() => setCategory(c)}
                >
                  {c === "All" ? "All favourites" : c}
                </button>
              ))}
            </div>
            <span className="menu-count" role="status">
              {visible.length} favourites
            </span>
          </div>
          <div className="product-grid">
            {visible.map((p) => (
              <m.article
                key={p.id}
                className="product"
                initial={false}
                animate={{ opacity: 1 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <div className={`product-art ${p.art}`}>
                  {p.label && <span className="product-label">{p.label}</span>}
                  <CoffeeArt kind={p.art} />
                  <span className="product-category">{p.category}</span>
                </div>
                <div className="product-title">
                  <h3>{p.name}</h3>
                  <span>{money(p.price)}</span>
                </div>
                <p>{p.note}</p>
                <button
                  className="add-button"
                  disabled={(cart[p.id] || 0) >= 20}
                  onClick={() => add(p.id)}
                  aria-label={`${(cart[p.id]||0)>=20?"Maximum 20 in bag":cart[p.id]?`${cart[p.id]} in bag · add another`:"Add to bag"}: ${p.name}`}
                >
                  {(cart[p.id] || 0) >= 20
                    ? "Maximum 20 in bag"
                    : cart[p.id]
                      ? `${cart[p.id]} in bag · add another`
                      : "Add to bag"}
                  <Plus size={16} />
                </button>
              </m.article>
            ))}
          </div>
          <p className="bag-status" role="status" aria-live="polite">
            {count
              ? `${count} ${count === 1 ? "item" : "items"} in your demo bag · ${money(total)}`
              : "Choose something you love. Your bag is ready."}
          </p>
        </section>
        <section className="story-section" id="story">
          <div className="shell story-grid">
            <div className="story-art">
              <CoffeeArt kind="filter" />
              <div className="story-art-type">
                A little
                <br />
                <em>everyday magic.</em>
              </div>
              <span>AN ORIGINAL GRAPHIC, MADE FOR THIS DEMO</span>
            </div>
            <div className="story-copy">
              <p className="eyebrow">THE BREW & CO. IDEA</p>
              <h2>
                More than coffee.
                <br />
                <em>A moment for you.</em>
              </h2>
              <p>
                Brew & Co. is a fictional neighbourhood coffee shop, imagined
                around a simple idea: make the everyday feel a little more
                considered.
              </p>
              <p>
                This working demo brings that idea to life through an editorial
                menu, thoughtful details and a bag that actually works. Pick
                your favourites, adjust your order, and try a demo checkout.
              </p>
              <a className="text-link" href="#menu">
                Make a little time for yourself
                <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="visit-section shell section" id="visit">
          <div>
            <p className="eyebrow">A PLACE IN YOUR IMAGINATION</p>
            <h2>
              Meet you <em>over coffee.</em>
            </h2>
            <p>
              This is a concept café, so there is no physical location.
              <br />
              Explore the menu and enjoy the experience.
            </p>
          </div>
          <div className="contact-card">
            <span className="eyebrow">DEMO CONTACT DETAILS</span>
            <p>hello@brew-co.example</p>
            <p className="contact-note">
              Illustrative address using the reserved .example domain.
              <br />
              No messages or orders are sent.
            </p>
            <a className="text-link" href="#menu">
              Back to the menu
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer className="shell brew-footer">
        <a className="wordmark" href="#home">
          brew<span>&</span>co.
        </a>
        <p>
          A fictional café. A real working demo.
          <br />
          Concept & development by Andranik Harutyunyan.
        </p>
        <a href="#home" className="text-link">
          Back to top
          <ArrowUpRight size={16} />
        </a>
      </footer>
      <dialog
        ref={dialog}
        className="bag-dialog"
        onClose={() => setReceipt(null)}
        aria-labelledby="bag-title"
      >
        <div className="bag-panel">
          <div className="bag-header">
            <div>
              <p className="eyebrow">A LITTLE SOMETHING GOOD</p>
              <h2 id="bag-title">
                Your bag <em>({count})</em>
              </h2>
            </div>
            <button
              className="icon-button"
              aria-label="Close bag"
              onClick={() => dialog.current?.close()}
            >
              <X />
            </button>
          </div>
          <p className="bag-demo">
            Demo only. No payment or real order will be created.
          </p>
          {receipt ? (
            <div className="receipt" role="status">
              <span>
                <Check size={30} />
              </span>
              <h3>Your demo order is ready.</h3>
              <p>
                {receipt.count} {receipt.count === 1 ? "item" : "items"} ·{" "}
                {money(receipt.total)}
              </p>
              <p>
                Nothing was charged, sent or reserved. Thanks for trying Brew &
                Co.
              </p>
              <button
                className="button dark"
                onClick={() => {
                  dialog.current?.close();
                  setReceipt(null);
                }}
              >
                Keep exploring
                <ArrowRight size={18} />
              </button>
            </div>
          ) : count ? (
            <>
              <div className="bag-items">
                {products
                  .filter((p) => cart[p.id])
                  .map((p) => (
                    <article className="bag-item" key={p.id}>
                      <div className="bag-item-art">
                        <CoffeeArt kind={p.art} />
                      </div>
                      <div className="bag-item-details">
                        <h3>{p.name}</h3>
                        <span>{money(p.price)}</span>
                        <div className="quantity">
                          <button
                            onClick={() => subtract(p.id)}
                            aria-label={`Decrease ${p.name} quantity`}
                          >
                            <Minus size={13} />
                          </button>
                          <output aria-label={`${p.name} quantity`}>
                            {cart[p.id]}
                          </output>
                          <button
                            disabled={cart[p.id] >= 20}
                            onClick={() => add(p.id)}
                            aria-label={`Increase ${p.name} quantity`}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <div className="bag-item-end">
                        <strong>{money(p.price * cart[p.id])}</strong>
                        <button
                          onClick={() =>
                            setCart((prev) => {
                              const next = { ...prev };
                              delete next[p.id];
                              return next;
                            })
                          }
                          aria-label={`Remove ${p.name}`}
                        >
                          Remove
                        </button>
                      </div>
                    </article>
                  ))}
              </div>
              <div className="bag-total">
                <span>Total</span>
                <strong>{money(total)}</strong>
              </div>
              <p className="bag-tax">
                Illustrative prices. No delivery, tax calculation or payment
                service.
              </p>
              <button className="button dark checkout" onClick={checkout}>
                Complete demo order
                <ArrowRight size={18} />
              </button>
            </>
          ) : (
            <div className="empty-bag">
              <ShoppingBag size={38} />
              <h3>A little empty. Full of possibility.</h3>
              <p>Your next favourite is on the menu.</p>
              <button
                className="button dark"
                onClick={() => {
                  dialog.current?.close();
                  document
                    .getElementById("menu")
                    ?.scrollIntoView({
                      behavior: reduced ? "instant" : "smooth",
                    });
                }}
              >
                Explore the menu
                <ArrowDown size={18} />
              </button>
            </div>
          )}
        </div>
      </dialog>
    </LazyMotion>
  );
}
