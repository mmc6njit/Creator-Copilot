import React from 'react';
import '../styles/Analytics.css';

const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
};

// This component receives analyticsData AND recommendations as props from App.js
const Analytics = ({ analyticsData, recommendations }) => {
    const greeting = getGreeting();
    const isWarning = analyticsData.weeklySpending > (analyticsData.budget * 0.9);

    return (
        <div className="analytics-container">
            <header className="analytics-header">
                <h1>{greeting}, James.</h1>
                <h2>Here are your daily insights!</h2>
            </header>

            <div className="insights-grid">
                <div className="insight-card animate-fade-in-1">
                    <h3>🎵 Music Production Timeline</h3>
                    <p>
                        You're making great strides toward your goal to produce one new album every 6 months! Keep that creative momentum going.
                    </p>
                </div>

                <div className="insight-card animate-fade-in-2">
                    <h3>💰 Weekly Profit</h3>
                    <p>
                        It's been a fantastic week! You earned <span className="highlight-green">${analyticsData.weeklyProfit.toFixed(2)}</span> in profit, with <span className="highlight-orange">${analyticsData.tapyocaRevenue.toFixed(2)}</span> coming directly from your tapyoca cards. 
                    </p>
                </div>

                <div className="insight-card animate-fade-in-3">
                    <h3>💸 Weekly Spending</h3>
                    <p>
                        This week, you've invested <span className="highlight-spending">${analyticsData.weeklySpending.toFixed(2)}</span> of your <span className="highlight-secondary">${analyticsData.budget.toFixed(2)}</span> budget right back into your music. Your biggest investment was in {analyticsData.mostExpensiveCategory}, showing you're focused on getting that perfect sound.
                        {isWarning && <span className="highlight-warning"> Be careful not to overspend!</span>}
                    </p>
                </div>

                <div className="insight-card recommendations animate-fade-in-4">
                    <h3>✨ Your Coach's Corner</h3>
                    {/* Display the recommendation from the LLM, with nice formatting */}
                    <p style={{ whiteSpace: 'pre-wrap' }}>{recommendations}</p>
                </div>
            </div>
        </div>
    );
};

export default Analytics;