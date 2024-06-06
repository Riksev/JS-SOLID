const { UserManager } = require('./shopAdministration_new')

describe(
	"Check shop administration functionality",
	() => {
		const testCases = [
			{
				function: () => {
					let userManager = new UserManager();
					userManager.addUser("Alice", 30);
					userManager.addUser("Bob", 25);
					return userManager.printUsers();
				},
				inString: "Test 'adding users'",
				expected: "Alice (30 years old)\nBob (25 years old)"
			},
			{
				function: () => {
					let userManager = new UserManager();
					const fileData = "Users: \nAlice (30 years old)\nBob (25 years old)\n";
					userManager.fileManager.load(fileData, userManager);
					userManager.removeUser("Alice");
					return userManager.printUsers();
				},
				inString: "Test 'loading and removing users'",
				expected: "Bob (25 years old)"
			},
			{
				function: () => {
					let userManager = new UserManager();
					const fileData = "Users: \nAlice (30 years old)\nBob (25 years old)\n";
					userManager.fileManager.load(fileData, userManager);
					return userManager.logger.clearLog();
				},
				inString: "Test 'loading and removing users'",
				expected: true
			},
			{
				function: () => {
					let userManager = new UserManager();
					const fileData = "Users: \nAlice (30 years old)\nBob (25 years old)\n";
					userManager.fileManager.load(fileData, userManager);
					return userManager.logger.printLog().split('\n').length;
				},
				inString: "Test 'loading and removing users'",
				expected: 3
			}
		]
		testCases.forEach(test => {
			it(
				`'${test.inString}', expect '${test.expected}'`,
				() => {
					const res = test.function()
					expect(res).toBe(test.expected)
				}
			)
		})
	}
)