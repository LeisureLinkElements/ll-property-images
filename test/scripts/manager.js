'use strict';

describe('<ll-property-images>', function() {

  var element;
  var manager;
  var BASE_URL = 'http://images-api.ka';

  beforeEach(function(done) {
    element = fixture('fixture');
    manager = element.$.manager;

    flush(function() {
      done();
    });

  });

  it('should expose a baseUrl property', function() {
    expect(manager.baseUrl).to.not.eql('');
    expect(manager.baseUrl).to.not.be.null;
  });

  it('should default the _language to "en"', function() {
    expect(manager._language).to.be.eql('en');
  });


  it('should be able to build the URL for units', function() {
    var language = 'en';
    var unitId = "123445";
    var url = manager._buildUrl(BASE_URL, language, unitId);
    expect(url).to.be.eql(BASE_URL + '/images/public/v1/en/units/123445/images');
  });

  it('should be able to build the URL for property level edits', function() {
    var language = 'en';
    var unitId = "123445";
    var url = manager._buildUrlWithId(BASE_URL, language, unitId);
    expect(url).to.be.eql(BASE_URL + '/images/public/v1/en/images/123445');
  });

  it('should fire "images-received" when _handleAll is called from the manager', function(done) {
    var e = {};
    var data = {
      response: [
        {
          _id: "55d3bf2aebc136f7a8490f0b",
          fileName: "hungarian-parliament-building-42541-1920x1200.jpg",
          title: "hungarian-parliament-building-42541-1920x1200.jpg",
          unitId: "12345"
        },
        {
          _id: "55d3bf32ebc136f7a8490f0c",
          fileName: "LeisureLink-Logo.png",
          title: "LeisureLink-Logo.png",
          unitId: "12345"
        },
        {
          _id: "55d3c92aebc136f7a8490f0d",
          fileName: "default-thumb.gif",
          title: "default-thumb.gif",
          unitId: "12345"
        }
      ]
    };

    var validate = function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.instanceof(Array);
      expect(data.detail.length).to.be.eql(3);
      element.removeEventListener('images-received', validate);
      done();
    };

    element.addEventListener('images-received', validate);

    manager._handleAll(e, data);
  });


  it('should fire "image-added" when _handleAdd is called from the manager', function(done) {
    var e = {};
    var data = {
      response: {
        _id: "55d4bb17607091fb144b490a",
        fileName: "placeholder-640x480.png",
        title: "placeholder-640x480.png",
        unitId: "12345"
      }
    };

    var validate = function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.ok;
      expect(data.detail._id).to.be.a('string');
      expect(data.detail.fileName).to.be.a('string');
      expect(data.detail.title).to.be.a('string');
      expect(data.detail.unitId).to.be.a('string');
      element.removeEventListener('image-added', validate);
      done();
    };

    element.addEventListener('image-added', validate);

    manager._handleAdd(e, data);
  });

  it('should fire "image-removed when _handleDelete is called from the manager"', function(done) {

    var IMAGE_ID = '55d62d7e11e095086408d24a';
    var e = {};
    var data = {
      xhr: {
        responseURL: BASE_URL + '/images/public/v1/en/images/' + IMAGE_ID
      }
    };

    var validate = function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.a('string');
      expect(data.detail).to.be.eql(IMAGE_ID);
      element.removeEventListener('image-removed', validate);
      done();
    };

    element.addEventListener('image-removed', validate);

    manager._handleDelete(e, data);
  });

  it('should fire "image-updated" when _handleUpdate is called from the manager', function(done) {

    var IMAGE_ID = '55d62d7e11e095086408d24a';
    var e = {};
    var data = {
      xhr: {
        responseURL: BASE_URL + '/images/public/v1/en/images/' + IMAGE_ID
      }
    };

    var validate = function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.a('string');
      expect(data.detail).to.be.eql(IMAGE_ID);
      element.removeEventListener('image-updated', validate);
      done();
    };

    element.addEventListener('image-updated', validate);
    manager._handleUpdate(e, data);
  });


});
