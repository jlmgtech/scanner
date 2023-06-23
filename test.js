const {show, start} = require("./index.js");
const users = {
    "admin": {
        name: "admin adminson",
        password: "pass",
    },
};

async function main(id) {
    const user = await login(id);
    loop: for (;;) {
        const {choice} = await show(id, mainMenu(id, user));
        switch (choice) {
            case "logout":
                await show(id, "Bye!");
                return;
            case "profile":
                await show(id, profileMenu(id, user));
                break;
            case "settings":
                await show(id, settingsMenu(id, user));
                break;
            case "back":
                await show(id, `going back to main menu<a href='/${id}'>ok</a>`);
                continue;
            default:
                await show(id, "Unknown choice");
                break loop;
        }
    }
}

async function login(id) {
    for (let i = 0; i < Infinity; i++) {
        const {username, password} = await show(id, loginpage(id));
        if (users[username]?.password === password) {
            await show(id, `success! <a href='/${id}'>continue</a>`);
            return users[username];
        } else {
            await show(id, `bah, try again! <a href='/${id}'>continue</a>`);
        }
    }
}

start(3000, main);

const loginpage = id => `
<form action="/${id}">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <input type="submit" value="login">
</form>
`;

const mainMenu = (id, user) => `
<h1>hello ${user.name}</h1>
<a href="/${id}/?choice=logout">logout</a>
<ul>
    <li><a href="/${id}?choice=profile">users</a></li>
    <li><a href="/${id}?choice=settings">settings</a></li>
    <li><a href='/${id}?choice=back'>back</a></li>
</ul>
`;

const profileMenu = (id, user) => `
<h1>users</h1>
<a href="/${id}">back</a>
<ul>
    <li><a href="/${id}/users/1">user 1</a></li>
    <li><a href="/${id}/users/2">user 2</a></li>
</ul>
`;

const settingsMenu = (id, user) => `
<h1>settings</h1>
<a href="/${id}">back</a>
<ul>
    <li><a href="/${id}/settings/1">setting 1</a></li>
    <li><a href="/${id}/settings/2">setting 2</a></li>
</ul>
`;
