import React from 'react';
import { FlexibleXYPlot, HorizontalBarSeries, XAxis, YAxis } from 'react-vis';

export function BarChart() {
    const series1 = [
        { y: 1, x: 50 },
        { y: 2, x: 20 },
        { y: 3, x: 40 },
        { y: 4, x: 20 }
    ];
    const series2 = [
        { y: 1, x: 20 },
        { y: 2, x: 20 },
        { y: 3, x: 30 },
        { y: 4, x: 20 }
    ];
    const series3 = [
        { y: 1, x: 30 },
        { y: 2, x: 60 },
        { y: 3, x: 30 },
        { y: 4, x: 60 }
    ];

    const margin = { top: 30, bottom: 50, left: 50, right: 30 };

    return (
        <FlexibleXYPlot stackBy="x" margin={margin}>
            <XAxis />
            <YAxis />
            <HorizontalBarSeries data={series1} color="#f2d200" />
            <HorizontalBarSeries data={series2} color="#404040" />
            <HorizontalBarSeries data={series3} color="#000000" />
        </FlexibleXYPlot>
    );
}
