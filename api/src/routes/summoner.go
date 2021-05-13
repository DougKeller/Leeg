package routes

import (
  "log"
  "net/http"
  "github.com/gin-gonic/gin"
  "github.com/dougkeller/leeg/common"
  "github.com/dougkeller/leeg/async"
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

  router.PUT("/summoners/:id", func(c *gin.Context) {
    client := common.GetGolioClient()
    summonerId := c.Param("id")
    _, err := client.Riot.Summoner.GetByID(summonerId)

    if err != nil {
      log.Print(err)
      c.JSON(http.StatusNotFound, nil)
    } else {
      async.PublishSummonerUpdate(summonerId)
      c.JSON(http.StatusAccepted, nil)
    }
  })
}
