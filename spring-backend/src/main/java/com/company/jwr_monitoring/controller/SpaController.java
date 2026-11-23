package com.company.jwr_monitoring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;

@Controller
public class SpaController {

    @GetMapping({
            "/Home",
            "/Category",
            "/Common",
            "/Power",
            "/Consumption"
    })
    public String forwardToPage(HttpServletRequest request) {
        String path = request.getRequestURI();
        return "forward:" + path + ".html";
    }
}
