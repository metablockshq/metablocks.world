(ns pages.clients.copy
  (:require [hx.react :as hx]))

(hx/defnc Copy []
  [:div {:class "w-90  w-50-ns center mt4 black-80 f4 lh-copy"}
   [:a {:href "https://blog.codinghorror.com/the-best-code-is-no-code-at-all/"}
    "The best code is no code at all."]
   [:p "As a software development company, our job is to understand your idea (or requirements), align it with available technologies and suggest a solution that involves the least amount of code."]
   [:p "We are good at finding out things that can be deleted from the requirements and strive to reduce complexity."]
   [:p "Over the years, we have helped some amazing companies build web apps, mobile apps, and data processing pipelines that scale to millions of users and data points."]
   [:div {:class "b mt3 bt pt3 b--black-10"}
    [:a {:href "https://juxt.pro"} "Juxt Inc."]]
   [:p "Juxt is a UK based product development studio that works exclusively with Clojure. They are a well-known entity in the Clojure ecosystem. Their open source initiatives Bidi, Yada, and Edge are heavily relied upon in the Clojure universe."]
   [:p "Most Juxt clients are tier 1 banks, financial services, and publishing companies. We help the Juxt team deliver solutions to some of these companies."]
   [:div {:class "b mt3"}
    [:a {:href "https://pfrepo.me"} "PFRepo"]]
   [:p "PFRepo is a portal for creating and maintaining a private digital career repository. The career profile is a chronologically arranged recorded events that make up the academic and professional career of the user. This career profile can be used to generate Resumes, CVs and Cover Letters and their one-click apply makes the job application process frictionless."]
   [:p "We helped PFRrepo re-build the entire platform. It was a NodeJs based monolith API with a React web frontend powered by Postgres DB. It's here, we learned how hard generating styled PDFs could be."]
   [:div {:class "b mt3"}
    [:a {:href "https://betalectic.com"} "BetaLectic"]]
   [:p "BetaLectic is a Bangalore based software studio with major clients in Enterprise, Education and Real Estate sectors."]
   [:p "We worked closely with BetaLectic team towards building React Native based mobile apps to complement their existing web apps for two of their clients."]

   [:p "Some other projects we have worked on:"]
   [:ul
    [:li
     [:a {:href "https://life.university" :class "mr1"} "Life University"]
     "Entire Backend, web frontend, admin and android"]
    [:li
     [:a {:href "" :class "mr1"} "Musejam"]
     "Helped extend the existing system"]
    [:li
     [:a {:href "https://komplitax.com" :class "mr1"} "Komplitax"]
     "Helped build new features and integrations"]]

   [:div {:class "b mt3 bt pt3 b--black-10"}
    [:a {:href "https://httpslocalhost.com"} "HTTPSLocalhost"]]
   [:p "HTTPSLocalhost is an in-house product initiative. We built this when we wanted https locally for a particular use case and found that there is no easy and direct way to do it. We were surprised that nobody had built this yet."]

   [:div {:class "b mt3"}
    [:a {:href "https://github.com/krimlabs/eiphop"} "EipHop"]]
   [:p "EipHop is an open source wrapper for electron IPC. It abstracts the native IPC protocol to an HTTP like interface."]])

