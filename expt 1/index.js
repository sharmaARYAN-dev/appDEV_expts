const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let items = ['apple', 'banana', 'orange'];

function showMenu() {
    console.log('\n=== Array CRUD Operations ===');
    console.log('1. Create (Add item)');
    console.log('2. Read (View all items)');
    console.log('3. Update (Edit item)');
    console.log('4. Delete (Remove item)');
    console.log('5. Exit');
}

function getUserInput(prompt) {
    return new Promise(resolve => {
        readline.question(prompt, answer => {
            resolve(answer);
        });
    });
}

async function main() {
    while (true) {
        showMenu();
        const choice = await getUserInput('Enter your choice (1-5): ');

        switch (choice) {
            case '1':
                const newItem = await getUserInput('Enter item to add: ');
                items.push(newItem);
                console.log('Item added successfully!');
                break;
            case '2':
                console.log('\nCurrent items:');
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${item}`);
                });
                break;
            case '3':
                console.log('\nCurrent items:');
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${item}`);
                });
                const updateIndex = parseInt(await getUserInput('Enter item number to update: ')) - 1;
                if (updateIndex >= 0 && updateIndex < items.length) {
                    const updatedItem = await getUserInput('Enter new value: ');
                    items[updateIndex] = updatedItem;
                    console.log('Item updated successfully!');
                } else {
                    console.log('Invalid item number!');
                }
                break;
            case '4':
                console.log('\nCurrent items:');
                items.forEach((item, index) => {
                    console.log(`${index + 1}. ${item}`);
                });
                const deleteIndex = parseInt(await getUserInput('Enter item number to delete: ')) - 1;
                if (deleteIndex >= 0 && deleteIndex < items.length) {
                    items.splice(deleteIndex, 1);
                    console.log('Item deleted successfully!');
                } else {
                    console.log('Invalid item number!');
                }
                break;
            case '5':
                console.log('Thank you for using the program!');
                readline.close();
                return;
            default:
                console.log('Invalid choice! Please try again.');
        }
    }
}

main();
