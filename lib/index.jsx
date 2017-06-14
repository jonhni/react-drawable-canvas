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

    if (this.props.gridView) {
        // to display the grid
        let ecart = this.props.gap; //lenght of the cases
        //rows
        for(let h = ecart ; h < canvas.height ; h += ecart) {
            ctx.moveTo(0, h); // move ctx to (x,y) without drawing
            ctx.lineTo(canvas.width, h); //drawing to (x,y)
        }
        //cell
        for(let w = ecart ; w < canvas.width ; w += ecart) {
            ctx.moveTo(w, 0);
            ctx.lineTo(w, canvas.height);
        }
        ctx.stroke();
    }


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
      gridView: false,
      gap: 50,
      brushColor: '#FFFF00',
      lineWidth: 4,
      cursor: 'pointer',
      canvasStyle: {
        backgroundColor: '#00FFDC'
      },
      clear: false
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
    const newContext = this.state.context;
    newContext.strokeStyle = this.props.brushColor;
    newContext.lineWidth = this.props.lineWidth;
    this.setState({
      context: newContext
    });
    this.state.context.moveTo(lX, lY);
    this.state.context.lineTo(cX, cY);
    this.state.context.stroke();
  }

  resetCanvas(){
    const width = this.state.context.canvas.width;
    const height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);

    if (this.props.gridView) {
        // to display the grid
        let canvas = ReactDOM.findDOMNode(this);

        // to avoid that the rectangle is growing up
        canvas.width  = canvas.width;
        canvas.height = canvas.height;
        //
        let ctx = canvas.getContext('2d');

        // to display the grid
        let ecart = this.props.gap; //lenght of the cases
        //rows
        for(let h = ecart ; h < this.state.canvas.height ; h += ecart) {
            ctx.moveTo(0, h); // move ctx to (x,y) without drawing
            ctx.lineTo(this.state.canvas.width, h); //drawing to (x,y)
        }
        //cell
        for(let w = ecart ; w < this.state.canvas.width ; w += ecart) {
            ctx.moveTo(w, 0);
            ctx.lineTo(w, this.state.canvas.height);
        }
        ctx.stroke();

        this.setState({
            context: ctx
        });
    }
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
  gridView: PropTypes.bool,
  gap: PropTypes.number,
  brushColor: PropTypes.string,
  lineWidth: PropTypes.number,
  cursor: PropTypes.string,
  canvasStyle: PropTypes.shape({
    backgroundColor: PropTypes.string
  }),
  clear: PropTypes.bool
};

export default DrawableCanvas;
