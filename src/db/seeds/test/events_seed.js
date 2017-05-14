exports.seed = (knex) => {
  return knex('events').del()
  .then(function () {
    return knex('events').insert({
      title: 'NYSE Visiting Tour',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      datetime: '2017-12-05T17:30:00.000Z',
      location: '11 Wall Street, New York, NY, United States',
    });
  })
  .then(function () {
    return knex('events').insert({
      title: 'NYSE Visiting Tour 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      datetime: '2017-12-05T17:30:00.000Z',
      location: '11 Wall Street, New York, NY, United States',
    });
  })
  .then(function () {
    return knex('events').insert({
      title: 'NYSE Visiting Tour 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      datetime: '2017-12-05T17:30:00.000Z',
      location: '11 Wall Street, New York, NY, United States',
    });
  })
  .then(function () {
    return knex('events').insert({
      title: 'NYSE Visiting Tour 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      datetime: '2017-12-05T17:30:00.000Z',
      location: '11 Wall Street, New York, NY, United States',
    });
  })
  .then(function () {
    return knex('events').insert({
      title: 'NYSE Visiting Tour 5',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      datetime: '2017-12-05T17:30:00.000Z',
      location: '11 Wall Street, New York, NY, United States',
    });
  });
};
