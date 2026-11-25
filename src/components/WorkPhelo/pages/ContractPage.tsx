"use client";

import React from "react";
import ParticleField from "./../ParticleField";
import { ProductTestimonialSlider, ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const FEATURES_GRID = [
  {
    img: "feature-tailored.svg",
    title: "Built Around Your Workflows",
    text: "We study how your business operates and build software around your processes, never the other way around. Every screen, field and report reflects your real workflows, helping your team work the way they know best, only faster and with fewer errors.",
  },
  {
    img: "feature-integration.svg",
    title: "Effortless Integrations",
    text: "Link your new software to the tools you already count on — Financials, HRMS, CRM, payment gateways and third-party APIs. Information moves across your organisation on its own, ending double capture and the errors it breeds.",
  },
  {
    img: "feature-scalable.svg",
    title: "Grows As You Do",
    text: "Start with the essentials and add modules as your business grows. The modular architecture allows new features to integrate seamlessly without disrupting existing operations. Your software investment grows with your business, never against it.",
  },
  {
    img: "feature-security.svg",
    title: "Enterprise-Grade Security",
    text: "Role-based access, encryption and complete audit trails shield your business information at every layer. Choose cloud or on-premises deployment, with hosting partners picked for security, uptime and cost efficiency.",
  },
  {
    img: "feature-web-mobile.svg",
    title: "Web & Mobile Ready",
    text: "With responsive web and mobile apps, your team can work from the office, the field or home, using any device. Approve requests, capture data and monitor business operations wherever the day takes you.",
  },
  {
    img: "feature-analytics.svg",
    title: "Analytics & Reporting",
    text: "Dashboards and bespoke reports transform raw business data into clear, actionable insights, giving management a clear view of performance, trends and outliers. Decisions are based on facts, not guesswork.",
  },
  {
    img: "feature-support.svg",
    title: "Dedicated Support",
    text: "A dedicated build-and-support team stays by your side long after launch, training staff, answering questions and evolving the system as your needs change. You’re never left to navigate your software alone.",
  },
  {
    img: "feature-ownership.svg",
    title: "Complete Ownership",
    text: "The software belongs to you outright, including source code, documentation, data and licences, with no per-user lock-in. Your asset, your rules, your edge in the market.",
  },
];

const OFFERS = [
  "A solution moulded precisely to your business processes, without generic features you pay for but never use.",
  "A single trusted partner from idea to launch. Datrix handles analysis, design, development, testing and deployment entirely in-house.",
  "You retain full ownership of the software, including source code, documentation and data, with no per-user lock-in or vendor dependence.",
  "Seamless integration with the systems you already trust, including accounting, payroll, payment gateways and third-party APIs.",
  "Deploy in the cloud or on-premises. Datrix works with secure hosting providers to reduce costs and ease the workload on your IT team."
];

export default function ContractPage({
  onRequestDemo,
}: {
  onRequestDemo: () => void;
}) {
  const scrollTo = (hash: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(hash.replace("#", ""));
    if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
  };

  return (
    <div className="wrapper">
      <div className="sidebar-navbar">
        <ul className="nav">
          <li>
            <a href="#clients" onClick={scrollTo("#clients")}>Clients</a>
          </li>
          <li>
            <a href="#testimonials" onClick={scrollTo("#testimonials")}>Testimonials</a>
          </li>
          <li>
            <a href="#pricing" onClick={scrollTo("#pricing")}>Pricing</a>
          </li>
          <li>
            <a href="#features" onClick={scrollTo("#features")}>Features</a>
          </li>
        </ul>
      </div>

      <section className="financial-banner vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="WorkPhelo-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              Customized Software,
              <br />
              Made Around You.
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
            <ul className="contract-intro-points ml-4">
              {[
                "Shaped To Your Workflows",
                "Web & Mobile Applications",
                "Effortless Integrations",
                "Grows With You, Securely",
              ].map((p) => (
                <li key={p}>
                  <span className="fa-check"></span>
                  {p}
                </li>
              ))}
            </ul>
            <a
              href="#"
              className="request-btn ghost big"
              onClick={(e) => {
                e.preventDefault();
                onRequestDemo();
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </section>

      <section className="overview sectionPadding bgGray">
        <div className="container">
          <div className="row mb-5">
            <div className="col-sm-12 col-md-12">
              <h2 className="text-center">Why Datrix Customized Software?</h2>
              <p>
                Off-the-shelf packages expect your business to bend to their way of working. Datrix Customized Software flips that around. 
                We design and build solutions around your real workflows, letting your team stick to what it does best while moving faster and making fewer mistakes. 
                From the opening workshop to the final handover, our analysts and engineers chart your processes, confirm every detail with you and turn them into a secure, scalable application your staff will genuinely enjoy using. 
                Because it’s built to fit, training shrinks to almost nothing and adoption happens naturally. And as the business expands, the same platform expands alongside it. 
                New modules, integrations and reports slot in whenever needed, no starting from scratch. The result is software that fits today and stands ready for tomorrow, with you owning every line of code and every byte of data.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="contract-features sectionPadding" id="features">
        <div className="container">
          <h2 className="text-center">Features</h2>
          <div className="row sectionPadding">
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="easyToMigratePadding">
                <h5 className="mainHeading5 mb-3">From First Idea To Launch, End To End</h5>
                <p className="paragraph2">
                  A single team carries your requirement from the first <br />
                  sketch to a live, fully supported product.
                </p>
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6">
              <div className="desktop-screen desktop-img">
                <img
                  src="/assets/img/page-contract/custom-flow.png"
                  alt="From idea to launch"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-points">
        <div className="container">
          <div className="row mb-5">
            {FEATURES_GRID.slice(0, 4).map((f) => (
              <div className="col-md-3" key={f.title}>
                <img
                  src={`/assets/img/page-contract/${f.img}`}
                  alt={f.title}
                  className="mb-3"
                />
                <h3 className="mainHeading3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
          <div className="row">
            {FEATURES_GRID.slice(4).map((f) => (
              <div className="col-md-3" key={f.title}>
                <img
                  src={`/assets/img/page-contract/${f.img}`}
                  alt={f.title}
                  className="mb-3"
                />
                <h3 className="mainHeading3">{f.title}</h3>
                <p>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contract-lifecycle">
        <div className="container">
          <div className="row sectionPadding align-items-center">
            <div className="col-md-6">
              <h2>What Datrix Customized Software Delivers</h2>
              <ul className="checklist">
                {OFFERS.map((c, i) => (
                  <li key={i}>
                    <span className="color fa-check-circle"></span> {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-5 ml-auto">
              <img src="/assets/img/page-contract/delivery-process.svg" alt="Our delivery process" />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial2 sectionPadding" id="testimonials">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-md-center">
            <div className="col-md-8 col-sm-12 col-xs-12">
              <ProductTestimonialSlider />
            </div>
          </div>
        </div>
      </section>

      <section className="clients" id="clients">
        <h2 className="text-center">Trusted By</h2>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <ClientsSlider logos={HOME_CLIENTS} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
