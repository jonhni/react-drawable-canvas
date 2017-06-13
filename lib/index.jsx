import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class DrawableCanvas extends React.Component {

  componentDidMount(){
    const canvas = ReactDOM.findDOMNode(this);

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const context = canvas.getContext('2d');

    this.setState({
      canvas,
      context
    });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
  }
  static getDefaultStyle() {
    return {
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    };
  }

  static isMobile(){
    return (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    );
  }

  handleOnMouseDown(e){
    const rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    if(DrawableCanvas.isMobile()){
      this.setState({
        lastX: e.targetTouches[0].pageX - rect.left,
        lastY: e.targetTouches[0].pageY - rect.top
      });
    } else{
      this.setState({
        lastX: e.clientX - rect.left,
        lastY: e.clientY - rect.top
      });
    }

    this.setState({
      drawing: true
    });
  }

  handleOnMouseMove(e){

    if(this.state.drawing){
      const rect = this.state.canvas.getBoundingClientRect();
      const lastX = this.state.lastX;
      const lastY = this.state.lastY;
      let currentX;
      let currentY;
      if(DrawableCanvas.isMobile()){
        currentX = e.targetTouches[0].pageX - rect.left;
        currentY = e.targetTouches[0].pageY - rect.top;
      } else{
        currentX = e.clientX - rect.left;
        currentY = e.clientY - rect.top;
      }


      this.draw(lastX, lastY, currentX, currentY);
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  }

  handleonMouseUp() {
    this.setState({
      drawing: false
    });
  }

  draw(lX, lY, cX, cY) {
    this.setState({
      strokeStyle: this.props.brushColor,
      lineWidth: this.props.lineWidth
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
  }

  resetCanvas(){
    const width = this.state.context.canvas.width;
    const height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  }

  canvasStyle(){
    const defaults = DrawableCanvas.getDefaultStyle();
    const custom = this.props.canvasStyle;
    return Object.assign({}, defaults, custom);
  }

  render() {
    return (
      <canvas style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown.bind(this)}
        onTouchStart = {this.handleOnMouseDown.bind(this)}
        onMouseMove = {this.handleOnMouseMove.bind(this)}
        onTouchMove = {this.handleOnMouseMove.bind(this)}
        onMouseUp = {this.handleonMouseUp.bind(this)}
        onTouchEnd = {this.handleonMouseUp.bind(this)}
      >
      </canvas>
    );
  }

}

DrawableCanvas.propTypes = {
  brushColor: PropTypes.string,
  lineWidth: PropTypes.number,
  canvasStyle: PropTypes.shape({
    backgroundColor: PropTypes.string,
    cursor: PropTypes.string
  }),
  clear: PropTypes.bool
};

export default DrawableCanvas;
