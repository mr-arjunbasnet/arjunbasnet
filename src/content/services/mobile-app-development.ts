import type { Service } from "../types.ts";

export const mobileAppDevelopment: Service = {
  slug: "mobile-app-development",
  name: "Mobile App Development",
  group: "build",
  order: 7,
  featured: false,
  icon: "Smartphone",
  serviceType: "Mobile Application Development",
  tagline: "Apps built for the devices and data plans your users actually have.",
  heading: "Mobile App Development in Nepal",
  metaDescription:
    "Mobile app development in Nepal for Android and iOS. Built for mid-range devices and intermittent connectivity, with offline support where users need it.",
  keywords: [
    "mobile app development Nepal",
    "app developer Kathmandu",
    "Android app development Nepal",
    "iOS app development Nepal",
    "React Native developer Nepal",
    "mobile app company Nepal",
  ],

  primaryAnswer: {
    id: "mobile-app-considerations-nepal",
    question: "What should a Nepali business consider before building a mobile app?",
    answer:
      "The first question is whether an app is needed at all, because a mobile-friendly website solves the problem more cheaply in most cases. An app earns its cost when it needs to work offline, send push notifications, or use device hardware such as the camera or GPS. If none of those apply, a fast responsive website will reach more people for less money and avoids asking users to spend storage on an install. When an app is genuinely warranted, Nepali conditions shape the build. Android dominates the market by a wide margin, so Android leads and iOS follows. Mid-range devices with limited storage are the norm, which caps acceptable app size. Connectivity drops, so anything a user does should survive losing signal mid-action. The Cricket Nepal application passed 50,000 downloads under exactly these constraints.",
    primaryRoute: "/services/mobile-app-development",
    supporting: [
      "Build an app when you need offline capability, push notifications, or camera and GPS access.",
      "Build a responsive website instead when the app would essentially be your site in a wrapper.",
    ],
  },

  answers: [
    {
      id: "mobile-app-cost-nepal",
      question: "What determines the cost of a mobile app?",
      answer:
        "Mobile app cost is driven by feature depth rather than by screen count. Payment processing, real-time features, and offline synchronisation each add substantial build and testing effort on their own. Cross-platform development with React Native or Flutter costs materially less than building the same app natively twice, and for most business applications the performance difference is not something users notice. Three costs get forgotten at proposal stage and are worth naming explicitly. Both Apple and Google charge developer account fees, annually and one-off respectively. Backend hosting continues every month for the app's entire life. Maintenance is the largest of the 3: Android and iOS each force compatibility updates roughly once a year, and an unmaintained app eventually stops working on new devices or gets delisted. A proposal that stops at launch is hiding that cost rather than removing it, so I scope and quote across the whole life.",
      primaryRoute: "/services/mobile-app-development",
    },
    {
      id: "native-vs-cross-platform",
      question: "Is cross-platform or native development better?",
      answer:
        "Cross-platform with React Native or Flutter builds one codebase that ships to both Android and iOS, cutting cost substantially and keeping the two versions in step. That is the right choice for the large majority of business applications — content apps, booking systems, internal tools, e-commerce. Native development, meaning Kotlin for Android and Swift for iOS, becomes worth its roughly doubled cost when an app depends heavily on device hardware, demands sustained high frame rates, or needs platform features the moment they launch. Games and camera-centric applications belong here. For a Nepali business weighing the two, the decisive factor is usually budget against feature depth: cross-platform delivers a working product on both platforms for what native costs on one. I recommend cross-platform unless a specific hardware or performance requirement rules it out, and I will name that requirement rather than gesture at it.",
      primaryRoute: "/services/mobile-app-development",
    },
  ],

  faqs: [
    {
      id: "faq-app-timeline",
      question: "How long does app development take?",
      answer:
        "A straightforward cross-platform app takes 10 to 16 weeks to first release. Add 2 to 3 weeks for store review and the fixes reviewers request — Apple in particular rejects first submissions routinely, and building that round trip into the timeline avoids an unpleasant surprise near launch.",
    },
    {
      id: "faq-app-store-publishing",
      question: "Do you handle App Store and Play Store publishing?",
      answer:
        "Yes, including store listings, screenshots, privacy declarations, and the review process. Developer accounts are registered under your business rather than mine, so you own the listing outright and are never dependent on my account to publish an update.",
    },
    {
      id: "faq-app-offline",
      question: "Can the app work without an internet connection?",
      answer:
        "Yes, and in Nepal it usually should. Offline-first architecture stores data locally and syncs when connectivity returns, so a user filling a form on an intermittent connection does not lose their work. It adds complexity and cost, and for most Nepali users it is worth both.",
    },
    {
      id: "faq-app-maintenance",
      question: "What ongoing maintenance does an app need?",
      answer:
        "Android and iOS both require compatibility updates roughly annually, and an app left unmaintained will eventually be delisted or stop functioning on new devices. Budget for ongoing maintenance from the outset rather than treating it as an optional extra later.",
    },
  ],

  deliverables: [
    "Cross-platform application for Android and iOS from one codebase",
    "Offline-capable architecture where connectivity is unreliable",
    "Push notification setup",
    "Backend API and hosting configuration",
    "Store listings, screenshots, and submission handled end to end",
    "Developer accounts registered under your business",
  ],

  process: [
    {
      step: 1,
      title: "Does this need to be an app?",
      description:
        "An honest assessment first. If a responsive website solves the problem for a fraction of the cost, that is what I will recommend, and it costs you nothing to hear it.",
      duration: "3–5 days",
    },
    {
      step: 2,
      title: "Design and architecture",
      description:
        "Screens designed for mid-range Android devices, with data architecture planned around intermittent connectivity from the start.",
      duration: "2–3 weeks",
    },
    {
      step: 3,
      title: "Build",
      description:
        "Cross-platform build with backend and API. Android prioritised, given its share of the Nepali market.",
      duration: "6–10 weeks",
    },
    {
      step: 4,
      title: "Store submission",
      description:
        "Listings, screenshots, privacy declarations, and the review cycle — with time allowed for the rejections that routinely happen on first submission.",
      duration: "2–3 weeks",
    },
  ],

  outcomes: [
    "50,000+ downloads on the Cricket Nepal mobile application",
    "Offline-tolerant behaviour on unreliable connections",
    "One codebase serving both Android and iOS",
    "Store accounts and listings owned by the client",
  ],

  tools: ["React Native", "Flutter", "TypeScript", "Firebase", "REST APIs", "Google Play Console", "App Store Connect"],

  proof: [
    {
      anchor: "cricket-nepal",
      label: "Cricket Nepal mobile application",
      result:
        "50,000+ downloads, delivered as part of the programme that won ICC Digital Fan Engagement Awards in 2023 and 2024.",
    },
    {
      anchor: "uws-nepal",
      label: "UWS Nepal",
      result: "Mobile delivery for a nationwide education organisation.",
    },
  ],
  relatedServices: ["web-development", "custom-software-development", "ai-automation"],
  publishedAt: "2026-07-25",
  updatedAt: "2026-07-25",
};
