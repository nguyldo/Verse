import React from "react";
import { ResponsiveBar } from '@nivo/bar';

var data = [];

class BarChart extends React.Component {

  render() {
    console.log(data);

    return (
        <ResponsiveBar
        data={data}
        keys={[ 'Frequency' ]}
        indexBy="id"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0}
        groupMode="grouped"
        colors={{ scheme: 'nivo' }}
        colorBy="index"

        borderColor={{ theme: 'background' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Songs',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Frequency',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        label="Content Name"
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)
  }
}

export default BarChart;