package com.example.generaterandomarray;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class GenerateRandomArrayApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenerateRandomArrayApplication.class, args);
	}
	@GetMapping("/api/defaultArray")
	  public int[] getArray() {
	    int[] arr = {1,2,3,4,5,10,9,8,7,6};
	    return arr;
	  }
}
