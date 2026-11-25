"use client";

import React, { useEffect, useRef, useState } from "react";
//import WorldMap from "./../WorldMap";
import ParticleField from "./../ParticleField";
import { ClientsSlider } from "./../TestimonialSliders";
import { HOME_CLIENTS } from "./../data";


const HOME_PRODUCT_FEATURES = {
  financials: [
    {
      img: "/assets/img/placeholders/charts-of-accounts.png",
      title: "Charts of Accounts",
      text: "Provides the foundational structure for organizing a business's financial transactions and generating accurate financial statements. By grouping accounts into categories like assets, liabilities, equity, revenue, and expenses, it gives leaders and stakeholders a clear view of financial health."
    },
    {
      img: "/assets/img/placeholders/budget-forecast.png",
      title: "Budget & Forecast",
      text: "You set a budget to define targets and accountability, then use forecasts to check if you are on track and adjust plans when conditions shift.",
    },
    {
      img: "/assets/img/placeholders/journal-entries.png",
      title: "Journal Entries",
      text: "Journal entries are the building blocks of accounting, recording every financial transaction in a double-entry system to ensure accuracy and provide a clear audit trail.",
    },
  ],
  hr: [
    {
      img: "/assets/img/placeholders/employee-management.png",
      title: "Employee Management",
      text: "Every employee's records, time away and performance in one directory. Everything you need to manage your workforce, from hire to retire.",
    },
    {
      img: "/assets/img/placeholders/recruitment-management.png",
      title: "Recruitment Management",
      text: "Find, screen and bring in the right people, from the first application to the offer. Recruitment management software streamlines the hiring process, helping organizations attract, evaluate, and onboard top talent efficiently.",
    },
    {
      img: "/assets/img/placeholders/payroll-management.png",
      title: "Payroll Management",
      text: "Run payroll on time and keep it in step with the books. Payroll management software automates the calculation, distribution, and compliance of employee compensation, ensuring accurate and timely payments while adhering to tax regulations.",
    },
    {
      img: "/assets/img/placeholders/project-management.png",
      title: "Project Management",
      text: "Plan work, assign it and keep teams on track. Project management software helps teams plan, execute, and monitor projects efficiently, facilitating collaboration, resource allocation, and timely delivery of project goals.",
    },
    {
      img: "/assets/img/placeholders/asset-management.png",
      title: "Asset Management",
      text: "Plan work, assign it and keep teams on track. Asset management software helps organizations track, maintain, and optimize their physical and digital assets for maximum efficiency and value.",
    }
  ],
  contract: [
    {
      img: "/assets/img/placeholders/inventory.png",
      title: "Inventory Management",
      text: "Software shaped around how your organisation works. Inventory management software helps businesses track, manage, and optimize their inventory levels, ensuring efficient stock control, reduced costs, and improved order fulfillment.",
    },
  ],
  CRM: [
    {
      img: "/assets/img/placeholders/campaign-management.png",
      title: "Campaign Management",
      text: "Managing a campaign involves bringing together a wide range of marketing efforts to achieve a common goal. Campaign management software helps businesses plan, execute, and analyze marketing campaigns across multiple channels, ensuring consistent messaging and effective audience targeting.",
    },
    {
      img: "/assets/img/placeholders/fleet-management.png",
      title: "Fleet Management",
      text: "Fleet management covers all activities involved in managing a company's vehicles, drivers, and supporting infrastructure, with the goal of improving efficiency, reducing costs, and ensuring smooth fleet operations.",
    },
    {
      img: "/assets/img/placeholders/prospect-management.png",
      title: "Prospect Management",
      text: "Track and manage potential customers through the sales funnel. Prospect management software helps businesses identify, engage, and nurture leads, streamlining the process of converting prospects into loyal customers.",
    },
  ],
};

