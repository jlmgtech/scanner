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

* file-based routing
    * each app is a js file located wherever
    * the js file exports function names for lifecycle hooks
    * library functions are stored in `/lib` and are named like `lib<thing>.js`
    * library functions can be stored in subdirs, but will need to be referenced that way (e.g. /lib/net/libfetcher.js)
    * events are dispatched from wherever

## questions

* what about daemons? App / event listener Lifetimes?
* do we have to keep a list of what is running?
* what about multi-user considerations? Realtime updates from other users?
* even though it's a GUI, it should be designed with the simplicity of CLI
    - for instance, a GUI has a main window where apps open subwindows
    - a cli app consumes the entire interface at a given time, but can be put in the background
      for other apps to run. Perhaps they can even be split into panes ala tmux/screen.

Modules could be running as microservices.
