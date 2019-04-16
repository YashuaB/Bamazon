var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    
    user: "root",

    
    password: "root",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startPrompt()
})



function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
            inventory()
        } else {
            console.log("Thank you! Come back soon!")
        }
    })
}



function inventory() {

    listInventory()

   
    function listInventory() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantiy;

                    console.log(`
           Item:${itemId}
           Product:${productName }
           Department:${departmentName }
           Price:${ price }
           Stock:${stockQuantity}
           `)
           
          }
           
           
            continuePrompt()
        });
    }
}



function continuePrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            selectionPrompt()
        } else {
            console.log("Thank you! Come back soon!");
        }
    });
}



function selectionPrompt() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?",

        }
    ]).then(function(userPurchase) {

       

        connection.query("SELECT * FROM products WHERE item_id=?", userPurchase.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (userPurchase.inputNumber > res[i].stock_quantity) {
                  console.log("Sorry! Not enough in stock. Please try again later.")
                     startPrompt()

                } else {
                  console.log("Awesome! We can fulfull your order.")
                  
                    console.log(`You've selected:
                                Item: ${res[i].product_name}
                          Department: ${res[i].department_name}
                              Price: ${res[i].price}
                            Quantity: ${userPurchase.inputNumber}
                              Total: ${res[i].price * userPurchase.inputNumber}`)
      

                    var newStock = (res[i].stock_quantity - userPurchase.inputNumber);
                    var purchaseId = (userPurchase.inputId);
                    
                    confirmPrompt(newStock, purchaseId)
                }
            }
        });
    });
}


function confirmPrompt(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Are you sure you would like to purchase this item and quantity?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{ stock_quantity: newStock}, { item_id: purchaseId }], function(err, res) {})

            console.log("Transaction completed. Thank you.")
            
            startPrompt()
        } else {
              console.log("No worries. Maybe next time!")
            
            startPrompt()
        }
    });
}