/* Options for JSHint http://www.jshint.com/
* 
* Last Checked: 19/01/2013
* 
*/
/*global AGSatTrack, Agsattrack, Modernizr, AGUTIL, AGSETTINGS, AGSPMENGINE */ 


 /**
 * Shim to support animation frames
 */
window.requestAnimFrame = (function() {
 'use strict';    
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
})();

/**
* Delayed trigger hack
*/
$.fn.delayedTrigger = function(duration, eventName, event) {
 'use strict';
     
  var target = this;
  var timeoutId = $.delayedEvents[eventName];
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  $.delayedEvents[eventName] = setTimeout(function() { 
    delete $.delayedEvents[eventName];
    target.trigger(eventName, event);
  }, duration);
};
$.delayedEvents = {}; 
    
jQuery(document).ready(function() {
    'use strict';    
    
    Modernizr.load({
      test: AGUTIL.webGlTest(),
      yep : '/js/cesium/Cesium/Cesium.js',
      complete : function() {
          AGSETTINGS.setHaveWebGL(AGUTIL.webGlTest());
          AGSETTINGS.setHaveCanvas(Modernizr.canvas);          
          
          AGSPMENGINE.loadSPMEngine(function(){
            AGSatTrack = new Agsattrack();
            AGSatTrack.init();      
            
            if (AGSETTINGS.getRequireEUCookieLaw()) {
                jQuery.cookieCuttr({
                    cookieDeclineButton: true,
                    cookieAnalytics: false,
                    cookiePolicyLink: 'privacy_policy.html'
                });
            }
      
          });
      }
    });
});

var AGSatTrack;