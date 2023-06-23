const EventEmitter = require("eventemitter3");
const evts = new EventEmitter();
const express = require("express");
const app = express();
const conns = {};

let main;

app.get('/', function(req, res) {
    const id = Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    res.send(`<a href='/${id}'>start</a>`);
});

app.get("/:id/", (req, res) => {
    const id = req.params.id;
    const value = {...req.query};

    evts.once(id, html => {
        res.send(html);
    });

    if (conns[id]) {
        conns[id](value);
    } else {
        main(id);
    }
});

function show(id, html) {
    return new Promise((resolve, reject) => {
        conns[id] = resolve;
        evts.emit(id, html);
    });
}


module.exports = {
    show,
    start(port, entrypoint) {
        main = async function(id) {
            await entrypoint(id);
            for (;;) await show(id, "done");
        };
        app.listen(port, () => console.log("Server started on port %d", port));
    },
};
