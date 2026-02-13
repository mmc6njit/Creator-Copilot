// src/pages/TaxCenter.js
import React, { useState } from 'react';
import '../styles/TaxCenter.css';

// --- Dummy Data & Calculations for 2025 ---
const totalIncome = 18500.00;
const totalDeductions = 6200.00;
const netProfit = totalIncome - totalDeductions;

// Simplified tax calculation (Income + Self-Employment Tax)
const INCOME_TAX_RATE = 0.12;
const SE_TAX_RATE = 0.153;
const taxableSEProfit = netProfit * 0.9235;

const estimatedIncomeTax = netProfit * INCOME_TAX_RATE;
const estimatedSETax = taxableSEProfit * SE_TAX_RATE;
const totalEstimatedTax = estimatedIncomeTax + estimatedSETax;

// Quarterly breakdown
const quarterlyTaxDue = totalEstimatedTax / 4;

const TaxCenter = () => {
    // State to track if payments are marked as paid
    const [payments, setPayments] = useState({ q1: true, q2: true, q3: false, q4: false });

    const handlePaymentToggle = (quarter) => {
        setPayments(prev => ({ ...prev, [quarter]: !prev[quarter] }));
    };
    
    // As of today (Sept 16, 2025), Q3's deadline just passed.
    const getStatus = (quarter, deadline) => {
        if (payments[quarter]) return 'Paid';
        // This is a simplified logic for demonstration
        if (quarter === 'q3') return 'Due'; 
        return 'Upcoming';
    };

    return (
        <div className="tax-container">
            <h1>Your Tax Hub - 2025</h1>
            
            {/* Yearly Summary */}
            <div className="summary-grid">
                <div className="summary-card"><h4>Total Income</h4><p>${totalIncome.toFixed(2)}</p></div>
                <div className="summary-card"><h4>Total Deductions</h4><p>${totalDeductions.toFixed(2)}</p></div>
                <div className="summary-card profit"><h4>Estimated Profit</h4><p>${netProfit.toFixed(2)}</p></div>
                <div className="summary-card tax"><h4>Total Estimated Tax</h4><p>${totalEstimatedTax.toFixed(2)}</p></div>
            </div>

            {/* Quarterly Payments */}
            <h2>Estimated Quarterly Payments</h2>
            <div className="quarterly-grid">
                {/* Q1 */}
                <div className={`quarterly-card ${getStatus('q1', 'April 15')}`}>
                    <h3>Q1 <span className="status-badge">{getStatus('q1')}</span></h3>
                    <p className="due-date">Due: April 15, 2025</p>
                    <p className="amount">${quarterlyTaxDue.toFixed(2)}</p>
                    <button onClick={() => handlePaymentToggle('q1')}>{payments.q1 ? 'Mark as Unpaid' : 'Mark as Paid'}</button>
                </div>
                {/* Q2 */}
                <div className={`quarterly-card ${getStatus('q2', 'June 15')}`}>
                    <h3>Q2 <span className="status-badge">{getStatus('q2')}</span></h3>
                    <p className="due-date">Due: June 16, 2025</p>
                    <p className="amount">${quarterlyTaxDue.toFixed(2)}</p>
                    <button onClick={() => handlePaymentToggle('q2')}>{payments.q2 ? 'Mark as Unpaid' : 'Mark as Paid'}</button>
                </div>
                {/* Q3 */}
                <div className={`quarterly-card ${getStatus('q3', 'September 15')}`}>
                    <h3>Q3 <span className="status-badge">{getStatus('q3')}</span></h3>
                    <p className="due-date">Due: September 15, 2025</p>
                    <p className="amount">${quarterlyTaxDue.toFixed(2)}</p>
                    <button onClick={() => handlePaymentToggle('q3')}>{payments.q3 ? 'Mark as Unpaid' : 'Mark as Paid'}</button>
                </div>
                {/* Q4 */}
                <div className={`quarterly-card ${getStatus('q4', 'January 15')}`}>
                    <h3>Q4 <span className="status-badge">{getStatus('q4')}</span></h3>
                    <p className="due-date">Due: January 15, 2026</p>
                    <p className="amount">${quarterlyTaxDue.toFixed(2)}</p>
                    <button onClick={() => handlePaymentToggle('q4')}>{payments.q4 ? 'Mark as Unpaid' : 'Mark as Paid'}</button>
                </div>
            </div>

            {/* Tax Tools */}
            <h2>Tax Tools & Reports</h2>
            <div className="tools-section">
                <button className="tool-button">Create Profit & Loss Report</button>
                <button className="tool-button">Download as Spreadsheet (.csv)</button>
            </div>

            <p className="disclaimer">
                These numbers are estimates to help you plan. Always consult with a qualified tax professional.
            </p>
        </div>
    );
};

export default TaxCenter;