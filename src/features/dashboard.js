import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import './dashboard.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

export class Dashboard extends React.Component {
    state = {
        mounted: false,
        breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
        cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
        currentBreakpoint: 'lg',
        layouts: {},
        tileSpecs: [],
        nextItem: 0
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
            tileSpecs
        } = this.state;

        return (
            <div className="root">
                <div className="toolbar">
                    <div className="add-tile-container">
                        <button onClick={this.handleAddTileClicked}>
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
        const { i, x, y, w, h } = tileSpec;
        return (
            <div key={i} className="tile" data-grid={{ x, y, w, h }}>
                {i}
            </div>
        );
    };

    handleAddTileClicked = () => {
        const { cols, currentBreakpoint, tileSpecs, nextItem } = this.state;
        const i = nextItem;
        this.setState({
            tileSpecs: [
                ...tileSpecs,
                {
                    i: i.toString(),
                    x: i % cols[currentBreakpoint],
                    y: Infinity,
                    w: 1,
                    h: 1
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
