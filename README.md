# react-drawable-canvas
Drawable canvas component for React.js.

**Install**
```bash
$ npm install react-drawable-canvas --save
```
[Demo](http://react-drawable-canvas-example.herokuapp.com/)

[Demo source](https://github.com/jonhni/react-drawable-canvas-example)

**Example use:**
 ```js
const React = require('react');
const DrawableCanvas = require('react-drawable-canvas');

const App = React.createClass( {
  render() {
    return (
      <div>
        <DrawableCanvas />
      </div>
    );
  }
 });

module.exports = App;
```
Default props is white background with black brush, size 4.
**Add custom styles in the canvasStyle object.**
```js
{
  brushColor: '#000000',
  lineWidth: 4,
  canvasStyle: {
    backgroundColor: 'FFFFFF'
  },
  clear: false
}

```
The clear property can be used to reset the drawing. All other updates should set clear to false.
Example with buttons to clear the canvas and change the color:
```js
const App = React.createClass( {

  getInitialState() {
    return {
      brushColor: '#800909',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
    };
  },

  handleOnClickClear() {
    this.setState({
      clear: true
    });
  },

  handleOnClickChangeColorYellow() {
    this.setState({
      brushColor: '#ffff00',
      clear: false
    });
  },

  handleOnClickChangeColorRed(){
    this.setState({
      brushColor: '#800909',
      clear: false
    });
  },

  render() {
    return (
      <div>
        <DrawableCanvas {...this.state} />
        <button onClick={this.handleOnClickClear}>Clear all</button>
        <button onClick={this.handleOnClickChangeColorYellow}>Set color to Yellow</button>
        <button onClick={this.handleOnClickChangeColorRed}>Set color to Red</button>
      </div>
    );
  }

});

module.exports = App;

```
