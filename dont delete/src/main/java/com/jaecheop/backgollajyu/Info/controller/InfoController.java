package com.jaecheop.backgollajyu.Info.controller;


import com.jaecheop.backgollajyu.Info.model.StatisticsSearchReqDto;
import com.jaecheop.backgollajyu.Info.service.InfoService;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import com.jaecheop.backgollajyu.vote.service.VoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/statistics")
public class InfoController {

    private VoteService voteService;
    private VoteResultRepository voteResultRepository;
    private InfoService infoService;

    @GetMapping("")
    public Map<String, Long> resultStatistics(@RequestBody StatisticsSearchReqDto statisticsSearchReqDto) {
        return voteService.generateStatistics(voteResultRepository.findAll(), statisticsSearchReqDto);
    }
}
