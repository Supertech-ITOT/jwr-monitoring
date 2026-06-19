package com.company.jwr_monitoring.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {

    @GetMapping("/Home")
    public String home() {
        return "forward:/Home.html";
    }

    @GetMapping("/Category")
    public String category() {
        return "forward:/Category.html";
    }

    @GetMapping("/Power")
    public String power() {
        return "forward:/Power.html";
    }
}