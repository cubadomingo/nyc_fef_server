exports.seed = (knex) => {
  return knex('scholarships').del()
  .then(function () {
    return knex('scholarships').insert({
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      deadline: '2017-12-05T17:30',
      eligibility: 'Must be a freshman, sophomore, or junior',
    });
  })
  .then(function () {
    return knex('scholarships').insert({
      title: 'Aliquam maximus rutrum dolor volutpat mollis',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      deadline: '2017-12-05T17:30',
      eligibility: 'Must be a freshman, sophomore, or junior',
    });
  })
  .then(function () {
    return knex('scholarships').insert({
      title: 'Aenean eu dolor ultricies, eleifend tellus at, fringilla sapien',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      deadline: '2017-12-05T17:30',
      eligibility: 'Must be a freshman, sophomore, or junior',
    });
  })
  .then(function () {
    return knex('scholarships').insert({
      title: 'Fusce ligula augue, porttitor non urna sit amet, malesuada mollis sapien.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      deadline: '2017-12-05T17:30',
      eligibility: 'Must be a freshman, sophomore, or junior',
    });
  })
  .then(function () {
    return knex('scholarships').insert({
      title: 'In et felis quis nisl facilisis elementum nec et diam.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed posuere a quam maximus suscipit. Pellentesque sodales sem sit amet vehicula ornare. Donec sit amet ligula consequat, sollicitudin est eu, vehicula est. Phasellus eget augue tempus, faucibus est ut, scelerisque urna. Praesent dapibus venenatis ex id mollis. Donec nulla elit, congue a lectus ut, mattis egestas mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla a arcu pellentesque, gravida tortor ac, vehicula erat. Donec at enim leo. Phasellus maximus metus purus, nec viverra ipsum faucibus et. Nulla efficitur finibus nibh, non venenatis augue cursus a.',
      deadline: '2017-12-05T17:30',
      eligibility: 'Must be a freshman, sophomore, or junior',
    });
  });
};
