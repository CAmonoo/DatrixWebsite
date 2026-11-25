"use client";

import React from "react";
import { OTHER_PRODUCTS, type Product } from "./data";

export function OurProducts({ routeKey, navigate }: { routeKey: string; navigate: (to: string) => void }) {
  const products = OTHER_PRODUCTS[routeKey];
  if (!products) return null;
  return (
    <section className="our-products">
      <div className="container pt-5 pb-5">
        <h3 className="mainHeading3 text-center colorWhite mb-5">
          Explore the Rest of Our Products
        </h3>
        <div className="row mt-5">
          {products.map((p: Product) => (
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4" key={p.title}>
              <a
                className="product product-link row"
                href={`#${p.slug}`}
                aria-label={`Explore ${p.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(p.slug);
                }}
              >
                <div className="col p0">
                  <img src={p.packImg} alt={p.title} />
                </div>
                <div className="col productDetails">
                  <div className="position-relative">
                    <h2 className="mainHeading2 colorWhite">{p.title}</h2>
                    <p>{p.desc}</p>
                    <span
                      className={`request-btn ${p.className}`}
                      aria-hidden="true"
                    >
                      <span className="fa-arrow-right"></span>
                    </span>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Footer({ navigate }: { navigate: (to: string) => void }) {
  const go = (to: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };
  return (
    <footer className="home-footer datrix-footer">
      <div className="container">
        <div className="datrix-footer-main">
          <div className="datrix-footer-brand">
            <a
              href="#/"
              onClick={go("/")}
              aria-label="Datrix Tech Solutions - Home"
              className="datrix-footer-logo"
            >
              <img
                src="/assets/img/datrix-logo-white.png"
                alt="Datrix Tech Solutions"
              />
            </a>
            <p>
              Intelligent software for ambitious businesses.
            </p>
          </div>

          <section className="datrix-footer-location" aria-labelledby="footer-location-title">
            <h2 id="footer-location-title">Locate Us</h2>
            <p>Head Office: 6 ARS Avenue, Ogbojo</p>
            East-Legon, Accra
            Ghana
          </section>

          <section className="datrix-footer-contact" aria-labelledby="footer-contact-title">
            <h2 id="footer-contact-title">Get in touch</h2>
            <p>Have a business challenge to solve? Let’s talk.</p>
            <a href="mailto:info@datrixtechsolutions.com">
              info@datrixtechsolutions.com
            </a>
            <a className="datrix-footer-contact-link" href="#/contact-us" onClick={go("/contact-us")}>
              Contact our team <span aria-hidden="true">↗</span>
            </a>
          </section>

          <nav className="datrix-footer-links" aria-label="Footer navigation">
            <h2>Links</h2>
            <a href="#/" onClick={go("/")}>Home</a>
            <a href="#/#services" onClick={go("/#services")}>Our Products</a>
            <a href="#/blog" onClick={go("/blog")}>Blog</a>
            <a href="#/contact-us" onClick={go("/contact-us")}>Contact</a>
          </nav>
        </div>

        <div className="datrix-footer-bottom">
          <p>
            Datrix Tech Solutions © {new Date().getFullYear()}. All Rights
            Reserved.
          </p>
          <nav aria-label="Legal links">
            <a href="#/privacy" onClick={go("/privacy")}>Privacy Policy</a>
            <a href="#/terms" onClick={go("/terms")}>Terms of Service</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
