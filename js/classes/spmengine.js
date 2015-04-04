/* Options for JSHint http://www.jshint.com/
* 
* Last Checked: 19/01/2013
* 
*/
/*global AGSETTINGS, AGSATELLITE, yepnope */
 
 /**
 * Singleton class to handle Simplified Perturbation Model (SPM) Engines. This
 * class is responsible for loading an engine and all of its associated files.
 */
var AGSPMENGINE = (function() {
    'use strict';
    
    /**
    * Default Simplified Perturbation Model
    */
    var _spm = AGSETTINGS.getSPM();
    
    /**
    * Load a Simplified Perturbation Model. This first loads the satellite class and
    * calls the 'getFiles' static method to return a list of any other files that the
    * engine requires. It then loads the required files.
    * 
    * TODO: Implement so form of success / failure messaging
    * 
    * @param spmEngine The name of the SPM
    * @param callback A callback functiont to call after its loaded
    */    
    function loadSPMEngine(spmEngine, callback) {
        if (typeof spmEngine === 'undefined' || typeof spmEngine === 'function') {
            if (typeof spmEngine === 'function') {
                callback = spmEngine;
                spmEngine = _spm;
            }
        }
        
        yepnope.injectJs('/js/classes/spmengines/' + spmEngine + '/satellite.js', function(){
            var spmEngineFiles = AGSATELLITE.getFiles();
            yepnope({
                test: 1===1,
                both: spmEngineFiles,
                complete : callback
            });
        });    
    }
    
    return {

        /**
        * Get the current SPM Engine
        */
        getSPM : function() {
            return _spm;    
        },

        /**
        * Set the current SPM engine and load it if required
        * 
        * @param value      The new engine to set
        * @param doLoad     True to load, false to not load
        * @param callback   The callback to use after the load is complete
        */
        setSPM : function(value, doLoad, callback) {
            var spmEngine;
            
            if (typeof doLoad === 'undefined') {
                doLoad = false;    
            }
            _spm = value;
            
            if (doLoad) {
                if (typeof callback !== 'function') {
                    callback = function(){};
                }
                
                loadSPMEngine(spmEngine, callback);    
            }
        },
        
        /**
        * Load a Simplified Perturbation Model
        * 
        * @param spmEngine The name of the SPM
        * @param callback A callback functiont to call after its loaded
        */
        loadSPMEngine : function(spmEngine, callback) {
            loadSPMEngine(spmEngine, callback);                
        }
    };
})();