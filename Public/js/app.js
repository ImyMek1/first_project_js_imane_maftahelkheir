let usersDataB = [];

class User {
    constructor(name, email, age, password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.balance = 0;
        this.loan = 0;
        this.investment = 0;
        this.history = [];
    }
    
    withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.history.push(`Withdraw: -${amount}`);
    }
  }

  deposit(amount) {
    if (amount <= 1000) {
      this.balance += amount;
      this.history.push(`Deposit: +${amount}`);
    }
  }

  takeLoan() {
    let loanAmount = this.balance * 0.2;
    this.balance += loanAmount;
    this.loan += loanAmount;
    this.history.push(`Loan taken: +${loanAmount}`);
  }

  invest(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      this.investment += amount;
      this.history.push(`Invested: -${amount}`);
    }
  }

  applyLoanLoss() {
    if (this.loan > 0) {
      let loss = this.loan * 0.1;
      this.balance -= loss;
      this.loan -= loss;
      this.history.push(`Loan loss: -${loss}`);
    }
  }

  applyInvestmentGain() {
    if (this.investment > 0 && this.investment < this.investment * 1.2) {
      let gain = this.investment * 0.2;
      this.balance += gain;
      this.history.push(`Investment gain: +${gain}`);
    }
  }
}

//* /////////Function/////////////

function Exit(value) {
  return value && value.toLowerCase() === "exit";
}

function formatName(name) {
  return name
    .toLowerCase()
    .split(" ")
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function SpecialChar(password) {
  const chars = ["@", "#", "-", "+", "*", "/"];
  return chars.some(c => password.includes(c));
}

//* /////////SignUP/////////////

function signUp() {
  let name = prompt("Full name:");
  if (Exit(name)) return;

  name = name.trim();
  if (
    name.replaceAll(" ", "").length < 5 ||
    /[^a-zA-Z ]/.test(name)
  ) {
    alert("Invalid name");
    return;
  }
  name = formatName(name);

  let email = prompt("Email:");
  if (Exit(email)) return;

  email = email.trim().toLowerCase();
  if (
    email.includes(" ") ||
    email.length < 10 ||
    email.split("@").length !== 2 ||
    usersDataB.find(u => u.email === email)
  ) {
    alert("Invalid email");
    return;
  }

  let age = prompt("Enter age:");
  if (Exit(age)) return;

  age = age.trim();

  if (age === "" || age.length >= 3) {
    alert("Invalid age");
    return;
  }

  for (let c of age) {
    if (c < "0" || c > "9") {
      alert("Invalid age");
      return;
    }
  }

  let password = prompt("Password:");
  if (Exit(password)) return;

  if (
    password.trim() !== password ||
    password.includes(" ") ||
    password.length < 7 ||
    !SpecialChar(password)
  ) {
    alert("Invalid password");
    return;
  }

  let confirm = prompt("Confirm password:");
  if (password !== confirm) {
    alert("Blocked");
    return;
  }

 usersDataB.push(new User(name, email, age, password)); 
 alert("Account created successfully");

 console.table(usersDataB);

}

//* /////////Login/////////////

function login() {
  let email = prompt("Enter your email:");
  if (Exit(email)) return;

  let user = usersDataB.find(u => u.email === email);

  if (!user) {
    alert("Email Not Found");
    return;
  }
  let password = prompt("Enter your password:");

  if (Exit(password)) return;

  if (user.password !== password) {
    alert("Wrong Password");
    return;
  }
  alert("Welcome " + user.name);
  bankMenu(user);

}

//* /////////Change Password/////////////

function changePassword() {
  let email = prompt("Enter your email:");
  if (Exit(email)) return;

  let user = usersDataB.find(u => u.email === email);
  if (!user) 
    return alert("Email not found");

  let newPass = prompt("Enter new password:");
  if (
    newPass.includes(" ") ||
    newPass.length < 7 ||
    !SpecialChar(newPass)) 
    return alert("Invalid password");

  user.password = newPass;
  alert("Password changed");
}

//* /////////Bank Menu/////////////

function bankMenu(user) {
  let choice;
  do {
    choice = prompt(    
`Balance: ${user.balance} DH
1- Withdraw
2- Deposit
3- Loan
4- Invest
5- History
6- Logout`
);

    if (choice === "1") {
      let amount = Number(prompt("Withdraw amount:"));
      user.withdraw(amount);
    }

    if (choice === "2") {
      let amount = Number(prompt("Deposit amount (<=1000):"));
      user.deposit(amount);
    }

    if (choice === "3") {
      user.takeLoan();
    }

    if (choice === "4") {
      let amount = Number(prompt("Investment amount:"));
      user.invest(amount);
    }

    if (choice === "5") {
      console.log(user.history);
    }

  } while (choice !== "6");
}

//* /////////Menu/////////////

function mainMenu() {
    let choice;
    do {
        choice = prompt(
       `Choose a choice     
1- SignUp
2- Login
3- Change password
        Write "exit" to cancel`
        );

        if (Exit(choice)) break;

        if (choice === "1") signUp();
        if (choice === "2") login();
        if (choice === "3") changePassword();

    } while (true);
}

mainMenu();


