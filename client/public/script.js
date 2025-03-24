(function () {

    
        Object.defineProperty(navigator, 'plugins', {
        get: function () {
            return [1, 2, 3, 4, 5];
        }
        });
    
        Object.defineProperty(navigator, 'webdriver', {
        get: function () {
            return false;
        }
        });
    
        Object.defineProperty(screen, 'width', {
          get: function () {
            return 1920;
          }
        });
    
        Object.defineProperty(screen, 'height', {
          get: function () {
            return 1080;
          }
        });
      })();
