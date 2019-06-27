import "@ui5/webcomponents/dist/Input";
import "@ui5/webcomponents/dist/InputSuggestions"

import {fromEvent, delay} from "./utils/operators.js";


async function searchWikipedia(sTerm){
    var sSafeTerm = encodeURIComponent(sTerm);
    var response = await fetch(`https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${sSafeTerm}&limit=10`)
    return response.json()
}

async function* getEntries(inputIterator){
    var tooSoon = false, last;
    for await(const oEvent of inputIterator){
        var sValue = oEvent.target.value;
        if(!sValue || tooSoon) {
            //no value, or debounced
            continue;
        }
        if(sValue === last){
            //distinct until changed
            continue;
        }
        if(sValue.length < 3) {
            //not long enough
            continue;
        }
        last = sValue;
        yield await searchWikipedia(sValue);
        tooSoon = true;
        delay(500).then(function(){
            tooSoon = false
        });
    }
}

async function main() {
    var $Input = document.getElementById("suggestions-input");
    // Listen for the suggestionItemSelect event to trigger navigation
    $Input.addEventListener("suggestionItemSelect", function(oEvent) {
        var oListItem = oEvent.detail.item;
        var sLink = oListItem.getAttribute("data-src");
        window.open(sLink, "_blank");
    });
    for await(const mEntries of getEntries(fromEvent($Input, "input"))){
        // Clear the current suggestions
        [].slice.call($Input.children).forEach(function(child) {
            if (child.id !== "user-icon") {
                $Input.removeChild(child);
            }
        });
        // Add the new suggestions in the DOM
		mEntries[1].forEach(function(title, i) {
            var sLink = mEntries[3][i];
			var li = document.createElement("ui5-li");
			li.icon = "sap-icon://world";
            li.textContent = title;
            li.description = mEntries[2][i];
            li.type  = sLink ? "Active" : "Inactive";
            li.setAttribute("data-src", sLink);
			$Input.appendChild(li);
		});

    }
}
main();
