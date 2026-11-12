export interface BlogPost {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  artClass: string;
  artLabel: string;
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
}

// Starter editorial content. Review dates, claims and examples before publishing.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "connected-business-systems-growth",
    category: "Business Technology",
    title: "Why connected business systems are the foundation for sustainable growth",
    excerpt: "When finance, people and customer information live in separate places, teams lose time joining the dots. A connected operating picture changes that.",
    date: "November 2026", readTime: "5 min read", artClass: "art-network", artLabel: "CONNECTED BUSINESS",
    sections: [
      { heading: "The hidden cost of disconnected tools", paragraphs: ["Many growing organisations adopt software one department at a time. Finance has its accounting package, HR keeps employee records elsewhere, and sales tracks customer conversations in another tool. Each system may work well on its own, but the gaps between them create extra work.", "Teams re-enter information, reconcile conflicting records and wait for reports that should be readily available. Over time, these small delays make it harder for leaders to see what is happening across the business."] },
      { heading: "Build around the way work actually happens", paragraphs: ["A connected system starts with the flow of work, not a list of features. Consider how a new customer moves from enquiry to quotation, delivery, invoicing and payment. The information captured at each step should support the next one, rather than being typed again.", "The same principle applies to employee onboarding, leave, payroll and management reporting. Clear workflows reduce hand-offs and help people spend more time on work that needs their judgement."] },
      { heading: "A practical starting point", paragraphs: ["You do not need to replace every tool at once. Map the processes that create the most friction, identify duplicate data entry and agree which system should own each important record."], bullets: ["Document one high-impact process from beginning to end.", "Identify where information is entered more than once.", "Set clear ownership for customer, employee and financial records.", "Choose integrations or a shared platform based on measurable business needs."] },
      { heading: "Make visibility part of the design", paragraphs: ["The real benefit of connected operations is not simply fewer spreadsheets. It is the ability to make decisions using consistent, timely information. With the right foundations, leaders can understand performance, spot bottlenecks and respond with confidence.", "Technology should fit the organisation's goals and ways of working. Start with the outcomes you need, then build the systems and processes that make those outcomes repeatable."] }
    ]
  },
  {
    slug: "better-financial-visibility",
    category: "Finance & Accounting",
    title: "From monthly reports to everyday insight: improving financial visibility",
    excerpt: "Useful financial information should help a business act, not simply explain what happened weeks ago. Here are the building blocks of a clearer view.",
    date: "November 2026", readTime: "4 min read", artClass: "art-finance", artLabel: "FINANCIAL CLARITY",
    sections: [
      { heading: "Why timing matters", paragraphs: ["A report that arrives after a decision has been made has limited value. When invoices, expenses, receivables and stock movements are recorded consistently, managers can work from a more current picture of performance.", "Better visibility does not mean producing more reports. It means making the right information easy to find and understand."] },
      { heading: "Create reliable financial routines", paragraphs: ["Start with a consistent chart of accounts, clear approval responsibilities and timely transaction capture. Reconcile bank activity regularly and review outstanding receivables and payables as part of the operating rhythm."] , bullets: ["Keep transaction descriptions and supporting documents consistent.", "Review cash flow alongside profit, not instead of it.", "Track overdue customer balances and supplier commitments.", "Use budgets and variance reviews to investigate meaningful changes."] },
      { heading: "Turn information into action", paragraphs: ["A useful finance dashboard should answer practical questions: Are collections keeping pace with sales? Which costs are moving outside plan? Where is cash tied up? Can the organisation meet upcoming commitments?", "Accounting software can make this information more accessible, but the quality of the result still depends on sound processes and disciplined data entry."] }
    ]
  },
  {
    slug: "hr-payroll-processes-people-experience",
    category: "People & HR", title: "How better HR and payroll processes create a better employee experience",
    excerpt: "Accurate payroll is essential, but the employee experience is shaped by every process around it—from onboarding to leave and access to information.",
    date: "November 2026", readTime: "4 min read", artClass: "art-people", artLabel: "PEOPLE FIRST",
    sections: [
      { heading: "The employee experience is built in everyday moments", paragraphs: ["Employees notice when routine processes are confusing. Repeatedly chasing payslips, correcting leave balances or asking for updates on approvals creates friction that can undermine trust.", "Clear processes and reliable employee information help HR teams respond consistently while giving employees more visibility into their own work-related information."] },
      { heading: "Make the core processes dependable", paragraphs: ["Begin by documenting the employee lifecycle: recruitment, onboarding, changes to employee details, leave, attendance, payroll and offboarding. Define who approves each step and what information is required."] , bullets: ["Maintain one accurate employee record.", "Set clear cut-off dates and checks for payroll changes.", "Make leave policies and approval paths easy to understand.", "Protect personal information with role-based access."] },
      { heading: "Give HR more room for people work", paragraphs: ["When routine administration is structured and supported by appropriate software, HR professionals can spend more time on workforce planning, development and employee support. Automation should make the process clearer—not make it harder to understand who is responsible."] }
    ]
  },
  {
    slug: "choosing-custom-software",
    category: "Digital Transformation", title: "When should a business consider custom software?",
    excerpt: "Off-the-shelf tools are a sensible starting point for many teams. Custom development becomes worth exploring when important workflows no longer fit.",
    date: "November 2026", readTime: "5 min read", artClass: "art-custom", artLabel: "BUILT AROUND YOU",
    sections: [
      { heading: "Start with the problem, not the technology", paragraphs: ["A request for custom software often begins with a workaround: a spreadsheet that has become business-critical, repeated manual transfers between systems or an approval process that no existing tool supports well.", "Before commissioning a solution, quantify the impact. How much time is lost? What errors occur? Which customer or compliance outcomes are affected?"] },
      { heading: "Signs a tailored solution may help", paragraphs: ["Custom software may be appropriate when a process is genuinely distinctive, integrations are essential, or the business needs control over how a system evolves. It is not automatically the best choice simply because a team has preferences about a familiar tool."], bullets: ["A critical workflow cannot be configured in existing products.", "Disconnected systems create significant operational risk.", "The business needs specialised reporting or integrations.", "The long-term value can justify development and ongoing support."] },
      { heading: "Plan for the full lifecycle", paragraphs: ["A successful project includes discovery, user experience design, security, testing, deployment, training and ongoing maintenance. Agree ownership of the code and data, service expectations and a realistic plan for future changes before development begins.", "The best solution is the simplest one that reliably solves the business problem and can be supported over time."] }
    ]
  }
];
