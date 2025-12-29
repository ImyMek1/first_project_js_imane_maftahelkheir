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


