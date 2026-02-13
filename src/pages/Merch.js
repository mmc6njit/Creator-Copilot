import React, { useState } from 'react';
import '../styles/Merch.css';

const PRODUCT_PRICE = 15.00;

// This component now receives its data and state functions as props
const Merch = ({ sales, setSales }) => {
    // Stock is now its own piece of state to be managed directly.
    // In a real app, this initial value would come from a database.
    const [stock, setStock] = useState(100); 

    // Calculations are now based on the 'sales' prop
    const cardsSold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);

    const handleLogSale = (e) => {
        e.preventDefault();
        const quantity = parseInt(e.target.quantity.value, 10);

        if (quantity > 0 && quantity <= stock) {
            const newSale = {
                id: Date.now(),
                date: new Date().toISOString().slice(0, 10),
                quantity: quantity,
                total: quantity * PRODUCT_PRICE,
            };
            setSales(prevSales => [newSale, ...prevSales]);
            // Decrease stock based on the sale
            setStock(prevStock => prevStock - quantity);
            e.target.reset();
        } else {
            alert("Please enter a valid amount that is not more than the current stock.");
        }
    };

    const handleUndoSale = (saleToUndo) => {
        setSales(prevSales => prevSales.filter(sale => sale.id !== saleToUndo.id));
        // Add the stock back when a sale is undone
        setStock(prevStock => prevStock + saleToUndo.quantity);
    };

    // NEW: Function to manually update the stock amount
    const handleUpdateStock = (e) => {
        e.preventDefault();
        const amount = parseInt(e.target.amount.value, 10);
        // Detect which button was clicked ('add' or 'remove')
        const action = e.nativeEvent.submitter.name;

        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        if (action === 'add') {
            setStock(prevStock => prevStock + amount);
        } else if (action === 'remove' && amount <= stock) {
            setStock(prevStock => prevStock - amount);
        } else {
            alert("Cannot remove more stock than is currently available.");
        }
        e.target.reset();
    };

    return (
        <div className="merch-container">
            <h1>Creator Copilot Product Hub</h1>
            <p className="subtitle">Manage your card sales and inventory.</p>

            <div className="merch-grid">
                <div className="merch-panel">
                    <h2>Inventory</h2>
                    <div className="inventory-status">
                        <p>Current Stock</p>
                        <span>{stock}</span>
                    </div>

                    {/* NEW: Form for manually updating stock */}
                    <form className="stock-form" onSubmit={handleUpdateStock}>
                        <h4>Update Stock</h4>
                        <input name="amount" type="number" placeholder="Enter amount" min="1" required />
                        <div className="button-group">
                            <button type="submit" name="add" className="add-btn">Add Stock</button>
                            <button type="submit" name="remove" className="remove-btn">Remove Stock</button>
                        </div>
                    </form>
                </div>

                <div className="merch-panel">
                    <h2>Sales & Revenue</h2>
                    <div className="sales-kpis">
                        <div className="sales-kpi-item"><h4>Total Revenue</h4><p>${totalRevenue.toFixed(2)}</p></div>
                        <div className="sales-kpi-item"><h4>Cards Sold</h4><p>{cardsSold}</p></div>
                    </div>
                    <form className="sale-form" onSubmit={handleLogSale}>
                        <h4>Log a New Sale</h4>
                        <input name="quantity" type="number" placeholder="Quantity" min="1" required />
                        <button type="submit">Log Sale</button>
                    </form>
                    <div className="transaction-history">
                        <h4>Recent Sales</h4>
                        <table>
                            <tbody>
                                {sales.map(sale => (
                                    <tr key={sale.id}>
                                        <td>{sale.date}</td>
                                        <td>Sold {sale.quantity} card(s)</td>
                                        <td>${sale.total.toFixed(2)}</td>
                                        <td><button className="undo-btn" onClick={() => handleUndoSale(sale)}>Undo</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Merch;

