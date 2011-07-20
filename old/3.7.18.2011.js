function $ ( id ) {
    var el = ( typeof id == "string" ) ? document.getElementById( id ) : id;
    return { "$" : el,
	     "html" : function ( ){
		 return _html( [ this.$ ] );
	     },
	     "style" : function ( prop ) {
		 if ( typeof prop == "string" ) {
		     return this.$.style[prop];
		 }
		 for ( a in prop ) {
		     this.$.style[a] = prop[a];
		 }
	     },
	     "attr" : function ( prop ) {
		 if ( typeof prop == "string" ) {
		     return this.$.getAttribute ( prop );
		 }
		 for ( a in prop ) {
		     this.$.setAttribute ( a, prop[a] );
		 }
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
	     "event" : function ( ev, fn ) {
		 if ( fn == undefined ) {
		     ev = (ev.search("on")!=-1) ? ev.substring ( 2 ) : ev;
		     var evt = createEv( ev, this.$ );
		     this.$.dispatchEvent(evt);
		 } else {
		     this.$[ev]=fn;
		 }
	     }
	   };
}
function $class ( name ) {
    return { "name" : name,
	     "$_" : List2Arr( document.getElementsByClassName ( name ) ),
	     "style" : function ( prop ) {
		 this.$_.forEach ( function ( $ ) {
		     for ( a in prop ) {
			 $.style[a] = prop[a];
		     }
		 });
	     },
	     "event" : function ( ev, fn ) {
		 this.$_.forEach ( function ( $ ) {
		     $[ev]=fn;
		 });
	     },
	     "html" : function ( ){
		 return _html( this.$_ )
	     }
	   };
}
function $tag ( tag ) {
    return { "tag" : tag,
	     "$_" : List2Arr ( document.getElementsByTagName ( tag ) ),
	     "style" : function ( prop ) {
		 this.$_.forEach ( function ( $ ) {
		     for ( a in prop ) {
			 $.style[a] = prop[a];
		     }
		 });
	     },
	     "event" : function ( ev, fn ) {
		 this.$_.forEach ( function ( $ ) {
		     $[ev]=fn;
		 });
	     },
	     "html" : function ( ){
		 return _html( this.$_ )
	     }
	   };
}
function _html ( $_ ) {
    return { "$_" : $_,
	     "append" : function ( html ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML += html;
		 });
	     },
	     "replace" : function ( html ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML = html;
		 });
	     },
	     "prepend" : function ( html ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerHTML = html + $.innerHTML;
		 });
	     },
	     "text" : function ( str ) {
		 this.$_.forEach ( function ( $ ) {
		     $.innerText = str;			
		 });
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
function fadeIn ( id, end, sp ) {
    if ( end == undefined ){ end = 1;}
    if ( sp == undefined ){ sp = .01;}
    if ( $(id).style("opacity") == "" ){ $(id).style({"opacity":0});}
    $( id ).style ({"display":""});
    fadeInA( id, end, sp );
}
function fadeInA ( ){
    var id = arguments[0];
    var end = arguments[1];
    var sp = parseFloat ( arguments[2] );
    var op = parseFloat ( $( id ).style( "opacity" ) );
    op += sp;
    $( id ).style({"opacity":"" + op});

    if ( op < end ) {
	if (  window[id + "-t"] == null ){
	    window[id + "-t" ] = setInterval ( "fadeInA(\"" + id +"\", \"" + end + "\", \"" + sp + "\")", 10 );
	}
    } else {
	clearInterval ( window[id + "-t"] );
	window[id + "-t"] = null;
    }
}
function fadeOut ( id, end, sp ) {
    if ( end == undefined ){ end = 0;}
    if ( sp == undefined ){ sp = .01;}
    if ( $(id).style("opacity") == "" ){ $(id).style({"opacity":1});}
    fadeOutA( id, end, sp );
}
function fadeOutA ( ){
    var id = arguments[0];
    var end = arguments[1];
    var sp = parseFloat ( arguments[2] );
    var op = parseFloat (  $( id ).style( "opacity" ) );
    op -= sp;
    $( id ).style({"opacity":"" + op});

    if ( op > end ) {
	if (  window[id + "-t"] == null )
	    window[id + "-t"] = setInterval ( "fadeOutA(\"" + id +"\", \"" + end + "\", \"" + sp + "\")", 10 );
    } else {
	clearInterval ( window[id + "-t"] );
	window[id + "-t"] = null;
	$( id ).style({"display":"none"});
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
function bSearch ( h, s ) {
    if ( typeof s == "string" ) return h.search(s) != -1;
    for( var i = 0; i < s.length; i++ ) {
	if ( h.search ( s[i] ) != -1 ) {
	    return true;
	}
    }
    return false;
}
function createEv ( ev, elm ) {
    var evt;
    var wh = "init";
    if ( bSearch ( ev, ["click","mouse"] ) ) {
	evt = document.createEvent("MouseEvent");
	wh += "Mouse";
    } else if ( bSearch ( ev, "key" ) ) {
	evt = document.createEvent ( "KeyboardEvent" );
	wh += "Keyboard";
    } else if ( bSearch ( ev, "textInput" ) ){ 
	evt = document.createEvent ( "TextEvent" );
	wh += "Text";
    } else if ( bSearch ( ev, ["focus","blur","scroll","resize"] ) ) {
	evt = document.createEvent ( "UIEvent" );
	wh += "UI";
    }
    wh += "Event";
    evt[wh](ev, true, true, window,
			  0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return evt;
}
function travTabl( el, fn ) {
    for ( var i = 0; i < el.rows.length; i++ ) {
	for ( var j = 0; j < el.rows[i].cells.length; j++ ) {
	    fn ( el.rows[i].cells[j] );
	}
    }
}
function List2Arr ( n ) {
    var a = new Array ();
    for ( var i = 0; i < n.length; i++ )
	a.push ( n[i] );
    return a;
}