const SERVICE_TABS = [
  {
    id: "financials",
    label: "Financials",
    img: "/assets/img/Financials.png",
    overviewImg: "/assets/img/placeholders/dashboard-accounting.png",
    title: "AccountingPhelo",
    text: "AccountingPhelo automates every finance process end to end. Rich yet flexible financial management features let you follow the money moving in and out of your company within a secure, accurate environment. Powerful functionality smooths each transaction and puts all your financial data within instant reach, from high-level summaries right down to individual transactions.",
    
    features: HOME_PRODUCT_FEATURES.financials,
    btn: "financial",
    href: "/financial",
  },
  {
    id: "hr",
    label: "HRMS",
    img: "/assets/img/payroll.png",
    overviewImg: "/assets/img/payroll.png",
    title: "HRPhelo",
    text: "HRPhelo automates your HR and payroll processes, giving you back up to 70% of your time. As a cloud-based Software as a Service (SaaS) solution, it requires no additional infrastructure or database. Simply set it up and manage payroll, employee records, and notifications from one secure platform, with sensitive employee information kept protected.",
    highlights: [
      "Automated HR and payroll",
      "SaaS with no extra infrastructure",
      "Protected employee records",
    ],
    features: HOME_PRODUCT_FEATURES.hr,
    btn: "payroll",
    href: "/payroll",
  },
  {
    id: "contract",
    label: "Customized Software",
    img: "/assets/img/customized.png",
    overviewImg: "/assets/img/page-contract/custom-flow.png",
    title: "Customized Software",
    text: "No two businesses work alike, and your software shouldn't either. Datrix designs and develops customized software around your unique business needs, from bespoke web and mobile applications to integrations that connect the systems you already rely on. Our expert team guides you from concept to launch, delivering a secure, scalable solution that grows with your business.",
    highlights: [
      "Designed around your workflows",
      "Web and mobile applications",
      "Built and owned by your business",
    ],
    features: HOME_PRODUCT_FEATURES.contract,
    btn: "contract",
    href: "/contract",
  },
  {
    id: "CRM",
    label: "CRM",
    img: "/assets/img/CRM.png",
    overviewImg: "/assets/img/CRM.png",
    title: "MarketingPhelo",
    text: "Improve customer satisfaction, strengthen retention and accelerate sales with MarketingPhelo, the strategic CRM that empowers your Sales, Marketing and Customer Support teams. Its transparent, fully customisable and easy-to-use interface keeps everyone aligned while minimising training time.",
    highlights: [
      "Sales, Marketing and Support",
      "Customisable for your team",
      "Built to strengthen retention",
    ],
    features: HOME_PRODUCT_FEATURES.CRM,
    btn: "crm",
    href: "/crm",
  },
];

const SERVICE_OFFERINGS = [
  {
    title: "IT Consulting",
    imageSrc: "/assets/img/services/imageSrc/it-consulting.png",
    note: "Technology guidance to align your systems with business goals.",
  },
  {
    title: "Android Development",
    imageSrc: "/assets/img/services/imageSrc/android-development.png",
    note: "Android apps built around the needs of your users.",
  },
  {
    title: "Application Development",
    imageSrc: "/assets/img/services/imageSrc/application-development.png",
    note: "Purpose-built applications for your team and customers.",
  },
  {
    title: "Custom Software Development",
    imageSrc: "/assets/img/services/imageSrc/custom-software-development.png",
    note: "Software tailored to your unique workflows and requirements.",
  },
  {
    title: "Database Development",
    imageSrc: "/assets/img/services/imageSrc/database-development.png",
    note: "Reliable data systems designed to support your business.",
  },
  {
    title: "Information Systems Management",
    imageSrc: "/assets/img/services/imageSrc/information-management.png",
    note: "Organize business information for clearer decisions.",
  },
  {
    title: "Mobile Application Development",
    imageSrc: "/assets/img/services/imageSrc/mobile-application-develpoment.png",
    note: "Mobile experiences that keep your services within reach.",
  },
  {
    title: "SaaS Development",
    imageSrc: "/assets/img/services/imageSrc/SaaS-development.png",
    note: "Scalable cloud software built for growing businesses.",
  },
  {
    title: "Web Design",
    imageSrc: "/assets/img/services/imageSrc/web-design.png",
    note: "Clear, responsive designs that bring your brand to life.",
  },
  {
    title: "Web Development",
    imageSrc: "/assets/img/services/imageSrc/web-development.png",
    note: "Fast, accessible websites built for real-world use.",
  },
];

type ProductTab = (typeof SERVICE_TABS)[number];

