'use strict';

/* SOLID::
 * SRP: single responsibility principle (only one reason to change)
 * OCP: open-closed principle 
 * LSP: Liskov substitution principle
 * ISP: interface segregation principle
 * DIP: dependency inversion principle
 */

class ILogger {
	log(message) {}
	printLog() {}
	clearLog() {}
}

class IFileManager {
	save(data) {}
	load(data, userManager) {}
}

class UserManager {
	#users;
	logger;
	fileManager;

	constructor() {
			this.#users = new Array();
			this.logger = new Logger();
			this.fileManager = new FileManager();
	}

	addUser(name, age) {
			let user = new User(name, age);
			this.#users.push(user);
			this.logger.log("User added: " + name);
			this.fileManager.save(this.#users);
	}

	removeUser(name) {
			this.#users = this.#users.filter(user => user.getName() !== name);
			this.logger.log("User removed: " + name);
			this.fileManager.save(this.#users);
	}

	printUsers() {
			const users = new Array();
			this.#users.forEach(user => {
				console.log(user.getInfo());
				this.logger.log("Getting info for user: " + user.getName());
				users.push(user.getInfo());
			});
			this.logger.log("Printed user list");
			return users.join('\n');
	}
}

class User {
	#name;
	#age;

	constructor(name, age) {
			this.#name = name;
			this.#age = age;
	}

	getName() {
		return this.#name;
	}

	getAge() {
		return this.#age;
	}

	getInfo() {
			return this.getName() + " (" + this.getAge() + " years old)";
	}
}

class Logger extends ILogger {
	#logMessages;

	constructor() {
			super();
			this.#logMessages = new Array();
	}

	log(message) {
			let timestamp = new Date().toISOString();
			let logMessage = timestamp + " - " + message;
			this.#logMessages.push(logMessage);
			console.log(logMessage);
	}

	printLog() {
			const startMessage = "Log messages:";
			const messages = new Array(["Log messages:"]);
			console.log(startMessage);
			this.#logMessages.forEach(message => {
				console.log(message);
				messages.push(message);
			});
			return messages.join('\n');
	}

	clearLog() {
			this.#logMessages = new Array();
			this.log("Log cleared");
			return true;
	}
}

class FileManager extends IFileManager {
	save(data) {
			let fileData = "Users: \n";
			data.forEach(user => {
					fileData += user.getInfo() + "\n";
			});
			console.log("Saving to file: \n" + fileData); // Simulate file saving
	}

	load(data, userManager) {
			let rows = data.split('\n');
			rows.forEach(line => {
					if (line.startsWith("Users:")) return;
					const [name, age] = line.replace(" years old", "").split(" (");
					if (name && age) {
							userManager.addUser(name, parseInt(age));
					}
			});
	}
}

module.exports = {
	UserManager
}

