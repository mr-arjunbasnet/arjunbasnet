---
title: "AI Automation Examples in Nepal: What Ten Kinds of Business Actually Automate"
description: "Ten Nepali business types, the one process each automates first, the tool, the human checkpoint, and what it costs to run. Plus the three automations never worth building."
publishedAt: "2026-09-18"
cluster: "ai-automation"
readingMinutes: 9
tags: ["AI Automation", "n8n", "Nepal", "Examples", "Operations"]
keywords:
  - "AI automation in Nepal"
  - "AI automation examples"
  - "business automation Nepal"
  - "robotic process automation Nepal"
  - "n8n automation examples"
keyTakeaways:
  - "The first automation worth building in almost every Nepali business is the same: turning an inbound enquiry (WhatsApp, form, email) into a structured record with an acknowledgement sent within a minute."
  - "A self-hosted n8n instance runs on a server costing roughly USD 5 to 10 a month and handles thousands of workflow runs for that flat price; the language-model calls on top typically add less than the server for a small business."
  - "Every automation in this list keeps a person at one checkpoint: the point where the output is sent to a customer, a bank, or a regulator. Automating the checkpoint itself is where businesses get burned."
  - "Three things are never worth automating: a process that runs under twenty times a month, one whose inputs arrive as photos of handwriting, and one where the rules change every time you ask."
serviceSlugs: ["ai-automation", "custom-software-development"]
heroImage:
  src: "/media/blog/ai-automation-examples-nepal.jpg"
  alt: "A whiteboard process map showing an enquiry flowing from WhatsApp into a spreadsheet, an automatic reply, and a CRM"
  width: 1600
  height: 900
faqs:
  - id: "faq-which-first"
    question: "We are a small business. Which of these should we do first?"
    answer: "The enquiry-to-record one, almost regardless of sector. It is the process every business runs, it is the one where slowness costs sales, and it is simple enough to be live within a week. Once it has run for a month you will have a clean record of what people ask, which tells you what to automate second."
  - id: "faq-nepali-language"
    question: "Do these work with messages in Nepali or Romanised Nepali?"
    answer: "Yes, with a caveat. Current language models read Devanagari Nepali and Romanised Nepali well enough to classify an enquiry and extract names, dates and quantities. They are less reliable at writing polished Nepali replies, so the reply templates in these workflows are written by a person and the model only fills in the fields."
  - id: "faq-run-cost"
    question: "What does an automation cost to run each month?"
    answer: "For a small business: a server for n8n at roughly USD 5 to 10 a month if self-hosted, plus language-model API usage, which for a few hundred enquiries a month is usually a few dollars. Zapier or Make instead of n8n replaces the server cost with a per-task subscription that rises with volume. The build is the real cost; running it is modest."
---

The [test for whether a process is worth automating](/blog/is-this-process-worth-automating) is well understood by now. What people actually ask me is narrower: *what would this look like for a business like mine?*

So here are ten kinds of business I see in Nepal, the one process each of them automates first, and what it involves. The tools are the same across all ten: [n8n, usually self-hosted](/blog/n8n-vs-zapier-vs-make-nepal), a language model API for the steps that need judgement, and whatever the business already uses for messaging and records.

## The pattern behind all ten

Every automation below has the same shape:

1. A **trigger** — a message, a form, a file, a time of day.
2. A **structured record** — the messy input turned into fields.
3. An **action** — a reply, a document, an entry in another system.
4. A **human checkpoint** — one person who sees the output before it goes anywhere that matters.

The checkpoint is not a weakness in the design. It is the design. Automating the checkpoint itself is the version of this that goes wrong.

## Ten businesses, ten first automations

