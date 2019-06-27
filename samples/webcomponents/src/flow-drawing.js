import "@ui5/webcomponents/dist/Button";
import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/InputSuggestions"; //included to allow merging with autocomplete sample
import "../../../slides/plugin/highlight/highlight.js";
hljs.initHighlightingOnLoad();

import {fromEvent}  from "./utils/operators.js";
import {merge} from "./utils/operators.js";

function drawing($minus, $plus){
	return new Promise(function(resolve){
		setTimeout(function () {
			// drawing code
			var w = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			x = w.innerWidth || e.clientWidth || g.clientWidth,
			y = w.innerHeight|| e.clientHeight|| g.clientHeight;

			if (y < 700) {
			y = 700
			}

			// Creates canvas 320 × 200 at 10, 50
			var paper = Raphael(0, 0, x, y);

			function moveEvent(conn, labelText, value, bottomText) {
			var n = conn.line.getTotalLength()
			var pos = conn.line.getPointAtLength(0)
			var radius = typeof labelText === 'string' ? 20 : 20
			var circle = paper.circle(pos.x, pos.y, radius);
			circle.attr({
				cx: pos.x,
				cy: pos.y,
				fill: '#fff',
				stroke: '#000'
			})

			var label = paper.text()
			label.attr({
				text: labelText,
				'font-size': '12px'
			})

			var bottomLabel;
			if (bottomText) {
				bottomLabel = paper.text()
				bottomLabel.attr({
				text: bottomText,
				'font-size': '12px',
				'font-family': 'monospace',
				'white-space': 'pre',
				'text-anchor': 'end'
				})
			}

			var counter = 0;
			return new Promise(function (resolve) {
				var interval;
				function animate() {
				if (n < counter) {
					clearInterval(interval);
					circle.remove();
					label.remove();
					if (bottomLabel) {
					bottomLabel.remove()
					}
					resolve(value);
					return;
				}
				var pos = conn.line.getPointAtLength(counter);
				circle.attr({
					cx: pos.x,
					cy: pos.y
				})
				label.attr({
					x: pos.x,
					y: pos.y
				})
				if (bottomLabel) {
					bottomLabel.attr({
					x: pos.x - 50,
					y: pos.y + 60
					})
				}
				counter += 1;
				}
				interval = setInterval(animate, 10);
			})
			}
			window.drawing = {};
			drawing.moveEvent = moveEvent;

			var decClicks = paper.rect(400, 150, 100, 50)
			decClicks.attr('fill', '#ffe')
			decClicks.attr('stroke', '#f00')
			var decClicksText = paper.text(450, 175)
			decClicksText.attr({ text: 'eventToValue\nev => -1', 'font-size': '14px' })
			var decrementsText = paper.text(550, 160)
			decrementsText.attr({ text: 'decrement iterator', 'font-size': '12px' })

			var incClicks = paper.rect(400, 250, 100, 50)
			incClicks.attr('fill', '#ffe')
			incClicks.attr('stroke', '#f00')
			var incClicksText = paper.text(450, 275)
			incClicksText.attr({ text: 'eventToValue\nev => +1', 'font-size': '14px' })
			var incrementsText = paper.text(550, 285)
			incrementsText.attr({ text: 'increment iterator', 'font-size': '12px' })

			var actions = paper.rect(600, 200, 100, 50)
			actions.attr('fill', '#ffe')
			actions.attr('stroke', '#f00')
			var actionsText = paper.text(650, 225)
			actionsText.attr({ text: 'merge', 'font-size': '15px' })
			var actions$Text = paper.text(690, 260)
			actions$Text.attr({ text: 'action iterator', 'font-size': '13px' })

			// paper.connection(circle, circle2, '#00f')
			// animating movement along path is based on
			// http://jsfiddle.net/gyeSf/17/
			drawing.c1 = paper.connection($minus, decClicks, '#333')
			drawing.c2 = paper.connection($plus.getDomRef(), incClicks, '#333')

			drawing.c3 = paper.connection(decClicks, actions, '#333')
			drawing.c4 = paper.connection(incClicks, actions, '#333')

			// model
			var scan = paper.rect(550, 400, 100, 50)
			scan.attr('fill', '#ffe')
			scan.attr('stroke', '#0f0')
			var scanText = paper.text(600, 425)
			scanText.attr({ text: 'count\n += \naction', 'font-size': '15px' })

			var valueText = paper.text(680, 420)
			valueText.attr({ text: 'value\n0', 'font-size': '15px' })
			drawing.setValue = function (value) {
			valueText.attr('text', 'value\n' + value)
			}

			var count$Text = paper.text(520, 410)
			count$Text.attr({ text: 'count', 'font-size': '15px' })

			drawing.c5 = paper.connection(actions, scan, '#333')

			// view
			var vtree = paper.rect(360, 550, 340, 150)
			vtree.attr('fill', '#ffe')
			vtree.attr('stroke', '#00f')
			var vtreeText = paper.text(370, 625)
			vtreeText.attr({
			text: 'for await (const count of model){\n'+
					'    $input.setAttribute("value", i);\n'+
					'}',
			'font-size': '15px',
			'font-family': 'monospace',
			'white-space': 'pre',
			'text-anchor': 'start'
			})
			// var vtree$Text = paper.text(320, 635)
			// vtree$Text.attr({ text: 'databinding', 'font-size': '15px' })

			drawing.c6 = paper.connection(scan, vtree, '#333')
			drawing.c7 = paper.connection(vtree, document.querySelector('#app'), '#333')

			// Intent / Model / View blocks
			var intentBlock = paper.rect(380, 120, 350, 200)
			intentBlock.attr({
			stroke: '#f00'
			});
			var intentText = paper.text(700, 130)
			intentText.attr({
			text: 'Intent',
			'font-size': '15px',
			fill: '#f00',
			stroke: 'none'
			})

			var modelBlock = paper.rect(380, 330, 350, 170)
			modelBlock.attr({
			stroke: '#0f0'
			});
			var modelText = paper.text(700, 340)
			modelText.attr({
			text: 'Model',
			'font-size': '15px',
			fill: '#0f0',
			stroke: 'none'
			})

			var viewText = paper.text(650, 560)
			viewText.attr({
				text: '',
				'font-size': '15px',
				fill: '#00f',
				stroke: 'none'
			})
			resolve();
		}, 1000);
	});
}

