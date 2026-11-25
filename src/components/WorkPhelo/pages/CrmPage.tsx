"use client";

import React, { useEffect, useRef, useState } from "react";
import ParticleField from "./../ParticleField";
import { ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";

const CRM_FEATURES = [
  {
    title: "Account & Contact Management",
    text: "See every customer in full — activity history, key contacts, communications and internal account discussions in one view.",
    image: "/assets/img/page-crm/account-contact-management.png",
  },
  {
    title: "Lead Management",
    text: "Follow each lead from first click to close while fine-tuning campaigns across every channel — and put your marketing dollars where they work hardest.",
    image: "/assets/img/page-crm/lead-management.png",
  },
  {
    title: "Opportunities Management",
    text: "Opportunity Management lays out your team’s entire deal flow — stage, products, competition, quotes and beyond — keeping you close to the people and information that seal every sale.",
    image: "/assets/img/page-crm/opportunities-management.png",
  },
  {
    title: "Quotation Management",
    text: "Reps pick the right items for every customer, every time, with consistent pricing and discounting — plus approvals exactly when they’re needed — even as quote volumes climb.",
    image: "/assets/img/page-crm/quotation-management.png",
  },
  {
    title: "Reports & Analytics",
    text: "Dashboards show the business at a glance in real time; anyone can build the detailed reports beneath them, reachable from anywhere.",
    image: "/assets/img/page-crm/reports-analytics.png",
  },
  {
    title: "Territory Management",
    text: "Shape sales territories into a logical, flexible structure that pairs the right reps with the right customers for maximum revenue.",
    image: "/assets/img/page-crm/territory-management.png",
  },
  {
    title: "Campaign Management",
    text: "Reach your contacts with polished email campaigns that take almost no effort to create, target and send.",
    image: "/assets/img/page-crm/campaign-management.png",
  },
  /**
  {
    title: "Intelligent Workflows",
    text: "Turn website form submissions into leads and contacts automatically",
  },
  
  {
    title: "Survey",
    text: "Collect feedback from customers and leads — every response is tied to the customer’s email address.",
  },
  **/
];

const CRM_COUNTERS = [
  { img: "investing-CRM.svg", text: "Of top-performing companies are putting money into CRM." },
  { img: "sales-increased.svg", text: "Sales grew by as much as 80%" },
  { img: "customer-retention.svg", text: "Of users say CRM made a real difference to customer retention." },
];

function CRMFeatureImage({
  feature,
}: {
  feature: (typeof CRM_FEATURES)[number];
}) {
  if (feature.image) {
    return (
      <img
        className="crm-feature-slide-image"
        src={feature.image}
        alt={feature.title}
      />
    );
  }

  return (
    <div
      className="crm-feature-image-placeholder"
      role="img"
      aria-label={`${feature.title} image placeholder`}
    >
      Image placeholder
    </div>
  );
}

function CRMFeatureScroller() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeTitle, setActiveTitle] = useState(CRM_FEATURES[0].title);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const title = (entry.target as HTMLElement).dataset.title;
            if (title) setActiveTitle(title);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    contentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeFeature = CRM_FEATURES.find(
    (feature) => feature.title === activeTitle
  );

  return (
    <section className="features sectionPadding" id="features">
      <div className="container">
        <h2 className="text-center">Features</h2>
        <div className="row position-relative" id="feature1">
          <div className="col-xs-12 col-sm-12 col-md-6 d-none d-md-block">
            <div className="crm-feature-slide-visual">
              <div className="desktop-screen crm-feature-device">
                {activeFeature && <CRMFeatureImage feature={activeFeature} />}
              </div>
              <h3>{activeFeature?.title}</h3>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-5 offset-md-1">
            {CRM_FEATURES.map((feature, idx) => (
              <div
                key={feature.title}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="easyToMigratePadding row align-items-center feature-content height100"
                data-title={feature.title}
              >
                <div className="col">
                  <div className="desktop-screen crm-feature-device d-md-none mb-4">
                    <CRMFeatureImage feature={feature} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CrmPage({
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
            <a href="#features" onClick={scrollTo("#features")}>Features</a>
          </li>
        </ul>
      </div>

      <section className="crm-banner topBannerSection vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="WorkPhelo-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              CRM Built for Lifelong Customer Bonds
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
<p className="paragraph2">
              Keep your sales pipeline moving, track team activity and
              win more deals.
            </p>
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
              <h2 className="text-center">Why MarketingPhelo?</h2>
              <p style={{ textAlign: "justify" }}>
                Raise customer satisfaction, deepen retention and expand
                sales rapidly with MarketingPhelo — the strategic CRM that
                equips your Sales, Marketing and Customer Support teams. A
                transparent system that’s fully customisable and
                exceptionally easy to use keeps everyone aligned while
                training time drops to a minimum. The right CRM can
                transform a business: internal communication flows,
                productivity climbs, deal conversion improves and customers
                stay happy. MarketingPhelo gathers 360-degree customer
                knowledge onto one platform — phone, email, quotes, reports
                and complete activity history in a single place — so your
                sales team spends less time on tedious processes and more on
                what truly matters: selling.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CRMFeatureScroller />

      <section className="contract-counter sectionPadding text-center">
        <div className="container">
          <div className="row">
            {CRM_COUNTERS.map((c) => (
              <div className="col-md-4" key={c.img}>
                <div className="crm-feature">
                  <img src={`/assets/img/page-crm/${c.img}`} alt="" />
                </div>
                <p>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contract-lifecycle sectionPadding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 col-sm-12">
              <h2>Why Does Your Business Need CRM?</h2>
              <div>
                <h3>Keeping every team in sync is hard</h3>
                <p>
                  We understand the struggle of keeping marketing, sales and
                  support teams organised, productive and truly in sync.
                </p>
              </div>
              <div>
                <h3>Your data lives everywhere but one place</h3>
                <p>
                  When customer data and interactions are strewn across
                  countless apps, collaboration suffers, customer experiences
                  lose their spark and revenue growth stalls.
                </p>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 m-auto">
              <div className="desktop-screen crm-page-device">
                <img
                  className="crm-page-device-image"
                  src="/assets/img/CRM.png"
                  alt="Why you need CRM"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contract-form-section height100" id="industries">
        <div className="container">
          <div className="row sectionPadding">
            <div className="col-xs-12 col-sm-12 col-md-6 m-auto">
              <div className="desktop-screen crm-page-device">
                <img
                  className="crm-page-device-image"
                  src="/assets/img/page-crm/why-need-CRM.png"
                  alt="Why MarketingPhelo"
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 ml-auto">
              <h2>Why MarketingPhelo (CRM)?</h2>
              <div>
                <h3>Flexible</h3>
                <p>
                  Quick, painless configuration shapes a custom CRM that hands
                  every customer-facing teammate the information and tools
                  they need.
                </p>
              </div>
              <div>
                <h3>Affordable</h3>
                <p>
                  MarketingPhelo’s low, predictable pricing lets you grow a
                  CRM that backs your big ideas rather than capping them.
                </p>
              </div>
              <div>
                <h3>Tailored</h3>
                <p>
                  A CRM solution fitted to your small business through our
                  customization, configuration, integration and deployment
                  options.
                </p>
              </div>
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
