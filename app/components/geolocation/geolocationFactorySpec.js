describe('Service: uc.geolocation', function () {

    // load the service's module
    beforeEach(module('uc'));

    // instantiate service
    var service;

    //update the injection
    beforeEach(inject(function (geolocation) {
        service = geolocation;
    }));

    /**
     * @description
     * Sample test case to check if the service is injected properly
     * */
    it('should be injected and defined', function () {
        expect(service).toBeDefined();
    });
});
