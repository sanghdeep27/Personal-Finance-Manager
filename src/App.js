import React, { useState, useEffect } from "react";

const App = () => {
    const [transactions, setTransactions] = useState([]);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("income");

    useEffect(() => {
        fetch("http://localhost:5000/transactions")
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newTransaction = { title, amount, type };

        try {
            const response = await fetch("http://localhost:5000/transactions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newTransaction),
            });

            const data = await response.json();
            setTransactions([...transactions, data]); // Update state
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/transactions/${id}`, { method: "DELETE" });
            setTransactions(transactions.filter(transaction => transaction._id !== id));
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    };

    return (
        <div>
            <h2>Finance Manager</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} />
                <select onChange={(e) => setType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                </select>
                <button type="submit">Add Transaction</button>
            </form>

            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id}>
                        {transaction.title} - ${transaction.amount} ({transaction.type})
                        <button onClick={() => handleDelete(transaction._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
