import { CompositeLayer } from '@deck.gl/core';
import { IconLayer } from '@deck.gl/layers';

const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

class IconsLayers extends CompositeLayer {
  renderLayers() {
    const { id, data } = this.props;

    return new IconLayer({
      id: `${id}-icon`,
      data,
      pickable: true,
      iconAtlas:'/icons/icon-atlas.png',
      iconMapping: ICON_MAPPING,
      getIcon: d => 'marker',
      sizeScale: 5,
      getPosition: d => {
        // console.log('Position:', d.position);
        return d.position;
      },
      getSize: d => 5,
      getColor: d => d.color,
    });
  }

//   static defaultProps = {
//     data: []
//   };
}

export default  IconsLayers