(ns de.sveri.br.user
  (:require [reloaded.repl :refer [go reset stop]]
            [de.sveri.br.components.components :refer [dev-system]]))

(defn start-dev-system []
  (go))

(reloaded.repl/set-init! dev-system)
