import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";

import {fromEvent, merge} from "./utils/operators.js";

async function* increments(eventIterator) {
    for await (const event of eventIterator) {
        yield +1;
    }
}
async function* decrements(eventIterator) {
    for await (const event of eventIterator) {
        yield -1;
    }
}

async function* data(incrementIterator, decrementIterator, startValue) {
    var currentValue = startValue;
    for await (const action of merge([incrementIterator, decrementIterator])) {
        currentValue += action;
        yield currentValue;
    }
}

async function main() {
    var $plus = document.getElementById("increment");
    var $minus = document.getElementById("decrement");
    var $label = document.getElementById("value");

    for await (const currentValue of data(
        increments(
            fromEvent($plus, "click")
        ),
        decrements(
            fromEvent($minus, "click")
        ),
        0)
    ) {
        console.log(currentValue);
        $label.setAttribute("value", "Count: " + currentValue);
    }
}
main();
