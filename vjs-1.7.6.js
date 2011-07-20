"use strict";
function $ ( i ) {
    return { "$" : ( typeof i == "string" ) ? document.getElementById( i ) : i,
	     "html" : function ( ){
		 return _h( [ this.$ ] );
	     },
	     "style" : function ( p ) {
		 if ( typeof p == "string" ) return this.$.style[p];
		 for ( var a in p ) {
		     this.$.style[a] = p[a];
		 }
	     },
	     "attr" : function ( p ) {
		 if ( typeof p == "string" ) return this.$.getAttribute ( p );
		 for ( var a in p ) {
		     if ( a == "value" ) this.$.value = p[a];
		     else this.$.setAttribute ( a, p[a] );
		 }
	     },
	     "class" : function ( m ) {
		 if ( m == undefined )return this.$.className;
		 if ( bS ( this.$.className, m ) )return this.$.className += " " + m;
	     },
	     "event" : function ( e, f ) {
		 if ( f == undefined ) {
		     e = ( bS (e, "on") ) ? e.substring ( 2 ) : e;
		     var t = cE( e );
		     this.$.dispatchEvent(t);
		 } else {
		     this.$[e]=f;
		 }
	     },
	     "isChild" : function ( p ) {
		 var l = this.$;
		 while ( l != null && l != p && l.nodeName != "BODY" )
		     l = l.parentNode;
		 return l == p;
	     },
	     "candy" : function ( y ) {
		 var c = _c ( y, lA ( arguments ).slice(1) );
		 c ( this.$ );
	     },
	     "remove" : function ( ) {
		 this.$.parentElement.removeChild ( this.$ );
	     },
	     "do" : function ( f ) {
		 fn ( this.$ );
	     }
	   };
};
function _c ( y ){
    var a = arguments[1];
    var c = {
	"fadeIn" : function ( i ) {
	    var n = ( a[0] == undefined ) ? 1 : a[0];
	    var s = ( a[1] == undefined ) ? .05 : a[1];
	    if ( $( i ).style("opacity") == "" ) $( i ).style({"opacity":0});
	    $( i ).style ({"display":""});
	    fI( i.id, n, s );
	},
	"fadeOut" : function ( i ) {
	    var n = ( a[0] == undefined ) ? 0 : a[0];
	    var s = ( a[1] == undefined ) ? .01 : a[1];
	    s = s - (s*2);
	    if ( $(i).style("opacity") == "" ) $(i).style({"opacity":1});
	    fI( i.id, n, s );
	},
	"slide" : function ( i ) {
	    var n = a[0];
	    var s = parseInt ( a[1] );
	    s = ( n==0 ) ? s : s-(s*2);
	    var x = ( a[2] == undefined ) ? (window.innerWidth/3) : a[2];
	    var y = ( a[3] == undefined ) ? (window.innerHeight/3) : a[3];
	    $(i).style({"position":"fixed","display":""});
	    if ( n==1 ) {
		$(i).style({"left":x,"top":y});
		x = -1000;
		y = -1000;
	    } else {
		$(i).style({"left":-75,"top":-75});
	    }
	    sD ( i.id, x, y, s );
	}
    };
    return c[y];
};
function $class ( m ) {
    return { "m" : m,
	     "$_" : lA( document.getElementsByClassName ( m ) ),
	     "style" : function ( p ) {
		 this.$_.forEach ( function ( $ ) {
		     for ( var a in p ) {
			 $.style[a] = p[a];
		     }
		 });
	     },
	     "event" : function ( e, f ) {
		 this.$_.forEach ( function ( $ ) {
		     $[e]=f;
		 });
	     },
	     "html" : function ( ){
		 return _h( this.$_ )
	     },
	     "remove" : function () {
		 this.$_.forEach ( function ( $ ) {
		     $.parentElement.removeChild ( $ );
		 });
	     },
	     "do" : function ( f ) {
		 this.$_.forEach ( f );
	     }
	   };
};
function $tag ( g ) {
    return { "g" : g,
	     "$_" : lA ( document.getElementsByTagName ( g ) ),
	     "style" : function ( p ) {
		 this.$_.forEach ( function ( $ ) {
		     for ( var a in p ) {
			 $.style[a] = p[a];
		     }
		 });
	     },
	     "event" : function ( e, f ) {
		 this.$_.forEach ( function ( $ ) {
		     $[e]=f;
		 });
	     },
	     "html" : function ( ){
		 return _h( this.$_ )
	     },
	     "remove" : function () {
		 this.$_.forEach ( function ( $ ) {
		     $.parentElement.removeChild ( $ );
		 });
	     },
	     "do" : function ( f ) {
		 this.$_.forEach ( f );
	     }
	   };
};
function _h ( $_ ) {
    return { "$_" : $_,
	     "append" : function ( h ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML += h;
		 });
	     },
	     "replace" : function ( h ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML = h;
		 });
	     },
	     "prepend" : function ( h ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML = h + $.innerHTML;
		 });
	     },
	     "text" : function ( h ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerText = h;			
		 });
	     }
	   };
};
function $hash ( w ) {
    return { "$" : (w!=undefined) ? window.location.hash : window.location.hash.substring( 1 ),
	     "set" : function ( s ) {
		 window.location.hash = s;
	     }
	   };
};
function print ( s ) {
    document.write ( s );
};
function println ( s ) {
    document.writeln ( s + "<br/>" );
}
function fI (i, n, s ){
    s = parseFloat ( s );
    var o = parseFloat ( $(i).style( "opacity" ) );
    o += s;
    if ( o < 0 ) o = 0;
    if ( o > 1 ) o = 1;
    $( i ).style({"opacity":o});
    if ( (s > 0 && o < n) || (s < 0 && o > n) ){
	if (  window[i + "_ti"] == undefined )
	    window[i + "_ti" ] = setInterval ( "fI('" + i +"','" + n + "','" + s + "')", 10 );
    } else {
	clearInterval ( window[i + "_ti"] );
	window[i + "_ti"] = undefined;
    }
};
function sD ( i, x, y, s ) {
    s = parseInt ( s );
    var cx = parseInt ( $(i).style("left") );
    var cy = parseInt ( $(i).style("top") );
    $("test").html().replace( cx + " " + cy + " " + x + " " + y );
    if ( (s > 0 && (cx < x || cy < y)) || (s < 0 && (cx > x || cy > y)) ){
	if ( (s > 0 && cx < x) || (s < 0 && cx > x) )
	    $(i).style({"left":cx + s});
	if ( (s > 0 && cy < y) || (s < 0 && cy > y) )
	    $(i).style({"top":cy + s});
	if ( window[i + "_ti"] == undefined )
	    window[i + "_ti"] = setInterval ( "sD('" + i + "','" + x + "','" + y + "','" + s + "')", 10 );
    } else {
	clearInterval ( window[i + "_ti"] );
	window[i + "_ti"] = undefined;
    }
};
function $ajax ( o ) {
    var s = (o.type == "GET") ? "?" : "";
    for ( var i = 0; i < o.data.length; i++ ){
	s += o.data[i] + "&";
    }
    s = s.substring ( 0, s.length-1 );
    var x = new XMLHttpRequest ( );
    if ( o.sync ) {
	x.onreadystatechange=function(){
	    if ( x.readyState==4 && x.status==200 ) {
		o.fn ( x.responseText );
	    }
	}
    }
    if ( o.type == "POST" ) {
	x.open( o.type, o.dest, o.sync );
	x.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded" );
	x.send( s );
    } else if ( o.type == "GET" ) {
	x.open ( o.type, o.dest + s, o.sync );
	x.send ( );
    }
};
function bS ( h, s ) {
    if ( typeof s == "string" ) return h.search(s) != -1;
    for( var i = 0; i < s.length; i++ ) {
	if ( h.search ( s[i] ) != -1 ) {
	    return true;
	}
    }
    return false;
};
function cE ( e ) {
    var v;
    var w = "init";
    if ( bS ( e, ["click","mouse"] ) ) {
	v = document.createEvent("MouseEvent");
	w += "Mouse";
    } else if ( bS ( e, "key" ) ) {
	v = document.createEvent ( "KeyboardEvent" );
	w += "Keyboard";
    } else if ( bS ( e, "textInput" ) ){ 
	v = document.createEvent ( "TextEvent" );
	w += "Text";
    } else if ( bS ( e, ["focus","blur","scroll","resize"] ) ) {
	v = document.createEvent ( "UIEvent" );
	w += "UI";
    }
    w += "Event";
    v[w](e, true, true, window,
	 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return v;
};
function tT( l, f ) {
    for ( var i = 0; i < l.rows.length; i++ ) {
	for ( var j = 0; j < l.rows[i].cells.length; j++ ) {
	    f ( l.rows[i].cells[j] );
	}
    }
};
function lA ( n ) {
    var a = new Array ();
    for ( var i = 0; i < n.length; i++ )
	a.push ( n[i] );
    return a;
};
