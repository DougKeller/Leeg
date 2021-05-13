package routes

import (
  "log"
  "net/http"
  "github.com/gin-gonic/gin"
  "github.com/dougkeller/leeg/common"
)

func summonerRoutes(router *gin.Engine) {
  router.GET("/summoners/find", func(c *gin.Context) {
    client := common.GetGolioClient()
    name := c.Query("name")
    summoner, err := client.Riot.Summoner.GetByName(name)

    if err != nil {
      log.Print(err)
      c.JSON(http.StatusNotFound, nil)
    } else {
      c.JSON(http.StatusOK, summoner)
    }
  })
}
