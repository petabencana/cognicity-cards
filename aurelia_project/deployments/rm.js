export default {
  name: 'riskmap_in',
  supported_languages: [
    {key: 'en', name: 'English'},
    {key: 'ta', name: 'Tamil'},
    {key: 'kn', name: 'Kannada'},
    {key: 'mr', name: 'Marathi'}
  ],
  supported_card_decks: {
    flood: [
      'location',
      'depth',
      'photo',
      'description',
      'review'
    ],
    prep: [
      'prep',
      'location',
      'photo',
      'description',
      'review'
    ]
  },
  height_units: 'cm',
  map: {
    'instance_regions': {
      'chennai': {
        'region': 'chn',
        'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
          'sw': [12.6884, 79.9248],
          'ne': [13.3766, 80.5413]
        }
      },
      'mumbai': {
        'region': 'mum',
        'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
          'sw': [18.8600, 72.7036],
          'ne': [19.2975, 73.0953]
        }
      },
      'bangalore': {
        'region': 'blr',
        'bounds': { //arbit bounding box drawn in QGIS. So the edges aren't orthogonal
          'sw': [12.7626, 77.3649],
          'ne': [13.2001, 77.8663]
        }
      }
    },
    'default_region': {
      'region': 'chn',
      'bounds': {
        'sw': [ 12.6884, 79.9248],
        'ne': [ 13.3766, 80.5413]
      }
    },
    'region_center': [13.017163, 80.185031],
    'start_city_center': [13.017163, 80.185031]
  }
};
