// lib
import React, { Component } from "react";
import { ResponsiveSankey } from "@nivo/sankey";
// src
import { ChartProps } from "../../types/types";
import { getSankeyData } from "./utils/getSankeyData";
import { transformColumnValues } from "./utils/transformData";

class SankeyChart extends Component<ChartProps, {}> {
  state = {
    data: { nodes: [], links: [] }
  };

  componentDidUpdate(prevProps: ChartProps) {
    const { isLoading, data: fileData } = this.props;
    if (isLoading != prevProps.isLoading) {
      // when file loading is complete
      if (!isLoading) {
        // change 1 to male, 0 to female, etc..
        const transformedData = transformColumnValues(fileData);
        // get nodes and links
        const data = getSankeyData(transformedData);
        // update state
        this.setState({ data });
        // console.log("Transformed data values - ", transformedData);
        console.log("Sankey data with nodes and links ", data);
      }
    }
  }

  render() {
    const { data } = this.state;
    if (data.nodes.length > 0) {
      return (
        <React.Fragment>
          <h5>
            This sankey chart represents relationship between gender and blood
            sugar level (high or low) and the relationship between blood sugar
            level and the type of chest pain.
          </h5>

          <div id="sankey-chart">
            <ResponsiveSankey
              data={data}
              // margin={{
              //   top: 40,
              //   right: 160,
              //   bottom: 40,
              //   left: 50
              // }}
              align="justify"
              // colors="category10"
              nodeOpacity={1}
              nodeThickness={18}
              nodeInnerPadding={3}
              nodeSpacing={24}
              nodeBorderWidth={0}
              nodeBorderColor="inherit:darker(0.8)"
              linkOpacity={0.5}
              linkHoverOthersOpacity={0.1}
              enableLinkGradient={true}
              // labelPosition="outside"
              // labelOrientation="vertical"
              labelPadding={16}
              labelTextColor="inherit:darker(4)"
              // animate={true}
              // motionStiffness={140}
              // motionDamping={13}
              linkTooltip={(node: any) => (
                <span>
                  {node.source.label} -- {node.target.label} {node.value}%
                </span>
              )}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 130,
                  itemWidth: 100,
                  itemHeight: 14,
                  itemDirection: "right-to-left",
                  itemsSpacing: 2,
                  itemTextColor: "#999",
                  symbolSize: 14,

                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000"
                      }
                    }
                  ]
                }
              ]}
            />
          </div>
        </React.Fragment>
      );
    } else {
      return <p>no nodes available for sankey chart</p>;
    }
  }
}

export default SankeyChart;
