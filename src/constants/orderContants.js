export const orders = [
    {
        seating: "A",
        tableNo: "Table 1",
        dishes: [
            {
                _id: 876789,
                name: "Chicken Burger",
                quantity: 2,
                servingSize: "Small",
                addons: ["Cheese Dip", "Coke", "Saus", "Brownie"],
                message: "",
            },
            {
                _id: 876790,
                name: "Beef Burger",
                quantity: 1,
                servingSize: "Medium",
                addons: ["BBQ Sauce", "Fries", "Sprite"],
                message: "No pickles",
            }
        ],
        isPending: true,
        date: new Date().toLocaleDateString('en-CA'), 
    },
    {
        seating: "B",
        tableNo: "Table 2",
        dishes: [
            {
                _id: 876791,
                name: "Veggie Pizza",
                quantity: 1,
                servingSize: "Large",
                addons: ["Extra Cheese", "Olives", "Chili Flakes"],
                message: "Less salt",
            },
            {
                _id: 876792,
                name: "Pasta Alfredo",
                quantity: 2,
                servingSize: "Small",
                addons: ["Garlic Bread", "Lemonade"],
                message: "No onions",
            }
        ],
        isPending: false,
        date: new Date().toLocaleDateString('en-CA'), 
    },
    {
        seating: "C",
        tableNo: "Table 3",
        dishes: [
            {
                _id: 876793,
                name: "Grilled Chicken",
                quantity: 3,
                servingSize: "Large",
                addons: ["Mashed Potatoes", "Gravy", "Coleslaw"],
                message: "",
            },
            {
                _id: 876794,
                name: "Caesar Salad",
                quantity: 1,
                servingSize: "Medium",
                addons: ["Croutons", "Parmesan"],
                message: "Extra dressing",
            }
        ],
        isPending: true,
        date: new Date().toLocaleDateString('en-CA'), 
    },
    {
        seating: "D",
        tableNo: "Table 4",
        dishes: [
            {
                _id: 876795,
                name: "BBQ Ribs",
                quantity: 2,
                servingSize: "Large",
                addons: ["Baked Beans", "Cornbread", "Coleslaw"],
                message: "Extra sauce",
            },
            {
                _id: 876796,
                name: "French Fries",
                quantity: 2,
                servingSize: "Small",
                addons: ["Ketchup", "Mayonnaise"],
                message: "Crispy",
            }
        ],
        isPending: false,
        date: new Date().toLocaleDateString('en-CA'), 
    }
];
