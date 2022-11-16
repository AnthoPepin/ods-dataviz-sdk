import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChoroplethGeoJsonOptions, DataFrame } from '@opendatasoft/visualizations';
import { ChoroplethGeoJson, Props } from '../../src';
import { shapes } from './data';

const meta: ComponentMeta<typeof ChoroplethGeoJson> = {
    title: 'Map/Non Interactive Choropleth',
    component: ChoroplethGeoJson,
};
export default meta;

const Template: ComponentStory<typeof ChoroplethGeoJson> = (args: Props<DataFrame, ChoroplethGeoJsonOptions>) => (
    <div
        style={{
            width: '50%',
            minHeight: '100px',
            minWidth: '100px',
            margin: 'auto',
            border: '1px solid black',
        }}
    >
        <ChoroplethGeoJson {...args} />
    </div>
);

export const NonInteractiveChoropleth = Template.bind({});
const NonInteractiveChoroplethArgs: Props<DataFrame, ChoroplethGeoJsonOptions> = {
    data: {
        loading: false,
        value: [
            { x: 'France', y: 60 },
            { x: 'Île de France', y: 35 },
            { x: 'Corsica', y: 95 },
        ],
    },
    options: {
        shapes,
        aspectRatio: 1,
        activeShapes: ['France'],
        interactive: false,
    },
};
NonInteractiveChoropleth.args = NonInteractiveChoroplethArgs;
