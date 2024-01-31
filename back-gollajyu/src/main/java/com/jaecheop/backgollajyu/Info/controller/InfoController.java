package com.jaecheop.backgollajyu.Info.controller;


import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.Info.service.InfoService;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/statistics")
public class InfoController {

    private final VoteService voteService;

    private final VoteResultRepository voteResultRepository;

    private final InfoService infoService;

    @GetMapping("")
    public ResponseEntity<Map<String, Long>> resultStatistics(@RequestBody(required = false) StatisticsSearchReqDto statisticsSearchReqDto) {
        System.out.println("statisticsSearchReqDto = " + statisticsSearchReqDto);
        if (statisticsSearchReqDto == null || statisticsSearchReqDto.getCategoryId() == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            Map<String, Long> statistics = voteService.generateStatistics(
                    voteResultRepository.findByCategoryId(statisticsSearchReqDto.getCategoryId()),
                    statisticsSearchReqDto
            );
            return ResponseEntity.ok(statistics);
        }
    }
}
