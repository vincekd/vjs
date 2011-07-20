function $ ( id ) {
    return { "id" : id,
	     "$" : document.getElementById( id ),
	     "html" : function ( html ) {
		 return this.$.innerHTML = html;
	     },
	     "style" : function ( prop, val ) {
		 if ( val == undefined ) {
		     return this.$.style[prop];
		 }
		 return this.$.style[prop] = val;
	     },
	     "attr" : function ( prop, val ) {
		 if ( val == undefined ) {
		     return this.$.getAttribute ( prop );
		 }
		 return this.$.setAttribute ( prop, val );
	     },
	     "fadeIn" : function ( end, sp ) {
		 fadeIn ( this.$.id, end, sp );
	     },
	     "fadeOut" : function ( end, sp ) {
		 fadeOut ( this.$.id, end, sp );
	     },
	     "class" : function ( name ) {
		 if ( name == undefined ) {
		     return this.$.className;
		 }
		 if ( this.$.className.search ( name ) == -1 ) 
		     return this.$.className += " " + name;
	     },
	     "id" : function ( aid ) {
		 if ( aid == undefined ) {
		     return this.$.id;
		 }
		 return this.$.id = aid;
	     },
	     "value" : function ( val ) {
		 if ( val == undefined ){
		     return this.$.value;
		 }
		 return this.$.value = val;
	     }
	   };
}
function $class ( name ) {
    return { "name" : name,
	     "elms" : document.getElementsByClassName ( name ),
	     "style" : function ( prop, val ) {
		 for ( var i = 0; i < this.elms.length; i++ ) {
		     this.elms[i].style[prop] = val;
		 }
	     }
	   };
}
function $tag ( tag ) {
    return { "tag" : tag,
	     "tags" : document.getElementsByTagName ( tag ),
	     "style" : function ( prop, val ) {
		 for ( var i = 0; i < this.tags.length; i++ ) {
		     this.tags[i].style[prop] = val;
		 }
	     }
	   };
}
function $hash ( w ) {
    return { "val" : (w || w!=undefined) ? window.location.hash : window.location.hash.substring( 1 ),
	     "set" : function ( str ) {
		 window.location.hash = str;
	     }
	   };
}
function print ( str ) {
    document.write ( str );
}
function fadeIn ( id, end, speed ) {
    if ( end == undefined ){ end = 1;}
    if ( speed == undefined ){ speed = .01;}
    $( id ).style ( "opacity", 0 );
    $( id ).style ( "display", "" );
    fadeInA( id, end, speed );
}
function fadeInA ( ){
    var id = arguments[0];
    var end = arguments[1];
    var speed = parseFloat ( arguments[2] );
    var op = parseFloat ( $( id ).style( "opacity" ) );
    op += speed;
    $( id ).style( "opacity", "" + op );

    if ( op < end ) {
	if (  window[id + "-t"] == null ){
	    window[id + "-t" ] = setInterval ( "fadeInA(\"" + id +"\", \"" + end + "\", \"" + speed + "\")", 10 );
	}
    } else {
	clearInterval ( window[id + "-t"] );
	window[id + "-t"] = null;
    }
}
function fadeOut ( id, end, speed ) {
    if ( end == undefined ){ end = 0;}
    if ( speed == undefined ){ speed = .01;}
    fadeOutA( id, end, speed );
}
function fadeOutA ( ){
    var id = arguments[0];
    var end = arguments[1];
    var speed = parseFloat ( arguments[2] );
    var op = parseFloat (  $( id ).style( "opacity" ) );
    op -= speed;
    $( id ).style( "opacity", "" + op );

    if ( op > end ) {
	if (  window[id + "-t"] == null )
	    window[id + "-t"] = setInterval ( "fadeOutA(\"" + id +"\", \"" + end + "\", \"" + speed + "\")", 10 );
    } else {
	clearInterval ( window[id + "-t"] );
	window[id + "-t"] = null;
	$( id ).style( "display", "none" );
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
function $ajax ( obj ) {
    var sub = (obj.type == "GET") ? "?" : "";
    for ( var i = 0; i < obj.data.length; i++ ){
	sub += obj.data[i] + "&";
    }
    sub = sub.substring ( 0, sub.length-1 );
    var xml = new XMLHttpRequest ( );
    if ( obj.sync ) {
	xml.onreadystatechange=function(){
	    if ( xml.readyState==4 && xml.status==200 ) {
		obj.fn ( xml.responseText );
	    }
	}
    }
    if ( obj.type == "POST" ) {
	xml.open( obj.type, obj.dest, obj.sync );
	xml.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
	xml.send( sub );
    } else if ( obj.type == "GET" ) {
	xml.open ( obj.type, obj.dest + sub, obj.sync );
	xml.send ( );
    }
}
function arrIndexOf ( array, value, limit ) {
    if ( limit == undefined ) limit = 1;
    var arr = new Array ( );
    for ( var i = 0; i < array.length; i++ ) {
	if ( array[i] == value && limit) {
	    return i;
	} else if ( array[i] == value ) {
	    arr.push( i );
	}
    }
    return arr;
}
