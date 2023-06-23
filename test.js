const {show, start} = require("./index.js");

async function main(id) {

    await login(id);

}

async function login(id) {
    for (let i = 0; i < Infinity; i++) {
        await show(id, loginpage(id));
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

