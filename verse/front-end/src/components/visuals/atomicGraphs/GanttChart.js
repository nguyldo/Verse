import React from "react";
import Chart from "react-google-charts";

class GanttChart extends React.Component {

    mapData(musicData) {
        let itemsList = [];

        musicData.map(song => {
            let items = [];
            items.push(song[0]);
            items.push(song[1]);
            items.push(song[2]);
            items.push(new Date(song[3][0], song[3][1], song[3][2]));
            items.push(new Date(song[4][0], song[4][1], song[4][2]));
            items.push(null);
            items.push(song[6]);
            items.push(null);

            itemsList.push(items)
        })

        return (itemsList);
    }

    render() {
        const { musicData } = this.props;
        
        const dataLabels =
        [
            [
                { type: 'string', label: 'Song ID' },
                { type: 'string', label: 'Song' },
                { type: 'string', label: 'Genre' },
                { type: 'date', label: 'Date Added To Library' },
                { type: 'date', label: 'Last Played Date' },
                { type: 'number', label: 'Duration' },
                { type: 'number', label: 'Percent Complete' },
                { type: 'string', label: 'Dependencies' },
            ],
        ]

        const data = dataLabels.concat(this.mapData(musicData))
        
        return (
            <div>
                <Chart 
                    width={'1000px'}
                    height={'700px'}
                    chartType="Gantt"
                    loader={<div>Loading Chart</div>}
                    data={ data }
                    options={{
                        width: 1000,
                        height: 22000,
                        gantt: {
                            trackHeight: 30,
                        },
                    }}
                    rootProps={{ 'data-testid': '2' }}
                />
            </div>
        );
    }
}

export default GanttChart;