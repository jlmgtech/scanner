# scanner
A completely different way to do web apps

# roadmap

* add routable apps, so you can run `/admin/configure`
    * app would be run if user navigates to above url
    * different urls require evts/rpc to interop, cannot share directly

* add library stuff, so you can run functions like `/admin/admin.usernames()`
    * rpc style stuff, like `const usrs = await rpc("admin/admin").usernames();`

* add events and interop, like so:
    * `on('admin/user_added', handler)`
    * `do('admin/user_added', ...params)`

* add lifecycle events, like so:
    * `on('/loaded', (args) => {...})`
    * `on('/exit', (args) => {...})`
    * `on('/interrupt', (args) => {...})`
    * `on('/kill', (args) => {...})`

Modules could be running as microservices.
