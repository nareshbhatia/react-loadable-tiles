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
        layouts: {
            lg: [
                { x: 0, y: 0, w: 1, h: 2 },
                { x: 1, y: 0, w: 1, h: 2 },
                { x: 2, y: 0, w: 1, h: 2 }
            ]
        }
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
            layouts
        } = this.state;

        return (
            <div className="root">
                <div className="toolbar">
                    Current breakpoint: {currentBreakpoint} ({
                        cols[currentBreakpoint]
                    }{' '}
                    columns)
                </div>
                <ResponsiveGridLayout
                    className="layout"
                    layouts={layouts}
                    breakpoints={breakpoints}
                    cols={cols}
                    useCSSTransforms={mounted}
                    onBreakpointChange={this.handleBreakpointChange}
                    onLayoutChange={this.handleLayoutChange}
                >
                    <div key="0" className="tile">
                        0
                    </div>
                    <div key="1" className="tile">
                        1
                    </div>
                    <div key="2" className="tile">
                        2
                    </div>
                </ResponsiveGridLayout>
            </div>
        );
    }

    handleBreakpointChange = breakpoint => {
        this.setState({
            currentBreakpoint: breakpoint
        });
    };

    handleLayoutChange = (layout, layouts) => {
        console.log('layout', layout);
        console.log('layouts', layouts);
    };
}
