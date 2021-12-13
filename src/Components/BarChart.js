import React from 'react';
import Paper from '@material-ui/core/Paper';

import {
    Chart,
    BarSeries,
    Title,
    ArgumentAxis,
    ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';


export default function BarChart(props) {
    return (
        <Paper style={{marginTop: 200}}>
            <Chart
                data={props.population}
            >
                <ArgumentAxis />
                <ValueAxis />

                <BarSeries
                    valueField="population"
                    argumentField="name"
                />
                <Title text="Planet population" />
            </Chart>
        </Paper>
    );
}
