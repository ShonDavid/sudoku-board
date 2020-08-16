import React, { Component } from "react";

class ThSudoku extends Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <th
          contentEditable={this.props.editable}
          suppressContentEditableWarning={true}
          style={this.props.style}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.target.blur();
          }}
          onBlur={(e) => {
            let targetNum = parseInt(e.target.innerHTML);
            // eslint-disable-next-line
            if (0 < targetNum && targetNum < 10) {
              if (targetNum === this.props.num)
                this.props.handleColorChange("green", targetNum, this.props.id);
              else
                this.props.handleColorChange("red", targetNum, this.props.id);
            }
          }}
          onMouseOver={() =>
            this.props.congrats
              ? null
              : this.props.handleColorBackgroundChange(
                  "lightgrey",
                  this.props.id
                )
          }
          onMouseLeave={() =>
            this.props.congrats
              ? null
              : this.props.handleColorBackgroundChange(
                  "transparent",
                  this.props.id
                )
          }
        >
          {!this.props.editable ? this.props.num : ""}
        </th>
      </React.Fragment>
    );
  }
}

export default ThSudoku;
