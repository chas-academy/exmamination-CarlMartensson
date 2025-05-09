
const incomes = [];
const expenses = [];

const descInput = document.getElementById('desc');
const amountInput = document.getElementById('amount');
const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const incomeList = document.getElementById('incomeList');
const expenseList = document.getElementById('expenseList');
const balanceDisplay = document.getElementById('balance');

incomeBtn.addEventListener('click', function () {
    addTransaction('income');
});

expenseBtn.addEventListener('click', function () {
    addTransaction('expense');
});

function addTransaction(type) {
    const description = descInput.value.trim();
    const amount = parseFloat(amountInput.value);

    if (!description || isNaN(amount) || amount <= 0) {
        alert("Fyll i giltig beskrivning och belopp.");
        return;
    }

    const transaction = { description, amount, type };

    if (type === 'income') {
        incomes.push(transaction);
        addTransactionToDOM(transaction, incomeList);
    } else {
        expenses.push(transaction);
        addTransactionToDOM(transaction, expenseList);
    }

    updateBalance();
    descInput.value = '';
    amountInput.value = '';
}

function addTransactionToDOM(transaction, listElement) {
    const li = document.createElement('li');
    const transactionText = `${transaction.description} - ${transaction.amount} kr (${transaction.type === 'income' ? 'Inkomst' : 'Utgift'})`;
    li.textContent = transactionText;
    li.className = transaction.type === 'income' ? 'income' : 'expense';
    listElement.appendChild(li);
}

function updateBalance() {
    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpense;

    balanceDisplay.textContent = `${balance}`;
    balanceDisplay.style.color = balance >= 0 ? 'green' : 'red';
}