---
publishedOn: 2020-01-24
title: Startup Ideas from January 2020
subTitle: With focus on the content creation domain
heroImg: /img/content/posts/product-ideas-jan-2020.png
slug: startup-ideas-from-jan-2020
tags:
  - ideas
author: shivekkhurana
---

*Cover Photo by [Stoica Ionela](https://unsplash.com/@pupile_gustative?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/idea?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)*

Writing ideas down allow them to rest and germinate. This is an attempt to log my thoughts so I can refer them later.
If you are wondering, "Aren't ideas to be kept secret?", my personal opinion is no, because ideas are cheap. It's only the execution that matters.

For this version, I have been thinking about two products. Both of them are in the content creation/ blogging domain. 

They are:

# JAM Stats
## Static Website Analytics Powered by Google Sheets

With the rise of static site publishing and headless CMSes, there is a trend to shift personal blogs and other small sites to JAM. 

*Problem*

But the available analytics solutions are not upto the mark:
- Google Analytics (and Yandex Metrica) steal your data 
- Mixpanel (and the likes) are very Enterprisy
- Simple analytics and Fathom analytics are paid and not enough for a serious blogger

*Solution*

- A service that records your analytics in a Google Sheet
- A template that creates Graphs and Filters so you can make sense of your data

*Implementation*

- We get write access to SheetsAPI
- Create a serverless POST route to save page views in Google Sheets
- Create views to make sense of this raw data
- A js file that you drop in and configure like GA
- GDPR compliant, we drop no cookies or personal identifiers
- An API to send custom events (React first, hooks etc)

*Pricing*
- Free as long as your data fits in Google Sheets (this becomes our acquisition channel)
- Paid solution for clients who are hooked in already

*Hypothesis to test*
- Do JAM stack bloggers are want free analytics?
- Do JAM stack bloggers understand the risks of sharing data with big corps?

# Shakespear AI
## Enhance your prose by using expressions from all known literature

*Problem*

"I'm a spinach farmer" can also be expressed as "I teach the Earth to speak Spinach instead of Grass".
Poetic creativty is only a matter of inputs. It's hard to absorb large amounts of inspiration and summon it at will.

*Solution*

Shakespear.AI suggests poetic alternatives to your text as you type.

*Implementation*
- Crawl books in public domain
- Crawl public social sites for contemporary expressions
- Create a web app, similar to Grammarly, except we don't care about grammatic errors (maybe include them?) 
- Suggest poetic alternatives as the user types

*Pricing*
- Subscription?

*Hypothesis to test*
- Do writers want creative expression?

---

Would you like to use any of the above? Did you have similar ideas? 
I'd be happy to talk about it on Twitter! 

Ty.
