const fs = require("fs").promises;
const path = require('path');
const {start} = require("./index.js");
const users = {
    "john": {
        name: "John McMathers",
        password: "asdfasdf",
        token: "1392jf",
    },

    "newbie": {
        name: "newbie",
        password: "password",
        token: "12345",
    },
    "admin": {
        name: "admin adminson",
        password: "pass",
        token: null,
    },
};

async function main({show, id, args}) {
    // This is a program.  You can write your operating system, here:
    for (;;) {
        const {app} = await show(await appmenu(id));
        if (!app) {
            continue;
        }

        let obj = null;
        try {
            obj = require("./" + app);
        } catch(e) {
            await show("error - " + e + ". Refresh to continue.");
            continue;
        }
        if (typeof obj.main !== "function") {
            await show(`app ${app} does not have a main function.\n<a href='${id}'>ok</a>`);
            continue;
        }

        await obj.main(id, show); // TODO - args?
        continue;
    }
}


async function appmenu(id) {
    const apps = [];
    const err = await listFiles(`apps`, apps);
    if (err) {
        return `unknown error occurred`;
    }
    return `
    <div>
        <ul>
            ${apps.map(app=>`
            <li>
                <a href="/${id}?app=${app}">${path.basename(app)}</a>
            </li>
            `).join("")}
        </ul>
    </div>
    `;
}

async function listFiles(directory, fileNames) {

    try {

        const files = await fs.readdir(__dirname + "/" + directory);

        for (const file of files) {

            const filePath = path.join(directory, file);
            const stats = await fs.stat(filePath);

            if (stats.isFile() && file[0] !== "_") {
                fileNames.push(filePath);
            } else if (stats.isDirectory()) {
                const err = await listFiles(filePath, fileNames);
                if (err) {
                    return err;
                }
            }

        }

        return 0;

    } catch(e) {

        console.error(e);
        return -1;

    }

}

start(8080, main);
