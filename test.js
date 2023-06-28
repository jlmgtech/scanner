const {start} = require("./index.js");
const users = {
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

    // 0. store the token and link it to the account:
    const {token} = args;

    const user = Object.values(users).find(u => u.token === token);
    if (!user) {
        await show("Invalid token");
        return;
    }

    await show(`Hello, ${user.name}. Let's get you set up. <a href='/${id}/'>next</a>`);

    const {pmngr} = await show(`Do you use a password manager? <br />` +
        `<a href='/${id}?pmngr=yes'>yes</a> <a href='/${id}?pmngr=no'>no</a>`);

    if (pmngr === "no") {
        // show the top 5 password managers, including the built in android, microsoft, and apple ones:
        // also this list of links should open in a new window using target _blank.
        await show("You will not be able to use this service without a password manager " +
            "because it relies on an authentication protocol called TOTP."+
            "TOTP requires a secret key that is stored in your password manager.<br />"+
            "Let's get you set up with a new password manager:<br />"+
            "We HIGHLY recommend 1password. It is the most secure and easiest to use.<br />"+
            "Install one of the following password managers or choose your own:<br />"+
            "<a href='https://www.1password.com/' target='_blank'>1Password</a><br />"+
            "<a href='https://www.lastpass.com/' target='_blank'>LastPass</a><br />"+
            "<a href='https://keepass.info/' target='_blank'>KeePass</a><br />"+
            "<a href='https://bitwarden.com/' target='_blank'>Bitwarden</a><br />"+
            "<a href='https://www.dashlane.com/' target='_blank'>Dashlane</a><br />"+
            "<a href='https://www.roboform.com/' target='_blank'>RoboForm</a><br />"+
            "<a href='https://www.truekey.com/' target='_blank'>True Key</a><br />" +
            `<a href='/${id}/'>next (or skip)</a>`
        );
    }

    // 1. help the user get set up with a password manager.
    const {mname} = await show("What which password manager will you use?<br />" +
        `<a href='/${id}?mname=1password'>1Password</a><br />` +
        `<a href='/${id}?mname=lastpass'>LastPass</a><br />` +
        `<a href='/${id}?mname=keepass'>KeePass</a><br />` +
        `<a href='/${id}?mname=bitwarden'>Bitwarden</a><br />` +
        `<a href='/${id}?mname=dashlane'>Dashlane</a><br />` +
        `<a href='/${id}?mname=roboform'>RoboForm</a><br />` +
        `<a href='/${id}?mname=truekey'>True Key</a><br />` +
        `<a href='/${id}?mname=other'>Other</a><br />`
    );

    // 2. show them the qr code so they can get TOTP codes.
    await show("Now that you have a password manager, you can use it to store your secret key.<br />");
    const {qr} = await show("Scan this QR code with your password manager to store your secret key:<br />" +
        `<img src='https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=otpauth://totp/My%20App%3A${user.name}%3Fsecret%3D${user.password}%26issuer%3DMy%2520App' />`
    );

    // 3. show them the login page.
    for (;;) {
        await show("Now that you have your secret key stored in your password manager, you can use it to log in.<br />" +
            "<a href='https://go.ourers.com/'>Log in</a>");
    }

}

start(8080, main);
