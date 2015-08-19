'use strict';

describe('<ll-property-images>', function() {

  var element;
  var manager;

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
    var baseUrl = 'http://images-api';
    var language = 'en';
    var unitId = "123445";
    var url = manager._buildUrl(baseUrl, language, unitId);
    expect(url).to.be.eql('http://images-api/images/public/v1/en/units/123445/images');
  });

  it('should be able to build the URL for property level edits', function() {
    var baseUrl = 'http://images-api';
    var language = 'en';
    var unitId = "123445";
    var url = manager._buildUrlWithId(baseUrl, language, unitId);
    expect(url).to.be.eql('http://images-api/images/public/v1/en/images/123445');
  });

  it('should fire "images-received" when _handleAll is called from the manager', function() {
    var e = {};
    var data = {
      response: [
        {
          _id: "55d3bf2aebc136f7a8490f0b",
          fileName: "hungarian-parliament-building-42541-1920x1200.jpg",
          title: "hungarian-parliament-building-42541-1920x1200.jpg",
          unitId: "12345",
          url: "12345-E19rAi3s.jpg"
        },
        {
          _id: "55d3bf32ebc136f7a8490f0c",
          fileName: "LeisureLink-Logo.png",
          title: "LeisureLink-Logo.png",
          unitId: "12345",
          url: "12345-VyM8Rohs.png"
        },
        {
          _id: "55d3c92aebc136f7a8490f0d",
          fileName: "default-thumb.gif",
          title: "default-thumb.gif",
          unitId: "12345",
          url: "12345-NkPHdhni.gif"
        }
      ]
    };

    element.addEventListener('images-received', function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.instanceof(Array);
      expect(data.detail.length).to.be.eql(3);
    });

    manager._handleAll(e, data);
  });


  it('should fire "image-added" when _handleAdd is called from the manager', function() {
    var e = {};
    var data = {
      response: {
        _id: "55d4bb17607091fb144b490a",
        fileName: "placeholder-640x480.png",
        title: "placeholder-640x480.png",
        unitId: "12345",
        url: "12345-EkV4ci6o.png"
      }
    };

    element.addEventListener('image-added', function(data) {
      expect(data).to.be.ok;
      expect(data.detail).to.be.ok;
      expect(data.detail._id).to.be.a('string');
      expect(data.detail.fileName).to.be.a('string');
      expect(data.detail.title).to.be.a('string');
      expect(data.detail.unitId).to.be.a('string');
      expect(data.detail.url).to.be.a('string');
    });

    manager._handleAdd(e, data);

  });


});
