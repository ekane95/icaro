/*
 * Copyright (C) 2017 Nethesis S.r.l.
 * http://www.nethesis.it - info@nethesis.it
 *
 * This file is part of Icaro project.
 *
 * Icaro is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License,
 * or any later version.
 *
 * Icaro is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Icaro.  If not, see COPYING.
 *
 * author: Giacomo Sanchietti <giacomo.sanchietti@nethesis.it>
 * author: Edoardo Spadoni <edoardo.spadoni@nethesis.it>
 */

package main

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"sun-api/configuration"
	"wax/methods"
	"wax/middleware"
)

func DefineAPI(router *gin.Engine) {
	wax := router.Group("/wax")

	wax.GET("/aaa", methods.Dispatch)

	wax.Use(middleware.WaxWall)
	{
		wax.GET("/register", methods.Dispatch)
	}

	// handle static captive portal files (aka wings)
	router.StaticFS("/wax/captive/assets", gin.Dir(configuration.Config.CaptivePublicPath, true))
	router.Use(middleware.CaptiveWings)

	// handle missing endpoint
	router.NoRoute(func(c *gin.Context) {
		c.JSON(http.StatusNotFound, gin.H{"message": "API not found"})
	})
}

func main() {
	// read and init configuration
	configuration.Init()

	// init routers
	router := gin.Default()

	// define API
	DefineAPI(router)

	router.Run(":8181")
}
