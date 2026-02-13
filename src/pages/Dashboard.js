import React from 'react';
import { Doughnut, Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import DataImporter from '../components/DataImporter';
import '../styles/Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title);

const brandColors = {
  orange: '#c87343',
  green: '#72993e',
  blue: '#1b6dad',
  red: '#c95d5d', 
  secondaryText: '#7a7a7a'
};

const totalRevenue = 2800.00;
const totalExpenses = 1150.00;
const netProfit = totalRevenue - totalExpenses;
const totalEstimatedTaxes = netProfit > 0 ? netProfit * 0.25 : 0;
const quarterlyTaxDue = totalEstimatedTaxes / 4;

const revenueData = {
    labels: ['Streaming', 'Merchandise', 'Live Gigs', 'Licensing'],
    datasets: [{
        label: 'Revenue Breakdown',
        data: [1250, 800, 550, 200],
        backgroundColor: [brandColors.orange, brandColors.green, brandColors.blue, brandColors.secondaryText],
        borderColor: '#fbf3eb',
        borderWidth: 4,
    }],
};

const profitTrendData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        { label: 'Income', data: [1800, 2200, 1500, 2500, 3000, 2800], borderColor: brandColors.green, tension: 0.4, },
        { label: 'Costs', data: [1200, 1000, 1300, 2000, 1800, 1700], borderColor: brandColors.red, tension: 0.4, },
    ],
};

const streamingData = {
    labels: ['Spotify', 'Apple Music', 'YouTube', 'Amazon Music', 'Bandcamp'],
    datasets: [{
        label: 'Total Streams',
        data: [95430, 45100, 25600, 15300, 4000],
        backgroundColor: [brandColors.green, brandColors.red, brandColors.blue, brandColors.orange, brandColors.secondaryText],
    }]
};

const profitabilityData = {
    labels: ['Streaming', 'Merch', 'Live Gigs'],
    datasets: [
        {
            label: 'Income',
            data: [1250, 800, 550],
            backgroundColor: brandColors.green,
        },
        {
            label: 'Costs',
            data: [50, 450, 400],
            backgroundColor: brandColors.red,
        }
    ]
};

const Dashboard = ({ setActivePage }) => {
    return (
        <div className="dashboard-container">
            <div className="artist-header">
                <h1>Creator Copilot</h1>
                <p>Your Financial Dashboard</p>
            </div>
            
            <DataImporter />

            <div className="kpi-grid">
                <div className="kpi-card"><h2>Total Income</h2><p>${totalRevenue.toFixed(2)}</p></div>
                <div className="kpi-card"><h2>Costs</h2><p>${totalExpenses.toFixed(2)}</p></div>
                <div className="kpi-card profit"><h2>Your Profit</h2><p>${netProfit.toFixed(2)}</p></div>
                
                <div 
                  className="kpi-card tax clickable"
                  onClick={() => setActivePage('taxes')}
                >
                  <h2>Next Tax Payment</h2>
                  <p>${quarterlyTaxDue.toFixed(2)}</p>
                  <span>Due: Jan 15, 2026 →</span>
                </div>
            </div>

            <div className="chart-grid">
                <div className="chart-card">
                    <h3>Where Your Money Came From</h3>
                    <Doughnut data={revenueData} />
                </div>
                
                <div className="chart-card">
                    <h3>Income vs. Costs</h3>
                    <Bar data={profitabilityData} />
                </div>

                <div className="chart-card">
                    <h3>Your Financial Trend</h3>
                    <Line data={profitTrendData} />
                </div>
                
                <div className="chart-card">
                    <h3>Streaming Performance</h3>
                    <Bar data={streamingData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
