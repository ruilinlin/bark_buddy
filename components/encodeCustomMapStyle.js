import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";
import mapStyles from "../screens/mapStyles.json";

function encodeCustomMapStyle() {
    const stylesParam = mapStyles.map(style => {
        
        const featureType = 'featureType' in style ? encodeURIComponent(style.featureType) : null;
        const elementType = 'elementType' in style ? encodeURIComponent(style.elementType) : null;
      
        const stylers = style.stylers.map(styler => {
          const key = Object.keys(styler)[0];
          const value = styler[key];
          if (key === 'color'){
            return `${key}:${value.replace('#', '0x')}`;
          }
          return `${key}:${value}`;
        }).join('%7C');
        if (featureType && elementType) {
          return `feature:${featureType}|element:${elementType}|${stylers}`;
        } else if (featureType) {
          return `feature:${featureType}|${stylers}`;
        } else if (elementType) {
          return `element:${elementType}|${stylers}`;
        }
        
      }).join('&style=');
  return stylesParam;
}
// export const customMapStyle = JSON.stringify(mapStyles);
export const customMapStyle = encodeCustomMapStyle();
// console.log("!!!!!!!!!!!!!!");
// console.log(customMapStyle);
// console.log(encodeCustomMapStyle());
// export const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.location.latitude},${data.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${data.location.latitude},${data.location.longitude}&style=${customMapStyle}&key=${mapsApiKey}`;

