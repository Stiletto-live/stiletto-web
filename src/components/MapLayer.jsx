import React, { Component, Fragment } from "react";
import L from "leaflet";
import { TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import MapExtended from "./MapExtended";
import "leaflet/dist/leaflet.css";

var myMarker = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/dm94/stiletto-web/master/public/img/marker.png",
  iconSize: [25, 41],
  iconAnchor: [13, 44],
  popupAnchor: [-6, -20],
});

class MapLayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinateXInput: 0,
      coordinateYInput: 0,
      hasLocation: false,
    };
  }

  getMarketDesign(resource) {
    var res = resource.replace(" ", "_");
    var marker = null;
    var img = new Image();
    img.src = "https://api2.comunidadgzone.es/markers/" + res + ".png";
    if (img.complete) {
      marker = L.icon({
        iconUrl: "https://api2.comunidadgzone.es/markers/" + res + ".png",
        iconSize: [25, 41],
        iconAnchor: [13, 44],
        popupAnchor: [-6, -20],
      });
    } else {
      marker = myMarker;
    }
    return marker;
  }

  getMarkers() {
    if (this.props.resourcesInTheMap != null) {
      return this.props.resourcesInTheMap.map((resource) => (
        <Marker
          key={"resource" + resource.resourceid}
          position={[resource.x, resource.y]}
          icon={this.getMarketDesign(resource.resourcetype)}
        >
          <Popup>
            <div className="mb-0">
              {resource.resourcetype} - Q: {resource.quality}
            </div>
            <div className="mb-1 text-muted">
              [{Math.floor(resource.x) + "," + Math.floor(resource.y)}]
            </div>
            <button
              className="btn btn-danger"
              onClick={() => this.props.deleteResource(resource.resourceid)}
            >
              Delete
            </button>
          </Popup>
          <Tooltip>
            {resource.resourcetype} - Q: {resource.quality}
          </Tooltip>
        </Marker>
      ));
    }
    return null;
  }

  handleClick = (e) => {
    this.setState({
      hasLocation: true,
      coordinateXInput: Math.floor(e.latlng.lat),
      coordinateYInput: Math.floor(e.latlng.lng),
    });
    this.props.changeInput(
      this.state.coordinateXInput,
      this.state.coordinateYInput
    );
  };

  render() {
    let position = [this.state.coordinateXInput, this.state.coordinateYInput];
    const marker = this.state.hasLocation ? (
      <Marker position={position} icon={myMarker}>
        <Popup>
          [
          {Math.floor(this.state.coordinateXInput) +
            "," +
            Math.floor(this.state.coordinateYInput)}
          ]
        </Popup>
        <Tooltip>Temporal Marker</Tooltip>
      </Marker>
    ) : null;

    return (
      <div id="map" className="col-xl-9 col-sm-12">
        <MapExtended
          minZoom={0}
          maxZoom={5}
          style={{ width: "100%", height: "800px" }}
          onClick={this.handleClick}
        >
          <TileLayer
            url={
              process.env.REACT_APP_MAPS_URL +
              this.props.mapName +
              "/{z}/{x}/{y}.png"
            }
            noWrap={true}
          />
          {marker}
          <Fragment>{this.getMarkers()}</Fragment>
        </MapExtended>
      </div>
    );
  }
}

export default MapLayer;