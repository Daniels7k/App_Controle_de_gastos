const transactionUl = document.querySelector("#transactions");
const balanceDisplay = document.querySelector("#balance");
const incomeDisplay = document.querySelector("#money-plus");
const expenseDisplay = document.querySelector("#money-minus");
const form = document.querySelector("#form");
const inputTransactionName = document.querySelector("#text");
const inputTransactionAmount = document.querySelector("#amount");

// let transactions = [
//     {id:0, name:"Bolo de Chocolate", amount:-30},
//     {id:1, name:"Cenoura",  amount:-20},
//     {id:2, name:"Salario",  amount:700},
//     {id:3, name:"Salario2", amount:500}
// ];

const localStorageTransactions = JSON.parse(localStorage
    .getItem("transactions"))

    let transactions = localStorage
    .getItem("transactions") !== null ? localStorageTransactions : []

const removeTransaction = id =>{
    transactions = transactions
        .filter(transaction => transaction.id !== id)
    updateLocalStorage()
    init ()
    
}

const addTransactionIntoDom = (transaction) =>{
    const operator = transaction.amount < 0 ? "-" : "+";
    const CSSClass = transaction.amount < 0 ? "minus" : "plus";
    amountWithoutOperator = Math.abs(transaction.amount).toFixed(2);
    const li = document.createElement("li");

    li.classList.add(CSSClass);
    li.innerHTML = ` ${transaction.name} 
    <span>R$ ${operator}${amountWithoutOperator}</span>
    <button class="delete-btn" onClick="removeTransaction(${transaction.id})">x</button>`
    
    transactionUl.prepend(li);

}

const updateBalanceValues = () => {
    const transactionAmount = transactions
        .map(transaction => transaction.amount ) ;

    const total = transactionAmount
        .reduce((acumulator, transaction) => acumulator + transaction, 0)
        .toFixed(2);

    const income = transactionAmount
        .filter(item => item > 0)
        .reduce((acumulator, transaction) => acumulator + transaction, 0)
        .toFixed(2);

    const expense = Math.abs(transactionAmount
        .filter(item => item < 0)
        .reduce((acumulator, transaction) => acumulator + transaction, 0))
        .toFixed(2);

    
    balanceDisplay.textContent = `R$ ${total}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
}

const init = () =>{
    transactionUl.innerHTML = ""
    transactions.forEach(addTransactionIntoDom);
    updateBalanceValues();
} 


init();

const updateLocalStorage = () => {
    localStorage.setItem("transactions", JSON.stringify(transactions))
}

const generateid = () => Math.round(Math.random() * 1000)

form.addEventListener("submit", event => {
    event.preventDefault();

    const transactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if( transactionName === "" || transactionAmount === ""){
        alert("Por favor preencha tanto o nome quanto o valor da transação.")
        return   
    }

    const transaction = {
        id:generateid(), 
        name: transactionName,
        amount: Number(transactionAmount)
    }
    transactions.push(transaction);
    init();
    updateLocalStorage();

    inputTransactionName.value = ""
    inputTransactionAmount.value = ""
})