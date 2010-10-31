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

    sequencer = function (fn, duration, callback) {

        var el = (direction == 1) ? sequence.eq(sIndex++) : sequence.eq(--sIndex);
        if (el.length) {
            fn.call(
                el,
                duration,
                function () {
                    sequencer(fn, duration, callback);
                });
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
            sequencer($.fn.fadeOut, 180, callback);
        } else {
            sequencer($.fn.fadeIn, 180, callback);
        }
    };


})(cb.transition = cb.transition || {});