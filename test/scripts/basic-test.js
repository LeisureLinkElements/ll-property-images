'use strict';

describe('<ll-property-images>', function() {

  var element;
  beforeEach(function(done) {
    element = fixture('fixture');

    element._images = [
      {
        id: '123',
        name: 'blah.jpg',
        title: 'Blah',
        description: 'Blah description',
        isDefault: true,
        tags: ['1','2','3'],
        url: 'http://lorempixel.com/600/400'
      },{
        id: '1234',
        name: 'blah1.jpg',
        title: 'Kitchen',
        description: 'This is my awesome kitchen',
        isDefault: false,
        tags: ['Kitchen','Stove','Refrigerator'],
        url: 'http://lorempixel.com/601/400'
      },{
        id: '12345',
        name: 'blah2.jpg',
        title: 'Living Room',
        description: 'This is my Living Room',
        isDefault: false,
        tags: ['Couch','TV'],
        url: 'http://lorempixel.com/602/400'
      },{
        id: '123456',
        name: 'blah24.jpg',
        title: 'Living Room 2',
        description: 'This is my Living Room again',
        isDefault: false,
        tags: ['Couch','TV'],
        url: 'http://lorempixel.com/603/400'
      },{
        id: '12346',
        name: 'blah3.jpg',
        title: 'Master Bedroom',
        description: 'This is the master bedroom. It is where the magic happens.',
        isDefault: false,
        tags: ['Magic','bed'],
        url: 'http://lorempixel.com/604/400'
      },{
        id: '12',
        name: 'blah24d.jpg',
        title: 'Amazing View',
        description: 'View from the back patio',
        isDefault: false,
        tags: ['Outside','Exterior'],
        url: 'http://lorempixel.com/605/400'
      }
    ];

    flush(function(){
      done();
    });

  });

  it('should create a ll-property-image for each item in the array', function() {
    expect(element.querySelectorAll('ll-property-image').length).to.be.eql(6);
  });

  it('should listen for a delete event')


});
