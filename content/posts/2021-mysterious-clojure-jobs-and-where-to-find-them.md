---
publishedOn: 2021-06-17T14:00:06.357Z
title: Should you adopt Clojure at your company?
subTitle: TL; DR; If you have already learnt it or have the time to do so, then yes
featured: true
heroImg: /img/content/posts/artboard.png
slug: making-clojure-jobs
tags:
  - clojure
relatedSlugs:
  - clojure-jobs-and-where-to-find-them
  - clojure-424-days
  - clojure-drug-dealer-part-1
  - clojure-repl-flow-state
  - clj-learn-once-run-anywhere
author: shivekkhurana
---
*Photo by [Matt Palmer](https://unsplash.com/@mattpalmer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/wizard?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

I have been writing Clojure professionally for the past 5 years, but I still, have a hard time recommending Clojure to friends and clients. My friend Anand, co-founder of [Pabio](https://pabio.com) aptly [said](https://youtu.be/O-bVJoWULBE?t=2228) that:

> JavaScript for me is a language for making prototypes, and not a system that you want running after a decade from now.

Although I'm a Clojure fan-boy and advocate, the realist in me knows that Anand is right. Clojure has an adoption problem.

## What is Clojure?

Clojure is a functional LISP that with a futuristic feedback loop. It's hosted, has a strong following, and often reaches the first page of Hacker News. I'll not go into the details of the language as [many](https://simongray.github.io/essays/spread.html) [articles](https://medium.com/swlh/what-i-learned-after-writing-clojure-for-424-days-straight-8884ec471f8e) [already](https://itrevolution.com/love-letter-to-clojure-part-1/) [exist](https://blog.cleancoder.com/uncle-bob/2019/08/22/WhyClojure.html) about this topic. Clojure's simplicity and expressiveness is a recurring theme in most descriptions of the language.

But this article is not about Clojure's beauty. It's about the challenges (and possible solutions) that stand in the way of mass adoption. It's not about being a successful artist, it's about being successful at the art bazaar.

## What is the adoption problem?

Despite the widespread praise about the Clojure language, we cannot refute the fact that it's hard to find Clojure developers. On the other hand, it's also hard to find a Clojure job.

The problem turns into a chicken and egg paradox. There won't be enough developers until there are enough jobs, and there won't be enough jobs until there is a big talent pool.

A small talent pool leads to a small open-source footprint and prevents network effects. If few developers write Clojure, fewer new developers will be introduced to the language, amplifying the chicken and egg problem. This is countered to some extent because Clojure is hosted and can tap into vibrant eco-systems of JavaScript and Java.

## Writing software is the easy part of running a software company

All software is a tool to solve a real-world problem. Companies and organizations exist to solve real-world problems. Until the 1950s, real-world problems were solved by war. Post the second world war, we shifted to data-oriented solutions.

As software developers, we concern ourselves with the issues about our domain. For a person who can code, every problem is an opportunity to make a SaaS company. But if we zoom out and look at some successful companies, we'd know that larger risks exist in the market.

Markets change and we need to react. There is a competition or lack of demand. There are legal issues and privacy issues. A bad culture could lead to people issues. And most of these are beyond our control. Looking at the full picture, we see that software is the most predictable and risk-free aspect of a software company. Since this blog's audience is mainly software developers, I usually don't talk beyond software. But this specific topic of basing your stack on Clojure requires me to address the other things that go into making good software.

All good software companies start with a strong grasp of the market and grow with a strong culture and the ability to react. If you have zero users, you will probably be solving technical problems. If you have hundreds or thousands of users (depending on your market) you'll be solving sales and marketing problems.

Once you have crossed maybe a million users mark, you step into the realm of people and cultural problems. And post 10 million, you have to face political problems.

## All languages are tools and all tools are good enough

From a zoomed-out perspective, all languages are tools. And all mainstream tools like Java, JavaScript, TypeScript, Ruby, etc are good enough. An experienced JS developer is as effective as an experienced Clojure developer at building software.

Although all languages are good enough, some of them offer special capabilities. Like C++ and Rust are close to the metal. Go, Elixir and Clojure have excellent concurrency primitives. Java, JS has the largest talent pools. Python has the support of the ML community. TypeScript has Microsoft.

These are broad generalizations. Most languages have overlapping strong points. Python has a large talent pool along with being the language of choice for data science.

Then how do you decide what tool to use? And when do you pick up something like Clojure? To answer these questions, we need to analyze the usefulness of tools from the perspective of a "software company".

## Properties of good tools

We have already ascertained that writing software is the easy part and risks lie outside our servers: in the market, in the culture, in the political scenario. That being the lens of our camera's perspective, a good tool should have the following properties.

### Make your process easy

A table-saw makes it easier to cut wood. Hasura GraphQL engine makes it easier to ship APIs. Postgres makes it easy to store data. Functional languages make it easy to handle side effects.

### Be easy to comprehend

Complicated concepts do not survive the test of time, and are eventually replaced with simpler alternatives. It's hard to find a counter-example because most tools that reach mainstream usage are easy to comprehend.

### Extend like legos

Good tools are pluggable because an architect relies on multiple tools. REST APIs are a great concept. The SaaS community shifted radically from the server-rendered MVC pattern to REST APIs. You can argue that the shift was due to the explosion of clients (mobile, desktop, IoT), but it still serves the argument. A tool that can be modified and extended can serve more purposes.

### Last for long, ideally forever

There is a cost associated with mastering a tool. And if the tool dies before you have reaped a significant return on investment, then you made a bad deal.

### Get out of your way

A tool is designed to ease your process, not dictate it. It's okay to have rules and limitations on what a tool can do, but it should never dictate the how.

### Make you feel confident about the work produced

A tool is no good if you cannot be confident that your app will run. Tests, Types, Pure Functions, and Side-Effect free systems are examples of tools that provide this confidence.

### Enable you to react to market

Ultimately, you survive because you adapt to the market's condition. According to Rich Hickey, the single largest factor that decides how quickly you can react is the code you have right now. He calls it the "elephant" in the room. I believe the same, but Rich Hickey saying this adds a lot more credibility:

> Simplicity is hard work. But, there's a huge payoff. The person who has a genuinely simpler system - a system made out of genuinely simple parts, is going to be able to affect the greatest change with the least work. He's going to kick your ass. He's gonna spend more time simplifying things upfront and in the long haul he's gonna wipe the plate with you because he'll have that ability to change things when you're struggling to push elephants around

*Rich Hickey \[<https://www.infoq.com/presentations/Simple-Made-Easy/>]*

## Clojure is an exceptional tool

Clojure is almost as pure and sophisticated as Haskell, and as easy as Python or JavaScript. The syntax might seem off, but the returns on learning the syntax are astronomical, because of the REPL.

It gets your way and lets you tap into rich library eco-systems of Java and JavaScript. Many functional languages suffer due to a lack of open-source network effects. Clojure bypasses the issue by feeding off network effects of other ecosystems.

And no praise is enough to describe the REPL. It accelerates development to an extent that most other languages can't even imagine. I always wondered if there was a REPL for other languages. There are simpler versions for JavaScript like [Quokka.js](https://quokkajs.com/). [u/didibus](https://www.reddit.com/user/didibus/) pointed out Clojure properties that enable the Clojure REPL on this [Reddit thread](https://www.reddit.com/r/Clojure/comments/mh4iau/does_jsgorust_or_any_other_famous_language_have_a/gtwojpl/?context=3).

It would be unfair to say that Clojure is the only exceptional tool so please consider this to be a personal opinion. Clojure is balanced. It makes hardcore mathematical concepts, commercially feasible.

## Should you choose Clojure?

This is the trick question. There is no right answer but experiences and opinions to build on.

In my opinion, you should not learn Clojure at your own expense. If you are building a company and have no prior Clojure experience, then it would be a terrible choice. It will slow you down and will hinder you from focusing on the market.

[Paul Lam](https://github.com/Quantisan)'s (VP Engineering at [Motiva AI)](https://www.motiva.ai/team/) comment on [this topic](https://www.reddit.com/r/Clojure/comments/nppafm/should_i_switch_frontend_of_my_startup_to/) captures the essence of this idea:

> Are you building a startup or are you churning out code? If you have time to consider these questions then you're not selling enough. You need to stay focused on the business.
>
> If you want to tinker, then do that on other people's dime or save that for a hobby project.

If you already know Clojure, it becomes your super-power. It gets out of your way and helps you focus on the market. It may be hard to find Clojure talent, but it's not hard to nurture it. Clojure might not be the easiest language to get started with, but senior developers can pick it just like any other language. [Here's what Reddit thinks](https://www.reddit.com/r/Clojure/comments/nrl64e/have_you_had_trouble_recruiting_clojure_developers/) about the Clojure hiring situation. From my personal experience, Clojure companies hire regardless of Clojure experience.

[u/bostonou](https://www.reddit.com/user/bostonou/) introduced Clojure at Vanderbilt university:

> I helped introduce Clojure at Vanderbilt University working in genetics research. I then moved to a Clojure startup, did some Clojure consulting, and now do Clojure at CircleCI. Overall I’ve been doing Clojure professionally for ~8 years.

[Adam Nielson](https://www.linkedin.com/in/aaneilson/?originalSubdomain=uk), CTO of [WeFarm](https://about.wefarm.com/) said:

> We've used Clojure at the heart of our stack for the last five years and I consider it one of our superpowers.
>
> It was less a leap of faith but a decision based on exceptionally positive previous experiences. I first trialed and adopted Clojure at a health tech company back in 2013 and then built a marketplace startup for hobbyists and collectors with it in 2014. Both times were productive and fast time to market. The composability of lisp and FP makes rapid reliable development not only achievable but the norm.

## How tough is it to hire Clojure talent?

Adam from [WeFarm](https://about.wefarm.com) also has a unique perspective on hiring Clojure developers:

> Over the years I’ve also discovered that hiring for Clojure is also different in a positive way. In more mainstream languages I’d get a huge stack of CVs. Amongst them would be great and not-so-great candidates and it’d be a lot of effort filtering the wheat from the chaff. With Clojure roles, the pile of CVs is a fraction the size but you can guarantee 99% of the candidates have a curious and investigative character that enjoys learning new things. Exactly the characteristics I look for in candidates!

The "curious investigative character" of people who write Clojure has held in my personal experience. No one would take the trouble of learning a language like Clojure (or Haskell) unless they deeply care about their work. This property will hold until Clojure jobs become as plenty as JS jobs.

At my company [Status](https://status.im), we hire regardless of Clojure experience. Since we are an [open-source](https://github.com/status-im/status-react) company, we pick up simple issues that we believe any engineer should be able to solve regardless of the language. All prospective hires are expected to pick one issue and raise a PR as a coding challenge (candidates are compensated for their work). Status is hiring for its [React Native based app written in ClojureScript](https://status.im/our_team/jobs.html?gh_jid=3148270) if you are interested!

[Anson MacKeracher](https://www.linkedin.com/in/amackera/?originalSubdomain=ca), CTO of [LegalMate](https://www.legalmate.co/) says:

> I chose to use Clojure due to the incredible caliber of the average Clojure developer, because it's virtually perfect for web applications and data processing, and because developer productivity is much higher than in other languages I've used (Python, Perl, Ruby, JS).

If you are a part of a big company, training talent internally too is a viable option. I have seen a company take over a 5-year-old codebase and develop a 20 person team around it. The entire transition took about 8 months.

## Conclusion

I'm a Clojure fan, but more than that I'm a problem solver. And Clojure is not the right tool for everything. If your problem involves handling a ton of data and building APIs and UIs, Clojure is a great system. If you want to quickly build a team around your project then probably not. Clojure is a super-power that enables you to better react to changes outside the system.

Recommending Clojure was hard because of a lack of talent and resources. But I feel this is changing. To contribute to the change, I [built a course](https://krimlabs.com/courses/tinycanva-clojure-for-react-developers) about how to build React applications with Clojure. I also collected a [list of free resources](https://krimlabs.com/courses/tinycanva-clojure-for-react-developers#more-resources) that you can use to jump-start your Clojure journey.