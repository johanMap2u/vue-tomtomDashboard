import { CompositeLayer } from '@deck.gl/core';
import { PathLayer } from '@deck.gl/layers';

class RouteLayer extends CompositeLayer {
  renderLayers() {
    const { data, getColor, getWidth, highlightedObjectIndex } = this.props;

    const mainLayer = new PathLayer({
      id: `${this.props.id}-path-layer`,
      data: data,
      getPath: (d) => d.path,
      getColor: (d) => getColor(d.averageSpeed, d.currentSpeed),
      getWidth: getWidth || 5,
      widthUnits: "pixels",
      pickable: true,
      autoHighlight: true,
      highlightColor:[0, 0, 255],
      updateAutoHighlight: true,
      onHover: this.props.onHover
    });

    const highlightLayer = new PathLayer({
      id: `${this.props.id}-highlight-layer`,
      data: highlightedObjectIndex >= 0 ? [data[highlightedObjectIndex]] : [],
      getPath: (d) => d.path,
      getColor: [255, 255, 255],
      getWidth: (getWidth || 5) + 12,
      widthUnits: "pixels",
      pickable: false
    });

    return [mainLayer, highlightLayer];
  }

  getPickingInfo({ info }) {
    const pickedObject = info.object;
    if (pickedObject) {
      return {
        ...info,
        object: {
          ...pickedObject,
          averageSpeed: pickedObject.averageSpeed,
          currentSpeed: pickedObject.currentSpeed,
          // segmentLength: pickedObject.segmentLength,
          // relativeSpeed: pickedObject.relativeSpeed,
          // confidence: pickedObject.confidence
        }
      };
    }
    return info;
  }

  static get defaultProps() {
    return {
      getColor: { type: 'accessor', value: [255, 255, 255] },
      getWidth: { type: 'accessor', value: 5 },
      highlightedObjectIndex: -1
    };
  }
}

export default RouteLayer;