// lib
import React, { Component } from "react";
// src
import { readFile } from "./utils";
import { PieChart } from "../Pie/PieChart";
import SankeyChart from "../Sankey/SankeyChart";
import { SunburstChart } from "../Sunburst/SunburstChart";
// styles
import "./App.css";

class App extends Component {
  state = {
    fileData: {},
    isLoading: false
  };
  async componentDidMount() {
    this.setState({ isLoading: true });
    console.log("Reading csv file");
    const fileData = await readFile();
    console.log("csv file reading complete");
    this.setState({ fileData, isLoading: false });
  }
  render() {
    const { fileData, isLoading } = this.state;
    return (
      <React.Fragment>
        <div id="app">
          <div id="content">
            {/* <Pie /> */}
            <h1>Nivo's Sankey Chart</h1>
            <SankeyChart isLoading={isLoading} data={fileData} />
            <h1>Nivo's Pie Chart</h1>
            <PieChart isLoading={isLoading} data={fileData} />
            <h1>Nivo's Sunburst Chart</h1>
            <SunburstChart isLoading={isLoading} data={fileData} />
          </div>
          <footer id="footer">
            <p>Created by Nida Munir.</p>
          </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
