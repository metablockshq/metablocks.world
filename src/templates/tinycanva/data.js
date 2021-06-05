import React from "react"

import manLaptop from "../../images/emoji/man-technologist-light-skin-tone.png"
import womanLaptop from "../../images/emoji/woman-technologist-medium-skin-tone.png"
import brain from "../../images/emoji/brain.png"
import sparkles from "../../images/emoji/sparkles.png"
import movieCamera from "../../images/emoji/movie-camera.png"

const WeLoveClojure = () =>
      (<div className="lh-copy">
	 <p>But LISP syntax, small talent pool, <span className="b">unorthodox development process</span>, and lack of types make it tough to pickup or recommend.</p>
	 <p>That’s why we built this course! So we can recommend Clojure to our friends and clients.</p>
       </div>)

const WhoMadeThisCourseAnswer = () =>
      (<>
	 <p>Shivek Khurana is a Senior Clojure Developer at <a href="https://status.im" className="underline">Status</a>, one of the
	   <span className="b"> largest open-source ClojureScript <a href="https://github.com/status-im/status-react" className="underline">codebase</a></span> with over 6400 commits.</p>
	 <p>Before joining Status, he worked at <a href="https://juxt.pro" className="underline">JUXT</a>, the company behind <a href="https://github.com/juxt" className="underline">Yada, Bidi and, Crux</a> as a Senior Consultant building enterprise applications.</p>
	 <p>He has helped small startups and a few large enterprises build products at a 10million+ user scale.</p>
       </>)

const WhoIsThisCourseFor = () =>
      (<>
	 <p>This course is designed for <span className="b">Senior Developers</span> who are well versed with another language and want to grow more in the realm of functional techniques with Clojure.</p>
	 <p>It is also designed for <span className="b">Tech Leads</span> and <span className="b">Hiring Managers</span> who want to nurture Clojure talent inside their teams.</p>
       </>)

const WhatCanYouExpectToGain = () =>
      (<>
	 <p>In the short term, you will have a Clojure set up, understand the syntax, the tooling, and discover the joy of the REPL. You'll also be able to transfer your existing knowledge about frontend routing, state management and React to Clojure land.</p>
	 <p>In the long run, <span className="b">Clojure helps you think in a scalable way</span>. The ideas from Clojure will seep into other parts of your professional life, and in extreme cases, in your personal life.</p>
       </>)

const WhatWillYouBuild = () =>
      (<>
	 <p>The course is available in two modes, a free version (reduce mode), meant for auditing the classes and course contents, and a full version (transduce mode), meant to jump-start ClojureScript learning.</p>
	 <p> The free version introduces the basics of the language, and the full version walks through building a <span className="b">full-fledged web-based graphics editor app from scratch</span>.</p>
       </>)

const ModeOfDelivery = () =>
      (<>
	 <p>The course consists of <span className="b">2h 27 minutes of video content, 41 text lessons</span>, and source code for each lesson.</p>
	 <p>The delivery is managed by our partners at <a href="https://newline.co" className="underline">Newline</a>, an online publishing platform with <span>40+ courses and 50,000+ registered learners</span>.</p>
	 <p>Your data and payments are handled directly by Newline and are subject to their <a href="https://www.newline.co/tos" className="underline">terms of service</a> and <a href="https://www.newline.co/privacy" className="underline">privacy policy</a>.</p>
       </>)

const qAndAs = [{
  emoji: manLaptop,
  question: "Who made this course?",
  answer: WhoMadeThisCourseAnswer
}, {
  emoji: womanLaptop,
  question: "Who is this course for?",
  answer: WhoIsThisCourseFor
}, {
  emoji: brain,
  question: "What can you expect to gain?",
  answer: WhatCanYouExpectToGain
}, {
  emoji: sparkles,
  question: "What will you build?",
  answer: WhatWillYouBuild
}, {
  emoji: movieCamera,
  question: "What’s the mode of delivery?",
  answer: ModeOfDelivery
}]

const features = [{
    title: "Installation",
    body: "Downloading and install ClojureScript on Mac or Linux",
    free: true
}, {
    title: "Editor Setup",
    body: "Setting up required modes and packages in VS Code or Emacs",
    free: true
}, {
    title: "Syntax and Hosts",
    body: "Clojure's hosted nature and interpreting LISPs",
    free: true
}, {
    title: "Build tools",
    body: "Comparison of Java, JavaScript and C# based build tools",
    free: true
}, {
    title: "Project Structure",
    body: "Our opinions about structuring a ClojureScript project",
    free: true
}, {
    title: "Shadow CLJS Intro",
    body: "Walk through Shadow (A CLJS to JS compiler)'s APIs.",
    free: true
}, {
    title: "Intro to REPL",
    body: "Connecting editor to the REPL and executing code using inline evaluation",
    free: true
}, {
    title: "Structural editing",
    body: "A primer on editing S-Expressions using Paredit",
    free: true
}, {
    title: "Standard Library",
    body: "Conditionals, Sequences and sequence operations, function definition and destructuring",
    free: false
}, {
    title: "Threading macros",
    body: "Syntactic sugar to manage deeply nested function calls",
    free: false
}, {
    title: "Atoms",
    body: "Thread safe and mutable state containers",
    free: false
}, {
    title: "Host Interoperability",
    body: "Methods to access the functionality and packages of the host (Java or JavaScript)",
    free: false
}, {
    title: "Tinycanva",
    body: "A web based graphics editor in ClojureScript built from scratch, with features including:",
    free: false
}, {
    title: "Functional UI with Reagent",
    body: "ClojureScript wrapper for React",
    free: false
}, {
    title: "State management",
    body: "with Re-frame A state container that inspired authors of Redux",
    free: false
}, {
    title: "Authentication",
    body: "Authentication and Authorization UI and logic with Firebase Auth",
    free: false
}, {
    title: "API Integration",
    body: "With Firebase realtime database",
    free: false
}, {
    title: "SVG Editor",
    body: "Web based graphics editor with FabricJS. Integrated with API",
    free: false
}, {
    title: "Frontend Routing",
    body: "With react-router and JavaScript interop",
    free: false
},  {
    title: "Production packaging",
    body: "Packaging the web frontend with environment specific configuration",
    free: false
}, {
    title: "Code splitting",
    body: "Optimizing load times by breaking down the codebase into smaller chunks",
    free: false
}, {
    title: "Unit testing",
    body: "Testing state management lifecycle and other pure functions",
    free: false
}]

const freeResources = [{
  title: "Clojure for the brave and true",
  subTitle: "The go-to book for learning to program in Clojure",
  url: "https://www.braveclojure.com/clojure-for-the-brave-and-true/"
}, {
  title: "ClojureScript Unravelled",
  subTitle: "An open source book about ClojureScript",
  url: "https://funcool.github.io/clojurescript-unraveled/"
}, {
  title: "Purely Functional Guide",
  subTitle: "An exhaustive collection of resources to learn Clojure",
  url: "https://purelyfunctional.tv/mini-guide/the-ultimate-guide-to-learning-clojure-for-free/"
}, {
  title: "Drug Dealer API with Pedestal",
  subTitle: "A three part series on how to build REST APIs with Clojure",
  url: "https://krimlabs.com/blog/clojure-drug-dealer-part-1"
}, {
  title: "Know of more awesome resources?",
  subTitle: "Send us a PR on Github",
  url: "https://github.com/krimlabs/krimlabs.com/blob/master/src/templates/tinycanva/data.js#L161"
}]

export {qAndAs, features, WeLoveClojure, freeResources}
