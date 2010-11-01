var cb = cb || {};

(function (transition) {
    var sIndex = 0,
        direction = 1,  // 1 = forward; -1 = backward
        sequence,
        sequencer,
        reset = function() {
          sIndex = 0;
          direction = 1;
          sequence = null;
        };
        
    /*
     * fn:
     *    function you want to sequence (Don't forget $.fn)
     *    
     * args (optional):
     *    array of arguments you would normally pass to fn
     *    e.g. [{left: '100px'}, 'fast']
     *    
     * callback (optional):
     *    function to call after entire sequence is animated
     */
    sequencer = function (fn, args, callback) {
        var oargs,
            el = (direction == 1) ? sequence.eq(sIndex++) : sequence.eq(--sIndex);
        
        // sequencer(fn, callback) - 2-argument overload
        if (args && typeof args === "function") { 
          callback = args;
          args = [];
        }
        if (el.length) {
            args = args || [];
            // set a copy of args by value
            oargs = args.slice();
            // add a recursive callback to the sequencer in args
            args.push(  
                function () {
                    sequencer(fn, oargs, callback);
                }
            );
            fn.apply(el, args);
        } else {    
            if (callback) {
                callback.call();
            }
        }
    };


    transition.tile = function (els, callback) {
        reset();
        sequence = els;
        if (els.is(':visible')) {
            sIndex = els.length;
            direction = -1;
            sequencer($.fn.fadeOut, [180], callback);
        } else {
            sequencer($.fn.fadeIn, [180], callback);
        }
    };


})(cb.transition = cb.transition || {});