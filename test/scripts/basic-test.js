'use strict';

describe('<ll-property-images>', function() {

  var element,
      images,
      imagesToUpdate,
      nodeListAsArray,
      imageData,
      otherImage,
      newDefaultImage,
      oldDefaultImage;

  beforeEach(function(done) {
    element = fixture('fixture');
    var manager = element.$.manager;

    sinon.stub(manager, "updateImage").returns({});

    images = [
      {
        _id: '123',
        fileName: 'blah.jpg',
        title: 'Blah',
        description: 'Blah description',
        isDefault: true,
        tags: ['1','2','3'],
        url: 'http://lorempixel.com/1/1/',
        sortOrder: 9
      },{
        _id: '1234',
        fileName: 'blah1.jpg',
        title: 'Kitchen',
        description: 'This is my awesome kitchen',
        isDefault: false,
        tags: ['Kitchen','Stove','Refrigerator'],
        sortOrder: 1
      },{
        _id: '12345',
        fileName: 'blah2.jpg',
        title: 'Living Room',
        description: 'This is my Living Room',
        isDefault: false,
        tags: ['Couch','TV'],
        sortOrder: 2
      },{
        _id: '123456',
        fileName: 'blah24.jpg',
        title: 'Living Room 2',
        description: 'This is my Living Room again',
        isDefault: false,
        tags: ['Couch','TV'],
        sortOrder: 4
      },{
        _id: '12346',
        fileName: 'blah3.jpg',
        title: 'Master Bedroom',
        description: 'This is the master bedroom. It is where the magic happens.',
        isDefault: false,
        tags: ['Magic','bed'],
        sortOrder: 3
      },{
        _id: '12',
        fileName: 'blah24d.jpg',
        title: 'Amazing View',
        description: 'View from the back patio',
        isDefault: false,
        tags: ['Outside','Exterior'],
        sortOrder: 7
      },{
        _id: 'xty7',
        fileName: 'moose.jpg',
        title: 'My Pet Moose',
        description: 'His name is Knuckles',
        isDefault: false,
        tags: ['Outside','Exterior'],
        sortOrder: 99
      },{
        _id: 'xty6',
        fileName: 'moose.jpg',
        title: 'My Pet Moose',
        description: 'His name is Knuckles',
        isDefault: false,
        tags: ['Outside','Exterior'],
        sortOrder: 11
      }
    ];

    oldDefaultImage = {
      "imgId": "5626de2ee2af4d41731ceec0",
      "isDefault": true,
      "fileName": "77733_164312060274756_7884245_o.jpg",
      "description": "here's a boat, kitty",
      "categories": [],
      "title": "a boat",
      "order": 0
    };

    newDefaultImage = {
      "imgId": "56291a3bed34778ff696eb2b",
      "fileName": "musician.jpg",
      "title": "musician",
      "description": "play on, playa",
      "isDefault": false,
      "order": 1,
      "categories": []
    };

    otherImage = {
      "imgId": "56291a3bed34778fsdljgnjkb2b",
      "fileName": "musicians1234.jpg",
      "title": "musician playa",
      "description": "play on, playa. tru dat",
      "isDefault": false,
      "order": 3,
      "categories": []
    };

    nodeListAsArray = [oldDefaultImage, newDefaultImage];

    imageData = {
      detail:
        [oldDefaultImage, newDefaultImage]
    };

    imagesToUpdate = {
      oldDefaultId: oldDefaultImage.imgId,
      newDefaultId: newDefaultImage.imgId,
      nodeListAsArray: nodeListAsArray
    };



    element._images = images;

    flush(function(){
      done();
    });

  });


  it('should create a ll-property-image for each item in the array', function() {
    expect(element.querySelectorAll('ll-property-image').length).to.be.eql(8);
  });


  it('should sort the items based on their sortOrder', function() {
    expect(element.querySelectorAll('ll-property-image')[0].id).to.be.eql('1234');
    expect(element.querySelectorAll('ll-property-image')[1].id).to.be.eql('12345');
    expect(element.querySelectorAll('ll-property-image')[2].id).to.be.eql('12346');
    expect(element.querySelectorAll('ll-property-image')[3].id).to.be.eql('123456');
    expect(element.querySelectorAll('ll-property-image')[4].id).to.be.eql('12');
    expect(element.querySelectorAll('ll-property-image')[5].id).to.be.eql('123');
    expect(element.querySelectorAll('ll-property-image')[6].id).to.be.eql('xty6');
    expect(element.querySelectorAll('ll-property-image')[7].id).to.be.eql('xty7');
  });


  it('should call the _dragDropped function', function() {
    var _item = element.querySelectorAll('ll-property-image')[1]; //id 12345
    var _target = element.querySelectorAll('ll-property-image')[0]; //id 1234

    var spy = sinon.spy(element, '_dragDropped');

    var params = {
      item: _item.imgId,
      target: _target.imgId
    };
    _item.fire('ll-property-image-drag', params);
    expect(spy.calledOnce).to.be.true;
  });

  it('should change the order of the ll-property-image array when _dragDropped is called', function() {
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
  });

  it('should call updateSortValues when _dragDropped is called', function() {
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
  });


  it('should update default image when setAsDefaultImage() is invoked', function() {

    var _item = imageData.detail[0]; //id 12345
    var _target = imageData.detail[1]; //id 1234

    expect(_item.isDefault).to.be.eql(true);
    expect(_target.isDefault).to.be.eql(false);

    element._updateViewForDefaultImage(imagesToUpdate, imageData);

    expect(_item.isDefault).to.be.eql(false);
    expect(_target.isDefault).to.be.eql(true);

  });

  it('should (1) check whether currentDefaultImage gets set to newDefaultImage on the front end after calling `_updateViewForDefaultImage()`', function() {

    element._updateViewForDefaultImage(imagesToUpdate, imageData);

    expect(newDefaultImage).to.equal(element.currentDefaultImage);

  });

  it('should check that newDefaultImage.isDefault is switched to true on the front end after calling `_updateViewForDefaultImage()`', function() {

    expect(newDefaultImage.isDefault).to.equal(false);

    element._updateViewForDefaultImage(imagesToUpdate, imageData);

    expect(newDefaultImage.isDefault).to.equal(true);

  });

  it('should check that oldDefaultImage.isDefault is switched to false on the front end after calling `_updateViewForDefaultImage()`', function() {

    expect(oldDefaultImage.isDefault).to.equal(true);

    element._updateViewForDefaultImage(imagesToUpdate, imageData);

    expect(oldDefaultImage.isDefault).to.equal(false);

  });

  it('should ensure imagesToUpdate.oldDefaultId is set to the id of the old default image', function() {

    var nodeList = function() {
      return [oldDefaultImage, newDefaultImage, otherImage];
    };

    var updateData = function (imagesToUpdate, imageData){
      expect(imagesToUpdate.oldDefaultId).to.equal(oldDefaultImage.imgId);
    };

    var nodeListStub = sinon.stub(element, 'nodeListAsArray', nodeList);
    var stubUpdateData = sinon.stub(element, '_updateViewForDefaultImage', updateData);

    element.dataUpdateDefaultImageView(imageData);

    expect(nodeListStub.called).to.be.true;
    expect(stubUpdateData.called).to.be.true;

  });

});
