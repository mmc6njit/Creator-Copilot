import React, { useState, useMemo } from 'react';
import DataImporter from '../components/DataImporter';
import '../styles/ExpenseLedger.css';

// This component now receives its data and state functions as props
const ExpenseLedger = ({ expenses, setExpenses }) => {
    const [date, setDate] = useState('');
    const [vendor, setVendor] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Production & Creation');
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'descending' });

    const sortedExpenses = useMemo(() => {
        let sortableItems = [...expenses];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [expenses, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!date || !vendor || !amount) return;
        const newExpense = {
            id: Date.now(), // Use timestamp for a more unique ID
            date, vendor,
            amount: parseFloat(amount),
            category,
        };
        // Use the setExpenses function passed down from App.js
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
        setDate(''); setVendor(''); setAmount('');
    };

    const handleRemove = (expenseIdToRemove) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== expenseIdToRemove));
    };

    return (
        <div className="ledger-container">
            <h1>Track Your Costs</h1>
            
            <form className="expense-form" onSubmit={handleSubmit}>
                 <h3>Log a New Cost</h3>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                <input type="text" placeholder="Vendor / Description" value={vendor} onChange={(e) => setVendor(e.target.value)} required />
                <input type="number" placeholder="Amount ($)" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option>Production & Creation</option>
                    <option>Touring & Live</option>
                    <option>Studio Time</option>
                    <option>Equipment & Software</option>
                    <option>Merchandise</option>
                    <option>Marketing</option>
                    <option>Business & Admin</option>
                </select>
                <button type="submit">Add Cost</button>
            </form>

            <DataImporter isForExpenses={true} />

            <div className="expense-table">
                <h3>Your Logged Costs</h3>
                <table>
                    <thead>
                        <tr>
                            <th><button type="button" onClick={() => requestSort('date')}>Date {sortConfig.key === 'date' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}</button></th>
                            <th><button type="button" onClick={() => requestSort('vendor')}>Vendor {sortConfig.key === 'vendor' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}</button></th>
                            <th><button type="button" onClick={() => requestSort('category')}>Category {sortConfig.key === 'category' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}</button></th>
                            <th><button type="button" onClick={() => requestSort('amount')}>Amount {sortConfig.key === 'amount' ? (sortConfig.direction === 'ascending' ? '▲' : '▼') : null}</button></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedExpenses.map((exp) => (
                            <tr key={exp.id}>
                                <td>{exp.date}</td>
                                <td>{exp.vendor}</td>
                                <td>{exp.category}</td>
                                <td>${exp.amount.toFixed(2)}</td>
                                <td><button className="remove-btn" onClick={() => handleRemove(exp.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ExpenseLedger;