| Business | Process automated | Trigger | Tool | Human checkpoint | Running cost / month |
|---|---|---|---|---|---|
| Retail or wholesale shop | Enquiry → quotation | WhatsApp or web form | n8n + Sheets + Claude API | Owner approves the quote before it is sent | Server + a few USD of API calls |
| Travel agency | Itinerary request → draft itinerary and price | Email or form | n8n + Sheets + Claude API | Agent edits and sends | Same |
| Education consultancy | Student enquiry → CRM record, document checklist, reminder | WhatsApp or form | n8n + Google Sheets/CRM + SMS | Counsellor reviews the checklist weekly | Server + SMS costs |
| Hospital or clinic | Appointment request → slot confirmation and reminder | Form or missed call | n8n + calendar + SMS | Front desk sees exceptions only | Server + SMS costs |
| Manufacturer | Purchase order PDF → line items in the order sheet | Email attachment | n8n + Claude API + Sheets | Dispatch confirms quantities | Server + API calls |
| Real estate agency | Listing enquiry → matched properties reply | Form or WhatsApp | n8n + Sheets + Claude API | Agent approves before sending | Same |
| Hotel | Booking enquiry → availability check and reply | Email or form | n8n + PMS/calendar + Claude API | Reservations desk approves quotes over a threshold | Same |
| NGO | Field report → structured data and weekly summary | Google Form or email | n8n + Sheets + Claude API | Programme manager reads the summary | Server + API calls |
| Law or accounting firm | Client document intake → checklist and missing-items notice | Email attachment | n8n + Drive + Claude API | Associate verifies before the notice goes out | Server + API calls |
| E-commerce store | Order → delivery update messages and failed-delivery follow-up | Order status change | n8n + store webhook + WhatsApp/SMS | Support handles failed deliveries only | Server + messaging costs |

The **running cost** column is deliberately boring. A small server for self-hosted n8n costs roughly USD 5 to 10 a month and runs thousands of workflow executions for that flat price. Language-model calls for a few hundred enquiries a month typically cost less than the server. SMS is the one line that scales with volume, because Nepali gateways charge per message.

## A closer look at four of them

### The retail quotation

This is the one I have built most often and [described in detail elsewhere](/blog/automate-quotation-generation). A customer sends "20 bags of 50kg cement, delivery to Bhaktapur, price?" on WhatsApp. The workflow extracts the product, quantity and location, looks up the current price sheet, drafts a quotation, and puts it in front of the owner with one button: send.

Before automation, the owner did this by hand between other things and answered in an hour if they were free. After, the customer has a quote in two minutes and the owner has spent ten seconds. The checkpoint stays because prices change and the owner knows things the sheet does not.

### The consultancy enquiry

Education consultancies in Kathmandu lose students in the gap between the first message and the first call. The workflow takes a WhatsApp or form enquiry, creates a record with the student's target country, intake and qualification, sends an acknowledgement with the document checklist for that country, and schedules a reminder for the counsellor.

The interesting part is the weekly review: the counsellor sees every enquiry that has had no human contact in three days. That list did not exist before, because nobody was keeping it.

### The manufacturer's purchase orders

A manufacturer receiving purchase orders as PDFs by email was retyping each one into their order sheet. The workflow reads the attachment, extracts the line items, and adds them to the sheet with the PDF linked. Dispatch checks the quantities against the physical order before anything ships.

This one has a limit worth naming: it works on typed PDFs. Purchase orders that arrive as photographs of handwritten forms go to a person, and the workflow knows to route them there rather than guess.

### The NGO's field reports

Twenty field officers submitting weekly reports as free text produced a pile nobody could read in aggregate. The workflow turns each report into structured fields (district, activity, beneficiaries, issues), and every Monday drafts a one-page summary for the programme manager, with the outliers flagged.

The summary is a draft. The manager reads it, corrects it, and sends it. The value is that reading twenty reports became reading one page and checking three things.

## The three that are never worth it

I get asked about these regularly and the answer is always no.

**Anything that runs fewer than twenty times a month.** Building an automation costs more than doing the task by hand for a long time if the task is rare. The [threshold I use](/blog/is-this-process-worth-automating) is frequency first, then everything else.

**Anything whose inputs are photographs of handwriting.** Models are improving here, but a workflow that is right 85% of the time on handwritten forms creates more checking work than it removes. Fix the input first: a typed form, a template, a photo of a printed page.

**Anything where the rules change when you ask.** If two people in the business give different answers to "what happens when a customer asks for credit?", there is no process to automate yet. Write the rule down, run it by hand for a month, then automate it.

## Where to start

If your business is not in the table, it almost certainly still has the first row: an enquiry arriving somewhere, waiting for a person, and turning into a record only if someone remembers. That is the one to build first, and the [seven processes worth automating first](/blog/processes-worth-automating-first) covers what usually comes next.

If you would like me to look at your specific process, the [AI automation service page](/services/ai-automation) explains how a scoping conversation works and what it costs. If the process needs a system of its own rather than a workflow on top of existing tools, that becomes a [custom software](/services/custom-software-development) conversation instead, and I will say which one it is.
