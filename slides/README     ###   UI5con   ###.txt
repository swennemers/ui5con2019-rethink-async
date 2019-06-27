Dear UI5con presenter,

this is a first shot at providing an HTML slide template for UI5con presentations. It should work in Chrome and Firefox, but please test with the browser you are going to use for presenting.
Using a UI5con template for your presentation is optional.

To create slides, add and fill <section> tags in the index.html file. This template contains example slides with:
- standard HTML content
- Markdown content
- second-level vertical navigation
- syntax-highlighted code
For further documentation, please visit https://revealjs.com and https://github.com/hakimel/reveal.js

You may adapt the template where needed (e.g. the transition type or the vertical and horizontal alignment on regular slides), but we suggest to keep the title and last slide, as they convey the UI5con branding.

As-is, this template uses vertically and horizontally centered text, which is default for reveal.js presentations. If you prefer top-left-aligned content, set "center: false" in the Reveal.initialize(...) call and add the CSS classes "ui5con-alignleft" and  "ui5con-aligntop" to the <body> element in the HTML.
All style changes made by us were made in index.html. The "UI5con orange" color is available with the CSS class "ui5con-orange".

The custom fonts and the "test" folder have been removed for size reasons, the UI5con logo image has been added, otherwise this is a copy of the reveal.js v3.8.0 repository content.

You can create a PDF (or paper printout) from your slideshow by appending the URL parameter "?print-pdf" to the URL of the slideshow and then using the regular printing or PDF export functionality of your browser.
Please test the print result, as the additionally loaded printing stylesheets may affect the layout.