package com.rentapp.controller;

import com.rentapp.dto.response.ReportSummaryResponse;
import com.rentapp.service.ReportService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "http://localhost:5173")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/summary")
    public ReportSummaryResponse getSummary() {
        return reportService.getSummary();
    }
}