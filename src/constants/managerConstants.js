export const activeOrders = [
    {
        seating: "A",
        tables: [
            {
                tableNo: "Table 1",
                status: 'Booked',
                orders: {
                    status: 'preparing',
                    dishes: [
                        {
                            name: 'Pasta',
                            quantity: 2,
                            servingSize: 'Medium',
                            tags: ['extra cheese']
                        },
                        {
                            name: 'Salad',
                            quantity: 1,
                            servingSize: 'Large',
                            tags: ['no dressing', 'extra avocado']
                        }
                    ]
                }
            },
            {
                tableNo: "Table 2",
                status: 'Seated',
                orders: {
                    status: 'preparing',
                    dishes: [
                        {
                            name: 'Burger',
                            quantity: 1,
                            servingSize: 'Large',
                            tags: ['no onions']
                        },
                        {
                            name: 'Fries',
                            quantity: 2,
                            servingSize: 'Small',
                            tags: ['extra salt']
                        }
                    ]
                }
            }
        ]
    },
    {
        seating: "B",
        tables: [
            {
                tableNo: "Table 3",
                status: 'Ordered',
                orders: {
                    status: 'completed',
                    dishes: [
                        {
                            name: 'Pizza',
                            quantity: 1,
                            servingSize: 'Large',
                            tags: ['extra pepperoni', 'thin crust']
                        },
                        {
                            name: 'Soda',
                            quantity: 3,
                            servingSize: 'Medium',
                            tags: []
                        }
                    ]
                }
            },
            {
                tableNo: "Table 4",
                status: 'Booked',
                orders: {
                    status: 'preparing',
                    dishes: [
                        {
                            name: 'Steak',
                            quantity: 1,
                            servingSize: 'Medium',
                            tags: ['rare']
                        },
                        {
                            name: 'Mashed Potatoes',
                            quantity: 1,
                            servingSize: 'Small',
                            tags: []
                        }
                    ]
                }
            }
        ]
    }
]
