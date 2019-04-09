// lib
import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// src
import { ResponsivePie } from "@nivo/pie";
import { getPieChartData } from "./utils/getPieChartData";
import { ChartProps } from "../../types/types";
import { transformColumnValues } from "../Sankey/utils/transformData";

export class PieChart extends Component<ChartProps, {}> {
  state = {
    data: [],
    query: "cp",
    columns: []
  };

  async componentDidUpdate(prevProps: ChartProps, prevState: any) {
    const { isLoading, data: fileData } = this.props;
    const { query } = this.state;
    if (isLoading != prevProps.isLoading || query !== prevState.query) {
      if (!isLoading) {
        const columns = Object.keys(fileData[0]);
        const transformedData = transformColumnValues(fileData);
        const data = getPieChartData(transformedData, query);
        this.setState({ data, columns });
      }
    }
  }

  updateQuery = (option: any) => {
    const { label: query } = option;
    this.setState({ query });
  };

  render() {
    const { data, columns } = this.state;
    const { isLoading } = this.props;
    // should be 0
    const defaultOption = columns[2];
    if (isLoading) return <p>Loading</p>;
    else
      return (
        <React.Fragment>
          <div id="pie-dropdown" className="voffset1">
            <span>Select an option to view data in pie chart.</span>
            <Dropdown
              options={columns}
              onChange={this.updateQuery}
              value={defaultOption}
              className="pie-attributes"
              placeholder="Select an option"
            />
          </div>
          <br />
          <div id="pie-chart" className="voffset2">
            <ResponsivePie
              data={data}
              margin={{
                top: 40,
                right: 80,
                bottom: 80,
                left: 80
              }}
              tooltipFormat={value => `${value}%`}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors="nivo"
              colorBy="id"
              borderWidth={1}
              borderColor="inherit:darker(0.2)"
              radialLabel={d => `${d.id}: ${d.value}%`}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkColor="inherit"
              radialLabelsLinkStrokeWidth={3}
              radialLabelsTextColor="inherit:darker(1.2)"
              enableSlicesLabels={false}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate={true}
              motionStiffness={90}
              motionDamping={15}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
                }
              ]}
              fill={[
                {
                  match: {
                    id: "ruby"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "c"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "go"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "python"
                  },
                  id: "dots"
                },
                {
                  match: {
                    id: "scala"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "lisp"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "elixir"
                  },
                  id: "lines"
                },
                {
                  match: {
                    id: "javascript"
                  },
                  id: "lines"
                }
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  symbolSize: 18,
                  symbolShape: "circle",
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
  }
}
