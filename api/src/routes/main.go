package routes

import (
  "github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
)

func SetupRouter() *gin.Engine {
  router := gin.Default()

  router.Use(cors.New(cors.Config{
    AllowOrigins: []string{"*"},
    AllowMethods: []string{"GET", "PUT", "POST", "DELETE"},
    AllowHeaders: []string{"Content-Type"},
  }))

  summonerRoutes(router)

  return router
}
