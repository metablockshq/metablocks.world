(ns pages.careers.copy
  (:require [hx.react :as hx]))

(hx/defnc Copy []
  [:div {:class "w-90  w-50-ns center mt4 black-80 f4 lh-copy"}
   [:p "Most careers page start with a list of perks and pictures of team members playing football on a beach. But we believe that the ultimate satisfaction comes from the work we do."]
   [:p "Not that we don't like the beach or perks. Only that we value the impact our work creates more than the perks."]
   [:p "We are a group of hackers who started riding the internet wave 10 years ago and have built a stable cruise ship now. At our core, we are a consultancy business that also incubates products (and ideas)."]
   [:p "Everyone here codes on a daily basis and we strive to keep it that way. We have strong opinions about the tools we use and respect Emacs heads more than Vimmers."]
   [:p "We are amazed by and rely on the open source community and do our best to payback in the form of blog posts, tutorials, libraries, and even full-fledged software. Working here would give you access to many brilliant developers and product minds."]
   [:p "Clojure is our language of choice but we often venture into the JavaScript realm. We are deeply invested in the React.js ecosystem."]
   [:p "Our clients range from enterprise companies to data-focused startups. The majority of our experience lies in the b2b enterprise space."]
   [:p "We are not just about work. In fact, we are deeply inspired by the principles of \"Slow growth\" and \"Rework\". If you are a fan of Basecamp, you'd feel like home at Krim."]
   [:p {:class "mt4"} "Every employee is entitled to:"]
   [:ul
    [:li "A generous library and book budget. Read all you want to. We'd even buy you a Kindle if you prefer portability."]
    [:li "Weekly team lunches and movie screenings."]
    [:li "Premium health insurance (which we wish you never need to claim)"]
    [:li "Informal work environment with minimal heirarchy."]
    [:li "Work retreats and recreational trips (this is the part where we go to a beach)."]
    [:li "Relocation support and guidance."]
    [:li "Anything else? Just ask. We might say no, but you have a no already if you don't ask."]]

   [:p {:class "b"} "We have open positions in New Delhi and look forward to hearing from you."]])
