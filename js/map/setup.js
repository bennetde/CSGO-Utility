UtilityMap.prototype._setupMap = function (div) {
    let self = this

    let name = this._name

    let bounds = [[0, 0], [800, 800]]

    let map = L.map(div, {
        crs: L.CRS.Simple,
        attributionControl: false
    })

    L.imageOverlay("./assets/img/" + name + "_map.png", bounds).addTo(map)

    map.setView([400, 400], 0)
    map.setMaxBounds(bounds)
    map.fitBounds(bounds)
    map.doubleClickZoom.disable()
    map.on("drag", function () {
        map.panInsideBounds(bounds, {
            animate: false
        })
    })

    // DEBUG
    map.on("contextmenu", function (event) {
        alert("Map Coordinates are: " + event.latlng.toString())
    })
    // DEBUG

    map.on("click", function (e) {
        self._unshowLocations()
        self._unselectLocation()
    })

    this._map = map
}

UtilityMap.prototype._setupTypes = function () {
    let types = new Map()

    types.set("smoke", {})

    this._types = types
}

UtilityMap.prototype._setupLayers = function () {
    this._types.get("smoke").layer = new L.layerGroup().addTo(this._map)


    this._showLocationLayer = false
    this._locationLayer = new L.layerGroup().addTo(this._map)
}

UtilityMap.prototype._setupIcons = function () {
    this._types.get("smoke").icon = new L.Icon({
        iconUrl: "./assets/img/smoke.png",
        iconSize: [30, 30],
        className: "map-marker"
    })

    this._types.get("smoke").selectedIcon = new L.Icon({
        iconUrl: "./assets/img/smoke_selected.png",
        iconSize: [30, 30],
        className: "map-marker"
    })

    this._locationIcon = new L.Icon({
        iconUrl: "./assets/img/from_where.png",
        iconSize: [20, 20]
    })

    this._locationIconSelected = new L.Icon({
        iconUrl: "./assets/img/from_where_selected.png",
        iconSize: [20, 20]
    })
}

UtilityMap.prototype._setupVideoPlayer = function () {
    let player = new YT.Player("player", {
        height: "390",
        width: "640",
        playerVars: {
            rel: 0,
            loop: 1
        },
        events: {
            onStateChange: function(event) {
                if(event.data == 0) {
                    player.seekTo(0, true)
                }
            }
        }
    })

    this._player = player
}