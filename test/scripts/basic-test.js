'use strict';

describe('<ll-property-images>', function() {

  var element;
  var images;

  beforeEach(function(done) {
    element = fixture('fixture');

    images = [
      {
        id: '123',
        name: 'blah.jpg',
        title: 'Blah',
        description: 'Blah description',
        isDefault: true,
        tags: ['1','2','3'],
        url: 'http://lorempixel.com/600/400',
        sortOrder: 9
      },{
        id: '1234',
        name: 'blah1.jpg',
        title: 'Kitchen',
        description: 'This is my awesome kitchen',
        isDefault: false,
        tags: ['Kitchen','Stove','Refrigerator'],
        url: 'http://lorempixel.com/601/400',
        sortOrder: 1
      },{
        id: '12345',
        name: 'blah2.jpg',
        title: 'Living Room',
        description: 'This is my Living Room',
        isDefault: false,
        tags: ['Couch','TV'],
        url: 'http://lorempixel.com/602/400',
        sortOrder: 2
      },{
        id: '123456',
        name: 'blah24.jpg',
        title: 'Living Room 2',
        description: 'This is my Living Room again',
        isDefault: false,
        tags: ['Couch','TV'],
        url: 'http://lorempixel.com/603/400',
        sortOrder: 4
      },{
        id: '12346',
        name: 'blah3.jpg',
        title: 'Master Bedroom',
        description: 'This is the master bedroom. It is where the magic happens.',
        isDefault: false,
        tags: ['Magic','bed'],
        url: 'http://lorempixel.com/604/400',
        sortOrder: 3
      },{
        id: '12',
        name: 'blah24d.jpg',
        title: 'Amazing View',
        description: 'View from the back patio',
        isDefault: false,
        tags: ['Outside','Exterior'],
        url: 'http://lorempixel.com/605/400',
        sortOrder: 7
      },{
        id: 'xty7',
        name: 'moose.jpg',
        title: 'My Pet Moose',
        description: 'His name is Knuckles',
        isDefault: false,
        tags: ['Outside','Exterior'],
        url: 'http://lorempixel.com/606/400',
        sortOrder: 99
      },{
        id: 'xty6',
        name: 'moose.jpg',
        title: 'My Pet Moose',
        description: 'His name is Knuckles',
        isDefault: false,
        tags: ['Outside','Exterior'],
        url: 'http://lorempixel.com/607/400',
        sortOrder: 11
      }
    ];

    flush(function(){
      done();
    });

  });

  it('should create a ll-property-image for each item in the array', function(done) {
    var propertyImages = document.querySelector('ll-property-images');
    propertyImages._images = images;

    element.addEventListener('images-loaded', function() {
      expect(element.querySelectorAll('ll-property-image').length).to.be.eql(8);
      done();
    });
  });


  it('should sort the items based on their sortOrder', function(done) {
    var propertyImages = document.querySelector('ll-property-images');
    propertyImages._images = images;

    element.addEventListener('images-loaded', function() {
      expect(element.querySelectorAll('ll-property-image')[0].id).to.be.eql('1234');
      expect(element.querySelectorAll('ll-property-image')[1].id).to.be.eql('12345');
      expect(element.querySelectorAll('ll-property-image')[2].id).to.be.eql('12346');
      expect(element.querySelectorAll('ll-property-image')[3].id).to.be.eql('123456');
      expect(element.querySelectorAll('ll-property-image')[4].id).to.be.eql('12');
      expect(element.querySelectorAll('ll-property-image')[5].id).to.be.eql('123');
      expect(element.querySelectorAll('ll-property-image')[6].id).to.be.eql('xty6');
      expect(element.querySelectorAll('ll-property-image')[7].id).to.be.eql('xty7');
      done();
    });
  });


  it('should call the _dragDropped function', function(done) {
    var propertyImages = document.querySelector('ll-property-images');
    propertyImages._images = images;

    element.addEventListener('images-loaded', function() {
      var _item = element.querySelectorAll('ll-property-image')[1]; //id 12345
      var _target = element.querySelectorAll('ll-property-image')[0]; //id 1234

      var spy = sinon.spy(element, '_dragDropped');

      var params = {
        item: _item.imgId,
        target: _target.imgId
      };
      _item.fire('ll-property-image-drag', params);
      expect(spy.calledOnce).to.be.true;
      done();
    });
  });

  it('should change the order of the ll-property-image array when _dragDropped is called', function(done) {
    var propertyImages = document.querySelector('ll-property-images');
    propertyImages._images = images;

    element.addEventListener('images-loaded', function() {
      var _item = element.querySelectorAll('ll-property-image')[1]; //id 12345
      var _target = element.querySelectorAll('ll-property-image')[0]; //id 1234
      var spy = sinon.spy(element, '_dragDropped');
      var params = {
        item: _item.imgId,
        target: _target.imgId
      };

      _item.fire('ll-property-image-drag', params);
      expect(spy.calledOnce).to.be.true;
      expect(element.querySelectorAll('ll-property-image')[0].imgId).to.be.eql('12345');
      expect(element.querySelectorAll('ll-property-image')[1].imgId).to.be.eql('1234');
      done();
    });
  });

  it('should call updateSortValues when _dragDropped is called', function(done) {
    var propertyImages = document.querySelector('ll-property-images');
    propertyImages._images = images;

    element.addEventListener('images-loaded', function() {

      var _item = element.querySelectorAll('ll-property-image')[7]; //id xty6
      var _target = element.querySelectorAll('ll-property-image')[0]; //id 1234
      var spy = sinon.spy(element, '_updateSortValues');
      var params = {
        item: _item.imgId,
        target: _target.imgId
      };

      expect(_item.sortOrder).to.be.eql(99);
      expect(_target.sortOrder).to.be.eql(1);

      _item.fire('ll-property-image-drag', params);
      expect(spy.calledOnce).to.be.true;
      expect(_item.sortOrder).to.be.eql(0);
      expect(_target.sortOrder).to.be.eql(1);
      done();
    });
  });
});