function ProductFeatureScroller({
  tab,
  navigate,
  activeSlide,
  slideDirection,
  onSlideChange,
}: {
  tab: ProductTab;
  navigate: (to: string) => void;
  activeSlide: number;
  slideDirection: "up" | "down";
  onSlideChange: (slide: number) => void;
}) {
  const slideCount = tab.features.length + 1;
  const activeFeature = activeSlide > 0 ? tab.features[activeSlide - 1] : null;
  const isOverview = activeFeature === null;

  const renderImage = (image: string, title: string) => (
    <img src={image} alt={title} />
  );

  const renderImagePlaceholder = (index: number) => (
    <div className="home-product-frame-placeholder">
      <span className="home-financial-feature-image-icon" aria-hidden="true" />
      <span>Feature image {String(index).padStart(2, "0")} placeholder</span>
    </div>
  );

  return (
    <div className="home-product-feature-scroller">
      <div
        key={`${tab.id}-${activeSlide}-frame`}
        className={`home-product-feature-frame home-product-slide-${slideDirection}`}
        role="region"
        aria-label={`${tab.title} ${isOverview ? "overview" : "feature image"}`}
        aria-live="polite"
      >
        <div className="desktop-screen desktop-img">
          <div
            key={activeSlide}
            className={`home-product-frame-content home-product-slide-${slideDirection}`}
          >
            {isOverview ? (
              renderImage(tab.overviewImg, `${tab.title} overview`)
            ) : activeFeature?.img ? (
              renderImage(activeFeature.img, activeFeature.title)
            ) : (
              renderImagePlaceholder(activeSlide)
            )}
          </div>
        </div>
        <span className="home-product-frame-caption">
          {isOverview
            ? "PRODUCT OVERVIEW"
            : `FEATURE ${String(activeSlide).padStart(2, "0")} / ${String(slideCount - 1).padStart(2, "0")}`}
        </span>
      </div>

      <article
        key={`${tab.id}-${activeSlide}`}
        className={`home-product-feature-step home-product-slide-${slideDirection}`}
        aria-live="polite"
      >
        <div className="home-product-step-card">
          <span className="home-product-kicker">
            {isOverview
              ? "PRODUCT OVERVIEW"
              : `FEATURE ${String(activeSlide).padStart(2, "0")} / ${String(tab.features.length).padStart(2, "0")}`}
          </span>
          <h3>{isOverview ? tab.title : activeFeature?.title}</h3>
          <p>{isOverview ? tab.text : activeFeature?.text}</p>
          <a
            href={`#${tab.href}`}
            className={`request-btn big ${tab.btn}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(tab.href);
            }}
          >
            Read More
          </a>
          <div
            className="home-product-feature-controls"
            role="group"
            aria-label={`${tab.title} slides`}
          >
            <button
              type="button"
              className="home-product-feature-arrow"
              aria-label="Previous slide"
              disabled={activeSlide === 0}
              onClick={() => onSlideChange(activeSlide - 1)}
            >
              ←
            </button>
            <div className="home-product-feature-pagination">
              {Array.from({ length: slideCount }, (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={
                    index === 0
                      ? `${tab.title} overview`
                      : `Feature ${String(index).padStart(2, "0")}`
                  }
                  aria-pressed={activeSlide === index}
                  onClick={() => onSlideChange(index)}
                >
                  {index === 0 ? "OV" : String(index).padStart(2, "0")}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="home-product-feature-arrow"
              aria-label="Next slide"
              disabled={activeSlide === slideCount - 1}
              onClick={() => onSlideChange(activeSlide + 1)}
            >
              →
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

export default function HomePage({
  navigate,
}: {
  navigate: (to: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("financials");
  const [activeSlide, setActiveSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState<"up" | "down">("up");
  const activeSlideRef = useRef(0);
  const restartProductAutoplayRef = useRef<() => void>(() => {});
  const productsSectionRef = useRef<HTMLElement | null>(null);
  const productSlideCount =
    (SERVICE_TABS.find((tab) => tab.id === activeTab)?.features.length ?? 0) + 1;

  useEffect(() => {
    const section = productsSectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    let isVisible = false;

    const scheduleNextSlide = (delay = 5000) => {
      if (timer !== undefined) window.clearTimeout(timer);
      timer = undefined;

      if (!isVisible || document.hidden || reducedMotion.matches) {
        return;
      }

      timer = window.setTimeout(() => {
        timer = undefined;
        const currentSlide = activeSlideRef.current;
        const nextSlide = (currentSlide + 1) % productSlideCount;
        setSlideDirection(nextSlide < currentSlide ? "down" : "up");
        activeSlideRef.current = nextSlide;
        setActiveSlide(nextSlide);
        scheduleNextSlide();
      }, delay);
    };

    const observer = new IntersectionObserver(([entry]) => {
      const resumed = entry.isIntersecting && !isVisible;
      isVisible = entry.isIntersecting;
      scheduleNextSlide(resumed ? 3000 : 5000);
    });
    const onVisibilityChange = () =>
      scheduleNextSlide(document.hidden ? 5000 : 3000);
    const onMotionPreferenceChange = () => scheduleNextSlide(3000);
    const onFocusIn = () => scheduleNextSlide(3000);

    observer.observe(section);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reducedMotion.addEventListener("change", onMotionPreferenceChange);
    section.addEventListener("focusin", onFocusIn);
    restartProductAutoplayRef.current = () => scheduleNextSlide(3000);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
      restartProductAutoplayRef.current = () => {};
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      section.removeEventListener("focusin", onFocusIn);
    };
  }, [productSlideCount]);

  const changeActiveTab = (tabId: string) => {
    if (tabId === activeTab) return;

    activeSlideRef.current = 0;
    setActiveSlide(0);
    setSlideDirection("down");
    setActiveTab(tabId);
    restartProductAutoplayRef.current();
  };

  const changeProductSlide = (slide: number) => {
    const currentSlide = activeSlideRef.current;
    if (slide !== currentSlide) {
      setSlideDirection(slide < currentSlide ? "down" : "up");
      activeSlideRef.current = slide;
      setActiveSlide(slide);
    }
    restartProductAutoplayRef.current();
  };

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("services");
    if (el) {
      window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
    }
  };

  return (
    <div className="wrapper">
      <section className="home-banner topBannerSection vibe-hero vibe-hero--orange">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="WorkPhelo-intro">
            <img
              src="/assets/img/datrix-logo-white.png"
              className="vibe-hero-mark"
              alt="Datrix Tech Solutions"
            />
            <h1>Smarter Ways to Run Your Business</h1>
            <span className="vibe-divider" aria-hidden="true" />
            <p className="paragraph2">
              WorkPhelo bundles every tool you need to run, track and grow
              your business in one smart suite.
            </p>
            <a
              href="#services"
              className="smoothScroll request-btn ghost big"
              onClick={scrollToServices}
            >
              Explore More
              <svg
                className="vibe-arrow"
                width="10"
                height="12"
                viewBox="0 0 10 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5 1v9M1.5 6.5 5 10l3.5-3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
      <section className="home-clients clients">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <h3 className="text-center">Partnered by</h3>
              <ClientsSlider logos={HOME_CLIENTS} />
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-service-offerings sectionPadding"
        aria-labelledby="home-service-offerings-title"
      >
        <div className="container">
          <div className="home-service-offerings-heading">
            <span>WHAT WE DO</span>
            <h2 id="home-service-offerings-title">Our Services</h2>
          </div>
          <ul className="home-service-offerings-grid">
            {SERVICE_OFFERINGS.map((service, index) => (
              <li className="home-service-offering" key={service.title}>
                <div className="home-service-offering-image">
                  {service.imageSrc ? (
                    <img src={service.imageSrc} alt={service.title} />
                  ) : (
                    <div
                      className="home-service-offering-image-placeholder"
                      aria-hidden="true"
                    >
                      <span>Service image</span>
                    </div>
                  )}
                </div>
                <div className="home-service-offering-copy">
                  <span className="home-service-offering-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        ref={productsSectionRef}
        className="home-services home-products-section bgGray sectionPadding"
        id="services"
      >
        <div className="home-products-stage">
          <div className="container">
            <h2 className="text-center">Our Products</h2>
            <div className="home-product-showcase">
              <ul
                className="nav service-tabs home-product-tabs"
                id="myTab"
                role="tablist"
              >
                {SERVICE_TABS.map((tab, index) => (
                  <li className="nav-item" key={tab.id}>
                    <a
                      className={`nav-link${activeTab === tab.id ? " active" : ""}`}
                      id={`${tab.id}-tab`}
                      role="tab"
                      aria-controls={`${tab.id}-panel`}
                      aria-selected={activeTab === tab.id}
                      href={`#${tab.id}-panel`}
                      onClick={(e) => {
                        e.preventDefault();
                        changeActiveTab(tab.id);
                      }}
                    >
                      <span className="home-product-tab-number" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{tab.label}</span>
                      <span className="home-product-tab-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="tab-content home-product-content" id="myTabContent">
                {SERVICE_TABS.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab-pane fade${
                      activeTab === tab.id ? " show active" : ""
                    }`}
                    id={`${tab.id}-panel`}
                    role="tabpanel"
                    aria-labelledby={`${tab.id}-tab`}
                    tabIndex={0}
                  >
                    <ProductFeatureScroller
                      key={tab.id}
                      tab={tab}
                      navigate={navigate}
                      activeSlide={activeSlide}
                      slideDirection={slideDirection}
                      onSlideChange={changeProductSlide}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     {/* <section className="home-reach sectionPadding">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-4 vibe-rv-l">
              <h3 className="vibe-label">The African Market</h3>
              <p>
  We work across the African business landscape and understand how much local context matters. 
  That’s why WorkPhelo is always close by. 
  Wherever in Africa you operate and whoever your customers are, WorkPhelo delivers a hyper-local software solution that simplifies your processes, freeing you to focus on your people and pursue fresh ideas.
</p>

<p>
  We frequently act as advisors to our clients, guiding sound decisions that accelerate growth. 
  Because WorkPhelo applications are faster, smaller and lighter, they’re simpler to deploy, install, maintain and upgrade. 
  We provide affordable technology assistance your business genuinely needs.
</p>
            </div>
            {/* <div className="col-md-8 vibe-rv-r">
           <WorldMap /> 
            </div> 
          </div>
        </div>
      </section>

      section className="home-clients clients">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col">
              <ClientsSlider logos={HOME_CLIENTS} />
            </div>
          </div>
        </div>
      </section>*/}
    </div>
  );
}
