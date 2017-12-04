# toggle-element
an HTML Toggle Element

## How to use:
You will need to import this files in your index.html:
* toggle.js 
* toggle.css

**(There's also a minified version for them in /dist)**

The constructor only needs:
 * Id (for the DOM element)
 * A callback function for true position
 * A callback function for false position (optional)
 
```javascript
var a = new ToggleElement('toggle1', trueFn, falseFn);
var b = new ToggleElement('toggle2', trueFn, null);
```
 
This will return a ToggleElement you can append anywhere you want, like this:
```javascript
document.getElementById('content').appendChild(a.domElement);
document.getElementById('content').appendChild(b.domElement);
```

The toggle action can be triggered either by pressing the element in the DOM or programatically by doing this:
```javascript
document.getElementById('toggle1').toggleElement.toggle();
document.getElementById('toggle2').toggleElement.toggle();
```
