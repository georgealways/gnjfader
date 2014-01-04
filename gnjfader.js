function gnjfader() {

    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    document.body.appendChild(styleTag);

    var CLASS_NAME = 'gnj-fader';
    var nodes = document.querySelectorAll('*['+CLASS_NAME+']');
    var fadersCreated = 0;

    for (var i = 0; i < nodes.length; i++) {

        var n = nodes.item(i);
        var className = CLASS_NAME+'-'+fadersCreated;

        var when = n.getAttribute(CLASS_NAME);

        var durationColor = 1000;
        var durationTransform = 1000;

        var delayColor = 100;
        var delayTransform = 100;

        var color = ['magenta','orange','yellow','#21EB95','#00B1FC'];
        var x = 0;
        var y = 0;

        var delayAttr = n.getAttribute(CLASS_NAME + '-delay');
        delayAttr = parseFloat(delayAttr);
        if (delayAttr === delayAttr) {
            delayColor = delayAttr;
            delayTransform = delayAttr;
        }

        var delayColorAttr = n.getAttribute(CLASS_NAME + '-delay-color');
        delayColorAttr = parseFloat(delayColorAttr);
        if (delayColorAttr === delayColorAttr) {
            delayColor = delayColorAttr;
        }

        var delayTransformAttr = n.getAttribute(CLASS_NAME + '-delay-transform');
        delayTransformAttr = parseFloat(delayTransformAttr);
        if (delayTransformAttr === delayTransformAttr) {
            delayTransform = delayTransformAttr;
        }

        var durationAttr = n.getAttribute(CLASS_NAME + '-duration');
        durationAttr = parseFloat(durationAttr);
        if (durationAttr === durationAttr) {
            durationColor = durationAttr;
            durationTransform = durationAttr;
        }

        var durationColorAttr = n.getAttribute(CLASS_NAME + '-duration-color');
        durationColorAttr = parseFloat(durationColorAttr);
        if (durationColorAttr === durationColorAttr) {
            durationColor = durationColorAttr;
        }

        var durationTransformAttr = n.getAttribute(CLASS_NAME + '-duration-transform');
        durationTransformAttr = parseFloat(durationTransformAttr);
        if (durationTransformAttr === durationTransformAttr) {
            durationTransform = durationTransformAttr;
        }

        var colorAttr = n.getAttribute(CLASS_NAME + '-color');
        if (colorAttr) {
            color = colorAttr.split(';');
        }

        var xAttr = n.getAttribute(CLASS_NAME + '-x');
        xAttr = parseFloat(xAttr);
        if (xAttr === xAttr) {
            x = xAttr;
        }

        var yAttr = n.getAttribute(CLASS_NAME + '-y');
        yAttr = parseFloat(yAttr);
        if (yAttr === yAttr) {
            y = yAttr;
        }

        var t = n.innerText;
        var spans = [];
        for (var j = 0; j < t.length; j++) {
            var ch = t.charAt(j);
            var span = document.createElement('span');
            if (ch === ' ') {
                span.innerHTML = '&nbsp;';
            } else { 
                span.innerText = ch;
            }
            spans.push(span);
            span.setAttribute('style', '-webkit-animation-delay: '+-delayColor*(t.length-j)+'ms, '+-delayTransform*(t.length-j)+'ms;');

        }

        n.classList.add(CLASS_NAME);
        n.id = className;

        n.innerHTML = '';
        spans.forEach(function(s) {
            n.appendChild(s);

        });

        var style = '';

        var DEFAULT = '#'+className+' span';
        var FADER_TRUE = '#'+className+'.fader-true span';
        var HOVER = '#'+className+':hover span';

        var selectors = [DEFAULT, FADER_TRUE];

        if (when === 'off') selectors = [FADER_TRUE];
        if (when === 'hover') selectors = [HOVER, FADER_TRUE];

        style += '\n\n@-webkit-keyframes '+className+'-color {';
        color.forEach(function(c, i) {
            var percent = Math.round(i / (color.length-1) * 100) + '%';
            style += '\n\t'+percent+' { color: ' + c + '; }';
        });
        style += ' }';

        style += '\n\n@-webkit-keyframes '+className+'-transform {';
        style += '\n\t from { -webkit-transform: translate3d(-'+x+'px, -'+y+'px, 0); }';
        style += '\n\t to { -webkit-transform: translate3d('+x+'px, '+y+'px, 0); }';
        style += ' }';

        style += '\n\n#'+className+' {';
        style += '\n\tdisplay: inline-block;'
        style += ' }';

        style += '\n\n'+selectors.join(', ')+' {';
        style += '\n\tdisplay: inline-block;';
        style += '\n\t-webkit-animation-name: '+className+'-color, '+className+'-transform;';
        style += '\n\t-webkit-animation-duration: '+durationColor+'ms, '+durationTransform+'ms;';
        style += '\n\t-webkit-animation-timing-function: linear, ease-in-out;';
        style += '\n\t-webkit-animation-iteration-count: infinite;';
        style += '\n\t-webkit-animation-direction: alternate;';
        style += ' }';

        styleTag.appendChild(document.createTextNode(style));

        fadersCreated++;

    }

}

gnjfader();