---
title: How we used Clojure's concurrency model to help 12000 people sustain the pandemic
subTitle:
tags: clojure, karuna 2020, pandemic, concurrency
publishedOn: 2020-04-30
featured: false
heroImg:
slug: clojure-core-async-to-sustain-12k
---

On March 4, 2020, I saw that my friend Anand was building an open platform to help an NGO. This group had designed a [Food and Health Kit](https://karuna2020.org/guides/ration-and-safety-kit-assembly/) and established safety protocols. I called him up and found myself on a conference the next day. 

15 odd people, whom I had never met before were trying to serve the community. They had already raised Rs. 700000 (~ $ 9000) in personal capacity and had partnered with an NGO to handle on ground distribution. The group was big on not letting any volunteer go on ground due to safety risks. 

The optimist in me saw a set of volunteers with good intentions, trying to do their best to support the community. 
The pessimist in me saw the restrictions due to lockdown and  the general fear in the air.

The realist in me saw a 35 page Excel Sheet horror, which was supposed to be our central control panel  to manage this operation. 
We had to raise funds, procure raw materials, pack them, transport them to the place of supply, distribute them while collecting proofs of distribution. 

We also had to convert these pictures into social media posts and  update our donors about the distributions.
 
We had to send tax receipts to new and existing donors. We had to train volunteers to handle these processes. We needed to handle requests that would come from various sources, validate the list of beneficiaries and arrange on ground support.

We were basically JavaScript version 0.1. But instead of being built in 15 days, this organization was built in 5. It was not ideal, but given the runtime we had to operate on, we were good enough to get the job done. At least that's what I thought.

# Karuna 2020 Runtime -  v1
The organization was similar to JavaScript runtime. We had an event loop. There were asynchronous tasks that needed to be finished in order and we had a Promise like mechanism.

![](/img/content/posts/karuna-runtime-v1.png?large)
*A simplified view of the organization - The arrows represent flow of information*

There was a central coordinator - aka the "main thread". The main thread would call "async functions". These functions were actual volunteers who'd do some work in the real world and return a response. For example, we might call the Godown Manager to get inventory status. 

Most functions were tightly coupled, if one failed, the "main thread" will have to abort. Excel was our Global Scope, STDOUT, STDIN.

> The process was operating in-memory -  literally inside the central coordinator's brain. This made it hard to resume in case of errors, or transfer to other machines.

Our interrupts were actions from the outside world, for example, "A donor donating". Interrupts to had to be handled on the main thread. This clogged the system even more. 

On top of that, we didn't have any form of Garbage Collector. All comments, status updates, from both successful and unsuccessful executions would stay in Excel until the end of time, or end of Google, since it was a G-Sheet. 

Due to the humanly existence of our main thread, it was way more complex than a JavaScript thread. Mainly because he had to attend to other chores of life.
 
Our main thread was running hot, and unlike a Devops Engineer, we didn't have the ability of to run multiple nodes behind a load-balancer.

# The JavaScript Async Model was failing us

We had already done the most natural thing. We divided responsibilities and synchronized with the main thread. 
Volunteers had well defined roles and tasks, just like Classes in an OOP Language. They encapsulated data and had public methods to communicate. 

The problem with our system, just like with every computer program, was side effects and state.

> The central coordinator became the God Object. And  due to async nature of the system, it became hard to diagnose problems.

For example, if we had inventory to provide for 100 families and three requests A, B and C for 50 kits each. And request A failed validation, then should we try and fulfill B and C or wait for A to pass validation. And how to decide this without the God Object. Because God has umpteen other things to look after.

This also lead to poor utilization of available volunteers and also led to attrition. Since everything was happening on the main thread, it became hard to untangle and divide work. 

The programmer inside me saw JavaScript being born once again. All the real world interrupts and tightly coupled methods were perfect ingredients for spaghetti.

> When opportunity presented, I volunteered to be the coordinator, the "main thread". I didn't fully understand the nature of work or the efforts it would need. 

In 48 hours, I called the last coordinator and told him that I don't understand anything. To which he smiled and said that give it some time, you'll get a hang of it.

As with most work I do, I wanted to eliminate myself from the system. But the JavaScript model of execution relied on the "main thread".

# From JS Async to Clojure Concurrency
My understanding about Go model comes from my experience with Clojure. Clojure has native support for Go like channels. 

After being the central coordinator for a while, I wanted to: 
- Reduce or completely remove dependancy on myself (the "main thread") for running tasks
- Allow for fast contribution, i.e. a volunteer should be able to take over a task without knowing the complete mechanics
- Get a real time birds eye view of all parameters
- Streamline all tasks and distribution requests that came over phone and WhatsApp groups

What we ended up with was similar to Go channels like concurrency, but I realised this only in retrospective.

## Everyone is just a function
So far, everything was inside the coordinator's head and hard to consume Excel dumps. My first task was to isolate all processes and move them to a Kanban board. We chose Airtable because of it's flexibility and a generous free tied. They also offered us the pro plan for free.

I started by isolating the [Donor Lifecycle Management](https://karuna2020.org/guides/donor-lifecycle-management/) process. 
My idea was inspired by the project management workflow at my last company. A request comes in and moves across stages. Each progression is handled by the same or different volunteer.

I also made sure that the guides were like pure function definitions, ie had no state. 

For example, the donor management process broadly had 4 pure steps:
1. Get notified about a donation (happens via an SMS from bank)
2. Identify the donor: could be someone from a personal reference or someone who donated via the website
3. If identified, contact them and fetch details like address to generate a receipt. After getting details, mark as "Ready for generating receipt"
4. If not identified, add an empty record and mark as "Receipt not needed"

![](/img/content/posts/donor-lifecycle.png?large)
*A contrived version of Donor Lifecycle management*

In reality, the Airtable board had more columns to handle edge cases. But the idea was the same. 
> A volunteer needs to process only one stage at a time. All "state" needed to process that stage is available on the card.

We essentially pushed side effects to the edges of the system and made each volunteer a pure function. We also published guides about handling
these states and moving cards from one channel to other.

## ~Communicate with Main Thread~ Move over channels or queues
We were able to achieve Clojure like channels that solved the problem of a hot running "main thread". The system was horizontally scalable now.
We onboarded volunteers and assigned them a task. We also got a bird's eye overview for free.

Over time, we wrote similar guides for [Volunteer Onboarding](https://karuna2020.org/guides/volunteer-application-and-onboarding/), [Social Media Outreach](https://karuna2020.org/guides/social-media-outreach/) and [Distribution Management](https://karuna2020.org/guides/distribution-management/). We also had processes for Procurement and Accounting, but we have not been able to generalize them yet.

![Karuna Airtable Base](/img/content/posts/karuna-airtable.png?large)
*Our Airtable base as of today*

This system took multiple iterations and feedback from the entire team.

> I was happy to see other volunteers pointing out mistakes and improvements in the guide. I think this truly worked because 2 of the volunteers onboarded by me, used the guides and onboarded 4 more people.

Since [all our data was open source](https://open-data.karuna2020.org/), we could easily issue pull requests to update the guide. Anand had setup Github actions to rebuild the site periodically, which meant all updates would go live within 24 hours.

I was pleasantly surprised at Anand's velocity. The man built this website update mechanism in less than 48 hours. Another 24 hours for integration with the static website. Perhaps less than that. 

## The intellectual lesson
> Use queues everywhere

Queues make our life easy. I recalled Rich Hickey's talk about queues and [core.async](https://www.youtube.com/watch?v=9HspeHGBg-Q) and was amazed at his first principles approach. We as a team, literally implemented the high level concepts of CSP to a real, async and multi-threaded system.

## The system in action
I considered it my responsibility to test the system and make improvements. So the developer in me picked the phone and called a beneficiary who had requested a dry ration kit.

We had received a request from a women who took tuitions for underpriveleged children. She told us that some of her students' families were facing issues due to lack of supplies.

These kids were not more than 12-15 year old. Yet, they took the intiative to contact us and to provide us with a list of beneficiaries and other required docs.

I called the kid up and asked if her mom or dad was nearby. 

> She connected me to her father, who told me that they had run out of food two days ago. He was now going out to buy vegetables. He told me that his children were hungry.

It was overwhelming to hear that. I had tears in my eyes and wanted to help them as soon as possible.

Until now, I was just building a system like any other. After realising the situation on-ground, I wanted it to succeed even more.
We delivered kits to these families within 72 hours of receving the request. The delays were majorly due to restriction in movement due to regulations.

Our process was to [capture pictures of beneficiaries and post them publicly](https://karuna2020.org/updates/500-kits-to-womens-collective-gulmeher/). We made sure to blur faces. This transparency led to more donations.

# Our impact
We raised almost 2000000 INR ($ 27000) in less than 35 days, in cash and kind. We estimate that we have helped over 10000 people with food and health supplies for 1 month and another 20000 with masks. 

We are happy with the impact we made, but also realise that our relief work is peanuts compared to the damaged caused by the disease.

> When all hope is lost, our only option is to stay hopeful.

# Going forward
We are working to continue our efforts and have decided to focus all attention on a community of 500 families.

We are also planning to setup a similar process to address mental health issues that are arrising due the virus.

---
Feel free to send any questions, or thoughts on this article on twitter @shivek_khurana.
