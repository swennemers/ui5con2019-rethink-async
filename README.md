# Rethink async! - Level up with Reactive Programming in ES2018
UI5con 2019 Talk by Sebastian Wennemers (@S7nW7s) 

https://swennemers.github.io/ui5con2019-rethink-async/slides/index.html#/

## Start the slides locally
```
npm install
npm start
```
That opens http://127.0.0.1:5050/slides/index.html

## Sample code
The sample code resides in the samples/webcomponents folder. To run them seperately, trigger:
```
cd samples/webcomponents
npm install
npm start
```
The plain counter data flow example can be found at: http://localhost:1234/flow.html
The plain wikipedia article suggestions example can be found at: http://localhost:1234/autocomplete.html

To make changes that can appear in the slide show embedded run samples/webcomponents folder:
```
npm run build
```
Make sure to clean your browser cache of a presentation as the iframes might be cached.
