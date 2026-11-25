"use client";

import React, { useCallback, useEffect, useState } from "react";
import Header, { type RouteKey } from "./Header";
import Footer, { OurProducts } from "./Footer";
import DemoModal from "./DemoModal";
import HomePage from "./pages/HomePage";
import FinancialPage from "./pages/FinancialPage";
import PayrollPage from "./pages/PayrollPage";
import ContractPage from "./pages/ContractPage";
import CrmPage from "./pages/CrmPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BlogPage from "./pages/BlogPage";
import ScrollReveal from "./ScrollReveal";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

const BODY_CLASSES: Record<RouteKey, { cls: string; id: string }> = {
  home: { cls: "body- index", id: "index" },
  financial: { cls: "body-financial ", id: "" },
  payroll: { cls: "body-payroll payroll", id: "" },
  contract: { cls: "body-contract contract", id: "" },
  crm: { cls: "body-crm crm", id: "" },
  "contact-us": { cls: "body- ", id: "" },
  privacy: { cls: "body- ", id: "index" },
  terms: { cls: "body- ", id: "index" },
  blog: { cls: "body- dt-blog-body", id: "index" },
};

const MODAL_PRODUCT: Partial<Record<RouteKey, { value: string; cls: string }>> = {
  financial: { value: "AccountingPhelo", cls: "financial" },
  payroll: { value: "HRPhelo", cls: "payroll" },
  contract: { value: "Customized Software", cls: "contract" },
  crm: { value: "MarketingPhelo", cls: "crm" },
  "contact-us": { value: "", cls: "" },
  privacy: { value: "", cls: "" },
  terms: { value: "", cls: "" },
  blog: { value: "", cls: "" },
};

function parseHash(): { route: RouteKey; anchor: string; slug: string } {
  if (typeof window === "undefined") return { route: "home", anchor: "", slug: "" };
  const raw = window.location.hash.replace(/^#/, "");
  if (!raw || raw === "/") return { route: "home", anchor: "", slug: "" };
  const [pathPart, anchorPart] = raw.split("#");
  const segments = pathPart.replace(/^\//, "").split("/");
  const path = segments[0];
  const slug = path === "blog" ? (segments[1] || "") : "";
  const known: RouteKey[] = [
    "home",
    "financial",
    "payroll",
    "contract",
    "crm",
    "contact-us",
    "privacy",
    "terms",
    "blog",
  ];
  const route = (known.includes(path as RouteKey) ? path : "home") as RouteKey;
  return { route, anchor: anchorPart || "", slug };
}

export default function WorkPheloApp() {
  const [state, setState] = useState<{ route: RouteKey; anchor: string; slug: string }>({
    route: "home",
    anchor: "",
    slug: "",
  });
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => setState(parseHash());
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const { route, anchor, slug } = state;

  // body class / scroll management per route
  useEffect(() => {
    const body = document.body;
    const { cls, id } = BODY_CLASSES[route];
    body.className = cls;
    body.id = id;
    if (anchor) {
      // wait a tick for the page to render, then scroll to the anchor
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        else window.scrollTo({ top: 0, behavior: "instant" });
      }, 60);
    } else {
      // html { scroll-behavior: smooth } would turn this into a long
      // animated crawl on deep pages — jump instantly instead; the
      // keyed .page-swap fade already smooths the visual hand-off.
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [route, anchor, slug]);

  const navigate = useCallback((to: string) => {
    const target = `#${to}`;
    if (window.location.hash === target) {
      setState(parseHash());
    } else {
      window.location.hash = target;
    }
  }, []);

  const openDemo = useCallback(() => setDemoOpen(true), []);
  const closeDemo = useCallback(() => setDemoOpen(false), []);

  const modal = MODAL_PRODUCT[route] ?? { value: "", cls: "" };

  const showProducts = ["financial", "payroll", "contract", "crm"].includes(
    route
  );

  let page: React.ReactNode;
  switch (route) {
    case "financial":
      page = <FinancialPage onRequestDemo={openDemo} />;
      break;
    case "payroll":
      page = <PayrollPage onRequestDemo={openDemo} />;
      break;
    case "contract":
      page = <ContractPage onRequestDemo={openDemo} />;
      break;
    case "crm":
      page = <CrmPage onRequestDemo={openDemo} />;
      break;
    case "contact-us":
      page = <ContactPage />;
      break;
    case "privacy":
      page = <PrivacyPage />;
      break;
    case "terms":
      page = <TermsPage />;
      break;
    case "blog":
      page = <BlogPage slug={slug} onRequestDemo={openDemo} />;
      break;
    default:
      page = <HomePage navigate={navigate} />;
  }

  return (
    <>
      <Preloader />
      <CustomCursor />
      <Header route={route} onRequestDemo={openDemo} navigate={navigate} />
      <div className="page-swap" key={route}>
        {page}
      </div>
      <ScrollReveal />
      {showProducts ? <OurProducts routeKey={route} navigate={navigate} /> : null}
      <Footer navigate={navigate} />
      <DemoModal
        open={demoOpen}
        productValue={modal.value}
        productClass={modal.cls}
        onClose={closeDemo}
      />
    </>
  );
}
