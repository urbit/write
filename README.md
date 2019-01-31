# Write

<img src="https://i.imgur.com/LCD6pyn.jpg" alt="You have to die a few times before you can really live." height="122px" width="240px"/>

## Running the code

The following instructions should run any Kamaji-standardized repository in the Tlon ecosystem:

1) Install NVM
    + See our [Unix / NVM guide](./guides/unix-nvm.md) (for beginners), or visit the [NVM readme](https://github.com/creationix/nvm) if you know what you're doing.
    + Verify correct Node / NPM versions:
    ```
    $ node -v
      > v10.13.0
    $ npm -v
      > 6.4.1
    ```
2) Install NPM CLI dependencies
    - `$ npm install -g gulp-cli`
3) Install NPM local dependencies
    - `$ npm install`
4) Build and watch local files for changes
    - `$ gulp watch`
    - See also individual tasks in [gulpfile.js](./gulpfile.js) if you want to run them manually

## Running the code on your Urbit

1) Mount your Urbit's desk to the Unix filesystem
    - In your Urbit's dojo, type: `|mount %`
2) Write the path of your mounted desk into the .urbitrc file
    - Example: "/Users/logan/Developer/urbit/build/zod/home"
3) Copy files into your pier to run them from your Urbit
    - `$ gulp copy-urbit`
