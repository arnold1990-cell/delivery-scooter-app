package com.scooterapp.dto;

public class DashboardMetricsResponse {
    private long totalRides;
    private long activeUsers;
    private double totalRevenue;
    private long scootersAvailable;

    public DashboardMetricsResponse(long totalRides, long activeUsers, double totalRevenue, long scootersAvailable) {
        this.totalRides = totalRides;
        this.activeUsers = activeUsers;
        this.totalRevenue = totalRevenue;
        this.scootersAvailable = scootersAvailable;
    }

    public long getTotalRides() {
        return totalRides;
    }

    public long getActiveUsers() {
        return activeUsers;
    }

    public double getTotalRevenue() {
        return totalRevenue;
    }

    public long getScootersAvailable() {
        return scootersAvailable;
    }
}
