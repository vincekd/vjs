function styleId ( id, property, value ) {
    eval ( "document.getElementById('" + id + "').style." + property + "='" + value + "';" );
}
function styleClass ( name, prop, val ) {
    eval ( "var tags = document.getElementsByClassName('" + name + "');" );
    for ( var i = 0; i < tags.length; i++ ) {
	eval ( "document.getElementById('" + tags[i].id + "').style." + prop + "='" + val + "';" );
    }
    return tags.length;
}
function styleCell ( table, row, col, prop, val ) {
    eval ( "document.getElementById('" + table + "').rows[" + row + "].cells[" + col + "].style." + prop + "='" + val + "';" );
}
function htmlId ( id, value ) {
    eval ( "document.getElementById ( '" + id + "' ).innerHTML='" + value + "';" );
}
function setHash ( val ) {
    eval ( "window.location.hash='" + val + "';" );
}
function getHash ( w ) {
    return w ? window.location.hash : window.location.hash.substring(1);
}
function print ( str ) {
    document.write ( str );
}
function elmId ( id ) {
    return document.getElementById( id );
}
function setElm ( id, val ) {
    document.getElementById( id ).value = val;
}
function fadeIn ( id, end, speed ) {
    styleId ( id, "opacity", 0 );
    styleId ( id, "display", "inline" );
    fadeInAux( id, end, speed );
}
function fadeInAux ( ){
    var id = arguments[0];
    var end = arguments[1];
    var speed = parseFloat ( arguments[2] );
    var op = parseFloat ( elmId ( id ).style.opacity );
    op += speed;
    styleId ( id, "opacity", "" + op );

    if ( op < end ) {
	if (  window.t == null )
	    window.t = setInterval ( "fadeInAux(\"" + id +"\", \"" + end + "\", \"" + speed + "\")", 10 );
    } else {
	clearInterval ( window.t );
	window.t = null;
    }
}
function fadeOut ( id, end, speed ) {
    fadeOutAux( id, end, speed );
}
function fadeOutAux ( ){
    var id = arguments[0];
    var end = arguments[1];
    var speed = parseFloat ( arguments[2] );
    var op = parseFloat ( elmId ( id ).style.opacity );
    op -= speed;
    styleId ( id, "opacity", "" + op );

    if ( op > end ) {
	if (  window.t == null )
	    window.t = setInterval ( "fadeOutAux(\"" + id +"\", \"" + end + "\", \"" + speed + "\")", 10 );
    } else {
	clearInterval ( window.t );
	window.t = null;
	styleId ( id, "display", "none" );
    }
}
function makeTxt ( elm ) {
    var txt = document.createElement ( "textarea" );
    txt.id = elm.id;
    txt.value = elm.innerHTML;
    txt.className = elm.className;
    var p = elm.parentNode;
    p.replaceChild ( txt, elm );
}
function ajax ( type, dest, sync, fn ) {
    var start = sync ? 4 : 3;
    var submission = (type == "GET") ? "?" : "";
    for ( var i = start; i < arguments.length; i++ ) {
	submission += arguments[i] + "&";
    }
    submission = submission.substring ( 0, submission.length-1 );
    var xml = new XMLHttpRequest ( );
    if ( sync ) {
	xml.onreadystatechange=function(){
	    if ( xml.readyState==4 && xml.status==200 ) {
		fn ( xml.responseText );
	    }
	}
    }
    if ( type == "POST" ) {
	xml.open( type, dest, sync );
	xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
	xml.send( submission );
    } else if ( type == "GET" ) {
	xml.open ( type, dest + submission, sync );
	xml.send ( );
    }
}
