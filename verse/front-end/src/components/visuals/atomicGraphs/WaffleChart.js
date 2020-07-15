import React from "react";
import { ResponsiveCalendar } from '@nivo/calendar'

class WaffleChart extends React.Component {

    render () {
        const { data } = this.props;
        const { from } = this.props;
        const { to } = this.props;
        const { maxValue } = this.props;

        return ( 
            <ResponsiveCalendar
            data={data}
            from={from}
            to={to}
            emptyColor="#eeeeee"
            colors={[ '#61cdbb', '#97e3d5', '#e8c1a0', '#f47560' ]}
            minValue={1}
            maxValue={maxValue}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
            />
        )
    }
}

export default WaffleChart;