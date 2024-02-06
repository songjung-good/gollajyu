package com.jaecheop.backgollajyu.common;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller

public class CommonController {

    @GetMapping("/")
    public ResponseEntity home(Authentication authentication){
        Object principal = authentication.getPrincipal();

        System.out.println("in common controller principal = " + principal);

        return ResponseEntity.ok("hello");
    }
}
