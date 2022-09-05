import type { Feature, FeatureCollection, Position, BBox } from 'geojson';
import type { FillLayerSpecification, Popup } from 'maplibre-gl';
import type { DebouncedFunc } from 'lodash';
import type { Color, ColorScales } from '../types';

export interface ChoroplethOptions {
    shapes: ChoroplethShapeValue;
    colorsScale?: ColorScales;
    legend?: MapLegend;
    aspectRatio: number;
    activeShapes?: string[];
    interactive?: boolean;
    emptyValueColor?: Color;
    tooltip?: { labelFormatter?: ChoroplethTooltipFormatter };
    fixedBbox?: BBox | undefined;
    filter?: string[] | number[] | undefined;
    /** Boolean to use label from data instead of label from features */
    useLabelFromData?: boolean;
}

export interface MapLegend {
    title?: string;
}

/** Function used to render an HTML Tooltip depending on the shape the user
 * interacted with.
 */
export type ChoroplethTooltipFormatter = ({
    value,
    label,
    key,
}: {
    /** Numeric value of the shape */
    value?: number;
    /** Label of the shape */
    label: string;
    /** Value of the key used to match shapes and numeric data */
    key?: string;
}) => string;

/** Structure containing the numerical data used by the Choropleth to compute
 * the legend and the color of the shapes it renders.
 */
export interface ChoroplethDataValue {
    x: string;
    y: number;
    label?: string;
}

export enum ChoroplethShapesTypes {
    Geojson = 'geojson',
    Vtiles = 'vtiles',
}

/** `ChoroplethShapeValue` implementation based on a GeoJSON FeatureCollection.  */
export interface ChoroplethShapeGeoJsonValue {
    type: ChoroplethShapesTypes.Geojson;
    geoJson: FeatureCollection | null;
}

/** `ChoroplethShapeValue` implementation based on a Vector Tiles source URL.  */
export interface ChoroplethShapeVectorTilesValue {
    type: ChoroplethShapesTypes.Vtiles;
    url: string;
    layer: string;
    key: string;
    label?: string;
}

/** Structure containing everything necessary for a Choropleth to render shapes visually.
 * Supports different types of structures, such as GeoJSON features, or a Vector Tiles source.
 */
export type ChoroplethShapeValue = ChoroplethShapeGeoJsonValue | ChoroplethShapeVectorTilesValue;

export interface ChoroplethFixedTooltipDescription {
    center: Position;
    description: string;
    popup: Popup;
}

export type MapRenderTooltipFunction = DebouncedFunc<(f: Feature) => string>;

export type ChoroplethLayer = Omit<FillLayerSpecification, 'id' | 'source'>;

export type MapLayer = ChoroplethLayer;
