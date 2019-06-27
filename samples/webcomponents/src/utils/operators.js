"use strict";



async function* identity(iterable) {
    for await(const value of iterable) yield value;
}

export async function* map(iterable, fn) {
    for await(const value of iterable) yield fn(value);
}
export async function* filter(iterable, fn) {
    for await(const value of iterable) if(fn(value)) yield value;
};
export async function* flatMap(iterable, fn) {
    for await(const value of iterable){
        for await(const inner of value) {
            yield await fn(inner);
        }
    }
};


Symbol.ignored = Symbol(); // easier with promise cancellation
export function last(fn) {
    let lastSeen = Symbol.ignored;
    return function (...args) {
        const current = lastSeen = fn.call(this, ...args);
        return current.then(value =>
            (current !== lastSeen) ? Symbol.ignored : value);
        };
    }

export async function* flatMapLatest (iterable, fn) {
    for await (const value of map(iterable, last(fn))) {
        if (value !== Symbol.ignored) yield value;
    }
};
export async function* combine(iterable1, iterable2) {
    yield* iterable1;
    yield* iterable2;
}

/*https://stackoverflow.com/questions/50585456/how-can-i-interleave-merge-async-iterables*/
export async function* merge(iterable) {
    function scheduleNextValue(asyncIterator, iteratorIndex) {
        return asyncIterator.next().then(result => ({
            iteratorIndex,
            result,
        }));
    }
    const never = new Promise(() => {});
    const asyncIterators = Array.from(iterable, asyncIterable => identity(asyncIterable));
    let count = asyncIterators.length;
    const nextValuePromises = asyncIterators.map(scheduleNextValue);
    while (count) {
        const {iteratorIndex, result} = await Promise.race(nextValuePromises);
        if (result.done) {
            nextValuePromises[iteratorIndex] = never;
            count--;
        } else {
            nextValuePromises[iteratorIndex] = scheduleNextValue(asyncIterators[iteratorIndex], iteratorIndex);
            yield result.value;
        }
    }
}

export async function logValues(iterable){
    for await(const value of iterable){
        console.log(value);
    }
}

export async function delay(ms){
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}


// Promisified sleep function
const sleep = ms => new Promise((resolve, reject) => {
    setTimeout(() => resolve(ms), ms);
  });

// const a = async function * () {
//     yield 'a';
//     await sleep(1000);
//     yield 'b';
//     await sleep(2000);
//     yield 'c';
// };

// const b = async function * () {
//     await sleep(600);
//     yield 'i';
//     yield 'j';
//     await sleep(2000);
//     yield 'k';
// };

// function b1(){
//     return b();
// }

const c = async function * () {
    yield 'x';
    await sleep(2000);
    yield 'y';
    await sleep(8000);
    yield 'z';
    await sleep(10000);
    throw new Error('You have gone too far! ');
};

// logValues(combine([1,2], [1,2]));

// const timer = () => setInterval(()=>console.log('tick'), 1000)
// // timer();
// logValues(merge([a(), b()]));



export function once(el, event) {
    return new Promise((resolve, reject) => {
        const handler = function (e) {
            resolve(e);
            el.removeEventListener(event, handler);
        };
        el.addEventListener(event, handler);
    });
}

export async function* fromEvent(element, eventName) {
    while (true) yield await once(element, eventName);
}


export async function toCallback(eventIterator, fn) {
	for await (const value of eventIterator) {
		fn(value);
	}
}
