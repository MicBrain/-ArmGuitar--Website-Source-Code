if(typeof window.ulb==='undefined') window.ulb={};

/* fancyBox v2.0.5 fancyapps.com | fancyapps.com/fancybox/#license + uCoz modifications */
(function (e, q, m) {
    var o = m(e),
        s = m(q),
        l = m.fancybox = function () {
            l.open.apply(this, arguments)
        }, t = !1,
        a = "undefined" !== typeof q.createTouch;

        var p;

    // var r = {
    //     c: 0,
    //     o: 2,
    //     p: "/photo/"
    // };
    m.extend(l, {
        version: "2.0.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            autoSize: !0,
            autoResize: !a,
            autoCenter: !a,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            fixed: !(m.browser.msie && 6 >= m.browser.version) && !a,
            scrolling: "auto",
            wrapCSS: "fancybox-default",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3000,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            keys: {
                next: [13, 32, 34, 39, 40],
                prev: [8, 33, 37, 38],
                close: [27]
            },
            tpl: {
                wrap: '<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"' + (m.browser.msie ? ' allowtransparency="true"' : "") + "></iframe>",
                swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
                error: '<p class="fancybox-error">' + ulb.error + '</p>',
                closeBtn: '<div title="' + ulb.closeBtn + '" class="fancybox-item fancybox-close"></div>',
                next: '<a title="' + ulb.next + '" href="javascript://" class="fancybox-nav fancybox-next"><span></span></a>',
                prev: '<a title="' + ulb.prev + '" href="javascript://" class="fancybox-nav fancybox-prev"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 300,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 300,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: {
                    speedIn: 0,
                    speedOut: 300,
                    opacity: 0.8,
                    css: {
                        cursor: "pointer"
                    },
                    closeClick: !0
                },
                title: {
                    type: "float"
                }
            }
        },
        group: {},
        opts: {},
        coming: null,
        current: null,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function (b, c) {
            l.close(!0);
            b && !m.isArray(b) && (b = b instanceof m ? m(b).get() : [b]);
            l.isActive = !0;
            l.opts = m.extend(!0, {}, l.defaults, c);
            m.isPlainObject(c) && "undefined" !== typeof c.keys && (l.opts.keys = c.keys ? m.extend({}, l.defaults.keys, c.keys) : !1);
            l.group = b;
            l._start(l.opts.index || 0)
        },
        cancel: function () {
            l.coming && !1 === l.trigger("onCancel") || (l.coming = null, l.hideLoading(), l.ajaxLoad && l.ajaxLoad.abort(), l.ajaxLoad = null, l.imgPreload && (l.imgPreload.onload = l.imgPreload.onabort = l.imgPreload.onerror = null))
        },
        close: function (b) {
            l.cancel();
            l.current && !1 !== l.trigger("beforeClose") && (l.unbindEvents(), !l.isOpen || b && !0 === b[0] ? (m(".fancybox-wrap").stop().trigger("onReset").remove(), l._afterZoomOut()) : (l.isOpen = l.isOpened = !1, m(".fancybox-item, .fancybox-nav").remove(), l.wrap.stop(!0).removeClass("fancybox-opened"), l.inner.css("overflow", "hidden"), l.transitions[l.current.closeMethod]()))
        },
        play: function (d) {
            var b = function () {
                clearTimeout(l.player.timer)
            }, c = function () {
                b();
                l.current && l.player.isActive && (l.player.timer = setTimeout(l.next, l.current.playSpeed))
            }, f = function () {
                b();
                m("body").unbind(".player");
                l.player.isActive = !1;
                l.trigger("onPlayEnd")
            };
            if (l.player.isActive || d && !1 === d[0]) {
                f()
            } else {
                if (l.current && (l.current.loop || l.current.index < l.group.length - 1)) {
                    l.player.isActive = !0, m("body").bind({
                        "afterShow.player onUpdate.player": c,
                        "onCancel.player beforeClose.player": f,
                        "beforeLoad.player": b
                    }), c(), l.trigger("onPlayStart")
                }
            }
        },
        next: function () {

            if(typeof getPhotoVars != "undefined" && !p){
                p = getPhotoVars();
            }

            if(p && l.current){
                l.current.index = 0;
                for(var i=0;i<l.group.length;i++){
                    if(l.group[i].href==l.current.href){
                        break;
                    }
                    l.current.index++;
                }
            }

            l.current && l.jumpto(l.current.index + 1,1)
        },
        prev: function () {

            if(typeof getPhotoVars != "undefined" && !p){
                p = getPhotoVars();
            }
            if(p && l.current){
                l.current.index = 0;
                for(var i=0;i<l.group.length;i++){
                    if(l.group[i].href==l.current.href){
                        break;
                    }
                    l.current.index++;
                }
            }



            l.current && l.jumpto(l.current.index - 1, -1)
        },
        jumpto: function (d,b) {
                if(typeof getPhotoVars != "undefined" && !p){
                    p = getPhotoVars();
                }
                if(p){
                        
                    a = checkPhotoPosition(p.photoUrls,l.current.href);

                    if(a){
                        var new_page;

                        var count = pages = 0;
                        $.each(p.photoUrls, function(i){
                            $.each(i, function(j){
                                count++;
                            });
                            pages++; 
                        });

                        if(a[0] == 1){
                            new_page = res =  typeof p.photoUrls[parseInt(a[1])+1] == "undefined" ? 1 : parseInt(a[1])+1;
                        } else if(a[0] == -1){
                            new_page = res = a[1] - 1 < 1 ? Math.max.apply( Math,  Object.keys(p.photoUrls) ) : parseInt(a[1]) - 1;
                        }
 
                        if(pages!=1 && (p.photoUrls[new_page]==null || count!=l.group.length)){

                            url = p.pageUrlMask.replace(/\%[pa]/gi,function(str){
                                var res;
                                if(str == "%p"){
                                    return new_page;
                                } else if(str == "%a"){
                                    return 1;
                                } 
                            });

                            var d1 = d; 

                            function proccess_data(){
                                var newEl = $(l.group[0]).clone()[0];
                                l.group = new Array();

                                i = 0;
                                $.each(p.photoUrls, function(ip, iv){
                                    if(iv){
                                        $.each(iv, function(ui, uv){
                                            var newEl2 = $(newEl).clone()[0];
                                            $(newEl2).attr('data-url','/photo/0-0-'+uv[0]);
                                            newEl2.href = uv[1];
                                            l.group.push(newEl2);
                                            if(l.current.href==newEl2.href){
                                                d = d1 = i+b;
                                            }
                                            i++;
                                        });
                                    }
                                });

                                l.current && (d1 = parseInt(d1, 10), 1 < l.group.length && l.current.loop && (d1 >= l.group.length ? d1 = 0 : 0 > d1 && (d1 = l.group.length - 1)), "undefined" !== typeof l.group[d1] && (l.cancel(), l._start(d1)));
                            }
                            
                            if(!p.photoUrls[new_page]){
                                 $.ajax({
                                    url: url,
                                    success: function(data){
                                        p.photoUrls[new_page] = data;
                                        proccess_data();
                                    }
                                });
                            } else {
                                proccess_data();                            
                            }
                            return;
                        }                        
                    }
                }

                l.current && (d = parseInt(d, 10), 1 < l.group.length && l.current.loop && (d >= l.group.length ? d = 0 : 0 > d && (d = l.group.length - 1)), "undefined" !== typeof l.group[d] && (l.cancel(), l._start(d)))
        },
        reposition: function (b) {
            l.isOpen && l.wrap.css(l._getPosition(b))
        },
        update: function (b) {
            l.isOpen && (t || setTimeout(function () {
                var c = l.current;
                if (t && (t = !1, c)) {
                    if (c.autoResize || b && "orientationchange" === b.type) {
                        c.autoSize && (l.inner.height("auto"), c.height = l.inner.height()), l._setDimension(), c.canGrow && l.inner.height("auto")
                    }
                    c.autoCenter && l.reposition();
                    l.trigger("onUpdate")
                }
            }, 100), t = !0)
        },
        toggle: function () {
            l.isOpen && (l.current.fitToView = !l.current.fitToView, l.update())
        },
        hideLoading: function () {
            m("#fancybox-loading").remove()
        },
        showLoading: function () {
            l.hideLoading();
            m('<div id="fancybox-loading"><div></div></div>').click(l.cancel).appendTo("body")
        },
        getViewport: function () {
            return {
                x: o.scrollLeft(),
                y: o.scrollTop(),
                w: o.width(),
                h: o.height()
            }
        },
        unbindEvents: function () {
            l.wrap && l.wrap.unbind(".fb");
            s.unbind(".fb");
            o.unbind(".fb")
        },
        bindEvents: function () {
            var b = l.current,
                c = b.keys;
            b && (o.bind("resize.fb, orientationchange.fb", l.update), c && s.bind("keydown.fb", function (f) {
                var d;
                !f.ctrlKey && !f.altKey && !f.shiftKey && !f.metaKey && 0 > m.inArray(f.target.tagName.toLowerCase(), ["input", "textarea", "select", "button"]) && (d = f.keyCode, -1 < m.inArray(d, c.close) ? (l.close(), f.preventDefault()) : -1 < m.inArray(d, c.next) ? (l.next(), f.preventDefault()) : -1 < m.inArray(d, c.prev) && (l.prev(), f.preventDefault()))
            }), m.fn.mousewheel && b.mouseWheel && 1 < l.group.length && l.wrap.bind("mousewheel.fb", function (f, g) {
                var d = m(f.target).get(0);
                if (0 === d.clientHeight || d.scrollHeight === d.clientHeight && d.scrollWidth === d.clientWidth) {
                    f.preventDefault(), l[0 < g ? "prev" : "next"]()
                }
            }))
        },
        trigger: function (c) {
            var b, d = l[-1 < m.inArray(c, ["onCancel", "beforeLoad", "afterLoad"]) ? "coming" : "current"];
            if (d) {
                m.isFunction(d[c]) && (b = d[c].apply(d, Array.prototype.slice.call(arguments, 1)));
                if (!1 === b) {
                    return !1
                }
                d.helpers && m.each(d.helpers, function (g, f) {
                    if (f && "undefined" !== typeof l.helpers[g] && m.isFunction(l.helpers[g][c])) {
                        l.helpers[g][c](f, d)
                    }
                });
                m.event.trigger(c + ".fb")
            }
        },
        isImage: function (b) {
            return b && b.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i)
        },
        isSWF: function (b) {
            return b && b.match(/\.(swf)(.*)?$/i)
        },
        _start: function (d) {
            var g = {}, h = l.group[d] || null,
                c, b, f;
            if (h && (h.nodeType || h instanceof m)) {
                c = !0, m.metadata && (g = m(h).metadata())
            }
            g = m.extend(!0, {}, l.opts, {
                index: d,
                element: h
            }, m.isPlainObject(h) ? h : g);
            m.each(["href", "title", "content", "type"], function (j, i) {
                g[i] = l.opts[i] || c && m(h).attr(i) || g[i] || null
            });
            "number" === typeof g.margin && (g.margin = [g.margin, g.margin, g.margin, g.margin]);
            g.modal && m.extend(!0, g, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        css: {
                            cursor: "auto"
                        },
                        closeClick: !1
                    }
                }
            });
            l.coming = g;
            if (!1 === l.trigger("beforeLoad")) {
                l.coming = null
            } else {
                b = g.type;
                d = g.href || h;
                b || (c && (f = m(h).data("fancybox-type"), !f && h.className && (b = (f = h.className.match(/fancybox\.(\w+)/)) ? f[1] : null)), !b && "string" === m.type(d) && (l.isImage(d) ? b = "image" : l.isSWF(d) ? b = "swf" : d.match(/^#/) && (b = "inline")), b || (b = c ? "inline" : "html"), g.type = b);
                if ("inline" === b || "html" === b) {
                    if (g.content || (g.content = "inline" === b ? m("string" === m.type(d) ? d.replace(/.*(?=#[^\s]+$)/, "") : d) : h), !g.content || !g.content.length) {
                        b = null
                    }
                } else {
                    d || (b = null)
                }
                g.group = l.group;
                g.isDom = c;
                g.href = d;
                "image" === b ? l._loadImage() : "ajax" === b ? l._loadAjax() : b ? l._afterLoad() : l._error("type")
            }
        },
        _error: function (b) {
            l.hideLoading();
            m.extend(l.coming, {
                type: "html",
                autoSize: !0,
                minHeight: 0,
                hasError: b,
                content: l.coming.tpl.error
            });
            l._afterLoad()
        },
        _loadImage: function () {
            l.imgPreload = new Image;
            l.imgPreload.onload = function () {
                this.onload = this.onerror = null;
                l.coming.width = this.width;
                l.coming.height = this.height;
                l._afterLoad()
            };
            l.imgPreload.onerror = function () {
                this.onload = this.onerror = null;
                l._error("image")
            };
            l.imgPreload.src = l.coming.href;
            l.imgPreload.width || l.showLoading()
        },
        _loadAjax: function () {
            l.showLoading();
            l.ajaxLoad = m.ajax(m.extend({}, l.coming.ajax, {
                url: l.coming.href,
                error: function (b, c) {
                    "abort" !== c ? l._error("ajax", b) : l.hideLoading()
                },
                success: function (b, c) {
                    "success" === c && (l.coming.content = b, l._afterLoad())
                }
            }))
        },
        _preloadImages: function () {
            var d = l.group,
                g = l.current,
                b = d.length,
                f;
            if (g.preload && !(2 > d.length)) {
                for (var c = 1; c <= Math.min(g.preload, b - 1); c++) {
                    if (f = d[(g.index + c) % b], f = m(f).attr("href") || f) {
                        (new Image).src = f
                    }
                }
            }
        },
        _afterLoad: function () {
            l.hideLoading();
            !l.coming || !1 === l.trigger("afterLoad", l.current) ? l.coming = !1 : (l.isOpened ? (m(".fancybox-item").remove(), l.wrap.stop(!0).removeClass("fancybox-opened"), l.inner.css("overflow", "hidden"), l.transitions[l.current.prevMethod]()) : (m(".fancybox-wrap").stop().trigger("onReset").remove(), l.trigger("afterClose")), l.unbindEvents(), l.isOpen = !1, l.current = l.coming, l.wrap = m(l.current.tpl.wrap).addClass("fancybox-" + (a ? "mobile" : "desktop") + " fancybox-tmp " + l.current.wrapCSS).appendTo("body"), l.outer = m(".fancybox-outer", l.wrap).css("padding", l.current.padding + "px"), l.inner = m(".fancybox-inner", l.wrap), l._setContent())
        },
        _setContent: function () {
            var d, b, c = l.current,
                f = c.type;
            switch (f) {
                case "inline":
                case "ajax":
                case "html":
                    d = c.content;
                    d instanceof m && (d = d.show().detach(), d.parent().hasClass("fancybox-inner") && d.parents(".fancybox-wrap").trigger("onReset").remove(), m(l.wrap).bind("onReset", function () {
                        d.appendTo("body").hide()
                    }));
                    c.autoSize && (b = m('<div class="fancybox-tmp ' + l.current.wrapCSS + '"></div>').appendTo("body").append(d), c.width = b.width(), c.height = b.height(), b.width(l.current.width), b.height() > c.height && (b.width(c.width + 1), c.width = b.width(), c.height = b.height()), d = b.contents().detach(), b.remove());
                    break;
                case "image":
                    d = c.tpl.image.replace("{href}", c.href);
                    c.aspectRatio = !0;
                    break;
                case "swf":
                    d = c.tpl.swf.replace(/\{width\}/g, c.width).replace(/\{height\}/g, c.height).replace(/\{href\}/g, c.href)
            }
            if ("iframe" === f) {
                d = m(c.tpl.iframe.replace("{rnd}", (new Date).getTime())).attr("scrolling", c.scrolling);
                c.scrolling = "auto";
                if (c.autoSize) {
                    d.width(c.width);
                    l.showLoading();
                    d.data("ready", !1).appendTo(l.inner).bind({
                        onCancel: function () {
                            m(this).unbind();
                            l._afterZoomOut()
                        },
                        load: function () {
                            var i = m(this),
                                g;
                            try {
                                this.contentWindow.document.location && (g = i.contents().find("body").height() + 12, i.height(g))
                            } catch (h) {
                                c.autoSize = !1
                            }!1 === i.data("ready") ? (l.hideLoading(), g && (l.current.height = g), l._beforeShow(), i.data("ready", !0)) : g && l.update()
                        }
                    }).attr("src", c.href);
                    return
                }
                d.attr("src", c.href)
            } else {
                if ("image" === f || "swf" === f) {
                    c.autoSize = !1, c.scrolling = "visible"
                }
            }
            l.inner.append(d);
            l._beforeShow()
        },
        _beforeShow: function () {
            l.coming = null;
            l.trigger("beforeShow");
            l._setDimension();
            l.wrap.hide().removeClass("fancybox-tmp");
            l.bindEvents();
            l._preloadImages();
            l.transitions[l.isOpened ? l.current.nextMethod : l.current.openMethod]()
        },
        _setDimension: function () {
            var d = l.wrap,
                f = l.outer,
                h = l.inner,
                k = l.current,
                i = l.getViewport(),
                E = k.margin,
                n = 2 * k.padding,
                C = k.width,
                D = k.height,
                g = k.maxWidth,
                F = k.maxHeight,
                j = k.minWidth,
                b = k.minHeight,
                c;
            i.w -= E[1] + E[3];
            i.h -= E[0] + E[2]; - 1 < C.toString().indexOf("%") && (C = (i.w - n) * parseFloat(C) / 100); - 1 < D.toString().indexOf("%") && (D = (i.h - n) * parseFloat(D) / 100);
            E = C / D;
            C += n;
            D += n;
            k.fitToView && (g = Math.min(i.w, g), F = Math.min(i.h, F));
            k.aspectRatio ? (C > g && (C = g, D = (C - n) / E + n), D > F && (D = F, C = (D - n) * E + n), C < j && (C = j, D = (C - n) / E + n), D < b && (D = b, C = (D - n) * E + n)) : (C = Math.max(j, Math.min(C, g)), D = Math.max(b, Math.min(D, F)));
            C = Math.round(C);
            D = Math.round(D);
            m(d.add(f).add(h)).width("auto").height("auto");
            h.width(C - n).height(D - n);
            d.width(C);
            c = d.height();
            if (C > g || c > F) {
                for (;
                (C > g || c > F) && C > j && c > b;) {
                    D -= 10, k.aspectRatio ? (C = Math.round((D - n) * E + n), C < j && (C = j, D = (C - n) / E + n)) : C -= 10, h.width(C - n).height(D - n), d.width(C), c = d.height()
                }
            }
            k.dim = {
                width: C,
                height: c
            };
            k.canGrow = k.autoSize && D > b && D < F;
            k.canShrink = !1;
            k.canExpand = !1;
            if (C - n < k.width || D - n < k.height) {
                k.canExpand = !0
            } else {
                if ((C > i.w || c > i.h) && C > j && D > b) {
                    k.canShrink = !0
                }
            }
            d = c - n;
            l.innerSpace = d - h.height();
            l.outerSpace = d - f.height()
        },
        _getPosition: function (d) {
            var f = l.current,
                g = l.getViewport(),
                h = f.margin,
                i = l.wrap.width() + h[1] + h[3],
                c = l.wrap.height() + h[0] + h[2],
                b = {
                    position: "absolute",
                    top: h[0] + g.y,
                    left: h[3] + g.x
                };
            if (f.fixed && (!d || !1 === d[0]) && c <= g.h && i <= g.w) {
                b = {
                    position: "fixed",
                    top: h[0],
                    left: h[3]
                }
            }
            b.top = Math.ceil(Math.max(b.top, b.top + (g.h - c) * f.topRatio)) + "px";
            b.left = Math.ceil(Math.max(b.left, b.left + 0.5 * (g.w - i))) + "px";
            return b
        },
        _afterZoomIn: function () {
            var b = l.current,
                c = b.scrolling;
            l.isOpen = l.isOpened = !0;
            l.wrap.addClass("fancybox-opened").css("overflow", "visible");
            l.update();
            l.inner.css("overflow", "yes" === c ? "scroll" : "no" === c ? "hidden" : c);
            if (b.closeClick || b.nextClick) {
                l.inner.css("cursor", "pointer").bind("click.fb", b.nextClick ? l.next : l.close)
            }
            b.closeBtn && m(b.tpl.closeBtn).appendTo(l.outer).bind("click.fb", l.close);
            b.arrows && 1 < l.group.length && ((b.loop || 0 < b.index) && m(b.tpl.prev).appendTo(l.inner).bind("click.fb", l.prev), (b.loop || b.index < l.group.length - 1) && m(b.tpl.next).appendTo(l.inner).bind("click.fb", l.next));
            l.trigger("afterShow");
            l.opts.autoPlay && !l.player.isActive && (l.opts.autoPlay = !1, l.play())
        },
        _afterZoomOut: function () {
            l.trigger("afterClose");
            l.wrap.trigger("onReset").remove();
            m.extend(l, {
                group: {},
                opts: {},
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                wrap: null,
                outer: null,
                inner: null
            })
        }
    });
    l.transitions = {
        getOrigPosition: function () {
            var d = l.current,
                f = d.element,
                h = d.padding,
                b = m(d.orig),
                i = {}, g = 50,
                c = 50;
            !b.length && d.isDom && m(f).is(":visible") && (b = m(f).find("img:first"), b.length || (b = m(f)));
            b.length ? (i = b.offset(), b.is("img") && (g = b.outerWidth(), c = b.outerHeight())) : (d = l.getViewport(), i.top = d.y + 0.5 * (d.h - c), i.left = d.x + 0.5 * (d.w - g));
            return i = {
                top: Math.ceil(i.top - h) + "px",
                left: Math.ceil(i.left - h) + "px",
                width: Math.ceil(g + 2 * h) + "px",
                height: Math.ceil(c + 2 * h) + "px"
            }
        },
        step: function (d, f) {
            var g, b, c;
            if ("width" === f.prop || "height" === f.prop) {
                b = c = Math.ceil(d - 2 * l.current.padding), "height" === f.prop && (g = (d - f.start) / (f.end - f.start), f.start > f.end && (g = 1 - g), b -= l.innerSpace * g, c -= l.outerSpace * g), l.inner[f.prop](b), l.outer[f.prop](c)
            }
        },
        zoomIn: function () {
            var d = l.wrap,
                b = l.current,
                c, f;
            c = b.dim;
            "elastic" === b.openEffect ? (f = m.extend({}, c, l._getPosition(!0)), delete f.position, c = this.getOrigPosition(), b.openOpacity && (c.opacity = 0, f.opacity = 1), l.outer.add(l.inner).width("auto").height("auto"), d.css(c).show(), d.animate(f, {
                duration: b.openSpeed,
                easing: b.openEasing,
                step: this.step,
                complete: l._afterZoomIn
            })) : (d.css(m.extend({}, c, l._getPosition())), "fade" === b.openEffect ? d.fadeIn(b.openSpeed, l._afterZoomIn) : (d.show(), l._afterZoomIn()))
        },
        zoomOut: function () {
            var c = l.wrap,
                b = l.current,
                d;
            "elastic" === b.closeEffect ? ("fixed" === c.css("position") && c.css(l._getPosition(!0)), d = this.getOrigPosition(), b.closeOpacity && (d.opacity = 0), c.animate(d, {
                duration: b.closeSpeed,
                easing: b.closeEasing,
                step: this.step,
                complete: l._afterZoomOut
            })) : c.fadeOut("fade" === b.closeEffect ? b.closeSpeed : 0, l._afterZoomOut)
        },
        changeIn: function () {
            var c = l.wrap,
                b = l.current,
                d;
            "elastic" === b.nextEffect ? (d = l._getPosition(!0), d.opacity = 0, d.top = parseInt(d.top, 10) - 200 + "px", c.css(d).show().animate({
                opacity: 1,
                top: "+=200px"
            }, {
                duration: b.nextSpeed,
                easing: b.nextEasing,
                complete: l._afterZoomIn
            })) : (c.css(l._getPosition()), "fade" === b.nextEffect ? c.hide().fadeIn(b.nextSpeed, l._afterZoomIn) : (c.show(), l._afterZoomIn()))
        },
        changeOut: function () {
            var c = l.wrap,
                b = l.current,
                d = function () {
                    m(this).trigger("onReset").remove()
                };
            c.removeClass("fancybox-opened");
            "elastic" === b.prevEffect ? c.animate({
                opacity: 0,
                top: "+=200px"
            }, {
                duration: b.prevSpeed,
                easing: b.prevEasing,
                complete: d
            }) : c.fadeOut("fade" === b.prevEffect ? b.prevSpeed : 0, d)
        }
    };
    l.helpers.overlay = {
        overlay: null,
        update: function () {
            var c, b;
            this.overlay.width(0).height(0);
            m.browser.msie ? (c = Math.max(q.documentElement.scrollWidth, q.body.scrollWidth), b = Math.max(q.documentElement.offsetWidth, q.body.offsetWidth), c = c < b ? o.width() : c) : c = s.width();
            this.overlay.width(c).height(s.height())
        },
        beforeShow: function (b) {
            this.overlay || (b = m.extend(!0, {
                speedIn: "fast",
                closeClick: !0,
                opacity: 1,
                css: {
                    background: "black"
                }
            }, b), this.overlay = m('<div id="fancybox-overlay"></div>').css(b.css).appendTo("body"), this.update(), b.closeClick && this.overlay.bind("click.fb", l.close), o.bind("resize.fb", m.proxy(this.update, this)), this.overlay.fadeTo(b.speedIn, b.opacity))
        },
        onUpdate: function () {
            this.update()
        },
        afterClose: function (b) {
            this.overlay && this.overlay.fadeOut(b.speedOut || 0, function () {
                m(this).remove()
            });
            this.overlay = null
        }
    };
    l.helpers.title = {
        beforeShow: function (b) {
            var c;
            if (c = l.current.title) {
                c = m('<div class="fancybox-title fancybox-title-' + b.type + '-wrap">' + c + "</div>").appendTo("body"), "float" === b.type && (c.width(c.width()), c.wrapInner('<span class="child"></span>'), l.current.margin[2] += Math.abs(parseInt(c.css("margin-bottom"), 10))), c.appendTo("over" === b.type ? l.inner : "outside" === b.type ? l.wrap : l.outer)
            }
        }
    };
    m.fn.fancybox = function (d) {
        // p();
        var g = m(this),
            b = this.selector || "",
            f, c = function (h) {
                var i = this,
                    j = "rel",
                    k = i[j],
                    n = f;
                !h.ctrlKey && !h.altKey && !h.shiftKey && !h.metaKey && (h.preventDefault(), k || (j = "data-fancybox-group", k = m(i).attr("data-fancybox-group")), k && "" !== k && "nofollow" !== k && (i = b.length ? m(b) : g, i = i.filter("[" + j + '="' + k + '"]'), n = i.index(this)), d.index = n, l.open(i, d))
            }, d = d || {};
        f = d.index || 0;
        b ? s.undelegate(b, "click.fb-start").delegate(b, "click.fb-start", c) : g.unbind("click.fb-start").bind("click.fb-start", c);
        return this
    };

    // function p() {
    //     var c = $(location).attr("pathname");
       
    //     var b = c.match(/(\/photo\/(?:[\da-z-_]+[\/]+|))(\d+)(?:-(\d+)-0-(0|16)-(\d+)|)$/i);
    //     var b1 = c.match(/\/photo(?:\/|\/0-\d+|)$/i);
    //     if (b) {
    //         r.c = parseInt(b[2]);
    //         if (b[3] && b[5]) {
    //             r.o = parseInt(b[5])
    //         }
    //         r.p = b[1];
    //         r.a = b[4];
    //     } else if(b1){
    //         r = 1;
    //     }
    //     else {
    //         r = 0
    //     }
       
    // }
})(window, document, jQuery);
(function (b) {
    var a = b.fancybox;
    a.helpers.buttons = {
        tpl: '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="' + ulb.prev + '" href="javascript:;"></a></li><li><a class="btnPlay" title="' + ulb.btnPlay + '" href="javascript:;"></a></li><li><a class="btnNext" title="' + ulb.next + '" href="javascript:;"></a></li><li><a class="btnToggle" title="' + ulb.btnToggle + '" href="javascript:;"></a></li><li><a class="btnClose" title="' + ulb.closeBtn + '" href="javascript:jQuery.fancybox.close();"></a></li></ul></div>',
        list: null,
        buttons: {},
        update: function () {
            var c = this.buttons.toggle.removeClass("btnDisabled btnToggleOn");
            if (a.current.canShrink) {
                c.addClass("btnToggleOn")
            } else {
                if (!a.current.canExpand) {
                    c.addClass("btnDisabled")
                }
            }
        },
        beforeLoad: function (c) {
            if (a.group.length < 1) {
                a.coming.helpers.buttons = false;
                a.coming.closeBtn = true;
                return
            }
            a.coming.margin[c.position === "bottom" ? 2 : 0] += 30
        },
        onPlayStart: function () {
            if (this.list) {
                this.buttons.play.attr("title", "Pause slideshow").addClass("btnPlayOn")
            }
        },
        onPlayEnd: function () {
            if (this.list) {
                this.buttons.play.attr("title", "Start slideshow").removeClass("btnPlayOn")
            }
        },
        afterShow: function (d) {
            var c;
            if (!this.list) {
                this.list = b(d.tpl || this.tpl).addClass(d.position || "top").appendTo("body");
                this.buttons = {
                    prev: this.list.find(".btnPrev").click(a.prev),
                    next: this.list.find(".btnNext").click(a.next),
                    play: this.list.find(".btnPlay").click(a.play),
                    toggle: this.list.find(".btnToggle").click(a.toggle)
                }
            }
            c = this.buttons;
            if (a.current.index > 0 || a.current.loop) {
                c.prev.removeClass("btnDisabled")
            } else {
                c.prev.addClass("btnDisabled")
            }
            if (a.current.loop || a.current.index < a.group.length - 1) {
                c.next.removeClass("btnDisabled");
                c.play.removeClass("btnDisabled")
            } else {
                c.next.addClass("btnDisabled");
                c.play.addClass("btnDisabled")
            }
            this.update()
        },
        onUpdate: function () {
            this.update()
        },
        beforeClose: function () {
            if (this.list) {
                this.list.remove()
            }
            this.list = null;
            this.buttons = {}
        }
    }
}(jQuery));
var fixedFlag = true;
var openEf = "elastic";
if (($.browser.msie) && ($.browser.version < 10) && (document.compatMode == "BackCompat")) {
    fixedFlag = false;
    openEf = "fade"
}
$(document).ready(function () {
    $(".ulightbox").fancybox({
        padding: 3,
        preload: 5,
        openEffect: openEf,
        closeEffect: "elastic",
        nextEffect: "fade",
        prevEffect: "fade",
        openEasing: "linear",
        nextEasing: "linear",
        prevEasing: "linear",
        fixed: fixedFlag,
        helpers: {
            title: null,
            overlay: {
                opacity: 0.1,
                speedIn: 0,
                speedOut: 0
            },
            buttons: {}
        }
    });
	$(".uphoto .ulightbox").fancybox({
        padding: 3,
        preload: 5,
        openEffect: openEf,
        closeEffect: "elastic",
        nextEffect: "fade",
        prevEffect: "fade",
        openEasing: "linear",
        nextEasing: "linear",
        prevEasing: "linear",
        fixed: fixedFlag,
        beforeShow: function() {
	        var url;
            if (url = $(this.element).data('url')) {
	            this.title = '<a class="ulb-photopage-link" href="' + url + '">' + ulb.photoPage + '</a>';
            }
        },
        helpers: {
            title: {type: 'float'},
            overlay: {
                opacity: 0.1,
                speedIn: 0,
                speedOut: 0
            },
            buttons: {}
        }
    });
    $(window).scroll(function () {
        if (($.browser.msie) && ($.browser.version < 10) && (document.compatMode == "BackCompat")) {
            $.fancybox.reposition();
        }
    })
});

function _bldCont1(id, indx) {
    idarray = "allEntImgs" + id;
    imgar = [];
    for (var i = 0; i < eval(idarray).length; i++) {
        imgar[i] = eval(idarray)[i][0]
    }
    $.fancybox(imgar, {
        index: indx,
        padding: 3,
        preload: 5,
        openEffect: openEf,
        closeEffect: "elastic",
        nextEffect: "fade",
        prevEffect: "fade",
        openEasing: "linear",
        nextEasing: "linear",
        prevEasing: "linear",
        fixed: fixedFlag,
        helpers: {
            title: null,
            overlay: {
                opacity: 0.1,
                speedIn: 0,
                speedOut: 0
            },
            buttons: {}
        }
    })
}
function videoLightbox() {
    if (($.browser.msie) && ($.browser.version < 10) && (document.compatMode == "BackCompat")) {
        $("#videocontent").width($("#videocontent_obj").children().width())
    }
    $("#videocontent").width($(".vep-videocontent").children().width());
    if ($.browser.opera) {
        $(".vep-videocontent").width($(".vep-videocontent").children().width());
        $(".vep-videocontent").height($(".vep-videocontent").children().height())
    }
    $.fancybox({
        href: "#videocontent",
        fitToView: false,
        width: "70%",
        height: "70%",
        autoSize: true,
        closeClick: false,
        openEffect: "none",
        closeEffect: "none",
        padding: 3,
        fixed: fixedFlag,
        afterClose: function () {
            setTimeout($(".vep-videocontent").html(""), 100)
        },
        helpers: {
            title: null,
            overlay: {
                opacity: 0.8,
                speedIn: 0,
                speedOut: 0
            },
            buttons: {}
        }
    })
};