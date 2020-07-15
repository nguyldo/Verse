import React from "react";
import { ResponsiveBar } from '@nivo/bar'

class BarChart extends React.Component {

    render() {
        
        return (
            <ResponsiveBar
                data={this.props.data}
                indexBy="label"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.15}
                groupMode="grouped"
                colors={{ scheme: 'set2' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Reactions',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Occurrences',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                enableGridY={false}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />

        );
    }
}

export default BarChart;