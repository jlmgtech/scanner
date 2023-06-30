const {addItem, removeItem, updateItem, listItems} = require("./_items.js");

async function main(id, show) {
    for (;;) {

        const items = listItems();
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

    addItem(rsp.name, rsp.qty, rsp.price);
    await show("item added! <button onclick='location.reload()'>next</button>");
}

async function update_item_flow(id, show) {
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
    const err = updateItem(rsp.name, rsp.qty, rsp.price);

    if (err) {
        return await show("item not updated, error occurred." + btn);
    } else {
        return await show("item updated " + btn);
    }
}

async function remove_item_flow(id, show) {
}

module.exports = {main};
