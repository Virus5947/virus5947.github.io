document.addEventListener('contextmenu', event => event.preventDefault());

$(document)['ready'](function () {

    var _0x399ec4 = {};

    function _0x326088(_0x19a53d, _0x567a79) {
        return Math['round'](Math['random']() * (_0x567a79 - _0x19a53d + 0x1)) + _0x19a53d;
    }
    $(window)['mousemove'](function (_0x32fd1b) {
        _0x399ec4['x'] = _0x32fd1b['pageX'];
        _0x399ec4['y'] = _0x32fd1b['pageY'];
        if (_0x399ec4['x'] > 0x0 && _0x399ec4['y'] > 0x0) {
            var _0xd6406d = Math['floor'](Math['random']() * random_images_array['length']);
            var _0x32090d = random_images_array[_0xd6406d];
            var _0xb9f424 = '<img height=\"25px\" width=\"25px\" src=' + _0x32090d + ' alt=\"\" border=\"0\">';
            var _0x3ab1c1 = 0xa;
            var _0x5c2c3d = _0x326088(0x2, 0x1);
            size = 'height:P' + _0x5c2c3d + 'px;Pwidth: ' + _0x5c2c3d + 'px;';
            var _0x327bff = 'left: ' + _0x326088(_0x399ec4['x'] - _0x3ab1c1 - _0x5c2c3d, _0x399ec4['x'] + _0x3ab1c1) + 'px;';
            var _0xe8760 = 'top: ' + _0x326088(_0x399ec4['y'] - _0x3ab1c1 - _0x5c2c3d, _0x399ec4['y'] + _0x3ab1c1) + 'px;';
            var _0x167e83 = _0x327bff + _0xe8760 + size;
            $('<div class=\'pointer\' style=\'' + _0x167e83 + '\'>' + _0xb9f424 + '</div>')['appendTo']('#Dolo')['one']('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this)['remove']();
            });
        }
    });

 });


var random_images_array = [
    'assets/emoji/smiling-face-with-open-mouth-and-cold-sweat_1f605.png',
    'assets/emoji/face-with-tears-of-joy_1f602.png',
    'assets/emoji/smiling-face-with-smiling-eyes-and-three-hearts_1f970.png',
    'assets/emoji/smiling-face-with-heart-shaped-eyes_1f60d.png',
    'assets/emoji/smiling-face-with-smiling-eyes_1f60a.png',
    'assets/emoji/overheated-face_1f975.png',
    'assets/emoji/face-with-pleading-eyes_1f97a.png',
    'assets/emoji/heavy-black-heart_2764.png',
    'assets/emoji/speak-no-evil-monkey_1f64a.png',
    'assets/emoji/see-no-evil-monkey_1f648.png',
    'assets/emoji/freezing-face_1f976.png',
    'assets/emoji/serious-face-with-symbols-covering-mouth_1f92c.png',
    'assets/emoji/grinning-face-with-one-large-and-one-small-eye_1f92a.png',
    'assets/emoji/hugging-face_1f917.png',
    'assets/emoji/face-with-rolling-eyes_1f644.png',
    'assets/emoji/face-throwing-a-kiss_1f618.png',
    'assets/emoji/smiling-face-with-halo_1f607.png',
    "assets/emoji/butterfly_1f98b.png"
 ];

//Emoji Cursor ~ Dolo