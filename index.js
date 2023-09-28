class Account {

  constructor(username) {
    this.username = username;
    // Have account balance start at $0 since that makes more sense.
    this.transactions = [];
  }

  get balance () {
    // Calculate the balance using the transaction object.
    return this.transactions.reduce((sum, currTrx) => sum + currTrx.value, 0);
  }

  addTransaction (transaction) {
    this.transactions.push(transaction);
  }
}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit () {
    if (!this.isAllowed()) {
      console.log('Didnt commit a transaction.');
      return false;
    }
    // Keep track of the time of the transaction
    this.time = new Date();
    // Add the transaction to the account
    this.account.addTransaction(this);
    return true;
  }

}

class Withdrawal extends Transaction {

  get value () {
    return this.amount * -1;
  }

  isAllowed () {
    return this.account.balance + this.value > 0;
  }

}

class Deposit extends Transaction {

  get value () {
    return this.amount;
  }

  // You should always be able to deposit.
  isAllowed () {
    return true;
  }

}


// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('billybob');

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
