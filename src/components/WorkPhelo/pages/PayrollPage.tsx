"use client";

import React, { useEffect, useRef, useState } from "react";
import ParticleField from "./../ParticleField";
import { ClientsSlider } from "./../TestimonialSliders";
import { PAYROLL_CLIENTS } from "./../data";

const BENEFITS = [
  {
    img: "feature-human-resource-management.png",
    title: "Human Resource Management",
    text: "A capable HR system that follows each employee from hiring through performance and appraisal, training and skills administration, right up to exit scheduling.",
  },
  {
    img: "feature-payroll-management.png",
    title: "Payroll Management",
    text: "Compute staff benefits, timesheets and overtime accurately while handling union dues, cooperative contributions and surcharges.",
  },
  {
    img: "feature-employee-self-service.png",
    title: "Employee Self Service",
    text: "Employees can view their complete personal bio data and transaction history whenever they need.",
  },
  {
    img: "feature-automated-notification.png",
    title: "Automated Notifications",
    text: "Pending-transaction alerts go out automatically, and every staff member receives their payslip at the close of each payroll run.",
  },
  {
    img: "feature-payroll-reporting.png",
    title: "Exceptional Payroll Reporting",
    text: "Live access to summary and detailed transactions alike, plus full audit trails.",
  },
  {
    img: "social-security.png",
    title: "Social Security Management",
    text: "Effortlessly manage employee social security contributions, and generate accurate statutory reports in one place.",
  },
];

const HR_MODULES = [
  ["human-employee-biodata.svg", "Employee Bio Data"],
  ["module-self-employee.svg", "Employee Self-Service"],
  ["module-attandace-management.svg", "Attendance Management"],
  ["human-hiring.svg", "Hiring or Recruitment Management"],
  ["human-employement-history.svg", "Employment History"],
  ["module-overtime.svg", "Smart Scheduling"],
  ["human-property-management.svg", "Asset Management"],
  ["module-security-management.svg", "Security management & Audit trail"],
  //["human-disciplinary.svg", "Disciplinary/ Grievance"],
  ["human-performance.svg", "Performance & Appraisal Management"],
  ["human-document-management.svg", "Document Management"],
];

const PAYROLL_MODULES = [
  ["module-payroll-dashboard.svg", "Payroll Dashboard"],
  ["module-payroll-allowance.svg", "Formula based Allowances & Deductions"],
  ["module-loan-mamangement.svg", "Loans Management"],
  ["module-single-group-payroll-processing.svg", "Group Payroll Processing"],
  ["module-emailing-payslip.svg", "Payslips Availiability"],
  ["module-standard-reports.svg", "Standard/Custom Reports"],
  ["module-gl-interface.svg", "GL Interface/Project Management"],
  ["module-workflow.svg", "Workflow"],
];

function PayrollBenefitScroller() {
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeImg, setActiveImg] = useState(BENEFITS[0].img);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const src = (entry.target as HTMLElement).dataset.src;
            if (src) setActiveImg(src);
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

  const activeBenefit = BENEFITS.find((benefit) => benefit.img === activeImg);

  return (
    <section
      className="features payroll-features-points sectionPadding"
      id="features"
    >
      <div className="container">
        <h2 className="text-center">
          A Whole Host of Benefits for Your Organization
        </h2>
        <div className="row position-relative" id="feature1">
          <div className="col-xs-12 col-sm-12 col-md-6 d-none d-md-block">
            <div className="payroll-feature-visual">
              <div className="desktop-screen desktop-img">
                <img
                  src={`/assets/img/page-payroll/${activeImg}`}
                  alt={activeBenefit?.title ?? ""}
                />
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-5 offset-md-1">
            {BENEFITS.map((benefit, idx) => (
              <div
                key={benefit.title}
                ref={(el) => {
                  contentRefs.current[idx] = el;
                }}
                className="easyToMigratePadding row align-items-center feature-content height100"
                data-src={benefit.img}
              >
                <div className="col">
                  <div className="desktop-screen d-md-none mb-4">
                    <img
                      src={`/assets/img/page-payroll/${benefit.img}`}
                      alt=""
                    />
                  </div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function PayrollPage({
  onRequestDemo,
}: {
  onRequestDemo: () => void;
}) {
  const [activeTab, setActiveTab] = useState("home");

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

      <section className="payroll-banner topBannerSection vibe-hero vibe-hero--navy">
        <ParticleField interactive />
        <div className="container vibe-hero-inner">
          <div className="WorkPhelo-intro">
            <span className="vibe-kicker">Datrix Tech Solutions</span>
            <h1>
              An HRMS That’s Efficient, Flexible &amp; Complete
            </h1>
            <span className="vibe-divider" aria-hidden="true" />
<p className="paragraph2">
              HRPhelo takes the hassle out of Payroll and HR management
              for organizations of every size.
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
              <h2 className="text-center">Why HRPhelo?</h2>
              <p style={{ textAlign: "justify" }}>
                Give your organization a fresh step toward success — trim
                costs and make strategic, people-centred decisions with
                HRPhelo, an efficient, flexible and innovative system built
                for small, medium and large organizations alike. Installation
                is simple, third-party integration is seamless, training
                takes hardly any time and workloads shrink noticeably.
                Recruitment, onboarding, transactions and history all live
                efficiently in one place within this pan-geographic solution.
                Timely notifications, assessment and
                appraisal features, memos and payslips are all at hand — and
                employees join HR processes transparently through HRPhelo’s
                highly approachable software.
              </p>
            </div>
          </div>
        </div>
      </section>

      <PayrollBenefitScroller />

      <section className="payroll-module sectionPadding">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="module-tabs">
                <ul
                  className="nav nav-tabs nav-justified"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className={`nav-link${activeTab === "home" ? " active show" : ""}`}
                      id="home-tab"
                      role="tab"
                      aria-controls="home"
                      aria-selected={activeTab === "home"}
                      href="#home"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("home");
                      }}
                    >
                      Human Resource
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link${activeTab === "profile" ? " active show" : ""}`}
                      id="profile-tab"
                      role="tab"
                      aria-controls="profile"
                      aria-selected={activeTab === "profile"}
                      href="#profile"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab("profile");
                      }}
                    >
                      Payroll
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className={`tab-pane fade${activeTab === "home" ? " active show" : ""}`}
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <ul className="module-list row">
                      {HR_MODULES.map(([img, label]) => (
                        <li className="col-md-3" key={label}>
                          <div className="media">
                            <div className="media-img">
                              <img
                                src={`/assets/img/page-payroll/${img}`}
                                alt={label}
                                className="mr-4"
                              />
                            </div>
                            <div className="media-body">
                              <p>{label}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`tab-pane fade${activeTab === "profile" ? " active show" : ""}`}
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <ul className="module-list row">
                      {PAYROLL_MODULES.map(([img, label]) => (
                        <li className="col-md-3" key={label}>
                          <div className="media">
                            <div className="media-img">
                              <img
                                src={`/assets/img/page-payroll/${img}`}
                                alt={label}
                                className="mr-4"
                              />
                            </div>
                            <div className="media-body">
                              <p>{label}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
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
              <ClientsSlider logos={PAYROLL_CLIENTS} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
