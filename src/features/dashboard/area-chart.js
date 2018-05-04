import React from 'react';
import {
    FlexibleXYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    AreaSeries
} from 'react-vis';

export default function AreaChart() {
    const margin = { top: 30, bottom: 50, left: 50, right: 30 };

    return (
        <FlexibleXYPlot margin={margin}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <AreaSeries
                curve="curveNatural"
                data={[{ x: 1, y: 10 }, { x: 2, y: 5 }, { x: 3, y: 15 }]}
            />
        </FlexibleXYPlot>
    );
}
