import React, { useState, useRef, useEffect } from "react";
import "./styles.css";

class ToolTip extends React.Component {
  render() {
    return <h1>ToolTip</h1>;
  }
}

//HOC
function withHover(Component) {
  return class WithHover extends React.Component {
    state = {
      hover: false
    };

    mouseOver = () => {
      this.setState({
        hover: true
      });
    };

    mouseOut = () => {
      this.setState({
        hover: false
      });
    };

    render() {
      return (
        <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
          <Component {...this.props} hover={this.state.hover} />
        </div>
      );
    }
  };
}

class App extends React.Component {
  render() {
    const { hover } = this.props;
    return (
      <>
        <div>
          <h1> hover me HOC</h1>
        </div>
        {hover && <ToolTip />}
      </>
    );
  }
}

const Temp = ({ hover }) => {
  return <App name={"topher"} hover={hover} />;
};

class RenderWithProps extends React.Component {
  state = {
    hover: false
  };

  mouseOver = () => {
    this.setState({
      hover: true
    });
  };

  mouseOut = () => {
    this.setState({
      hover: false
    });
  };

  render() {
    return (
      <div onMouseOver={this.mouseOver} onMouseOut={this.mouseOut}>
        {this.props.children(this.state.hover)}
      </div>
    );
  }
}

class AppWithRenderProps extends React.Component {
  render() {
    const { hover } = this.props;
    return (
      <>
        <div>
          <h1> hover me Render props</h1>
        </div>
        {hover && <ToolTip />}
      </>
    );
  }
}

class Apps extends React.Component {
  render() {
    return (
      <RenderWithProps>
        {hover => <AppWithRenderProps hover={hover} />}
      </RenderWithProps>
    );
  }
}

// Hooks
const useHover = () => {
  const [hover, setHover] = useState(false);
  const ref = React.useRef();

  const enter = () => {
    setHover(true);
  };

  const leave = () => {
    setHover(false);
  };

  useEffect(() => {
    const refVar = ref.current;
    refVar.addEventListener("mouseover", enter);
    refVar.addEventListener("mouseout", leave);
    return () => {
      refVar.removeEventListener("mouseover", enter);
      refVar.removeEventListener("mouseout", leave);
    };
  }, [ref]);

  return { ref, hover };
};

const HookApp = () => {
  const { ref, hover } = useHover();
  return (
    <div ref={ref}>
      <h1> hooks</h1>
      {hover && <ToolTip />}
    </div>
  );
};
export default HookApp;
