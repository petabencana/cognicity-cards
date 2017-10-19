export default {
  name: 'riskmap_us',
  supported_languages: [
    {key: 'en', name: 'English'},
    {key: 'es', name: 'Espaniol'}
  ],
  supported_card_decks: {
    flood: [
      'location',
      'depth',
      'photo',
      'description',
      'review'
    ]
  },
  height_units: 'in',
  map: {
    "instance_regions": {
      "broward": {
        "region": "brw",
        "bounds": {
          "sw":[ 25.948143, -80.477974],
          "ne":[ 26.372556, -80.056669]
        }
      }
    },
    "default_region": {
      "region": "south_east_florida",
      "bounds": {
        "sw":[ 25.948143, -80.477974],
        "ne":[ 26.372556, -80.056669]
      }
    },
    "region_center": [26.138301, -80.199261],
    "start_city_center": [26.138301, -80.199261]
  }
};
