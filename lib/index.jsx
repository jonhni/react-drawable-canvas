"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = React.PropTypes;

const DrawableCanvas = React.createClass({
  propTypes: {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
      backgroundColor: PropTypes.string
    }),
    clear: PropTypes.bool
  },
  getDefaultProps() {
    return {
      brushColor: "#000000",
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: "##FFFFFF"
      },
      clear: false
    };
  },
  getInitialState(){
    return {
      canvas: null,
      context: null,
      drawing: false,
      lastX: 0,
      lastY: 0,
      history: []
    };
  },
  componentDidMount(){
    let canvas = ReactDOM.findDOMNode(this);

    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let ctx = canvas.getContext('2d');
    let offsetleft = canvas.getBoundingClientRect();

    this.setState({
      canvas: canvas,
      context: ctx
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
  },
  handleOnMouseDown(e){
    let rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    this.setState({
      lastX: e.clientX - rect.left,
      lastY: e.clientY - rect.top
    });
    this.setState({
      drawing: true
    });
  },
  handleOnMouseMove(e){

    if(this.state.drawing){
      let rect = this.state.canvas.getBoundingClientRect();
      let lastX = this.state.lastX;
      let lastY = this.state.lastY;
      let currentX = e.clientX - rect.left;
      let currentY = e.clientY - rect.top;

      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  },
  handleonMouseUp(){
    this.setState({
      drawing: false
    });
  },
  draw(lX, lY, cX, cY){
    this.state.context.strokeStyle=this.props.brushColor;
    this.state.context.lineWidth=this.props.lineWidth;
    this.state.context.moveTo(lX,lY);
    this.state.context.lineTo(cX,cY);
    this.state.context.stroke();
  },
  resetCanvas(){
    let width = this.state.context.canvas.width;
    let height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  },
  render() {
    return (
      <canvas style={this.props.canvasStyle}
        onMouseDown={this.handleOnMouseDown}
        onMouseMove={this.handleOnMouseMove}
        onMouseUp={this.handleonMouseUp}
      >
      </canvas>
    );
  }

});

module.exports = DrawableCanvas;
