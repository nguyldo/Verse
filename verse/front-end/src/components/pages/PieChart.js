import React from "react";
import { ResponsivePie } from '@nivo/pie'

import data from "./postData"; // import data

class PieChart extends React.Component {

  render() {
    console.log(data);

    return (
      <ResponsivePie
        data={data}
        margin={{ top: 10, right: 80, bottom: 10, left: 80 }}
        sortByValue={true}
        colors={{ scheme: 'pastel1' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', '1' ] ] }}
        radialLabel="label"
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: 'color' }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}

export default PieChart;