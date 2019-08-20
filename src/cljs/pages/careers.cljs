(ns pages.careers
  (:require [hx.react :as hx]
            ["react-helmet" :refer (Helmet)]
            ["react-router-dom" :refer (Route Switch)]
            [components.nav :refer [Nav]]
            [components.banner :refer [Banner]]
            [pages.careers.career :refer [Career]]
            [pages.careers.copy :refer [Copy]]
            [pages.careers.description :refer [Description]]))

(def roles
  [{:id :senior-clojure-developer
    :title "Senior Clojure Developer"
    :job-location "New Delhi"
    :body "Krim Labs is a software development studio based in New Delhi. We are looking for a senior executive to work with our functional stack and enterprise clients."
    :req
    ["A Hacker's mindset"
     "Minimum 7 years of work experience in building web and mobile apps"
     "Experience with a functional language (preferable Clojure) in production"
     "Strong grasp of REST and GraphQL APIs"
     "Strong grasp of React based UIs"
     "Proficiency in writing functional LISPS (preferably Clojure)"
     "(Bonus) Past experience with DevOps pipelines on AWS"
     "(Bonus) Past expeiences with processing high velocity data"
     "(Bonus) Experience with managing development teams"]
    :res
    ["Build, extend and manage REST and GraphQL APIs"
     "Build, extend and manage DevOps pipelines on AWS"
     "Conduct code reviews and provide feedback"
     "Help take architecture decisions for new projects"
     "Advocate the usage of emacs over vim"
     "Build, extend and manage React based user interfaces"
     "Experiment with existing stack and suggest improvements"
     "Communicate and collaborate with clients and team members to determine simple solutions to complex problems"
     "Payback to the community in the form of open source libraries and tutorials"
     "Represent Krim Labs at conferences and events"]}

   {:id :fullstack-clojure-javascript-developer
    :title "Full Stack Clojure/Javascript Developer"
    :job-location "New Delhi"
    :body "Krim Labs is a software development studio based in New Delhi. We are looking for a full stack developer to work with our functional stack."
    :req
    ["A Hacker's mindset"
     "Minimum 3 years of work experience in building web and mobile apps"
     "Or demonstrable projects/ open source contributions (in case you don't have 3 years of professional experiences)"
     "Strong grasp of REST and GraphQL APIs"
     "Strong grasp of React based UIs"
     "Interest in writing functional LISPS (preferably Clojure)"]
    :res
    ["Build, extend and manage REST and GraphQL APIs"
     "Build, extend and manage DevOps pipelines on AWS"
     "Conduct code reviews and provide feedback"
     "Advocate the usage of emacs over vim"
     "Build, extend and manage React based user interfaces"
     "Payback to the community in the form of open source libraries and tutorials"]}

   {:id :software-developer-intern
    :title "Software Developer Intern"
    :job-location "New Delhi"
    :body "Krim Labs is a software development studio based in New Delhi. We are looking for young individuals with a bent toward software development to join our small team of hackers. This is a paid position."
    :req
    ["A desire to learn the Hacker's mindset"
     "Demonstrable projects/ contribution to open source community"
     "Desire to learn how to build web & mobile applications"
     "Interest in writing functional LISPS (preferably Clojure)"]
    :res
    ["Build, extend and manage REST and GraphQL APIs"
     "Build, extend and manage DevOps pipelines on AWS"
     "Build, extend and manage React based user interfaces"
     "Learn & implement our functional stack"
     "Payback to the community in the form of open source libraries and tutorials"]}])

(hx/defnc Careers [{:keys [match]}]
  (let [match (js->clj (-> match js/JSON.stringify js/JSON.parse))]
    [Switch
     [Route {:path (get match "path")
             :exact true
             :render
             (fn []
               (hx/f [:<>
                      [Helmet {:title "Work at Krim Labs"}]
                      [Nav]
                      [Banner
                       {:title "Careers"
                        :illustration-src "/img/illustrations/jobs-banner.svg"}]
                      [Copy]
                      [:div {:class "w-90 word-wrap w-50-ns ph3 pv1 br3 bg-washed-yellow center mb4"}
                       (for [role roles]
                         [Career (assoc role :match match)])]]))}]
     (for [role roles]
       [Route {:path (str (get match "path") "/" (name (:id role)))
               :exact true
               :render (fn [] (hx/f [Description role]))}])]))

