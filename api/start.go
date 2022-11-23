package api

import (
	"github.com/gin-gonic/gin"

	"github.com/martoranam/AngularFront/client"
)

func Start() {
	router := gin.Default()
	client.AddRoutes(router)
	router.Run("localhost:5000")

}
