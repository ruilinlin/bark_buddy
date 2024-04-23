import mapStyles from "../screens/mapStyles.json";

export const customMapStyle = JSON.stringify(mapStyles);
console.log(customMapStyle);
// export const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${data.location.latitude},${data.location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${data.location.latitude},${data.location.longitude}&style=${customMapStyle}&key=${mapsApiKey}`;
