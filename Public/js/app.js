let usersDataB = [];

class User {
    constructor(name, email, age, password) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
    }
}

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
// let saveuser = new User(name, email, age, password)
//   usersDataB.push(saveuser);

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


