document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm')
    const expensesList = document.getElementById('expenses')
    const expenseHistory = document.getElementById('expenseHistory')
    const totalExpense = document.getElementById('total')

    window.onload = function () {
        loadExpenses()
    }

    expenseForm.addEventListener('submit', function (event) {
        event.preventDefault()

        const expenseName = document.getElementById('expenseName').value
        const expenseAmount = parseFloat(document.getElementById('expenseAmount').value)
        const expenseUrgency = document.getElementById('expenseUrgency').value

        addExpense(expenseName, expenseAmount, expenseUrgency)
        expenseForm.reset()
    })

    function addExpense(name, amount, urgency) {
        const expenseItem = document.createElement('li')
        expenseItem.textContent = `${name}: $${amount.toFixed(2)} (Urgencia: ${urgency})`

        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            expensesList.removeChild(expenseItem)
            let total = calculateTotal()
            totalExpense.textContent = `Total: $${total.toFixed(2)}`
            removeExpense(name, amount)
        })
        expenseItem.appendChild(deleteButton)

        expensesList.appendChild(expenseItem)

        const expenseHistoryItem = document.createElement('li')
        expenseHistoryItem.textContent = `${name}: $${amount.toFixed(2)} (Urgencia: ${urgency})`
        expenseHistory.appendChild(expenseHistoryItem)

        let total = calculateTotal()
        totalExpense.textContent = `Total: $${total.toFixed(2)}`

        saveExpense(name, amount, urgency)
    }

    function calculateTotal() {
        let total = 0;
        const expenseItems = expensesList.querySelectorAll('li')
        expenseItems.forEach(function (item) {
            total += parseFloat(item.textContent.split('$')[1])
        });
        return total
    }

    function saveExpense(name, amount, urgency) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || []
        expenses.push({ name, amount, urgency })
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }

    function loadExpenses() {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || []
        expenses.forEach(function (expense) {
            addExpense(expense.name, expense.amount, expense.urgency)
        })
    }

    function removeExpense(name, amount) {
        let expenses = JSON.parse(localStorage.getItem('expenses')) || []
        expenses = expenses.filter(expense => !(expense.name === name && expense.amount === amount))
        localStorage.setItem('expenses', JSON.stringify(expenses))
    }
})