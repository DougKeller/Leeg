package main

import (
  "github.com/dougkeller/leeg/routes"
)

func main() {
  router := routes.SetupRouter()
  router.Run(":4000")
}
