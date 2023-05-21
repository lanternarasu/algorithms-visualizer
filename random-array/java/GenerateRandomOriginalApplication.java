package com.example.generaterandomoriginal;

import java.util.Collections;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@SpringBootApplication
@RestController
@RequestMapping("/api/sorting")

public class GenerateRandomOriginalApplication {

	public static void main(String[] args) {
		SpringApplication.run(GenerateRandomOriginalApplication.class, args);
	}
	
	@GetMapping("/random")
    public int[] getArray() {
        int[] arr = new int[50];
        Random random = new Random();
        for (int i = 0; i < arr.length; i++) {
            arr[i] = random.nextInt(100) + 1;
        }
        
        return arr;
    }
	
	@GetMapping("/default")
    public int[] getDefaultArray() {
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:9090/api/sorting/default";
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<int[]> response = restTemplate.exchange(url, HttpMethod.GET, entity, int[].class);
        int[] defaultArray = response.getBody();
        return defaultArray;
    }
}
