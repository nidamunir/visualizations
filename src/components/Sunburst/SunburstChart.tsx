// lib
import React, { Component } from "react";
// src
import { ResponsiveSunburst } from "@nivo/sunburst";
import { ChartProps } from "../../types/types";
import { getSunburstData } from "./utils/getSunburstData";

export class SunburstChart extends Component<ChartProps, {}> {
  state = {
    data: {}
  };
  async componentDidUpdate(prevProps: ChartProps) {
    const { isLoading, data: fileData } = this.props;
    if (isLoading != prevProps.isLoading) {
      if (!isLoading) {
        const data = getSunburstData(fileData);
        console.log("Sunburst chart data - ", data);
        this.setState({ data });
      }
    }
  }

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <h5>
          This sunburst chart shows males and females patients, their blood
          sugar level (high ( > 120 ) or low), chest pain type and whether
          exercise induces chest pain or not (yes/no)
        </h5>
        <div id="sunburst-chart">
          <ResponsiveSunburst
            data={data}
            margin={{
              top: 40,
              right: 20,
              bottom: 20,
              left: 20
            }}
            identity="name"
            value="value"
            cornerRadius={2}
            borderWidth={1}
            borderColor="white"
            colors="nivo"
            colorBy="id"
            childColor="inherit"
            animate={true}
            motionStiffness={90}
            motionDamping={15}
            isInteractive={true}
          />
        </div>
      </React.Fragment>
    );
  }
}