async function* moveEvent(eventIterator, c, text) {
	for await (const value of eventIterator) {
		//yielding the value will wait drawing promise until it takes the next value of event iterator
		yield drawing.moveEvent(drawing[c], text || value, value);
	}
}

async function* eventToValue(eventIterator, value) {
	for await (const event of eventIterator) {
		yield value;
	}
}

async function* model(incrementIterator, decrementIterator, startValue) {
	var count = startValue;
	for await (const action of merge([incrementIterator, decrementIterator])) {
		await drawing.moveEvent(drawing.c5, action)
		count += action;
		await drawing.setValue(count);
		await drawing.moveEvent(drawing.c6, count)

		yield count;
	}
}

async function main() {

	var $plus = document.getElementById("increment");
	var $minus = document.getElementById("decrement");
	var $label = document.getElementById("value");
	await drawing($minus, $plus);

	for await (const count of model(
		moveEvent(
			eventToValue(
				moveEvent(
					fromEvent($minus, "click"),
					"c1",
					"event"
				),
				-1,
			),
			"c3"
		),
		moveEvent(
			eventToValue(
				moveEvent(
					fromEvent($plus, "click"),
					"c2",
					"event"
				),
				1
			),
			"c4"
		),
		0)
	) {
		console.log(count);
		await drawing.moveEvent(drawing.c7, "setValue", count, 'input.setAttribute\n("value", '+count+'")')
		$label.setAttribute("value", "Count: " + count);
	}
}
main();
