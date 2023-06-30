const items = [
  {
    "name": "Bonzaai Tree",
    "qty": 3,
    "price": 19.99
  },
  {
    "name": "Vintage Watch",
    "qty": 1,
    "price": 299.99
  },
  {
    "name": "Laptop Bag",
    "qty": 5,
    "price": 39.99
  },
  {
    "name": "Scented Candle",
    "qty": 2,
    "price": 12.99
  },
  {
    "name": "Bluetooth Speaker",
    "qty": 4,
    "price": 49.99
  },
  {
    "name": "Leather Wallet",
    "qty": 2,
    "price": 29.99
  },
  {
    "name": "Smartphone Stand",
    "qty": 10,
    "price": 9.99
  },
  {
    "name": "Designer Sunglasses",
    "qty": 1,
    "price": 199.99
  },
  {
    "name": "Gourmet Chocolate",
    "qty": 3,
    "price": 14.99
  },
  {
    "name": "Fitness Tracker",
    "qty": 2,
    "price": 79.99
  }
];
module.exports = {

    addItem(name, qty, price) {
        items.push({name, qty, price});
    },

    removeItem(name) {
        const len = items.length;
        items = items.filter(i => i.name !== name);
        return len - items.length;
    },

    updateItem(name, qty, price) {
        const item = items.find(i => i.name === name);
        if (!item) {
            return false;
        }
        items.qty = qty;
        items.price = price;
        return true;
    },

    listItems() {
        return items.slice();
    }

};
