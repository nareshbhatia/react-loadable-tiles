import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { AreaChart } from './area-chart';
import { BarChart } from './bar-chart';
import { LineChart } from './line-chart';

import './dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const TileType = {
    LineChart: 'LineChart',
    BarChart: 'BarChart',
    AreaChart: 'AreaChart'
};

const TileName = {
    LineChart: 'Line Chart',
    BarChart: 'Bar Chart',
    AreaChart: 'Area Chart'
};

export class Dashboard extends React.Component {
    state = {
        mounted: false,
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480 },
        cols: { lg: 4, md: 3, sm: 2, xs: 1 },
        currentBreakpoint: 'lg',
        layouts: {},
        tileSpecs: [],
        nextItem: 0,
        nextTileType: TileType.LineChart
    };

    componentDidMount() {
        this.setState({ mounted: true });
    }

    render() {
        const {
            mounted,
            breakpoints,
            cols,
            currentBreakpoint,
            layouts,
            tileSpecs,
            nextTileType
        } = this.state;

        return (
            <div className="root">
                <div className="toolbar">
                    <div className="add-tile-container">
                        <select
                            value={nextTileType}
                            onChange={this.handleTileTypeChanged}
                        >
                            {Object.keys(TileType).map(key => (
                                <option key={key} value={key}>
                                    {TileName[key]}
                                </option>
                            ))}
                        </select>
                        <button
                            className="add-tile-button"
                            onClick={this.handleAddTileClicked}
                        >
                            Add Tile
                        </button>
                    </div>
                    Current breakpoint: {currentBreakpoint} ({
                        cols[currentBreakpoint]
                    }{' '}
                    columns)
                </div>
                <ResponsiveGridLayout
                    className="layout"
                    breakpoints={breakpoints}
                    cols={cols}
                    layouts={layouts}
                    rowHeight={300}
                    useCSSTransforms={mounted}
                    onBreakpointChange={this.handleBreakpointChange}
                    onLayoutChange={this.handleLayoutChange}
                >
                    {tileSpecs.map(tileSpec => this.createTile(tileSpec))}
                </ResponsiveGridLayout>
            </div>
        );
    }

    createTile = tileSpec => {
        const { i, x, y, w, h, tileType } = tileSpec;

        let tileContent = null;
        switch (tileType) {
            case TileType.BarChart:
                tileContent = <BarChart />;
                break;
            case TileType.LineChart:
                tileContent = <LineChart />;
                break;
            case TileType.AreaChart:
                tileContent = <AreaChart />;
                break;
            default:
                tileContent = tileType;
        }

        return (
            <div key={i} className="tile" data-grid={{ x, y, w, h }}>
                {tileContent}
            </div>
        );
    };

    handleTileTypeChanged = event => {
        this.setState({
            nextTileType: event.target.value
        });
    };

    handleAddTileClicked = () => {
        const {
            cols,
            currentBreakpoint,
            tileSpecs,
            nextItem,
            nextTileType
        } = this.state;
        const i = nextItem;
        this.setState({
            tileSpecs: [
                ...tileSpecs,
                {
                    i: i.toString(),
                    x: i % cols[currentBreakpoint],
                    y: Infinity,
                    w: 1,
                    h: 1,
                    tileType: nextTileType
                }
            ],
            nextItem: nextItem + 1
        });
    };

    handleBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    handleLayoutChange = (layout, layouts) => {
        this.setState({
            layouts
        });
    };
}
