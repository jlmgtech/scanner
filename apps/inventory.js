module.exports = {main};

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

async function main(id, show) {
    for (;;) {

        if (items.length === 0) {
            await show("no items to show");
        }

        let output = "";

        output += "<style>ul > li > span {display:inline-block;margin:0.25em}</style>";
        output += "<table><thead><th>name</th><th>qty</th><th>price</th></thead><tbody>";
        for (const item of items) {
            output += "<tr>";
            output += `<td>${item.name}</td>`;
            output += `<td>${item.qty}</td>`;
            output += `<td>${item.price}</td>`;
            output += "</tr>";
        }

        output += "</tbody></table>";

        output += `<div><a href='/${id}?choice=add_item'>add item</a></div>`;
        output += `<div><a href='/${id}?choice=remove_item&item=x'>remove item</a></div>`;
        output += `<div><a href='/${id}?choice=update_item&item=x'>update item</a></div>`;
        output += `<div><a href='/${id}?choice=exit'>exit</a></div>`;

        const rsp = await show(output);
        if (!rsp) return;
        switch (rsp.choice) {
            case "add_item":
                await add_item_flow(id, show);
                break;
            case "remove_item":
                await show("remove item not done yet");
                break;
            case "update_item":
                await show("update item not done yet");
                break;
            case "exit":
                await show("goodbye! <button onclick='location.reload()'>bye</button>");
                return;
            default:
                await show("unrecognized option <button onclick='location.reload()'>ok</button>");
                break;
        }
    }
}

async function add_item_flow(id, show) {
    // 1. get item name, qty, and price
    let output = `
    <form method="GET" action="/${id}">
        <div><input name="name"  type="text"   placeholder="item name" /></div>
        <div><input name="qty"   type="number" placeholder="item qty" /></div>
        <div><input name="price" type="number" placeholder="item price" /></div>
        <div>
            <button onclick="location.reload()">cancel</button>
            <input type="submit" value="save" />
        </div>
    </form>
    `;
    const rsp = await show(output);
    if (!rsp) return;

    items.push(rsp);
    await show("item added! <button onclick='location.reload()'>next</button>");
}
