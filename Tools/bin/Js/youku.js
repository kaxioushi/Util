webpackJsonp([3], [
	function(e, t, n) {
		e.exports = n(73)
	}
function(e, t, n) {
    "use strict";
    function c(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(74);
    var i = c(r);
    var s = n(86);
    var o = c(s);
    var u = n(90);
    var a = c(u);
    var f = n(8);
    var l = c(f);
    var h = ["test.comment.youku.com", "video-prepub.youku.com", "video-develop.youku.com", "video-develop.inner.youku.com"].indexOf(window.location.hostname) >= 0;
    o["default"].init({}, {
        page: window.PageConfig,
        appId: "100-DDwODVkv",
        appSecret: window.location.search.indexOf("type=test") > 0 ? "24b556b2e1e8194280173e5d6b4c0875" : "6c4aa6af6560efff5df3c16c704b49f1",
        commentSource: "20000",
        isTestEnv: h
    });
    a["default"].loginFunc = function() {
        l["default"].login()
    }
    ;
    l["default"].bind("login:success", function() {
        a["default"].trigger("login:success")
    });
    new i["default"]({
        el: "#module_basic_comment"
    })
}
, function(e, t, n) {
    "use strict";
    function k(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(41);
    var i = k(r);
    var s = n(25);
    var o = k(s);
    var u = n(18);
    var a = k(u);
    var f = n(75);
    var l = k(f);
    var c = n(76);
    var h = k(c);
    var p = n(77);
    var d = k(p);
    var v = n(84);
    var m = k(v);
    var g = n(95);
    var y = k(g);
    var b = n(111);
    var w = k(b);
    var E = n(116);
    var S = k(E);
    var x = n(86);
    var T = k(x);
    var N = n(90);
    var C = k(N);
    var L = n(117);
    var A = o["default"].compile(L);
    var O = $(window);
    var M = {
        all: 0,
        owner: 1,
        star: 2,
        db: "db",
        my: "mycomment"
    };
    var _ = {
        "频道主说": "owner",
        "豆瓣评论": "db",
        "明星说": "star"
    };
    var D = i["default"].extend({
        hasLoaded: false,
        comstatus: 3e4,
        comstatusNum: 1,
        initialize: function(t) {
            var n = this;
            n.slefext(t);
            n.$el.html(A({
                videoClass: T["default"].globals.videoClass || "",
                isShowVideo: T["default"].globals.page.showid > 0,
                getSpmConfig: function(t) {
                    return T["default"].getCommentTestSpmConfig(t, 0)
                }
            }));
            n.$tabList = $(".comment-tab li", n.$el);
            if (T["default"].check("operate.input")) {
                n.form = new d["default"]({
                    el: "#commentAction",
                    gift: true,
                    submitArgs: n.objectInfo,
                    picUploadId: "comment",
                    faces: {
                        rangeNode: n.$el
                    }
                });
                n.modelEvents(n.form, "form")
            } else {
                $("#commentPublish").remove()
            }
            var r = n.commentList = new y["default"]({
                el: "#videoCommentlist",
                objectInfo: n.objectInfo,
                userPermission: n.userPermission,
                parentModule: n,
                scroll: {
                    scrollTop: function(t) {
                        if (t.is("#videoCommentlist")) {
                            t = $(".comment-area-list", n.$el)
                        }
                        return t.offset().top - 130
                    }
                }
            });
            r.bind("load:before", function() {
                $(".comment-area-list", n.$el).removeClass("comment-list-hasposts")
            }).bind("load:after", function(e, t, i) {
                if (t == 0 && e.comment.length != 0) {
                    $(".comment-new-tooltip", n.$el).hide();
                    if (e.currentPage == 1) {
                        n.lastid = e.comment[0].id;
                        var s = e.comment[0].createTime;
                        var o = new Date(s);
                        var u = new Date;
                        var f = u.getTime() - o.getTime();
                        n.lasttime = parseInt(f / (1e3 * 60 * 60 * 24));
                        $("#allCommentNum").html("(" + a["default"].split(e.totalSize) + ")")
                    }
                } else {
                    n.lasttime = 15
                }
                if (T["default"].check("posts")) {
                    n.hasCommentPager = e.totalPage > 1;
                    n.showPosts = [0, 1].indexOf(t) != -1 && e.currentPage == 1;
                    n.togglePosts()
                }
                if (!T["default"].check("commentOpen") && i != "add" && i != "init") {
                    r.scrollTop(["commentnew", "setTop"].indexOf(i) + 2)
                }
            }).bind("add:after", function() {
                if (!T["default"].check("commentOpen")) {
                    r.scrollTop(2)
                }
            });
            if (T["default"].check("posts")) {
                n.posts = new w["default"]({
                    el: "#videoPostslist .comment-list-body",
                    objectInfo: n.objectInfo,
                    lazyLoad: true
                });
                n.posts.bind("load:after", function(e) {
                    n.hasPostsData = e && e.length > 0;
                    n.togglePosts()
                })
            }
            n.lazyLoad();
            n.commentEgg();
            if (!T["default"].check("commentOpen")) {
                window.goldlog && window.goldlog.record("/yt/ykcomment.play.commentInit", "EXP", "objectId=" + n.objectInfo.objectId, "H1505507056")
            }
        },
        togglePosts: function() {
            var t = this;
            var n = t.$el;
            if (!T["default"].check("posts")) {
                return
            }
            var r = t.showPosts && t.hasPostsData;
            var i = $(".comment-area-list", t.$el);
            i[r ? "addClass" : "removeClass"]("comment-list-hasposts");
            i[!t.hasCommentPager ? "addClass" : "removeClass"]("comment-list-nopager");
            if (i.hasClass("comment-list-hasposts")) {
                t.posts && t.posts.computeContentFold()
            }
            if ($(".comment-list-hot", n).length == 0) {
                $(".comment-list-main .comment-list-head", n)[r ? "show" : "hide"]()
            }
        },
        events: {
            "click .comment-tab li": "tabChange",
            "click .comment-new-tooltip a": "commentNewNotic",
            "click #commentPublish": function() {
                this.scrollForm()
            }
        },
        "{form} submit:success": function(t) {
            var n = this;
            var r = function() {
                if (!t.data) {
                    return false
                }
                n.commentList.add({
                    userName: t.data.userName,
                    userImage: t.data.avatarMiddle,
                    picList: t.picList,
                    content: t.params.content
                })
            };
            var i = n.$tabList.filter('[data-type="all"]');
            if (!i.hasClass("current")) {
                n.$tabList.removeClass("current");
                i.addClass("current");
                n.commentList.load({
                    listType: 0,
                    currentPage: 1
                }, "add", r)
            } else {
                r()
            }
        },
        scrollForm: function() {
            var t = this;
            var n = t.form;
            if (!n) {
                return
            }
            $("html,body").scrollTop(n.$el.offset().top - 130);
            t.form.focus()
        },
        slefext: function(t) {
            var n = this;
            var r = T["default"].globals.page;
            if (r.objectType == undefined) {
                r.objectType = 1
            }
            n.objectInfo = {
                objectId: r.videoId,
                objectType: r.objectType
            };
            n.userPermission = {
                canDelete: (C["default"].uid() || -1) == r.videoOwner,
                canSetTop: false
            };
            C["default"].bind("login:after", function() {
                n.userPermission.canDelete = n.userPermission.canDelete || C["default"].uid() == r.videoOwner
            });
            n.getStarActivity();
            m["default"].switchEnv()
        },
        reset: function(t) {
            var n = this;
            if (t == T["default"].globals.page.videoId) {
                return
            }
            T["default"].globals.page.videoId = t;
            if (!n.hasLoaded) {
                return
            }
            n.objectInfo.objectId = t;
            n.form && n.form.reset(t);
            n.getStarActivity();
            n.commentEgg();
            n.$tabList.filter('[data-type="all"]').click()
        },
        tabChange: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            var i = r.data("type");
            if (i == "input" && n.form) {
                n.scrollForm();
                return
            }
            if (i == "my" && !C["default"].isLogin()) {
                C["default"].login(function() {
                    n.tabChange(t)
                });
                return
            }
            n.$tabList.removeClass("current");
            r.addClass("current");
            n.load(i, 1, "tab")
        },
        lazyLoad: function(t) {
            function i() {
                var e = r.offset().top;
                if (O.scrollTop() + O.height() > e && !n.hasLoaded) {
                    n.init();
                    O.off("scroll.commentControlLazyLoad")
                }
            }
            var n = this;
            var r = n.$el;
            if (!r.length) {
                return
            }
            O.on("scroll.commentControlLazyLoad", function() {
                i()
            });
            i()
        },
        commentNewNotic: function(t) {
            var n = this;
            $(t.currentTarget).parent().hide(200);
            n.load("all", 1, "commentnew");
            n.comstatusNum = 1;
            if (!n.updateCommentTsTimer) {
                n.updateCommentTs()
            }
        },
        getInfo: function() {
            var t = this;
            m["default"].getInfo({
                objectId: t.objectInfo.objectId,
                app: "pc"
            }, function(e) {
                if (e.code == 0) {
                    var n = t.userPermission;
                    n.canDelete = n.canDelete || e.data.pgc;
                    n.canSetTop = n.canSetTop || e.data.pgc || e.data.canSetTop;
                    t.commentList.updateDiffItem()
                }
            })
        },
        getStarActivity: function() {
            var t = this;
            var n = T["default"].globals.page;
            var r = {
                folderid: n.folderId,
                showid: n.showid,
                videoid: n.videoId,
                toppicid: n.catId,
                client: "pc"
            };
            t.dataStore = l["default"].getInstance(r)
        },
        getStarInfo: function() {
            if (!T["default"].check("text.star")) {
                return
            }
            var t = this;
            var n = T["default"].globals.page;
            m["default"].getPersonInfo({
                showId: n.showid || 0,
                app: "pc",
                videoId: n.videoId,
                catId: n.catId || 0
            }, function(e) {
                if (e.code == 0) {
                    t.commentList.starlink = e.data
                }
            })
        },
        load: function(t, n, r) {
            var i = this;
            var s = ["all", "owner"].indexOf(t);
            if (s != -1 && r != "commentnew") {
                i.posts && i.posts.refresh(s)
            }
            i.commentList.load({
                listType: M[t],
                currentPage: n
            }, r)
        },
        commentTabBanner: function P() {
            if (!T["default"].check("tabFixed")) {
                return
            }
            var e = this;
            var t = $(".comment-tab", e.$el);
            var n = e.$tabList.filter('[data-type="input"]');
            var P = {
                satae: "stable",
                tab_innerOffsetTop: false,
                test: function() {
                    var n = parseInt(O.scrollTop());
                    if (!P.tab_innerOffsetTop) {
                        P.tab_innerOffsetTop = t.offset().top - 81
                    }
                    if (n < P.tab_innerOffsetTop) {
                        P.stable()
                    } else {
                        P.fixed()
                    }
                },
                fixed: function() {
                    if (P.satae != "stable") {
                        return
                    }
                    P.satae = "fixed";
                    T["default"].check("operate.input") && n.show();
                    t.addClass("comment-tab-fixed");
                    var r = t.parent().width();
                    if (t.width() != r) {
                        t.css("width", r)
                    }
                    P.tab_innerOffsetTop = t.offset().top - 81
                },
                stable: function() {
                    if (P.satae != "fixed") {
                        return
                    }
                    P.satae = "stable";
                    n.hide();
                    t.removeClass("comment-tab-fixed");
                    P.tab_innerOffsetTop = false
                },
                bindScroll: function() {
                    P.test();
                    O.on("scroll", P.test)
                }
            };
            P.bindScroll()
        },
        loadTab: function() {
            var t = this;
            m["default"].navigationBar({
                app: "pc",
                objectId: t.objectInfo.objectId
            }, function(e) {
                var n = [];
                if (e.code == 0 && e.data.length > 0) {
                    if (T["default"].globals.page.catId == 96) {
                        e.data.push({
                            name: "豆瓣评论"
                        })
                    }
                    n = e.data.map(function(e) {
                        return _[e.name]
                    })
                }
                n.forEach(function(e) {
                    T["default"].check("tab." + e) && t.$tabList.filter('[data-type="' + e + '"]').addClass("comment-show")
                })
            });
            T["default"].check("tab.my", function() {
                t.$tabList.filter('[data-type="my"]').addClass("comment-show")
            })
        },
        updateCommentTs: function() {
            var t = this;
            if (t.lasttime && t.lasttime >= 15) {
                return false
            }
            m["default"].objectCommentStatus({
                app: "pc",
                objectId: t.objectInfo.objectId,
                objectType: t.objectInfo.objectType,
                listType: "0",
                lastCommentId: t.lastid || 0
            }, function(e) {
                if (e.code == 0 && e.data.newCount > 0) {
                    $(".comment-new-tooltip", t.$el).show();
                    clearTimeout(t.updateCommentTsTimer);
                    t.updateCommentTsTimer = null
                }
            });
            t.comstatusNum++;
            if (t.comstatusNum > 10) {
                t.comstatusNum = 10
            }
            clearTimeout(t.updateCommentTsTimer);
            t.updateCommentTsTimer = setTimeout(function() {
                t.updateCommentTs()
            }, t.comstatus * t.comstatusNum)
        },
        commentEgg: function() {
            var t = this;
            if (!T["default"].check("egg") || !t.form) {
                return
            }
            var n = T["default"].globals.page;
            new S["default"]({
                form: t.form,
                params: {
                    client: "pc",
                    folderid: n.folderId,
                    showid: n.showid,
                    videoid: n.videoId,
                    toppicid: n.catId
                }
            })
        },
        init: function() {
            var t = this;
            t.hasLoaded = true;
            C["default"].init();
            t.getInfo();
            t.getStarInfo();
            t.loadTab();
            setTimeout(function() {
                t.updateCommentTs()
            }, t.comstatus);
            t.commentTabBanner();
            setTimeout(function() {
                t.load("all", 1, "init");
                h["default"].init(t.dataStore)
            }, 1e3)
        }
    });
    e.exports = D
}
, function(e, t, n) {
    "use strict";
    function s(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(5);
    var i = s(r);
    var o = void 0;
    var u = i["default"].extend({
        initialize: function(t) {
            var n = this;
            u.superClass.initialize.call(n);
            n.fetch(t)
        },
        get: function(t) {
            if (!this.storage) {
                return null
            }
            return this.storage[t] || null
        },
        fetch: function(t) {
            var n = this;
            var r = $.ajax({
                url: "//cmstool.youku.com/cms/tool/pub/get_putdata.json?securemode=2",
                data: t,
                dataType: "jsonp"
            });
            r.done(function(e) {
                n.storage = e.data
            })
        }
    });
    u.getInstance = function(e) {
        if (o)
            return o;
        else
            return o = new u(e)
    }
    ;
    e.exports = u
}
, function(e, t, n) {
    var r, i;
    "use strict";
    !(r = [n(23)],
    i = function(e) {
        var t = {
            init: function(t) {
                if (!t.storage) {
                    return false
                }
                var n = t.storage.starreview;
                if (n.length > 0) {
                    this.dowhat(n)
                } else {
                    return false
                }
            },
            dowhat: function(t) {
                var n = this;
                for (var r in t) {
                    var i = t[r]["pk_id"];
                    if (i) {
                        var s = this.inputTest(t[r]);
                        if (s < 0) {
                            $("#starCommingPannel_" + i).remove()
                        } else {
                            n.createDOM(t[r], s)
                        }
                    }
                }
            },
            createDOM: function(n, r) {
                var i = '<em class="ico-comstar"></em>';
                var s = n["content"];
                if (r == "inComming") {
                    s = n["content2"]
                } else if (r == "afterComming") {
                    s = n["content3"]
                }
                var o = '<div id = "starCommingPannel_' + n["pk_id"] + '" class="comment-Starhint">' + '<div class="starhint-close" style="display:none;" onclick= "starComming.closeClick(this);"></div>' + "<dl>" + '<dt><a href="//i.youku.com/u/' + e.encodeUid(n["starid"]) + '" target="_blank"><img src="' + n["icon"] + '"></a></dt>' + '<dd><a href="//i.youku.com/u/' + e.encodeUid(n["starid"]) + '" target="_blank">' + n["starname"] + "</a>" + i + "<br><span>" + n["role"] + "</span></dd>" + "</dl>" + '<div class="starhintDetail">' + "<p><span>" + s + "</span></p>" + '<a href="' + n["link"] + '" target="_blank">去看看</a>' + "</div>" + "</div>";
                jQuery("#videocomment").before(o)
            },
            getVIDFromURL: function(n) {
                if (typeof n != "string")
                    return false;
                var r = n.match(/v_show\/id_([\w=]+)(\.*?)/);
                r = r[1] ? e.decode64(r[1].substr(1)) >> 2 : false;
                return r
            },
            inputTest: function(t) {
                var n = -1;
                if (typeof t["pk_id"] == "undefined" || t["pk_id"] == 0) {
                    return -1
                }
                if (typeof t["status"] == "undefined" || t["status"] == 0) {
                    return -1
                }
                var r = t["begintime"] * 1e3;
                var i = t["starbgtime"] * 1e3;
                var s = t["starendtime"] * 1e3;
                var o = t["expiretime"] * 1e3;
                if (r > i || i > s || s > o)
                    return -5;
                var u = (new Date).getTime();
                if (u > o)
                    return -6;
                if (u < r)
                    return -10;
                if (u >= r && u <= i) {
                    n = "beforeComming"
                } else if (u >= i && u < s) {
                    n = "inComming"
                } else if (u >= s && u <= o) {
                    n = "afterComming"
                } else if (u > o) {
                    n = "starCommingOver"
                }
                return n
            }
        };
        return t
    }
    .apply(t, r),
    i !== undefined && (e.exports = i))
}
, function(e, t, n) {
    "use strict";
    function k(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = k(r);
    var s = n(4);
    var o = k(s);
    var u = n(41);
    var a = k(u);
    var f = n(78);
    var l = k(f);
    var c = n(79);
    var h = k(c);
    var p = n(80);
    var d = k(p);
    var v = n(81);
    var m = k(v);
    var g = n(82);
    var y = k(g);
    var b = n(83);
    var w = k(b);
    var E = n(84);
    var S = k(E);
    var x = n(86);
    var T = k(x);
    var N = n(90);
    var C = k(N);
    var L = n(91);
    var A = n(92);
    var O = n(93);
    var M = n(94);
    var _ = i["default"].compile(L);
    var D = i["default"].compile(A);
    var P = i["default"].compile(O);
    var H = i["default"].compile(M);
    var B = {
        objectId: 0,
        objectType: 1,
        flag: 1,
        commentId: 0,
        sourceCommentId: 0
    };
    var j;
    var F = [];
    var I = a["default"].extend({
        initialize: function(t) {
            var n = this;
            n.facesConfig = $.extend({}, {
                rangeNode: null,
                align: "bottom left"
            }, t.faces);
            n.isReply = t.isReply;
            n.parentSubmitArgs = $.extend({}, B, t.submitArgs, {
                picUploadId: t.picUploadId
            });
            var r = C["default"].getUserInfo();
            n.$el.html(_({
                userInfo: r,
                isReply: n.isReply,
                picUpload: T["default"].check("picUpload"),
                picUploadId: t.picUploadId,
                userDomain: T["default"].globals.userDomain,
                getSpmConfig: function(t) {
                    return T["default"].getCommentTestSpmConfig(t, n.parentSubmitArgs.commentId)
                }
            }));
            n.$ta = n.$el.find("textarea");
            new h["default"](n.$ta,81);
            if (!d["default"].isSupport()) {
                new d["default"](n.$ta,n.$ta.attr("placeholder"))
            }
            n.limitTa = new m["default"](n.$ta);
            n.modelEvents(n.limitTa, "ta");
            n.editTa = new l["default"](n.$ta);
            n.submitForm = new w["default"]({
                el: n.$el,
                playmode: parseInt(T["default"].globals.page.playmode)
            });
            n.modelEvents(n.submitForm, "submit");
            n.renderFace();
            n.setVipGrade();
            n.FormContent = "." + t.picUploadId + "FormContent";
            if (T["default"].check("picUpload") && !n.isReply) {
                if (F.length > 0) {
                    if (F.indexOf(t.picUploadId) >= 0) {
                        S["default"].mupload({
                            id: t.picUploadId,
                            num: 0
                        })
                    } else if (F.indexOf("nopic") >= 0) {
                        $(".comment-form .pic_tool", n.$el).remove()
                    } else {
                        n.picflag(t)
                    }
                } else {
                    n.picflag(t)
                }
                if (!r) {
                    $(n.FormContent + " .upload-el").css({
                        left: "-1000px"
                    });
                    $(n.FormContent + " .ui-upload-a").addClass("ui-upload-ative")
                }
            }
            $(document.body).on("click", function(e) {
                var t = $(e.target).closest(".form-toolbar");
                if (n.hasOpenFace && !t.length) {
                    n.closeFace()
                }
            });
            C["default"].bind("login:after", function(e) {
                if (!n.$el || n.$el.length <= 0) {
                    return
                }
                if (!e) {
                    return
                }
                var t = $(".comment-form", n.$el);
                $(".form-user-info", t).html('<a href="' + T["default"].globals.userDomain + e.userCode + '" target="_blank">' + e.userName + "</a>");
                if (!n.isReply) {
                    $(".form-user-avatar", t).length == 0 && t.prepend('<div class="form-cell form-user-avatar"><a href="' + T["default"].globals.userDomain + e.userCode + '" target="_blank"><img title="' + e.userName + '" src="' + e.avatarMiddle + '"></a></div>')
                }
                n.uploadload();
                n.setVipGrade()
            })
        },
        uploadload: function() {
            var t = this;
            $(t.FormContent + " .upload-el").css({
                left: "auto"
            });
            $(t.FormContent + " .ui-upload-a").removeClass("ui-upload-ative")
        },
        picflag: function(t) {
            S["default"].mupload({
                id: t.picUploadId,
                num: 0
            });
            return false
        },
        reset: function(t) {
            this.parentSubmitArgs.objectId = t
        },
        setVipGrade: function() {
            var t = this;
            var n = C["default"].getUserInfo();
            if (!n) {
                return
            }
            t.submitForm.setVipGrade(n);
            if (!t.isReply) {
                var r = $(".form-user-info", t.$el);
                r.find("a:gt(0)").remove();
                var i = r.html();
                r.html(i + H({
                    data: n
                }));
                $(".form-user-avatar img", t.$el).attr("src", n.avatarMiddle)
            }
            if (n.userLevel > 16 || n.vipInfo && n.vipInfo.mmid) {
                t.renderFace(20)
            }
        },
        events: {
            "click .switch_toobar a": "switchFace",
            "click .faces-btn": "openFace",
            "click .time_anchor": "timeAnchor",
            "click .form-btn-submit": "formSubmit",
            "click .faces_con a": "addFace2Ta",
            "click .faces_con p": "addQuickreply",
            "click .form-user-login": "loginRegGuide",
            "click .change_verify_code": "changeVerifyCode",
            "focus textarea": "changeVerifyCodeTime",
            "click .form-btn-cancle": "remove",
            "click .comment-atuser": "focus",
            "mouseenter  .form-textarea-pic .img-item": "mouseePic",
            "mouseleave  .form-textarea-pic .img-item": "mouselPic",
            "click .form-textarea-pic .opacity-dom .pic-icon": "closePic"
        },
        mouseePic: function(t) {
            var n = $(t.currentTarget);
            n.addClass("img-ctive")
        },
        mouselPic: function(t) {
            var n = $(t.currentTarget);
            n.removeClass("img-ctive")
        },
        closePic: function(t) {
            var n = $(t.currentTarget);
            var r = n.closest(".form-content");
            var i = n.closest(".cont-imgbox").find(".cont-imgitem ul li").length - 1;
            if (i <= 0) {
                r.removeClass("form-textarea-pic")
            } else if (i < 9) {
                r.find(".upload-el").css({
                    left: "auto"
                });
                r.find(".ui-upload-a").removeClass("ui-upload-ative")
            }
            n.closest("li").remove()
        },
        focus: function() {
            this.$ta.focus()
        },
        renderFace: function(t, n) {
            var r = this;
            var i = n || r.$el;
            var s = y["default"].all();
            var u = ["万万表情", "泡芙小姐", "暴走漫画"];
            var a = ["默认表情", "快捷回复", "步步惊心", "终极一班", "琅琊榜"];
            var f = C["default"].getUserInfo();
            var l = {
                "万万表情": {
                    name: "万万",
                    img: "//r1.ykimg.com/05100000573C2D3067BC3D740E011788"
                },
                "泡芙小姐": {
                    name: "泡芙",
                    img: "//r1.ykimg.com/05100000573C2D3167BC3D3D0C0B5C07"
                },
                "暴走漫画": {
                    name: "暴走",
                    img: "//r1.ykimg.com/05100000573C2D3067BC3D7402025ABC"
                }
            };
            var c = f && f.vipInfo && f.vipInfo.mmid || t > 16;
            r.isVipx = c;
            i.find(".faces-vip-tool").html(P({
                data: s.data_vip,
                nonVip: l,
                indexList: u,
                isVip: c,
                init: "万万表情"
            }));
            var h = "快捷回复";
            var p = false;
            if (j) {
                h = "";
                p = (0,
                o["default"])("chuda_qheader_spot_dis") != "3"
            }
            i.find(".faces-normal-tool").html(D({
                data: s.data_normal,
                hasNew: p,
                indexList: a,
                init: "默认表情",
                initnone: h,
                setrumors: j
            }))
        },
        remove: function() {
            this.trigger("remove:success", []);
            this.undelegateEvents();
            this.unbind();
            this.$el.remove();
            this.$el = null
        },
        loginRegGuide: function(t) {
            C["default"].login(function() {
                if (typeof t == "function") {
                    t()
                }
            })
        },
        changeVerifyCodeTime: function(t) {
            var n = this;
            if (!n.VerifyCodeTime) {
                n.VerifyCodeTime = true;
                setTimeout(function() {
                    n.VerifyCodeTime = false
                }, 1e4);
                this.changeVerifyCode()
            }
        },
        changeVerifyCode: function(t) {
            t && t.preventDefault();
            var n = this;
            if (n.codeChecking)
                return;
            var r = C["default"].isLogin();
            if (!r) {
                return false
            }
            var i = n.$el.find(".verify_code_img");
            var s = n.$el.find(".verify_code_value");
            var o = n.$el.find(".form-validate");
            n.codeChecking = true;
            S["default"].isNeedVerify({}, function(e) {
                s.val("");
                if (e.code == "0" && e.data) {
                    S["default"].getVerifyCode({}, function(e) {
                        if (e.code == "0") {
                            e.data = JSON.parse(e.data);
                            s.attr("key", e.data.captchaKey);
                            i.attr("src", "data:image/jpeg;base64," + e.data.captchaData)
                        }
                    });
                    o.show();
                    if (!d["default"].isSupport() && $(".ui-placeholder", o).length == 0) {
                        new d["default"](s,s.attr("placeholder"),{
                            top: 22
                        })
                    }
                } else {
                    o.hide()
                }
                n.codeChecking = false
            })
        },
        setRelyName: function(t) {
            var n = this;
            var r = '<div class="comment-atuser">' + t + "</div>";
            n.$el.find(".comment-atuser").remove();
            n.$el.find(".form-textarea").append(r);
            n.currentReply = t;
            n.$el.find(".input-count").html(0);
            n.$ta.val(t);
            n.setCursor(t.length, n.$ta)
        },
        setCursor: function(t, n) {
            var r = n[0];
            t = t || 0;
            var i = i || t;
            try {
                if (r.setSelectionRange) {
                    r.focus();
                    r.setSelectionRange(t, i)
                } else if (r.createTextRange) {
                    var s = r.createTextRange();
                    s.collapse(true);
                    s.moveEnd("character", i);
                    s.moveStart("character", t);
                    s.select()
                }
            } catch (o) {}
        },
        setArgs: function(t) {
            this.submitArgs = $.extend({}, this.parentSubmitArgs, t)
        },
        setface: function() {
            if (!T["default"].check("quickreply")) {
                return
            }
            var t = this;
            var n = T["default"].globals.page;
            var r = [305355, 310282, 305135];
            var i = true;
            for (var s in r) {
                if (r[s] == n.showid) {
                    i = false
                }
            }
            if (i) {
                return false
            }
            if (j) {
                t.renderFace(t.isVipx ? 20 : 0);
                return
            }
            S["default"].quickreply({
                vid: n.videoId,
                pid: n.showid,
                fid: n.folderId,
                uid: n.videoOwner,
                cid: n.catId
            }, function(e) {
                if (e.code == "0") {
                    if (e.data.rumors) {
                        j = e.data.rumors;
                        t.renderFace(t.isVipx ? 20 : 0)
                    }
                }
            })
        },
        formSubmit: function(t) {
            t.preventDefault();
            var n = this;
            n.closeFace();
            var r = n.submitArgs || n.parentSubmitArgs || {};
            if (n.isReply) {
                r.flag = !$(t.currentTarget).closest(".form-toolbar").find(".reply-repeat").prop("checked");
                r.sourceCommentId = !r.flag ? r.commentId : n.parentSubmitArgs.commentId
            }
            this.submitForm.commentNew(r)
        },
        "{submit} success": function(t) {
            this.$ta.val("");
            this.find(".input-count").html(0);
            this.changeVerifyCode();
            this.submitArgs = null;
            this.$el.find(".comment-atuser").remove();
            this.trigger("submit:success", [t])
        },
        "{submit} error": function(t) {
            this.trigger("submit:error", [t]);
            this.changeVerifyCode()
        },
        "{ta} input": function(t, n) {
            var r = this;
            var i = r.$ta.val();
            var s = /^回复 @.*?:/;
            var o = s.exec(i);
            var u = o ? o[0] : null;
            if (r.currentReply && u !== r.currentReply) {
                if (i != "") {
                    r.$ta.val("")
                }
                i = "";
                r.$el.find(".comment-atuser").remove();
                r.currentReply = ""
            }
            t = i.replace(s, "").replace(/(\r\n|\n|\r|\s)/g, "--").length;
            var a = $(".form-wordlimit .input-count", r.$el);
            a[t > n ? "addClass" : "removeClass"]("form-wordlimit-warning");
            a.html(t)
        },
        addFace2Ta: function(t) {
            var n = $(t.currentTarget);
            var r = "[" + n.attr("title") + "]";
            this.editTa.insert(r);
            this.$ta.removeClass("defaultext");
            this.$ta.trigger("input")
        },
        addQuickreply: function(t) {
            var n = $(t.currentTarget);
            var r = n.attr("title");
            this.editTa.insert(r);
            this.$ta.removeClass("defaultext");
            this.$ta.trigger("input");
            (0,
            o["default"])("chuda_qheader_spot_dis", 3, {
                expires: 365
            });
            var i = n.closest(".dropmenu");
            i.find(".chuda_qheader_spot_dis").hide()
        },
        dropmenu: function(t) {},
        closeFace: function() {
            this.$el && this.$el.find(".faces-active").removeClass("faces-active").removeAttr("style").siblings(".faces-content").removeAttr("style");
            this.hasOpenFace = false
        },
        switchFace: function(t) {
            var n = $(t.currentTarget);
            if (n.hasClass("tab_active"))
                return;
            var r = n.parents(".faces-content");
            var i = r.find(".faces");
            var s = r.find('[data-id="' + n.attr("title") + '"]');
            n.addClass("tab_active").siblings().removeClass("tab_active");
            i.hide();
            s.show()
        },
        openFace: function(t) {
            var n = $(t.currentTarget);
            if (n.hasClass("faces-active")) {
                this.closeFace();
                return
            }
            this.closeFace();
            this.hasOpenFace = true;
            var r = n.siblings(".faces-content");
            if (!r.length) {
                return
            }
            n.addClass("faces-active");
            var i = n.outerHeight();
            var s = i - 1.5;
            var o = this.facesConfig;
            var u = {
                top: "top",
                bottom: "top",
                left: "left",
                right: "right"
            };
            var a = {
                top: "bottom",
                bottom: "top",
                left: "right",
                right: "left"
            };
            var f = o.align.split(/\s+/);
            var l = o.rangeNode;
            if (l) {
                var c = n.outerWidth();
                var h = r.outerWidth();
                var p = r.outerHeight();
                var d = n.offset();
                var v = d.top;
                var m = d.left;
                var g = l.offset();
                var y = g.top;
                var b = g.left;
                var w = l.width();
                var E = l.height();
                var S = v - y;
                var x = E - S - i;
                var T = m - b + c;
                var N = w - T + c;
                var C = {
                    top: p,
                    bottom: p,
                    left: h,
                    right: h
                };
                var k = {
                    top: S,
                    bottom: x,
                    left: N,
                    right: T
                };
                f.forEach(function(e, t) {
                    if (k[e] > C[e]) {
                        return
                    }
                    if (k[a[e]] > C[a[e]]) {
                        f[t] = a[e]
                    }
                })
            }
            var L = {
                visibility: "visible"
            };
            L[a[f[0]]] = s;
            L[u[f[1]]] = 0;
            r.css(L);
            n.css("border-" + f[0] + "-color", "transparent")
        }
    });
    e.exports = I
}
, function(e, t, n) {
    "use strict";
    function s(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(6);
    var i = s(r);
    var o = (0,
    i["default"])({
        initialize: function(t) {
            if ($.type(t) == "string")
                t = $(t);
            this.ta1 = t
        },
        getCursor: function() {
            var t = this.ta1[0];
            if (!document.selection)
                return t.selectionStart;
            var n = document.selection.createRange()
              , r = document.body.createTextRange();
            r.moveToElementText(t);
            for (var i = 0; r.compareEndPoints("StartToStart", n) < 0; i++) {
                r.moveStart("character", 1)
            }
            return i
        },
        getSelection: function() {
            var t = this.ta[0], n, r, i;
            if (!document.selection) {
                n = t.selectionStart;
                r = t.selectionEnd;
                return {
                    start: n,
                    end: r,
                    text: t.value.substring(n, r)
                }
            }
            var s = document.selection.createRange()
              , o = document.body.createTextRange();
            o.moveToElementText(t);
            i = s.text;
            if (!i)
                return {
                    start: 0,
                    end: 0,
                    text: ""
                };
            for (n = 0; o.compareEndPoints("StartToStart", s) < 0; n++) {
                o.moveStart("character", 1)
            }
            return {
                start: n,
                end: n + i.length,
                text: i
            }
        },
        setCursor: function(t, n) {
            var r = this.ta1[0];
            t = t || 0;
            n = n || t;
            try {
                if (r.setSelectionRange) {
                    r.focus();
                    r.setSelectionRange(t, n)
                } else if (r.createTextRange) {
                    range = r.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", n);
                    range.moveStart("character", t);
                    range.select()
                }
            } catch (i) {}
        },
        insert: function(t, n) {
            var r = this.ta1[0]
              , i = this.ta1.val();
            n = n !== undefined ? n : this.getCursor(r);
            if (n === undefined)
                n = i.length;
            r.focus();
            if (!document.selection) {
                this.ta1.val(i.substr(0, n) + t + i.substr(n, i.length - n));
                this.setCursor(n + t.length)
            } else {
                var s = document.selection.createRange();
                s.text = t
            }
        }
    });
    e.exports = o
}
, function(e, t, n) {
    "use strict";
    function u(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(5);
    var i = u(r);
    var s = n(25);
    var o = u(s);
    var a = $.support.boxModel && $.support.leadingWhitespace;
    var f = $("<div>");
    var l = i["default"].extend({
        initialize: function(t, n, r) {
            function u(e) {
                f.html(o["default"].helpers.$escape(t.val()).replace(/\n/g, "<br/>&nbsp;"));
                var i = f.height();
                if (t.parent().hasClass("form-textarea-pic")) {
                    n = 168
                } else {
                    n = s
                }
                if (n !== undefined) {
                    i = Math.max(n, i)
                }
                if (r !== undefined) {
                    i = Math.min(r, i)
                }
                t.css("height", i)
            }
            var i = this;
            var s = n;
            l.superClass.initialize.apply(i, arguments);
            $(document.body).append(f);
            f.css({
                position: "absolute",
                "white-space": "pre-wrap",
                top: 0,
                left: "-99999em",
                width: t.width(),
                "font-family": t.css("font-family"),
                "line-height": t.css("line-height"),
                "font-size": t.css("font-size")
            });
            if (n === undefined) {
                n = t.height()
            }
            if (window.addEventListener) {
                t.bind("input", u);
                if (a)
                    t.bind("keydown cut paste", u)
            } else
                t.bind("keydown contextmenu", u)
        }
    });
    e.exports = l
}
, function(e, t, n) {
    "use strict";
    function s(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(5);
    var i = s(r);
    var o = i["default"].extend({
        initialize: function(t, n, r) {
            var i = this;
            o.superClass.initialize.call(this);
            n = n || "";
            r = $.extend({
                left: 4,
                top: 2
            }, r);
            var s = $(t);
            var u = $('<span class="ui-placeholder" data-role="placeholder">' + n + "</span>");
            u.css({
                position: "absolute",
                left: s[0].offsetLeft + r.left,
                top: s[0].offsetTop + r.top
            });
            s.parent().append(u);
            s.focus(function() {
                u.hide()
            }).blur(function() {
                if (s.val() == "") {
                    u.show()
                }
            });
            s.bind("input propertychange", function() {
                u[s.val() == "" ? "show" : "hide"]()
            });
            u.click(function(e) {
                s.focus()
            });
            u[s.val() == "" ? "show" : "hide"]();
            i.input = s;
            i.txt = n;
            i.element = u
        },
        changeTxt: function(t) {
            this.txt = t || "";
            this.element.text(this.txt)
        },
        getTxt: function() {
            return this.txt
        }
    });
    o.isSupport = function() {
        var e = document.createElement("input");
        return "placeholder"in e
    }
    ;
    e.exports = o
}
, function(e, t, n) {
    "use strict";
    function s(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    function u(e, t) {
        var n = t.val();
        e.trigger("input", [n.length, parseInt(t.attr("data-maxlength"))])
    }
    var r = n(5);
    var i = s(r);
    var o = /MSIE 9/i.test(navigator.userAgent);
    var a = i["default"].extend({
        initialize: function(t) {
            var n = this;
            a.superClass.initialize.apply(n, arguments);
            if ($.type(t) == "string") {
                t = $(t)
            }
            if (window.addEventListener) {
                t.bind("input", function() {
                    u(n, t)
                });
                if (o) {
                    t.bind("keydown cut paste", function(e) {
                        switch (e.type) {
                        case "keydown":
                            if (e.keyCode !== 46 && e.keyCode !== 8) {}
                            break;
                        default:
                            setTimeout(function() {
                                u(n, t)
                            }, 0)
                        }
                    })
                }
            } else {
                t.bind("propertychange", function() {
                    u(n, t)
                })
            }
        }
    });
    e.exports = a
}
, function(e, t, n) {
    var r, i;
    "use strict";
    var s = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ;
    !(r = [],
    i = function() {
        function n(e, t) {
            var r = t || {};
            for (var i in e) {
                if (s(e[i]) !== "object") {
                    e[i] && (r[i] = e[i])
                } else {
                    n(e[i], r)
                }
            }
            return r
        }
        var e = {
            data_vip: {
                "万万表情": {
                    "绑架": "w_bangjia",
                    "不赞同": "w_buzantong",
                    "呆怒": "w_dainu",
                    "呆左": "w_daizuo",
                    "呆右": "w_daiyou",
                    "导演": "w_daoyan",
                    "敌视": "w_dishi",
                    "嘟嘴": "w_duzui",
                    "富二代": "w_fuerdai",
                    "鼓掌": "w_guzhang",
                    "交叉腿": "w_jiaochatui",
                    "交叉腿右": "w_jiaochatuiyou",
                    "交叉腿左": "w_jiaochatuizuo",
                    "叫兽": "w_jiaoshou",
                    "抠鼻": "w_koubi",
                    "哭泣": "w_kuqi",
                    "拉链": "w_lalian",
                    "刘备": "w_liubei",
                    "没": "w_mei",
                    "牛逼": "w_niubi",
                    "闪剑": "w_shanjian",
                    "帅": "w_shuai",
                    "挑眉": "w_tiaomei",
                    "呕吐": "w_outu",
                    "吐舌头": "w_tushetou",
                    "悟空": "w_wukong",
                    "香蕉": "w_xiangjiao",
                    "笑": "w_xiao",
                    "疑惑": "w_yiwen",
                    "怨念": "w_yuannian",
                    "大赞": "w_dazan",
                    "主持人": "w_zhuchiren",
                    "紫金钵": "w_zijinbo"
                },
                "泡芙小姐": {
                    "泡芙-拜托": "p_baituobaituo",
                    "泡芙-点赞": "p_dianzan",
                    "泡芙-翻白眼": "p_fanbaiyan",
                    "泡芙-飞吻": "p_feiwen",
                    "泡芙-尴尬": "p_ganga",
                    "泡芙-get": "p_get",
                    "泡芙-鬼脸": "p_guilian",
                    "泡芙-鼓掌": "p_guzhang",
                    "泡芙-好困": "p_haokun",
                    "泡芙-哼": "p_heng",
                    "泡芙-惊讶": "p_jingya",
                    "泡芙-哭笑不得": "p_kuxiaobude",
                    "泡芙-么么哒": "p_memeda",
                    "泡芙-ok": "p_ok",
                    "泡芙-呸": "p_pei",
                    "泡芙-生气": "p_shengqi",
                    "泡芙-挑眉毛": "p_tiaomeimao",
                    "泡芙-偷笑": "p_touxiao",
                    "泡芙-无聊": "p_wuliao",
                    "泡芙-想到点子": "p_xiangdaodianzi",
                    "泡芙-嫌弃": "p_xianqi",
                    "泡芙-喜欢你": "p_xihuani",
                    "泡芙-有鬼": "p_yougui",
                    "泡芙-约吗": "p_yuema"
                },
                "暴走漫画": {
                    "暴走-阿布": "b_abu",
                    "暴走-呵呵": "b_hehe",
                    "暴走-把持不住": "b_bachibuzhu",
                    "暴走-暴走": "b_baozou",
                    "暴走-兵库北": "b_binkubei",
                    "暴走-呆": "b_dai",
                    "暴走-逗我": "b_douwo",
                    "暴走-额": "b_e",
                    "暴走-放弃治疗": "b_fangqizhiliao",
                    "暴走-感累不爱": "b_ganleibuai",
                    "暴走-孤独一生": "b_guduyisheng",
                    "暴走-寒": "b_han",
                    "暴走-基佬": "b_jilao",
                    "暴走-金馆长": "b_jinguanzhang",
                    "暴走-惊": "b_jing",
                    "暴走-毛腿肩上扛": "b_maotuijianshangkang",
                    "暴走-内牛满面": "b_neiniumanmian",
                    "暴走-怕怕": "b_papa",
                    "暴走-软妹纸": "b_ruanmeizhi",
                    "暴走-兔美": "b_tumei",
                    "暴走-膝盖中箭": "b_xigaizhongjian",
                    "暴走-笑cry": "b_xiaocry",
                    "暴走-斜看": "b_xiekan",
                    "暴走-熊孩纸": "b_xionghaizhi",
                    "暴走-熊吉": "b_xiongji",
                    "暴走-姚明": "b_yaoming",
                    "暴走-吔屎": "b_chishi",
                    "暴走-有点意思": "b_youdianyisi",
                    "暴走-赞": "b_zan",
                    "暴走-作死": "b_zuosi"
                }
            },
            data_normal: {
                "默认表情": {
                    "赞": "o1",
                    "稀饭": "o2",
                    "愤怒": "o3",
                    "吐": "o4",
                    "无语": "o5",
                    "难过": "o6",
                    "汗": "o7",
                    "搞笑": "o8",
                    "牛": "o9",
                    "强": "o10"
                },
                "步步惊心": {
                    "八爷暴怒": "bb_bybn",
                    "八爷呵呵": "bb_byhh",
                    "八爷泪流成河": "bb_byllch",
                    "八爷么么哒": "bb_bymmd",
                    "八爷什么鬼": "bb_bysmg",
                    "解树不哭": "bb_jsbk",
                    "解树发怒": "bb_jsfn",
                    "解树好尴尬": "bb_jshgg",
                    "解树花痴": "bb_jshc",
                    "解树震惊了": "bb_jszj",
                    "四爷发飙": "bb_syfb",
                    "四爷害羞了": "bb_syhxl",
                    "四爷黑线": "bb_syhx",
                    "四爷求抱抱": "bb_syqbb",
                    "四爷吻我": "bb_syww"
                },
                "终极一班": {
                    "汪大东_放电": "zj_fangdian",
                    "汪大东_怒": "zj_nu",
                    "雷婷_女王": "zj_nvwang",
                    "雷婷_害羞": "zj_haixiu",
                    "裘球_机智": "zj_qiuqiu",
                    "裘球_萌萌哒": "zj_mmda",
                    "辜战_困": "zj_kun",
                    "辜战_逗我": "zj_douwo",
                    "止戈_花痴": "zj_huachi",
                    "止戈_疑惑": "zj_yihuo",
                    "金宝三_可怜": "zj_kelian",
                    "断肠人_兴奋": "zj_xingfen",
                    "执_扮鬼脸": "zj_zhi",
                    "流尘_汗": "zj_liucheng",
                    "太阳_嘿嘿嘿": "zj_taiyang"
                },
                "极限挑战": {
                    "搞怪": "j_gaoguai",
                    "耍酷": "j_shuaku",
                    "神算子": "j_shensuanzi",
                    "么么哒": "j_memeda",
                    "笑cry": "j_xiaocry",
                    "财迷": "j_caimi",
                    "贱萌": "j_jianmeng",
                    "小猪卖萌": "j_maimeng",
                    "卖萌": "j_maimeng1",
                    "羞涩": "j_xiuse"
                },
                "琅琊榜": {
                    "苏兄看不懂": "l_kanbudong",
                    "苏兄笑cry": "l_xiaocry",
                    "苏兄委屈": "l_weiqu",
                    "苏兄爱你": "l_aini",
                    "苏兄尴尬": "l_ganga",
                    "苏兄么么哒": "l_sumemeda",
                    "苏兄想静静": "l_xiangjingjing",
                    "苏兄拜拜": "l_baibai",
                    "飞流么么哒": "l_memeda",
                    "飞流不开心": "l_bukaixin",
                    "飞流路过": "l_luguo",
                    "飞流最酷": "l_zuiku",
                    "飞流呆呆": "l_daidai",
                    "飞流不哭": "l_buku",
                    "飞流吓死了": "l_xiasi"
                },
                "小丈夫": {
                    "广场舞女王": "x_gcwnw",
                    "老爸不明白": "x_lbbmb",
                    "老妈嫌弃": "x_lmxq",
                    "甜甜拜拜": "x_ttbb",
                    "小贝撩妹": "x_xblm",
                    "小贝么么哒": "x_xbmmd",
                    "小山女王": "x_xsnw",
                    "姚澜不开心": "x_ylbkx",
                    "姚澜女神": "x_ylns",
                    "袁帅怕怕": "x_yspp"
                },
                "快捷回复": {}
            }
        };
        var t = {};
        t = n(e);
        return {
            showFace: function(n) {
                var r = t;
                for (var i in r) {
                    var s = new RegExp("\\[(" + i + ")\\]","g");
                    n = n.replace(s, function(e, t) {
                        return '<span class="gface gface_' + r[t] + '_show" title="' + t + '"></span>'
                    })
                }
                return n
            },
            all: function() {
                return e
            }
        }
    }
    .apply(t, r),
    i !== undefined && (e.exports = i))
}
, function(e, t, n) {
    "use strict";
    function c(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(41);
    var i = c(r);
    var s = n(84);
    var o = c(s);
    var u = n(86);
    var a = c(u);
    var f = n(90);
    var l = c(f);
    var h = {
        0: "发送成功。",
        "-1": "服务器开小差，请稍后在试。",
        "-2": "服务器开小差，请稍后在试。",
        "-3": "服务器开小差，请稍后在试。",
        "-4": "你没有操作权限，有疑问请联系客服400 810 0580",
        "-5": "你的手速太快啦，亲稍后再试",
        "-7": "您的评论含有网站禁止内容，请修改，谢谢！",
        "-8": "内容不能为空。",
        "-9": "请输入验证码",
        "-10": "验证码输入错误，请重新输入。",
        "-11": "请将文字减少到300字以内。",
        "-12": "您还未购买本节目，请购买观看后再发表评论。",
        "-13": "当前视频不存在。",
        "-14": "当前视频被设置为禁止评论。",
        "-20": "试图伪造明星评论被禁止，请重试",
        "-30": "请输入回复内容后再发布",
        "-100": "请先登录。",
        "-400": "您已经发表了该评论，谢谢！",
        "-450": "您的评论含有网站禁止内容，请修改，谢谢！",
        "-130": "当前用户被禁止发布评论。",
        "-131": "当前视频被禁止评论。",
        "-2004": "服务器开小差，请稍后在试。",
        "-2006": "评论内容包含不恰当内容，请修改。",
        "-2007": "你被禁言了，有疑问请联系客服400 810 0580",
        "-2082": "验证码输入错误，请重新输入。",
        "-2008": "该视频禁止评论"
    };
    var p = i["default"].extend({
        initialize: function(t) {
            var n = this;
            n.playmode = t.playmode;
            n.$ta = n.find("textarea")
        },
        events: {},
        checkCommentsContent: function() {
            var t = this;
            var n = $.trim(t.$ta.val());
            var r = t.$el.find(".form-wordlimit .input-count").text();
            if (r == "0") {
                t.showError(h[-8]);
                return false
            }
            var i = n.replace(/^回复 @.*?:/, "").replace(/(\r\n|\n|\r|\s)/g, "--").length;
            if (i < 1 || i > parseInt(t.$ta.data("maxlength"))) {
                t.showError(h[i < 1 ? -8 : -11]);
                return false
            }
            var s = t.$el.find(".form-validate");
            var o = s.find(".verify_code_value").val();
            if (s.css("display") !== "none" && o.length < 3) {
                t.showError(h[-9]);
                return false
            }
            return true
        },
        commentNew: function(t, n) {
            var r = $.extend({}, t);
            var i = this;
            if (!l["default"].isLogin()) {
                l["default"].login(function() {
                    i.commentNew(t)
                });
                return false
            }
            var s = r.commentId || "";
            var u = r.sourceCommentId || "";
            var f = r.objectId || a["default"].globals.page.videoId;
            var c = r.objectType || 1;
            var p = r.picUploadId || "comment";
            var d = r.flag;
            if (!i.checkCommentsContent())
                return false;
            if (i.isSubmiting) {
                i.showError("正在提交！");
                return
            }
            var v = $.trim(i.$ta.val());
            var m = v.replace(/^回复 @.*?[:：]/, "");
            var g = d ? "" : 0;
            var y = i.$el.find(".verify_code_value").val();
            var b = i.$el.find(".verify_code_value").attr("key");
            t = {
                app: "pc",
                objectId: f,
                objectType: c,
                content: m,
                source: a["default"].globals.commentSource
            };
            if (s) {
                t.commentId = s;
                if (g === 0) {
                    t.flag = g
                }
                if (u) {
                    t.sourceCommentId = u
                }
            }
            if (y) {
                t.captchaCode = y;
                t.captchaKey = b
            }
            i.isSubmiting = true;
            var w = $("." + p + "FormContent .cont-imgitem ul li");
            i.picList = [];
            if (w.length > 0) {
                t.picUrl = "";
                w.each(function(e) {
                    if (e < 9) {
                        if (w.length - 1 == e) {
                            t.picUrl += $(this).attr("data-src")
                        } else {
                            t.picUrl += $(this).attr("data-src") + ","
                        }
                        i.picList.push(JSON.parse($(this).attr("data-arr")))
                    }
                })
            }
            setTimeout(function() {
                i.isSubmiting = false
            }, 1e4);
            o["default"].submit(t, function(e) {
                i.isSubmiting = false;
                if (e.code == 0) {
                    e.data = i.data;
                    e.params = t;
                    e.params.content = v;
                    e.picList = i.picList;
                    i.trigger("success", [e]);
                    i.showError(h[0]);
                    w.remove();
                    $("." + p + "FormContent .form-textarea-picdom").removeClass("form-textarea-pic").find("textarea").css({
                        height: "auto"
                    });
                    $("." + p + "FormContent .upload-el").css({
                        left: "auto"
                    });
                    $("." + p + "FormContent .ui-upload-a").removeClass("ui-upload-ative")
                } else if (e.code == -6001) {
                    window.ykPlyr.trigger("authenPhone", ["authenFromComment", {
                        url: e.data.url,
                        wrap: i.find(".comment-form"),
                        cancleCb: function() {
                            i.showError("未绑定手机，发送失败。")
                        },
                        authenCb: function() {}
                    }])
                } else {
                    i.showError(h[e.code] || e.message);
                    i.trigger("error", []);
                    return false
                }
            })
        },
        setVipGrade: function(t) {
            var n = this;
            n.data = t
        },
        showError: function(t) {
            var n = this.$el.find(".form-tooltip");
            n.find(".tips").html(t);
            n.show();
            setTimeout(function() {
                n.fadeOut()
            }, 2e3)
        }
    });
    e.exports = p
}
, function(e, t, n) {
    "use strict";
    function p(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    function g() {
        if (a["default"].globals.isTestEnv) {
            d = "//pre.comments.youku.com";
            m = "//10.25.34.49:8080/int-api";
            v = "//jstest.ykimg.com"
        }
        if (window.location.href.indexOf("type=test") > 0) {
            d = "//ptest.comments.youku.com"
        }
    }
    function b(e) {
        var t = 0;
        var n = e.success;
        var r = e.error;
        delete e.success;
        delete e.error;
        e.success = function(t) {
            if (!t) {
                e.error();
                return
            }
            n && n.apply(this, Array.prototype.slice.call(arguments))
        }
        ;
        e.error = function(n) {
            t++;
            if (t <= 0) {
                $.ajax(e)
            } else {
                r && r.apply(this, Array.prototype.slice.call(arguments))
            }
        }
        ;
        e.cache = typeof e.cache === "undefined" || e.cache;
        if (!e.jsonpCallback && e.dataType.toLocaleLowerCase() == "jsonp") {
            var i = e.url.split("/");
            e.jsonpCallback = "n_" + i[i.length - 1].replace(/[^\w]+/g, "_")
        }
        $.ajax(e)
    }
    function w() {}
    var r = n(85);
    var i = p(r);
    var s = n(4);
    var o = p(s);
    var u = n(86);
    var a = p(u);
    var f = n(87);
    var l = p(f);
    var c = n(89);
    var h = p(c);
    var d = "//p.comments.youku.com";
    var v = "//js.ykimg.com";
    var m = "//api.hdyy.tudou.com";
    var y = function(t) {
        return (0,
        i["default"])(a["default"].globals.appId + "&" + a["default"].globals.appSecret + "&" + t)
    };
    var E = {};
    var S = {
        add: function(t, n) {
            var r = E[t];
            if (!r) {
                r = E[t] = {
                    loading: false,
                    value: null,
                    queue: []
                }
            }
            r.queue.push(n);
            if (r.value) {
                this.run(r)
            }
            return !!(r.loading || r.value)
        },
        run: function(t) {
            t.queue.forEach(function(e) {
                e && e(t.value)
            });
            t.loading = false;
            t.queue = [];
            setTimeout(function() {
                t.value = null
            }, 6e4)
        },
        loading: function(t) {
            E[t] && (E[t].loading = true)
        },
        val: function(t, n) {
            var r = E[t];
            if (r) {
                r.value = n;
                this.run(r)
            }
        }
    };
    var x = {
        submit: function(t, n) {
            try {
                var r = $.ajaxSettings.xhr();
                var i = !!r && "withCredentials"in r;
                if (!i) {
                    h["default"].recordGoldlog("/ykcomment.cmt_submit_type.submitType", {
                        type: window.XDomainRequest ? 1 : 0
                    })
                }
                if (!i && !window.XDomainRequest) {
                    n({
                        code: -99999,
                        message: "您当前浏览器版本过低，请使用更高版本浏览器。"
                    });
                    return
                }
            } catch (s) {}
            b({
                url: d + "/ycp/public/common/add?app=" + t.app + "&sign=" + t.sign + "&time=" + t.time,
                data: t,
                dataType: "json",
                type: "post",
                contentType: "text/plain",
                xhrFields: {
                    withCredentials: true
                },
                success: function(t) {
                    n(t)
                },
                error: function() {
                    n({
                        code: -1
                    })
                }
            })
        },
        commentList: function(t, n) {
            var r = "/ycp/comment/pc/commentList";
            var i = false;
            if (a["default"].isJoinCommentTest() === 1) {
                i = true;
                r = "/ycp/comment/pc/sort/commentList"
            }
            b({
                url: d + r,
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t, i)
                },
                error: function() {
                    n({
                        code: -1
                    })
                }
            })
        },
        getDbComment: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/getDbComment",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        replyList: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/replyList",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        setTop: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/setTop",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getInfo: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/getInfo",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        objectCommentStatus: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/objectCommentStatus",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        navigationBar: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/navigationBar",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getPersonInfo: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/getPersonInfo",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    if (t && t.data && t.data.length > 0) {
                        var r = {};
                        t.data.forEach(function(e) {
                            for (var t in e) {
                                r[t] = e[t]
                            }
                        });
                        t.data = r
                    }
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getUserComment: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/getUserComment",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        updown: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/updown?utdid=" + (0,
                o["default"])("juid"),
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        deleted: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/delete",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        tipOffNew: function(t, n) {
            b({
                url: d + "/ycp/tipOffNew.srv",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        isNeedVerify: function(t, n) {
            b({
                url: d + "/ycp/public/verify/isNeedVerify",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getVerifyCode: function(t, n) {
            b({
                url: d + "/ycp/public/verify/getVerifyCode",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        checkVerifyCode: function(t, n) {
            b({
                url: d + "/ycp/public/verify/checkVerifyCode",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getPicFlag: function(t, n) {
            b({
                url: d + "/ycp/public/common/getPicFlag.action",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        mupload: function(t) {
            l["default"].mupload(t, d, v)
        },
        quickreply: function(t, n) {
            b({
                url: m + "/hd/api/comments/quickreply",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getPosts: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/postList",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getPostsContent: function(t, n) {
            b({
                url: d + "/ycp/comment/pc/getPostInfo",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getUserInfo: function(t, n) {
            var r = "login_getuserinfo";
            var i = S.add(r, n);
            if (i) {
                return
            }
            S.loading(r);
            b({
                url: d + "/ycp/public/common/getUserInfo",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    S.val(r, t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        getActivityInfo: function(t, n) {
            b({
                url: d + "/ycp/public/common/getActivityRole",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        },
        addActivityName: function(t, n) {
            b({
                url: d + "/ycp/public/common/addActName",
                data: t,
                dataType: "jsonp",
                jsonp: "jsoncallback",
                success: function(t) {
                    n && n(t)
                },
                error: function(t) {
                    n({
                        code: -1
                    })
                }
            })
        }
    };
    var T = {
        web_cms_module_pv: function(t, n) {
            b({
                url: "//p.l.youku.com/web_cms_module_pv",
                data: t,
                dataType: "jsonp",
                jsonp: "__callback",
                success: function(t) {
                    n(t)
                }
            })
        },
        hasGiftForComment: function(t, n) {
            b({
                url: "//www.youku.com/QVideo/~ajax/hasGiftForComment",
                dataType: "jsonp",
                jsonp: "__callback",
                data: {
                    __ap: JSON.stringify(t)
                },
                success: function(t) {
                    n(t)
                }
            })
        },
        getUinfo: function(t) {
            var n = "login_getuinfo";
            var r = S.add(n, t);
            if (r) {
                return
            }
            S.loading(n);
            b({
                url: "//lv.youku.com/api/grade/get_uinfo",
                dataType: "jsonp",
                success: function(t) {
                    S.val(n, t)
                }
            })
        },
        show_valid: function(t) {
            var n = "show_valid";
            var r = S.add(n, t);
            if (r) {
                return
            }
            S.loading(n);
            b({
                url: "http://vip.youku.com/member/show_valid_member.jsonp?version=2",
                dataType: "jsonp",
                success: function(t) {
                    S.val(n, t)
                }
            })
        }
    };
    var N = {
        load: b,
        createCrossIframe: w,
        switchEnv: g
    };
    for (var C in x) {
        if (!$.isFunction(x[C])) {
            continue
        }
        (function(e) {
            N[e] = function(t, n) {
                if (!t) {
                    t = {}
                }
                if ($.isFunction(t)) {
                    n = t;
                    t = {}
                }
                var r = ~~(Date.now() / 1e3);
                t.app = a["default"].globals.appId;
                t.sign = y(r);
                t.time = r;
                return x[e](t, n)
            }
        }
        )(C)
    }
    $.extend(N, T);
    e.exports = N
}
, function(e, t, n) {
    var r;
    "use strict";
    !(r = function() {
        function e(e, t) {
            var o = e[0]
              , u = e[1]
              , a = e[2]
              , f = e[3];
            o = n(o, u, a, f, t[0], 7, -680876936);
            f = n(f, o, u, a, t[1], 12, -389564586);
            a = n(a, f, o, u, t[2], 17, 606105819);
            u = n(u, a, f, o, t[3], 22, -1044525330);
            o = n(o, u, a, f, t[4], 7, -176418897);
            f = n(f, o, u, a, t[5], 12, 1200080426);
            a = n(a, f, o, u, t[6], 17, -1473231341);
            u = n(u, a, f, o, t[7], 22, -45705983);
            o = n(o, u, a, f, t[8], 7, 1770035416);
            f = n(f, o, u, a, t[9], 12, -1958414417);
            a = n(a, f, o, u, t[10], 17, -42063);
            u = n(u, a, f, o, t[11], 22, -1990404162);
            o = n(o, u, a, f, t[12], 7, 1804603682);
            f = n(f, o, u, a, t[13], 12, -40341101);
            a = n(a, f, o, u, t[14], 17, -1502002290);
            u = n(u, a, f, o, t[15], 22, 1236535329);
            o = r(o, u, a, f, t[1], 5, -165796510);
            f = r(f, o, u, a, t[6], 9, -1069501632);
            a = r(a, f, o, u, t[11], 14, 643717713);
            u = r(u, a, f, o, t[0], 20, -373897302);
            o = r(o, u, a, f, t[5], 5, -701558691);
            f = r(f, o, u, a, t[10], 9, 38016083);
            a = r(a, f, o, u, t[15], 14, -660478335);
            u = r(u, a, f, o, t[4], 20, -405537848);
            o = r(o, u, a, f, t[9], 5, 568446438);
            f = r(f, o, u, a, t[14], 9, -1019803690);
            a = r(a, f, o, u, t[3], 14, -187363961);
            u = r(u, a, f, o, t[8], 20, 1163531501);
            o = r(o, u, a, f, t[13], 5, -1444681467);
            f = r(f, o, u, a, t[2], 9, -51403784);
            a = r(a, f, o, u, t[7], 14, 1735328473);
            u = r(u, a, f, o, t[12], 20, -1926607734);
            o = i(o, u, a, f, t[5], 4, -378558);
            f = i(f, o, u, a, t[8], 11, -2022574463);
            a = i(a, f, o, u, t[11], 16, 1839030562);
            u = i(u, a, f, o, t[14], 23, -35309556);
            o = i(o, u, a, f, t[1], 4, -1530992060);
            f = i(f, o, u, a, t[4], 11, 1272893353);
            a = i(a, f, o, u, t[7], 16, -155497632);
            u = i(u, a, f, o, t[10], 23, -1094730640);
            o = i(o, u, a, f, t[13], 4, 681279174);
            f = i(f, o, u, a, t[0], 11, -358537222);
            a = i(a, f, o, u, t[3], 16, -722521979);
            u = i(u, a, f, o, t[6], 23, 76029189);
            o = i(o, u, a, f, t[9], 4, -640364487);
            f = i(f, o, u, a, t[12], 11, -421815835);
            a = i(a, f, o, u, t[15], 16, 530742520);
            u = i(u, a, f, o, t[2], 23, -995338651);
            o = s(o, u, a, f, t[0], 6, -198630844);
            f = s(f, o, u, a, t[7], 10, 1126891415);
            a = s(a, f, o, u, t[14], 15, -1416354905);
            u = s(u, a, f, o, t[5], 21, -57434055);
            o = s(o, u, a, f, t[12], 6, 1700485571);
            f = s(f, o, u, a, t[3], 10, -1894986606);
            a = s(a, f, o, u, t[10], 15, -1051523);
            u = s(u, a, f, o, t[1], 21, -2054922799);
            o = s(o, u, a, f, t[8], 6, 1873313359);
            f = s(f, o, u, a, t[15], 10, -30611744);
            a = s(a, f, o, u, t[6], 15, -1560198380);
            u = s(u, a, f, o, t[13], 21, 1309151649);
            o = s(o, u, a, f, t[4], 6, -145523070);
            f = s(f, o, u, a, t[11], 10, -1120210379);
            a = s(a, f, o, u, t[2], 15, 718787259);
            u = s(u, a, f, o, t[9], 21, -343485551);
            e[0] = h(o, e[0]);
            e[1] = h(u, e[1]);
            e[2] = h(a, e[2]);
            e[3] = h(f, e[3])
        }
        function t(e, t, n, r, i, s) {
            t = h(h(t, e), h(r, s));
            return h(t << i | t >>> 32 - i, n)
        }
        function n(e, n, r, i, s, o, u) {
            return t(n & r | ~n & i, e, n, s, o, u)
        }
        function r(e, n, r, i, s, o, u) {
            return t(n & i | r & ~i, e, n, s, o, u)
        }
        function i(e, n, r, i, s, o, u) {
            return t(n ^ r ^ i, e, n, s, o, u)
        }
        function s(e, n, r, i, s, o, u) {
            return t(r ^ (n | ~i), e, n, s, o, u)
        }
        function o(t) {
            if (/[\x80-\xFF]/.test(t)) {
                t = unescape(encodeURI(t))
            }
            txt = "";
            var n = t.length, r = [1732584193, -271733879, -1732584194, 271733878], i;
            for (i = 64; i <= t.length; i += 64) {
                e(r, u(t.substring(i - 64, i)))
            }
            t = t.substring(i - 64);
            var s = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (i = 0; i < t.length; i++) {
                s[i >> 2] |= t.charCodeAt(i) << (i % 4 << 3)
            }
            s[i >> 2] |= 128 << (i % 4 << 3);
            if (i > 55) {
                e(r, s);
                for (i = 0; i < 16; i++) {
                    s[i] = 0
                }
            }
            s[14] = n * 8;
            e(r, s);
            return r
        }
        function u(e) {
            var t = [], n;
            for (n = 0; n < 64; n += 4) {
                t[n >> 2] = e.charCodeAt(n) + (e.charCodeAt(n + 1) << 8) + (e.charCodeAt(n + 2) << 16) + (e.charCodeAt(n + 3) << 24)
            }
            return t
        }
        function f(e) {
            var t = ""
              , n = 0;
            for (; n < 4; n++) {
                t += a[e >> n * 8 + 4 & 15] + a[e >> n * 8 & 15]
            }
            return t
        }
        function l(e) {
            for (var t = 0; t < e.length; t++) {
                e[t] = f(e[t])
            }
            return e.join("")
        }
        function c(e) {
            return l(o(e))
        }
        function h(e, t) {
            return e + t & 4294967295
        }
        var a = "0123456789abcdef".split("");
        return c
    }
    .call(t, n, t, e),
    r !== undefined && (e.exports = r))
}
, function(e, t) {
    "use strict";
    var n = {
        commentOpen: false,
        tabFixed: true,
        posts: true,
        tab: {
            my: true,
            hot: true,
            db: true,
            owner: true,
            star: true
        },
        text: {
            hotComment: true,
            at: true,
            ht: true,
            star: true
        },
        operate: {
            reply: true,
            input: true,
            top: true,
            inform: true
        },
        egg: true,
        quickreply: true,
        gift: true,
        picUpload: false
    };
    var r = {
        globals: {
            userDomain: "//i.youku.com/i/"
        },
        init: function(t, r) {
            $.extend(true, n, t);
            $.extend(true, this.globals, r)
        },
        check: function(t, r, i) {
            if (arguments.length == 1) {
                r = t;
                t = true
            } else if (arguments.length == 2 && $.isFunction(r)) {
                i = r;
                r = t;
                t = true
            }
            if (!t) {
                return false
            }
            var s = r.split(".");
            var o = n[s[0]];
            if (!o) {
                return false
            }
            if (s.length > 1 && !o[s[1]]) {
                return false
            }
            $.isFunction(i) && i();
            return true
        },
        isJoinCommentTest: function() {
            if (["307775"].indexOf(this.globals.page.showid) === -1) {
                return false
            }
            return 2
        },
        getCommentTestSpmConfig: function(t, n, r) {
            var i = this.isJoinCommentTest();
            if (i === false) {
                return ""
            }
            if (t == "comment") {
                return "data-spm=comment" + i
            }
            var s = $.extend({
                type: t,
                showid: this.globals.page.showid,
                videocode: this.globals.page.videoId2
            }, r);
            return "data-spm-click=gostr=/yt/ykcomment.play.commentNewAlgorithm;locaid=d" + t + "_" + n + ";" + $.param(s)
        }
    };
    e.exports = r
}
, function(e, t, n) {
    var r, i;
    "use strict";
    !(r = [n(88)],
    i = function(e) {
        var t = {
            uploadst: [],
            errpic: 0,
            mupload: function(n, r, i) {
                var s = this;
                var o = "." + n.id + "FormContent";
                var u = new e["flash"]($("#" + n.id + n.num)[0],{
                    action: r + "/ycp/public/common/uploadPic",
                    mode: "flash",
                    name: "imageFiles",
                    multiple: true,
                    auto: false,
                    swf: i + "/youku/dist/embed/swf/uploader.swf",
                    preview: true,
                    showQueue: "#" + n.id + "imgitem ul",
                    fileSizeLimit: "5M",
                    fileTypeDesc: "选择图片文件",
                    fileTypeExts: "jpg,jpeg,gif,png",
                    onInit: function(t) {},
                    onSelected: function(t) {
                        $(o + " .form-textarea-picdom").addClass("form-textarea-pic");
                        if (s.uploadst.indexOf(n.id) < 0) {
                            s.uploadst.push(n.id);
                            s.mupload({
                                id: n.id,
                                num: 1
                            }, r, i)
                        }
                        $(o + " .cont-imgupload").show();
                        setTimeout(function() {
                            u.start()
                        }, 1e3);
                        s.uploadAuto(o, 1e3)
                    },
                    onCancel: function(t) {},
                    onStart: function(t) {},
                    onProgress: function(t) {},
                    onError: function(t) {
                        setTimeout(function() {
                            $(o + " .cont-imgitem li").each(function(e) {
                                if ($(this).attr("data-id") == t.file.name + "_" + t.file.id) {
                                    $(this).remove()
                                }
                            });
                            s.showError(o, t.message);
                            s.uploadAuto(o)
                        }, 1e3)
                    },
                    onSuccess: function(t) {
                        var n = JSON.parse(t.data);
                        if (n.code == 0) {
                            $(o + " .cont-imgitem li").each(function(e) {
                                if ($(this).attr("data-id") == t.file.name + "_" + t.file.id) {
                                    $(this).addClass("img-itemload").attr({
                                        "data-src": n.data[0].picUrl,
                                        "data-arr": JSON.stringify(n.data[0])
                                    });
                                    $(this).find(".picbox img").attr("src", n.data[0].picUrl + "?x-oss-process=image/format,jpg/resize,m_fill,h_100,w_100")
                                }
                            })
                        } else {
                            $(o + " .cont-imgitem li").each(function(e) {
                                if ($(this).attr("data-id") == t.file.name + "_" + t.file.id) {
                                    $(this).remove()
                                }
                            });
                            if (n.code == -3008) {
                                s.showError(o, "您选择的图片尺寸太小，请上传质量更高的图片")
                            } else {
                                s.showError(o, n.message)
                            }
                        }
                    },
                    onComplete: function(t) {},
                    onAllComplete: function(t) {
                        s.uploadAuto(o);
                        if ($(o + " .cont-imgitem ul li").length > 9) {
                            s.showError(o, "上传的文件已经超过9张，发表只会取前9张！");
                            s.uploadAuto(o, 1e3)
                        } else if ($(o + " .cont-imgitem ul li").length >= 9) {
                            s.uploadAuto(o, 1e3)
                        }
                    },
                    onClearQueue: function() {}
                })
            },
            uploadAuto: function(t, n) {
                if (n == 1e3) {
                    $(t + " .upload-el").css({
                        left: "-1000px"
                    });
                    $(t + " .ui-upload-a").addClass("ui-upload-ative")
                } else {
                    $(t + " .upload-el").css({
                        left: "auto"
                    });
                    $(t + " .ui-upload-a").removeClass("ui-upload-ative")
                }
            },
            showError: function(t, n) {
                var r = $(t).find(".form-tooltip");
                r.find(".tips").html(n);
                r.show();
                setTimeout(function() {
                    r.fadeOut()
                }, 2e3)
            }
        };
        return t
    }
    .apply(t, r),
    i !== undefined && (e.exports = i))
}
, function(e, t, n) {
    var r;
    "use strict";
    var i = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ;
    !(r = function() {
        function f(e) {
            var t = -1;
            if (e) {
                do {
                    e = e / 1024;
                    t++
                } while (e > 1024)
            } else {
                t++;
                e = 0
            }
            return e.toFixed(2) + ["KB", "M", "G", "T"][t]
        }
        function l(e) {
            var t = {
                k: 1024,
                m: 1048576,
                g: 1073741824
            }, n;
            if (typeof e === "string") {
                n = /([0-9\.]+)([mgk])/.exec(e.toLowerCase());
                e = +n[1];
                e *= t[n[2]]
            }
            return e
        }
        function c(e, t) {
            var n = e.length, r, i;
            if (n > t) {
                i = 4 + 1 + (n - e.lastIndexOf(".") - 1);
                r = t - i - 3;
                if (r % 2)
                    r -= 1;
                e = e.substr(0, r) + "..." + e.substr(-i)
            }
            return e
        }
        function h(e) {
            if (!e)
                return "";
            if ((typeof e === "undefined" ? "undefined" : i(e)) === "object") {
                return $.extend(s, e)
            }
            var t = s[e] || e
              , n = arguments;
            if (n.length > 1) {
                for (var r = 1, o = n.length; r < o; r++) {
                    t = t.replace("{" + r + "}", n[r])
                }
            }
            return t
        }
        var e = "uploader"
          , t = e + Math.random() * 1e17
          , n = $.noop
          , r = {
            mode: "html5",
            action: "",
            name: "file",
            formData: null,
            multiple: false,
            auto: true,
            showQueue: false,
            fileSizeLimit: 0,
            fileTypeDesc: "",
            fileTypeExts: "",
            maxChunkSize: 512 * 1e3,
            maxConnections: 2,
            preview: false,
            num: 1e3,
            onInit: n,
            onClearQueue: n,
            onSelected: n,
            onCancel: n,
            onError: n,
            onStart: n,
            onProgress: n,
            onSuccess: n,
            onComplete: n,
            onAllComplete: n,
            onMouseOver: n,
            onMouseOut: n,
            onMouseClick: n,
            onAddQueue: function(t, n) {
                var r = '<li data-id="' + t.name + "_" + t.id + '"><div class="img-item">';
                if (this.options.preview) {
                    r += '<a href="javascript:;"  class="f-preview picbox ' + this.id + "_preview_" + t.id + '"><img src="http://oss-comments.youku.com/pic/35ND0vgl/1481541888456.png"></a>'
                }
                r += '<div class="opacity-dom"><a href="javascript:;" class="pic-icon">x</a></div>' + '<div class="img-load "><img src="http://oss-comments.youku.com/pic/WObxvPcs/1481541857541.gif"><div class="f-progress-bg"></div></div>' + "</div></li>";
                return r
            }
        }
          , s = {
            600: "Installation error",
            601: 'Please select "{1}" format file',
            602: "The file size must be less than {1}"
        }
          , o = {};
        (function(e) {
            var t = e.split(/,/), n, r, i;
            for (n = 0; n < t.length; n += 2) {
                i = t[n + 1].split(/ /);
                for (r = 0; r < i.length; r++) {
                    o[i[r]] = t[n]
                }
            }
        }
        )("image/x-icon,ico," + "image/bmp,bmp," + "image/gif,gif," + "image/jpeg,jpeg jpg jpe," + "image/photoshop,psd," + "image/png,png," + "image/svg+xml,svg svgz," + "image/tiff,tiff tif," + "text/plain,asc txt text diff log," + "text/html,htm html xhtml," + "text/xml,xml," + "text/css,css," + "text/csv,csv," + "text/rtf,rtf," + "audio/mpeg,mpga mpega mp2 mp3," + "audio/x-wav,wav," + "audio/mp4,m4a," + "audio/ogg,oga," + "audio/webm,webma," + "video/mpeg,mpeg mpg mpe," + "video/quicktime,qt mov," + "video/mp4,mp4," + "video/x-m4v,m4v," + "video/x-flv,flv," + "video/x-ms-wmv,wmv," + "video/avi,avi," + "video/ogg,ogv," + "video/webm,webmv," + "video/vnd.rn-realvideo,rv," + "application/msword,doc dot," + "application/pdf,pdf," + "application/pgp-signature,pgp," + "application/postscript,ps ai eps," + "application/rtf,rtf," + "application/vnd.ms-excel,xls xlb," + "application/vnd.ms-powerpoint,ppt pps pot," + "application/zip,zip," + "application/x-rar-compressed,rar," + "application/x-shockwave-flash,swf swfl," + "application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx," + "application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx," + "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx," + "application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx," + "application/vnd.openxmlformats-officedocument.presentationml.template,potx," + "application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx," + "application/x-javascript,js," + "application/json,json," + "application/java-archive,jar war ear," + "application/vnd.oasis.opendocument.formula-template,otf," + "application/octet-stream,exe");
        var u = function() {};
        u.extend = function(e) {
            var t = this.prototype, n, r, i, s = t, o;
            if (typeof e === "function")
                e = e.call(t);
            i = e.__construct;
            while (!i) {
                i = s.constructor;
                s = s.__super()
            }
            r = new this("!-");
            for (o in e) {
                r[o] = e[o]
            }
            n = function() {
                if (arguments[0] !== "!-")
                    i.apply(this, arguments)
            }
            ;
            r.constructor = n;
            r.__super = function(e, n) {
                return e ? t[e].apply(this, n ? n : arguments.callee.caller.arguments) : t
            }
            ;
            n.prototype = r;
            n.extend = arguments.callee;
            return n
        }
        ;
        var a = u.extend(function() {
            function n(e, t, n) {
                var r = t === "progress", i;
                if (e && e.timeStamp) {
                    i = e.timeStamp;
                    if (String(i).length > 13) {
                        i = +String(i).substr(0, 13)
                    }
                } else {
                    i = +(new Date)
                }
                this.timeStamp = i;
                this.type = t;
                this.loaded = r ? e.loaded : 0;
                this.total = r ? e.total : 0;
                this.lengthComputable = r ? e.lengthComputable : false;
                this.file = n || e.file;
                if (r)
                    this.originalEvent = e;
                if (e.data)
                    this.data = e.data
            }
            function r(e, t) {
                this.id = e;
                this.name = t.name;
                this.size = t.size;
                this.type = !t.type ? o[t.name.split(".").pop()] : t.type.length < 6 ? o[t.type] : t.type;
                this.lastModifiedDate = new Date(+t.lastModifiedDate);
                this.originalFile = t;
                if (t.error)
                    this.error = t.error
            }
            function s(e) {
                var t = e.code || +e.message
                  , n = {
                    600: "Installation Error",
                    601: "Type Error",
                    602: "Size Error"
                };
                if (t) {
                    this.code = t;
                    e.name = e.name || n[t] || "HTTP Error";
                    e.message = e.message || t
                }
                if (e.file) {
                    this.file = e.file
                }
                this.type = "error";
                this.name = h(e.name || "Error");
                this.message = e.params ? h.apply(null, [e.message].concat(e.params)) : h(e.message)
            }
            function u(e) {
                var t = this.queue
                  , n = t.length;
                while (n--) {
                    if (t[n].id === e)
                        return t[n]
                }
            }
            function c(e) {
                var t = e.substr(e.lastIndexOf(".") + 1).toLowerCase();
                return this.acceptExts[t]
            }
            function p(e, t) {
                return f(e * 1e3 / t) + "/s"
            }
            function d(e, t) {
                var n = $("." + this.id + "_preview_" + e.id).parent()
                  , r = n.find(".f-progress-bg");
                r.animate({
                    width: t
                }, 200);
                n.find(".f-progress").text(t)
            }
            return {
                __construct: function(r, i) {
                    var s = r[t], o = e + "_", u;
                    if (s !== undefined) {
                        o += s;
                        u = window[o];
                        u && u.destroy()
                    } else {
                        s = a.guid++;
                        o += s;
                        r[t] = s
                    }
                    this.id = o;
                    this.options = $.extend({}, a.defaults, i);
                    this.element = r;
                    this.init();
                    window[o] = this
                },
                init: function() {
                    var t = this
                      , n = $(t.element)
                      , r = t.options
                      , i = n.outerWidth()
                      , s = n.outerHeight()
                      , o = "width:" + i + "px;height:" + s + "px;"
                      , u = "z-index:" + n.css("z-index") + ";"
                      , a = "margin:0;padding:0;border:0;cursor:pointer;font-size:200px;filter:alpha(opacity=0);opacity:0;";
                    if (r.showQueue) {
                        if (typeof r.showQueue === "string") {
                            t.$queue = $(r.showQueue).addClass("upload-queue")
                        } else {
                            n.after('<div class="upload-queue" id="' + t.id + '_queue"></div>');
                            t.$queue = $("#" + t.id + "_queue")
                        }
                        if (r.preview)
                            t.$queue.addClass("upload-preview")
                    }
                    var f = n.css("left")
                      , l = n.css("top")
                      , c = n.css("margin-left")
                      , h = n.css("margin-top");
                    if (n.css("position") === "absolute") {
                        u += "left:" + f + ";top:" + l + ";margin-left:" + c + ";margin-top:" + h + ";"
                    } else {
                        u += "margin-left:-" + (i + (0 ^ parseInt(n.css("margin-right"))) + 0 ^ parseInt(f)) + "px;";
                        u += "margin-top:" + (0 ^ parseInt(h) + 0 ^ parseInt(l)) + "px;"
                    }
                    t.$browseEl = $('<span class="upload-el" style="position:absolute;overflow:hidden;' + o + u + '">' + t.create(a + o) + "</span>");
                    n.after(t.$browseEl);
                    t.$el = n;
                    t.browse = $("#" + t.id)[0];
                    t.queue = [];
                    t.loadIndex = -1;
                    t.acceptExts = function(e) {
                        if (e === "*")
                            return e;
                        var t = {};
                        $.each(e.split("|").join(",").split(","), function(e, n) {
                            t[n] = 1
                        });
                        return t
                    }(r.fileTypeExts);
                    r.onInit.call(t)
                },
                setOption: function(t, n) {
                    var r = this.options;
                    if (typeof t === "string") {
                        r[t] = n
                    } else if ((typeof t === "undefined" ? "undefined" : i(t)) === "object") {
                        $.extend(r, t)
                    }
                },
                start: function() {
                    var t = this, n = t.queue.length, r;
                    t.loadIndex++;
                    if (t.loadCount === n) {
                        t.onAllComplete()
                    } else if (t.loadIndex < n) {
                        r = t.queue[t.loadIndex];
                        if (r.error || r.abort) {
                            t.start()
                        } else {
                            t.upload(r)
                        }
                    }
                },
                remove: function(t) {
                    if (this.$queue)
                        $("#" + this.id + "___" + t).delay(1e3).fadeOut(500).remove()
                },
                destroy: function() {
                    this.$browseEl && this.$browseEl.remove();
                    this.$queue && this.$queue.remove();
                    delete window[this.id]
                },
                getFile: function(t) {
                    return this.validId(t) ? this.files[t] : null
                },
                validId: function(t) {
                    var n = this.queue.length;
                    while (n--) {
                        if (this.queue[n].id === t)
                            return true
                    }
                },
                getDataURL: function(t) {
                    var n = this;
                    if (window.File && t instanceof File) {
                        if (window.FileReader) {
                            var r = new FileReader;
                            r.onload = function(e) {
                                t.dataURL = this.result;
                                n.setPreview(t)
                            }
                            ;
                            r.readAsDataURL(t)
                        }
                    } else if (t.dataURL && /^data:.*;base64/i.test(t.dataURL)) {
                        n.setPreview(t)
                    }
                },
                setPreview: function(t) {
                    var n = this
                      , r = n.options;
                    $("." + this.id + "_preview_" + t.id).last().html('<img src="' + t.dataURL + '">')
                },
                onSelected: function(t) {
                    var n = this, i = n.options, o, u = i.fileTypeExts.split("|").join(","), a = l(i.fileSizeLimit);
                    n.queue = [];
                    n.files = {};
                    n.loadIndex = -1;
                    n.loadCount = 0;
                    $.each(t, function(e, t) {
                        var f;
                        o = new r(+e,t);
                        t.id = e;
                        if (i.preview) {
                            n.getDataURL(t)
                        }
                        if (n.acceptExts !== "*" && !c.call(n, t.name)) {
                            n.onError({
                                code: 601,
                                params: [u]
                            }, false);
                            return
                        }
                        if (a > 0 && o.size > a) {
                            o.error = "Size Error";
                            f = new s({
                                code: 602,
                                params: [i.fileSizeLimit.toUpperCase()],
                                file: o
                            });
                            n.onError(f, false)
                        }
                        n.files[e] = t;
                        n.queue[e] = o
                    });
                    if (i.onSelected.call(n, n.queue) === false)
                        return;
                    if (n.$queue) {
                        var f = ""
                          , h = n.queue.length;
                        $.each(n.queue, function(e, t) {
                            f += i.onAddQueue.call(n, t, t.error)
                        });
                        n.$queue.append(f)
                    }
                    if (i.auto)
                        n.start()
                },
                onStart: function(t) {
                    var r = this
                      , i = t.file;
                    t = new n(t,"loadstart",i);
                    t.originalFile = r.files[i.id];
                    i._t = t.timeStamp - 1;
                    i._l = 0;
                    a.uploading = true;
                    r.options.onStart.call(r, t)
                },
                onProgress: function(t) {
                    var r = this
                      , i = t.file || r.queue[t.id];
                    t = new n(t,"progress",i);
                    t.originalFile = r.files[i.id];
                    if (t.lengthComputable) {
                        t.speed = p(t.loaded - i._l, t.timeStamp - i._t);
                        if (r.$queue)
                            d.call(r, i, Math.round(t.loaded * 100 / t.total).toFixed(1) + "%");
                        i._t = t.timeStamp;
                        i._l = t.loaded
                    }
                    r.options.onProgress.call(r, t)
                },
                onCancel: function(t) {
                    this.remove(t);
                    this.queue[t].abort = true;
                    this.options.onCancel.call(this, this.queue[t])
                },
                onClearQueue: function() {
                    this.queue = [];
                    if (this.$queue)
                        this.$queue[0].innerHTML = "";
                    this.browse.style.display = "";
                    a.uploading = false;
                    this.options.onClearQueue.call(this)
                },
                onError: function(t, n) {
                    var r = this.options
                      , i = t.id || null
                      , o = i ? t.file || u.call(this, i) : null;
                    t = new s(t);
                    if (r.language && t.code && r.language[t.code]) {
                        t.message = r.language[t.code]
                    }
                    if (i !== null) {
                        if (this.$queue)
                            $("#" + this.id + "___" + i).addClass("upload-error").find(".f-progress").text(t.name);
                        if (n !== false)
                            this.onComplete(t)
                    }
                    this.options.onError.call(this, t)
                },
                onSuccess: function(t) {
                    t = new n(t,"load",this.queue[t.id]);
                    d.call(this, t.file, "100%");
                    this.options.onSuccess.call(this, t);
                    this.onComplete(t)
                },
                onComplete: function(t) {
                    t = new n(t,"loadend");
                    this.loadCount++;
                    this.options.onComplete.call(this, t);
                    this.start()
                },
                onAllComplete: function() {
                    var t = this;
                    a.uploading = false;
                    t.files = {};
                    t.queue = [];
                    t.options.onAllComplete.call(t)
                },
                onMouseOver: function() {
                    this.$el.addClass("upload-btn-over");
                    this.options.onMouseOver.call(this, this.$btn)
                },
                onMouseOut: function() {
                    this.$el.removeClass("upload-btn-over");
                    this.options.onMouseOut.call(this, this.$btn)
                },
                onMouseClick: function() {
                    this.$el.trigger("click");
                    this.options.onMouseClick.call(this, this.$btn)
                }
            }
        });
        if (!!(window.FormData && (new XMLHttpRequest).upload)) {
            a.html5 = a.extend(function() {
                function t() {
                    var e = [], t = this.options.fileTypeExts.replace("|", ",").split(","), n, r = t.length, i;
                    if (r) {
                        for (n = 0; n < r; n++) {
                            i = t[n];
                            if (o[i])
                                e.push(i === "csv" ? ".csv" : o[i])
                        }
                        return e.join(",")
                    }
                }
                function n() {
                    this.xhr = this.xhr || new XMLHttpRequest;
                    return this.xhr
                }
                var e = {
                    loadstart: "onStart",
                    progress: "onProgress",
                    error: "onError",
                    load: "onSuccess",
                    loadend: "onComplete"
                };
                return {
                    create: function(n) {
                        return '<input type="file" title="" class="uploader"' + ' id="' + this.id + '"' + ' style="' + n + '"' + ' accept="' + t.call(this) + '"' + (this.options.multiple ? " multiple" : "") + ">"
                    },
                    upload: function(r) {
                        var i = this, s = i.options, o, u, a;
                        a = r.originalFile;
                        if (!a) {
                            return
                        }
                        u = new FormData;
                        u.append(s.name, a);
                        if (s.formData) {
                            $.each($.isFunction(s.formData) ? s.formData.call(i) : s.formData, function(e, t) {
                                u.append(e, t)
                            })
                        }
                        o = n.call(i);
                        o.open(s.method || "POST", s.action, true);
                        o.onreadystatechange = function() {
                            if (o.readyState === 4) {
                                if (o.status === 200) {
                                    i.onSuccess({
                                        file: r,
                                        data: o.responseText
                                    })
                                } else {
                                    i.onError({
                                        file: r,
                                        code: o.status
                                    })
                                }
                            }
                        }
                        ;
                        o.upload.onloadstart = o.upload.onprogress = o.upload.onerror = function(t) {
                            t.file = r;
                            i[e[t.type]](t)
                        }
                        ;
                        $.each({
                            "Cache-Control": "no-cache",
                            "X-Requested-With": "XMLHttpRequest"
                        }, function(e, t) {
                            o.setRequestHeader(e, t)
                        });
                        o.withCredentials = true;
                        o.send(u)
                    },
                    cancel: function(t) {
                        var n = this
                          , r = n.queue;
                        if (t === undefined || t === "*") {
                            if (n.xhr && n.xhr.readyState > 0)
                                n.xhr.abort();
                            n.onClearQueue()
                        } else {
                            if (!r.length) {
                                return
                            }
                            if (n.xhr && n.xhr.readyState > 0 && n.queue[t])
                                n.xhr.abort();
                            n.onCancel(t)
                        }
                    },
                    destroy: function() {
                        if (this.browse)
                            this.browse.parentNode.removeChild(this.browse);
                        this.xhr = null;
                        this.__super("destroy")
                    }
                }
            })
        }
        r.swf = function() {
            var e = document.getElementsByTagName("script"), t = e[0], n = t && t.getAttribute("src"), r;
            if (!n)
                n = "";
            r = n.split("/").slice(0, -1).join("/");
            if (r)
                r += "/";
            r = "";
            return r + "uploader.swf"
        }();
        a.flash = a.extend(function() {
            function r(t) {
                if (!t.src)
                    return;
                var r = t.src + (t.src.indexOf("?") !== -1 ? "&" : "?") + "__=" + n
                  , i = ""
                  , s = {
                    type: "application/x-shockwave-flash"
                }
                  , o = {
                    wmode: "transparent",
                    allowScriptAccess: "always"
                }
                  , u = function(t) {
                    var n, r = "";
                    for (n in t) {
                        r += " " + n + '="' + t[n] + '"'
                    }
                    return r
                };
                (function(e) {
                    var n = e.length, r, i = {};
                    while (n--) {
                        i[e[n]] = 1
                    }
                    for (r in t) {
                        if (i[r]) {
                            s[r] = t[r]
                        } else {
                            o[r] = t[r]
                        }
                    }
                }
                )("width height id class style".split(" "));
                o.src = r;
                if (e) {
                    s.codebase = "http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,28,0";
                    s.classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000";
                    i += "<object" + u(s) + ">";
                    for (var a in o) {
                        i += '<param name="' + a + '" value="' + o[a] + '">'
                    }
                    i += "</object>"
                } else {
                    i += "<embed" + u(o) + u(s) + ">"
                }
                return i
            }
            function i(t) {
                if (e) {
                    t.style.display = "none";
                    (function() {
                        if (t.readyState === 4) {
                            for (var e in t) {
                                if (typeof t[e] === "function")
                                    t[e] = null
                            }
                            t.parentNode.removeChild(t)
                        } else {
                            setTimeout(arguments.callee, 15)
                        }
                    }
                    )()
                } else {
                    t.parentNode.removeChild(t)
                }
            }
            var e = !!window.ActiveXObject
              , t = e && !navigator.msDoNotTrack
              , n = +(new Date);
            return {
                create: function(n) {
                    var i = this.options
                      , s = {
                        id: this.id,
                        path: function() {
                            var e = location.pathname.split("/");
                            e.pop();
                            return e.join("/") + "/"
                        }(),
                        action: i.action,
                        field: i.name,
                        src: i.swf,
                        desc: i.fileTypeDesc,
                        ext: i.fileTypeExts
                    };
                    if (i.multiple)
                        s.multiple = 1;
                    if (i.debug)
                        s.debug = 1;
                    if (i.preview) {
                        s.preview = 1;
                        if (t) {
                            s.previewSize = 31 * 1024
                        }
                    }
                    if (i.method)
                        s.method = i.method;
                    return r({
                        src: i.swf,
                        style: n,
                        id: this.id,
                        "class": "uploader",
                        flashvars: $.param(s)
                    })
                },
                upload: function(t) {
                    var n = this
                      , r = n.options;
                    if (r.formData) {
                        n.browse.setData($.param($.isFunction(r.formData) ? r.formData.call(n) : r.formData))
                    }
                    var i = t.size / 1024 / 1024;
                    var s = i > 1 ? 1e3 : 100;
                    if (i > 2) {
                        s = 2e3
                    } else if (i > 3) {
                        s = 3e3
                    }
                    setTimeout(function() {
                        try {
                            n.browse.startUpload("" + t.id)
                        } catch (e) {}
                    }, s)
                },
                cancel: function(t) {
                    var n = this.queue;
                    if (n.length) {
                        if (!t)
                            t = n[0].id
                    }
                    this.browse.cancelUpload(t)
                },
                destroy: function() {
                    i(this.browse);
                    this.__super("destroy")
                }
            }
        });
        $(function() {
            var t = $("body");
            t.on("change." + e, ":file." + e, function() {
                if (!this.value)
                    return;
                window[this.id].onSelected(this.files);
                this.value = ""
            }).on("click." + e, ":file." + e, function() {
                window[this.id].onMouseClick()
            });
            t.on("mouseenter." + e, "div.upload-btn-wrap", function() {
                window[this.firstChild.id].onMouseOver()
            }).on("mouseleave." + e, "div.upload-btn-wrap", function() {
                window[this.firstChild.id].onMouseOut()
            });
            t.on("click." + e, "a.upload-cancel", function(e) {
                var t = $(this).closest(".queue")
                  , n = t.attr("id").split("___");
                if (t.hasClass("upload-error")) {
                    t.remove()
                } else {
                    window[n[0]].cancel(n[1])
                }
                e.preventDefault()
            })
        });
        a.guid = 0;
        a.uploading = false;
        a.defaults = r;
        a.mimes = o;
        a.lang = s;
        a.i18n = h;
        a.stringifySize = f;
        a.parseSize = l;
        a.getShortName = c;
        $.uploader = a;
        $.fn.uploader = function(n) {
            var i = arguments, s = this[0][t], o;
            if (s !== undefined) {
                o = e + "_" + s
            }
            if (!i.length) {
                return o ? window[o] : null
            }
            if (typeof n === "string" && n.substr(0, 2) !== "on") {
                if (o)
                    window[o][n].apply(window[o], Array.prototype.slice.call(i, 1))
            } else {
                this.off("remove." + e).on("remove." + e, function() {
                    window[this[t]].destroy()
                });
                n = $.extend({}, r, n);
                n.fileTypeExts = n.fileTypeExts.replace(/ /g, "");
                if (!a[n.mode])
                    n.mode = "flash";
                this.each(function() {
                    new a[n.mode](this,n)
                })
            }
            return this
        }
        ;
        h({
            400: "(400)请求无效",
            404: "(404)请求的资源不存在",
            500: "(500)内部服务器错误",
            501: "(501)未执行",
            502: "(502)连接超时",
            600: "初始化上传发生错误",
            601: "请选择“{1}”格式的文件",
            602: "文件不能大于{1}"
        });
        return a
    }
    .call(t, n, t, e),
    r !== undefined && (e.exports = r))
}
, function(e, t, n) {
    var r, i;
    "use strict";
    !(r = [n(4), n(9)],
    i = function(e, t) {
        var n = {
            escapePostsHtml: function(t) {
                return t.replace(/<((?!(?:\/?(p|b|font))|br|img).*?)>/ig, "&#60;$1&#62;")
            },
            recordGoldlog: function(n, r) {
                r.t = Date.now();
                t.getRequest("http://gm.mmstat.com/yt/" + n + "?" + $.param(r))
            }
        };
        return n
    }
    .apply(t, r),
    i !== undefined && (e.exports = i))
}
, function(e, t, n) {
    "use strict";
    function f(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(5);
    var i = f(r);
    var s = n(4);
    var o = f(s);
    var u = n(84);
    var a = f(u);
    var l = $.extend(new i["default"], {
        _userInfo: null,
        isLogin: function() {
            var t = decodeURIComponent((0,
            o["default"])("P_gck") || "").split("|")[1];
            return !!((0,
            o["default"])("yktk") || t && t !== "NA" || 0)
        },
        uid: function() {
            var t = this.getUserInfo() || {};
            return t.yid || t.userId || 0
        },
        getUserInfo: function() {
            return this._userInfo
        },
        login: function(t) {
            var n = this;
            n.unbind(".loginoncecallback").one("login:after.loginoncecallback", t);
            $.isFunction(n.loginFunc) && n.loginFunc(function() {
                n.trigger("login:success")
            });
            return n
        },
        init: function() {
            this._loadUserInfo()
        },
        _loadUserInfo: function() {
            var t = this;
            if (!t.isLogin()) {
                return
            }
            a["default"].getUserInfo(function(e) {
                if (e.code != 0) {
                    return
                }
                t._userInfo = e.data;
                t.trigger("login:after", [e.data])
            })
        }
    });
    l.bind("login:success", function() {
        l._loadUserInfo()
    });
    e.exports = l
}
, function(e, t) {
    e.exports = '<div class="comment-form <%if(isReply){%>comment-form-reply<%}%>">\n	<%if(!isReply && userInfo){%>\n		<div class="form-cell form-user-avatar">\n			<a href="<%=userDomain%><%=userInfo.userCode%>" target="_blank">\n				<img title="<%=userInfo.userName%>" src="//static.youku.com/user/img/avatar/50/55.jpg">\n			</a>\n		</div>\n	<%}%>\n	<div class="form-cell form-content <%=picUploadId%>FormContent">\n		<div class="form-user-info">\n			<%if(userInfo){%>\n				<a href="<%=userDomain%><%=userInfo.userCode%>" target="_blank"><%=userInfo.userName%></a>\n			<%}else{%>\n				<a href="javascript:;" class="form-user-login" hzCharset="hz-4003764-1000494" charset="404-0-1">登录</a>\n				<span>|</span>\n				<a href="https://account.youku.com/register.htm" target="_blank">注册</a>\n			<%}%>\n		</div>\n		<div class="form-wordlimit"><span class="form-wordlimit-input input-count">0</span><span class="form-wordlimit-upper">/300</span></div>\n		<div class="form-textarea form-textarea-picdom">\n			<textarea data-maxlength="300" name="content" <%if(!isReply){%>placeholder="快来说说想法吧～"<%}%> <%=getSpmConfig(!isReply ? \'commentboxclick\' : \'commentreplybox\')%> ></textarea>\n			<%if(!isReply  && picUpload){%>\n			<div class="cont-imgbox">\n				<div class="cont-imgbox-box fix">\n					<div class="cont-imgitem " id="<%=picUploadId%>imgitem">\n						<ul class="fix"></ul>\n					</div>\n					<div class="cont-imgupload">\n						<div class="upload_div handle">\n							<span class="ui-upload-a"   id="<%=picUploadId%>1">\n								+\n							</span>\n						</div>\n					</div>\n				</div>\n			</div>\n			<%}%>\n		</div>\n\n		<div class="form-toolbar">\n			<div class="form-toolbar-right">\n				<div class="form-tool form-action">\n					<%if(isReply){%>\n						<a href="javascript:;" class="form-btn form-btn-small form-btn-submit form-btn-blue" <%=getSpmConfig(\'commentreply\')%>>回复</a>\n						<a href="javascript:;" class="form-btn form-btn-small form-btn-cancle">取消</a>\n					<%} else {%>\n						<a href="javascript:;" class="form-btn form-btn-large form-btn-submit" <%=getSpmConfig(\'commententerclick\')%> >发表评论</a>\n					<%}%>\n				</div>\n				<div class="form-tooltip" style="display:none">\n					<div class="com_overlay_con">\n						<div class="tips"></div>\n					</div>\n				</div>\n			</div>\n			<div class="form-toolbar-left">\n				<%if(false && isReply){%>\n					<div class="tool">\n						<input class="reply-repeat" type="checkbox" />\n						<label style = "cursor: pointer;">回复并转发</label>\n					</div>\n				<%}%>\n\n				<div class="form-tool faces-normal-tool"></div>\n				<div class="form-tool faces-vip-tool"></div>\n				<%if(!isReply && picUpload){%>\n				<div class="form-tool pic_tool">\n					<a href="javascript:;" id="<%=picUploadId%>0" class="ui-upload-a">\n						<span class="upload-icon"></span>\n						<span>图片</span>\n					</a>\n					<div id="<%=picUploadId%>queue"></div>\n				</div>\n				<%}%>\n			</div>\n			<div class="form-validate" style="display:none;">\n				验证码: <input class="defaultext verify_code_value" type="text" name="verify_code_value" placeholder="输入右图的字符" />\n				<img class="key verify_code_img"/>\n				<span>看不清, <a class="change_verify_code" href="javascript:;">点此刷新</a></span>\n			</div>\n\n		</div>\n\n	</div>\n</div>\n\n\n\n\n\n\n\n\n\n\n\n'
}
, function(e, t) {
    e.exports = '<a href="javascript:;" class="faces-btn" title="表情">\n    <span class="faces-icon faces-icon-normal"></span><span>表情</span>\n</a>\n<div class="faces-content">\n    <div class="insert_emoticon">\n        <%for(var o in data){%>\n        <div class="faces" data-id="<%=o%>" <%if(o !== init){%> style="display:none;"<%}%>>\n            <div class="faces_con faces_con_<%=indexList.indexOf(o)%>">\n                <%if(o =="快捷回复" && setrumors){%>\n                    <%for(var mors in setrumors){%>\n                        <p title="<%=setrumors[mors]%>"  data-test="<%=setrumors[mors]%>" data-stat-role="ck"><%=setrumors[mors]%></p>\n                    <%}%>\n                    <%}else{%>\n                    <% \n                    var list = data[o];\n                    for(var k in list){%>\n                        <a href="javascript:;" title="<%=k%>" data-test="<%=k%>" class="gface_<%=list[k]%>"><%if(list[k]){%><i></i><%}%></a>\n                    <%}%>\n                <%}%>\n            </div>\n        </div>\n        <%}%>\n        <div class="emot_tab clearfix">\n            <div class="switch_toobar">\n                <% \n                var count = 0;\n                for( var item=0; item < indexList.length; item++){ count++\n                %>\n                    <a href="javascript:;"  class="<%if(indexList[item] === init){%>tab_active<%}%>" style="<%if(indexList[item]===initnone){%>display:none;<%}%>" title="<%=indexList[item]%>">\n                        <i class="general_tab_<%=count%>"></i>\n                        <%if(indexList[item]==="快捷回复" && hasNew){%>\n                            <span class="chuda_qheader_spot chuda_qheader_spot_dis" style="top: 10px;right: 4px; display:block;"></span>\n                        <%}%>\n                    </a>\n\n                <%}%>\n            </div>\n            <a class="next disabled"></a>\n            <a class="pre disabled"></a>\n        </div>\n    </div>\n    <iframe class="mask" frameborder="0" scrolling="no"></iframe>\n</div>'
}
, function(e, t) {
    e.exports = '<a href="javascript:;" class="faces-btn" title="vip表情">\n    <span class="faces-icon faces-icon-vip"></span><span>会员表情</span>\n</a>\n<div class="faces-content">\n    <div class="vip_insert_emoticon">\n        <%for(var o in data){%>\n            <div class="faces" data-id="<%=o%>" <%if(o !== init){%> style="display:none;"<%}%> >\n                <% if(!isVip){ %>\n                    <% var face = nonVip[o]; %>\n                    <% if(face){ %>\n                        <div class="non_vip">\n                            <div class="non_vip_wrap clearfix">\n                                <img src="<%=face.img%>" />\n                                <div>\n                                    <p><%=face.name%>表情系列<span>（VIP会员专享）</span></p>\n                                    <a href="//cps.youku.com/redirect.html?id=00014725" target="_blank" class="vip_btn">开通VIP会员</a>\n                                </div>\n                            </div>\n                        </div>\n                    <% } %>\n                <% }else{ %>\n                    <div class="faces_title clearfix">\n                        <span><%=o%>（原创表情，动画系列）</span>\n                        <a href="//cps.youku.com/redirect.html?id=000145d1" target="_blank">续费会员</a>\n                        <em>优酷会员免费</em>\n                    </div>\n                    <div class="faces_con faces_con_<%=indexList.indexOf(o)%>">\n                        <% var list = data[o]; %>\n                        <% for(var k in list){ %>\n                            <a href="javascript:;" title="<%=k%>" class="gface_<%=list[k]%>"><i></i></a>\n                        <%}%>\n                    </div>\n                <%}%>\n            </div>\n        <%}%>\n        <div class="vip_emot_tab">\n            <a class="pre disabled"></a>\n            <div class="switch_toobar">\n                <% var count = 0;%>\n                <% for( var item in data){ %>\n                    <% count++ %>\n                    <a href="javascript:;" <%if(item === init){%>class="tab_active"<%}%> title="<%=item%>">\n                        <i class="vip_tab_<%=count%>"></i>\n                    </a>\n                <%}%>\n            </div>\n            <a class="next disabled"></a>\n        </div>\n    </div>\n    <iframe class="mask" frameborder="0" scrolling="no"></iframe>\n</div>'
}
, function(e, t) {
    e.exports = "<%if(data.vipInfo && data.vipInfo.vipGrade){%>\n	<%\n		var arrVipMMId = [ 0, 100004, 100002, 100006 ];\n		var arrVipCss = [ 'level-expired', 'level-lvip', 'level-vip', 'level-lvip'];\n		var arrVipName = [ '会员已过期', '优酷土豆白银会员：VIP', '优酷土豆黄金会员：VIP', '优酷土豆钻石会员：VIP'];\n		var curVipIndex = arrVipMMId.indexOf(data.vipInfo.mmid);\n		curVipIndex = curVipIndex < 0 ? 0 : curVipIndex;\n		var css = arrVipCss[curVipIndex] + data.vipInfo.vipGrade;\n		var txt = arrVipName[curVipIndex] + data.vipInfo.vipGrade;\n		var sty = data.vipInfo.icon ? ('background: url(' + data.vipInfo.icon + ') 0px 0px no-repeat;height: 22px;') : '';\n	%>\n	<a href=\"http://vip.youku.com/\" title=\"<%=txt%>\" target=\"_blank\"><span class=\"vip-level-icon <%=css%>\" style=\"<%=sty%>\"></span></a>\n<%}%>\n\n<a href=\"//lv.youku.com/page/grade/compare?uid=<%=data.userId%>\" target=\"_blank\" title=\"用户等级\" class=\"user-grade-icon user-grade-lv<%=data.userLevel%>\"></a>"
}
, function(e, t, n) {
    "use strict";
    function C(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    ;
    var i = n(25);
    var s = C(i);
    var o = n(41);
    var u = C(o);
    var a = n(18);
    var f = C(a);
    var l = n(96);
    var c = C(l);
    var h = n(84);
    var p = C(h);
    var d = n(97);
    var v = C(d);
    var m = n(99);
    var g = C(m);
    var y = n(101);
    var b = C(y);
    var w = n(102);
    var E = C(w);
    var S = n(86);
    var x = C(S);
    var T = n(90);
    var N = C(T);
    var k = n(106);
    var L = n(107);
    var A = n(108);
    var O = n(110);
    var M = s["default"].compile(k);
    var _ = s["default"].compile(L);
    var D = s["default"].compile(A);
    var P = s["default"].compile(O);
    var H = {
        2: "myComment",
        4: "myVideoComment"
    };
    var B = u["default"].extend({
        initialize: function(t) {
            var n = this;
            n.parentModule = t.parentModule;
            n.scroll = $.extend({
                container: "html,body",
                scrollTop: function(t) {
                    return t.offset().top
                }
            }, t.scroll);
            n.objectInfo = t.objectInfo;
            n.userPermission = t.userPermission;
            n.pager = new E["default"]({
                el: n.$el,
                changePage: function(t) {
                    n.loadParam.currentPage = t;
                    n.load(n.loadParam, "changePage")
                }
            });
            n.commentImage = new v["default"]({
                el: n.$el
            });
            var r = new b["default"]({
                parentModule: n
            });
            r.bind("load:before", function(e) {
                if (!x["default"].check("commentOpen")) {
                    $(n.scroll.container).animate({
                        scrollTop: n.scroll.scrollTop(e.closest(".comment-item"))
                    }, 500)
                }
            });
            n.toolbar = new g["default"]({
                el: n.$el,
                objectInfo: n.objectInfo,
                items: {
                    showUp: true,
                    showDown: true,
                    showReply: true,
                    showDelete: true,
                    showSetTop: true,
                    showInform: false
                },
                commentReply: function(t) {
                    r.starLink = n.starLink;
                    var i = $(t.target);
                    var s = i.closest(".comment-item");
                    var o = $(".comment-reply", s).length > 0;
                    r.clear();
                    if (!o) {
                        r.render({
                            el: s,
                            objectInfo: n.objectInfo,
                            commentId: i.data("id"),
                            userId: i.data("uid")
                        })
                    }
                    return false
                },
                commentDeleteCallback: function(t) {
                    n.removeItem(t)
                },
                commentTopCallback: function() {
                    n.loadParam.currentPage = 1;
                    n.load(n.loadParam, "setTop")
                }
            });
            N["default"].bind("login:after", function(e) {
                n.updateDiffItem()
            })
        },
        events: {
            "click .comment-empty a": "refresh",
            "click a.seekTime": "seekTime",
            "click .comment-myreply-tab a": "changeMyReply"
        },
        seekTime: function(t) {
            if (t && t.preventDefault) {
                t.preventDefault();
                t = $(t.currentTarget).data("time")
            }
            t = parseInt(t);
            if (t && window.ykPlyr && $.isFunction(window.ykPlyr.PlayerSeek)) {
                window.ykPlyr.PlayerSeek(t);
                window.scroll(0, 0)
            }
        },
        refresh: function() {
            this.load(this.loadParam)
        },
        textTransform: function(t, n) {
            if (!t || (typeof n === "undefined" ? "undefined" : r(n)) !== "object") {
                return ""
            }
            var i = this;
            t = c["default"].escapeHtml(t);
            x["default"].check("text.star", function() {
                t = c["default"].star(t, i.starLink)
            });
            if (n.atUsers) {
                x["default"].check("text.at", function() {
                    t = c["default"].at(t, n.atUsers)
                })
            }
            if (n.topics) {
                x["default"].check("text.ht", function() {
                    t = c["default"].ht(t, n.topics)
                })
            }
            t = c["default"].timer(t);
            t = c["default"].url(t);
            t = c["default"].face(t);
            return t
        },
        load: function(t, n, r) {
            var i = this;
            i.loadParam = t;
            i.trigger("load:before", [t.currentPage, t.listType, n]);
            i.$el.html('<div class="comment-empty comment-loading"></div>');
            if (t.listType == "db") {
                i.dataComments = null;
                i.loadDbComment(t, n);
                return
            }
            if (t.listType == "mycomment") {
                i.dataComments = null;
                i.loadMyComment(t, n);
                return
            }
            i.loadComment(t, n, r)
        },
        loadComment: function(t, n, r) {
            var i = this;
            if (i.objectInfo.objectId == "0" || i.objectInfo.objectId == "") {
                return false
            }
            p["default"].commentList({
                app: "pc",
                objectId: i.objectInfo.objectId,
                objectType: i.objectInfo.objectType,
                listType: t.listType || 0,
                currentPage: t.currentPage || 1,
                pageSize: t.pageSize || 30
            }, function(e, s) {
                if (e.code != 0) {
                    i.$el.html('<div class="comment-empty">似乎出问题了,点击<a href="javascript:;">刷新</a>一下看看吧~</div>');
                    return
                }
                if (!x["default"].check("text.hotComment")) {
                    e.data && (e.data.hot = [])
                }
                if (!x["default"].check("commentOpen") && x["default"].isJoinCommentTest()) {
                    if (n == "init") {
                        window.goldlog && window.goldlog.record("/yt/ykcomment.play.commentNewAlgorithm", "EXP", "type=init_" + (s ? "new" : "old") + "&showid=" + x["default"].globals.page.showid + "&videocode=" + x["default"].globals.page.videoId2, "H1512895196")
                    }
                    e.data.hot = [].concat(e.data.hot).filter(function(e) {
                        return e && e.flags && e.flags.isTop
                    })
                }
                i.dataComments = e.data;
                i.$el.html(M({
                    data: e.data,
                    util: f["default"],
                    textTransform: i.textTransform.bind(i),
                    videoOwnerId: x["default"].globals.page.videoOwner,
                    loginUserInfo: N["default"].getUserInfo() || {},
                    userPermission: i.userPermission,
                    commentImage: i.commentImage,
                    toolbar: i.toolbar,
                    pager: i.pager,
                    allowReply: x["default"].check("operate.reply"),
                    userDomain: x["default"].globals.userDomain,
                    joinNewCommentTest: x["default"].isJoinCommentTest() == 1,
                    getActivityName: c["default"].activityName
                }));
                r && r();
                i.trigger("load:after", [e.data, t.listType, n])
            })
        },
        loadDbComment: function(t, n) {
            var r = this;
            p["default"].getDbComment({
                app: "pc",
                page: t.currentPage,
                videoId: r.objectInfo.objectId,
                showId: x["default"].globals.page.showid
            }, function(e) {
                if (e.code != 0) {
                    r.$el.html('<div class="comment-empty">似乎出问题了,点击<a href="javascript:;">刷新</a>一下看看吧~</div>');
                    return
                }
                r.$el.html(P({
                    data: e.data.con,
                    util: f["default"],
                    textTransform: r.textTransform.bind(r),
                    pager: r.pager
                }));
                r.trigger("load:after", [e.data.con, "db", n])
            })
        },
        loadMyComment: function(t, n) {
            var r = this;
            var i = {
                app: "pc",
                userType: t.userType || 2,
                currentPage: t.currentPage || 1,
                pageSize: t.pageSize || 30
            };
            p["default"].getUserComment(i, function(e) {
                if (e.code != 0) {
                    r.$el.html('<div class="comment-empty">似乎出问题了,点击<a href="javascript:;">刷新</a>一下看看吧~</div>');
                    return false
                }
                var t = H[i.userType];
                if (i.currentPage == 1) {
                    if (t == "myComment") {
                        r.myCommentNum = e.data.totalSize
                    } else if (t == "myVideoComment") {
                        r.myVideoCommentNum = e.data.totalSize
                    }
                }
                r.$el.html(D({
                    data: e.data,
                    util: f["default"],
                    textTransform: r.textTransform.bind(r),
                    userType: t,
                    myComment: r.myCommentNum,
                    myVideoComment: r.myVideoCommentNum,
                    pager: r.pager,
                    userDomain: x["default"].globals.userDomain
                }));
                r.trigger("load:after", [e.data, "mycomment", n])
            })
        },
        changeMyReply: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            var i = r.data("usertype");
            for (var s in H) {
                if (i == H[s]) {
                    i = s;
                    break
                }
            }
            n.loadParam.userType = i;
            n.loadParam.currentPage = 1;
            n.load(n.loadParam)
        },
        removeItem: function(t) {
            var n = this;
            $('[data-id="' + t + '"]', n.$el).remove();
            var r = $(".comment-list-main .comment-list-body", n.$el);
            if (r.children().length === 0) {
                r.append('<div class="comment-empty"><h3>暂无新评论～</h3></div>')
            }
        },
        add: function(t) {
            var n = this;
            n.$el.find(".comment-list-main .comment-list-body").prepend(_({
                item: {
                    user: {
                        aliasName: "我",
                        userId: -1,
                        userName: t.userName,
                        avatarMiddle: t.userImage
                    },
                    picList: t.picList,
                    content: t.content,
                    createTime: Date.now()
                },
                util: f["default"],
                textTransform: n.textTransform.bind(n),
                commentImage: n.commentImage,
                userDomain: x["default"].globals.userDomain,
                getActivityName: c["default"].activityName
            }));
            n.trigger("add:after", []);
            $(".comment-empty", n.$el).remove()
        },
        scrollTop: function(t) {
            var n = this;
            var r = n.$el;
            if (t == 2 && (r = $(".comment-list-main", n.$el)).length == 0) {
                r = n.$el
            }
            if (t == 3 && (r = $(".comment-list-hot", n.$el)).length == 0) {
                r = n.$el
            }
            $(n.scroll.container).animate({
                scrollTop: n.scroll.scrollTop(r)
            }, 500)
        },
        updateDiffItem: function() {
            var t = this;
            if (!t.dataComments) {
                return
            }
            var n = N["default"].getUserInfo();
            var r = t.dataComments.comment.concat(t.dataComments.hot).filter(function(e) {
                return e.user.userId == n.userId || e.user.userId == n.yid || t.userPermission.canDelete || t.userPermission.canSetTop
            });
            r.forEach(function(e) {
                var r = $('.comment-item[data-id="' + e.id + '"] > .comment-content .comment-handle', t.$el);
                var i = t.toolbar.render({
                    id: e.id,
                    upCount: e.upCount,
                    downCount: e.downCount,
                    replyCount: e.replyCount,
                    isTop: e.flags.isTop,
                    userId: e.user.userId,
                    userName: e.user.userName,
                    canDelete: t.userPermission.canDelete || e.user.userId == n.userId || e.user.userId == n.yid,
                    canSetTop: t.userPermission.canSetTop,
                    showReply: x["default"].check("operate.reply") ? true : e.replyCount > 0
                });
                if (r.html() != $(i).html()) {
                    r.replaceWith(i)
                }
            })
        }
    });
    e.exports = B
}
, function(e, t, n) {
    "use strict";
    function u(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    function v(e) {
        return String(e).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
    }
    var r = n(82);
    var i = u(r);
    var s = n(86);
    var o = u(s);
    var a = Array.prototype.slice;
    var f = "[0-9０-９]";
    var l = "[0-5０-５]";
    var c = "[:：]";
    var h = "(?:分钟?)";
    var p = new RegExp(["(" + f + "+" + h + ")(?:(" + l + "?" + f + ")秒)?" + "(?:到|至)" + f + "+" + h + "(?:" + l + "?" + f + "秒)?", "(" + f + "+" + "(?:到|至))" + f + "+" + h + "(?:" + l + "?" + f + "秒)?", "(" + f + "+" + h + ")(" + l + "?" + f + ")秒", "(" + f + "+" + h + ")", "(" + f + "+)秒", "(" + f + "+" + c + ")(" + l + "?" + f + ")(?!" + f + ")"].join("|"),"g");
    var d = {
        escapeHtml: function(t) {
            var n = {
                "&": "&#38;",
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "/": "&#47;"
            };
            var r = /&(?!#?\w+;)|<|>|"|'|\//g;
            return t ? (t + "").replace(r, function(e) {
                return n[e] || e
            }) : t
        },
        face: function(t) {
            return i["default"].showFace(t)
        },
        url: function(t) {
            return t.replace(/\[url\](.*?)\[\/url\]/ig, function(e, t) {
                return t
            })
        },
        star: function m(e, t) {
            if (t) {
                for (var m in t) {
                    var n = new RegExp(v(m),"g");
                    e = e.replace(n, '<a href="' + t[m] + '" target="_blank">' + m + "</a>")
                }
            }
            return e
        },
        at: function g(e, t) {
            if (t) {
                for (var g in t) {
                    if (g != "youku" && t[g]) {
                        e = e.replace(new RegExp("@" + v(g),"g"), '<a href="' + o["default"].globals.userDomain + t[g] + '" target="_blank">@' + g + "</a>")
                    }
                }
            }
            return e
        },
        removeRepeatAt: function(t, n) {
            if (n && n.userName) {
                var r = new RegExp("回复 @" + v(n.userName) + " :s*","g");
                var i = "回复 @" + n.userName + " :";
                if (!r.test(t)) {
                    t = i + t
                } else {
                    t = t.replace(r, i)
                }
                var s = {};
                s[n.userName] = n.userCode;
                t = this.at(t, s)
            }
            return t
        },
        ht: function y(e, t) {
            if (t) {
                for (var y in t) {
                    e = e.replace(new RegExp("#" + v(y) + "#","g"), '<a href="//gh.youku.com/topic_page/detail?id=' + t[y] + '" target="_blank">#' + y + "#</a>")
                }
            }
            return e
        },
        timer: function(t) {
            return t.replace(p, function() {
                var e = a.call(arguments);
                var t = 0;
                e.slice(1, -2).forEach(function(e) {
                    e = (e || "").replace(/[\uff10-\uff19\uff1a]/g, function(e) {
                        return String.fromCharCode(e.charCodeAt(0) - 65248)
                    });
                    t = t + (parseInt(e, 10) * (/[到至分\:]/.test(e) ? 60 : 1) || 0)
                });
                return '<a title="点击从此时间点播放" href="#" class="seekTime" data-time="' + t + '">' + e[0] + "</a>"
            })
        },
        activityName: function(t, n) {
            if (!t) {
                return ""
            }
            if (n) {
                n = 'style="color:rgb(' + (n >> 16 & 255) + "," + (n >> 8 & 255) + "," + (n & 255) + ');"'
            }
            return '<span class="comment-user-activityname" ' + (n || "") + ">" + t + "_</span>"
        }
    };
    e.exports = d
}
, function(e, t, n) {
    "use strict";
    function u(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = u(r);
    var s = n(41);
    var o = u(s);
    var a = n(98);
    var f = i["default"].compile(a);
    var l = o["default"].extend({
        initialize: function(t) {},
        render: function(t) {
            return f(t || {})
        },
        events: {
            "click .comment-image .comment-img-list li": "txtpic",
            "click .comment-image .comment-img-choose li": "txtpicslid",
            "click .comment-image .comment-img-stage span": "txtpicsmallck",
            "mousemove .comment-image .comment-img-stage span": "txtpicsmallms"
        },
        txtpic: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            if (!r.closest("ul").hasClass("bigcursor")) {
                return
            }
            var i = r.closest(".comment-image");
            i.find(".comment-img-list").hide();
            i.find(".comment-img-view").show();
            n.imgloadfn(r, r.index())
        },
        txtpicslid: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            n.imgloadfn(r, r.index())
        },
        txtpicsmallck: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            var i = r.closest(".comment-image");
            var s = parseInt(r.data("index"), 10);
            var o = parseInt(r.data("count"), 10);
            if (r.hasClass("leftcursor")) {
                s > 0 && n.imgloadfn(r, s - 1)
            } else if (r.hasClass("rightcursor")) {
                s < o - 1 && n.imgloadfn(r, s + 1)
            } else if (r.hasClass("smallcursor")) {
                i.find(".comment-img-list").show();
                i.find(".comment-img-view").hide()
            }
        },
        txtpicsmallms: function(t) {
            var n = $(t.currentTarget);
            var r = parseInt(n.data("index"), 10);
            var i = parseInt(n.data("count"), 10);
            var s = n.width();
            if (t.offsetX < s * .33) {
                if (!n.hasClass("leftcursor") && r > 0) {
                    n.removeClass("rightcursor smallcursor").addClass("leftcursor")
                }
            } else if (t.offsetX > s * .66) {
                if (!n.hasClass("rightcursor") && r < i - 1) {
                    n.removeClass("leftcursor smallcursor").addClass("rightcursor")
                }
            } else {
                if (!n.hasClass("smallcursor")) {
                    n.removeClass("rightcursor leftcursor").addClass("smallcursor")
                }
            }
        },
        imgloadfn: function(t, n) {
            var r = t.closest(".comment-image");
            var i = r.find(".comment-img-choose li");
            var s = i.eq(n);
            var o = r.find(".comment-img-stage span");
            var u = o.find("img");
            if (i.length > 1) {
                i.removeClass("active");
                s.addClass("active")
            } else {
                i.hide()
            }
            var a = s.find("img");
            var f = imgW = a.data("width");
            var l = imgH = a.data("height");
            var c = a.data("msrc");
            if (c) {
                if (Math.max(f, l) >= 600) {
                    var h = f >= l;
                    var p = (h ? f : l) / 600;
                    if (h) {
                        f = 600;
                        l = Math.floor(l / p)
                    } else {
                        f = Math.floor(f / p);
                        l = 600
                    }
                }
                o.addClass("comment-img-loading").css({
                    width: f > 100 ? f : 100,
                    height: l > 100 ? l : 100
                });
                u.hide();
                var d = "?x-oss-process=image/resize,w_200";
                if (imgW < 600) {
                    if (imgH < 600) {
                        if (imgW > imgH) {
                            d = "?x-oss-process=image/resize,w_" + imgW;
                            if (imgH < 200) {
                                d = "?x-oss-process=image/resize,h_200"
                            }
                        } else {
                            d = "?x-oss-process=image/resize,w_" + imgW;
                            if (imgH < 200) {
                                d = "?x-oss-process=image/resize,h_200"
                            }
                        }
                    } else {
                        d = "?x-oss-process=image/resize,w_600"
                    }
                } else if (imgW >= 600) {
                    if (imgH < 600) {
                        d = "?x-oss-process=image/resize,w_600";
                        if (imgH < 200) {
                            d = "?x-oss-process=image/resize,m_lfit,w_600,h_200"
                        }
                    } else {
                        d = "?x-oss-process=image/resize,w_600"
                    }
                }
                c = c + d;
                var v = new Image;
                v.onload = function() {
                    u.attr("src", c).show();
                    o.removeAttr("style").removeClass("comment-img-loading").data("index", n);
                    if (n <= 0 || n >= i.length - 1) {
                        o.removeClass("rightcursor leftcursor").addClass("smallcursor")
                    }
                }
                ;
                v.src = c
            }
        }
    });
    e.exports = l
}
, function(e, t) {
    e.exports = '<% if(picList && picList.length > 0) { %>\n<div class="comment-image">\n	<div class="comment-img-view" style="display:none">\n		<div class="comment-img-stage">\n			<span class="smallcursor" data-count="<%=picList.length%>" data-index="0">\n				<img alt="" />\n			</span>\n			<i node-type="loading" class="W_loading"></i>\n		</div>\n\n		<div class="comment-img-choose fix">\n			<ul class="fix">\n				<%picList.forEach(function(pic,i){%>\n					<li data-index="<%=i%>">\n						<a class="<%if(i==0){%>active<%}%>" href="javascript:;">\n							<img src="<%=pic.picUrl%>?x-oss-process=image/format,jpg/resize,m_fill,h_100,w_100"  data-msrc="<%=pic.picUrl%>" data-width="<%=pic.width%>" data-height="<%=pic.height%>">\n						</a>\n					</li>\n				<%})%>\n			</ul>\n		</div>\n	</div>\n\n	<% var isShowBig = !(picList.length == 1 && picList[0].width<300 && picList[0].height<300); %>\n	<div class="comment-img-list">\n		<ul class="fix comment-img-<%=picList.length%> <%if(isShowBig){%>bigcursor<%}%>">\n			<%picList.forEach(function(pic,i){%>\n				<li class="li_<%=i%>" data-index="<%=i%>">\n					<%if(picList.length==1){%>\n						<img src="<%=pic.picUrl%><%if(isShowBig){%>?x-oss-process=image/format,jpg/resize,m_lfit,h_300,w_300<%}%>">\n					<%}else{%>\n						<img src="<%=pic.picUrl%>?x-oss-process=image/format,jpg/resize,m_fill,h_100,w_100">\n					<%}%>\n					<%if(pic.picUrl.indexOf(\'.gif\')>0){%>\n						<span class="gif-icon">GIF</span>\n					<%}%>\n				</li>\n			<%})%>\n		</ul>\n	</div>\n</div>\n<% } %>'
}
, function(e, t, n) {
    "use strict";
    function v(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = v(r);
    var s = n(41);
    var o = v(s);
    var u = n(24);
    var a = v(u);
    var f = n(84);
    var l = v(f);
    var c = n(86);
    var h = v(c);
    var p = n(90);
    var d = v(p);
    var m = Array.prototype.slice;
    var g = n(100);
    var y = i["default"].compile(g);
    var b = o["default"].extend({
        initialize: function(t) {
            var n = this;
            n.objectInfo = t.objectInfo;
            n.items = $.extend({
                showUp: false,
                showDown: false,
                showReply: false,
                showSubReply: false,
                showDelete: false,
                showSetTop: false,
                showInform: false
            }, t.items);
            ["commentUp", "commentDown", "commentDelete", "commentTop", "commentReply", "commentReplySub", "commentDeleteCallback", "commentTopCallback"].forEach(function(e) {
                $.isFunction(t[e]) && (n[e] = t[e])
            })
        },
        render: function(t, n) {
            t = $.extend({
                id: 0,
                upCount: 0,
                downCount: 0,
                replyCount: 0,
                userId: 0,
                userName: "",
                isTop: false,
                canSetTop: false,
                canDelete: false,
                getSpmConfig: function(n) {
                    return h["default"].getCommentTestSpmConfig(n, t.id)
                }
            }, this.items, t, n);
            if (!h["default"].check("operate.top")) {
                t.showSetTop = false
            }
            return y(t)
        },
        events: {
            "click .comment-handle .comment-handle-up": "commentUp",
            "click .comment-handle .comment-handle-down": "commnetDown",
            "click .comment-handle .comment-handle-reply": "commentReply",
            "click .comment-handle .comment-handle-subreply": "commentReplySub",
            "click .comment-handle .comment-handle-delete": "commentDelete",
            "click .comment-handle .comment-handle-inform": "commentInform",
            "click .comment-handle .comment-handle-top": "commentTop"
        },
        commentUp: function(t) {
            this.setSupport(t.target, 1, "顶", ".comment-handle-down");
            return false
        },
        commnetDown: function(t) {
            this.setSupport(t.target, 2, "踩", ".comment-handle-up");
            return false
        },
        setSupport: function(t, n, r, i) {
            var s = this;
            var o = d["default"].isLogin();
            if (!o) {
                var u = m.call(arguments);
                d["default"].login(function() {
                    s.setSupport.apply(s, u)
                });
                return
            }
            var a = $(t);
            if (a.hasClass("active")) {
                return
            }
            var f = a.siblings(i);
            var c = a.data("id");
            var h = parseInt(a.text(), 10) || 0;
            l["default"].updown({
                app: "pc",
                type: n,
                commentId: c,
                objectId: s.objectInfo.objectId,
                objectType: s.objectInfo.objectType
            }, function(e) {
                switch (parseInt(e.code, 10)) {
                case 0:
                    f.removeClass("active");
                    a.text(h + 1).addClass("active");
                    break;
                case 1:
                    if (h <= 0) {
                        h = 1
                    }
                    f.removeClass("active");
                    a.text(h + "您已经" + r + "过了").addClass("active");
                    break;
                case 2:
                    var t = (parseInt(f.text(), 10) || 0) - 1;
                    f.text(t > 0 ? t : "").removeClass("active");
                    a.text(h + 1).addClass("active");
                    break
                }
            })
        },
        commentReplySub: function(t) {
            return false
        },
        commentReply: function(t) {
            return false
        },
        commentDelete: function(t) {
            var n = this;
            var r = $(t.target);
            var i = '<div style="text-align:center;"><div class="title"><i class="icon icon-prompt-warning"></i><span>你确定要删除该评论吗</span></div><p class="prompt">如果该评论下有其他回复也将一起删除</p></div>';
            var s = r.parent();
            new a["default"]({
                target: h["default"].check("commentOpen") ? s : null,
                hasMask: !h["default"].check("commentOpen"),
                width: 300,
                zIndex: 20010,
                content: i,
                className: "yk-prompt-dialog",
                buttons: [{
                    className: "prompt-btn prompt-btn-primary",
                    name: "删 除",
                    callback: function(i) {
                        i.preventDefault();
                        var o = r.data("id");
                        l["default"].deleted({
                            app: "pc",
                            commentId: o,
                            objectId: n.objectInfo.objectId,
                            objectType: n.objectInfo.objectType
                        }, function(e) {
                            if (e.code == 0) {
                                a["default"].alert({
                                    target: h["default"].check("commentOpen") ? s : null,
                                    hasMask: !h["default"].check("commentOpen"),
                                    zIndex: 20010,
                                    content: "删除成功"
                                });
                                $.isFunction(n.commentDeleteCallback) && n.commentDeleteCallback(o, t)
                            } else {
                                a["default"].alert({
                                    target: h["default"].check("commentOpen") ? s : null,
                                    hasMask: !h["default"].check("commentOpen"),
                                    zIndex: 20010,
                                    content: "删除失败，请重试"
                                })
                            }
                        });
                        this.close()
                    }
                }, {
                    className: "prompt-btn",
                    name: "取消",
                    callback: function(t) {
                        t.preventDefault();
                        this.close()
                    }
                }]
            });
            return false
        },
        commentTop: function(t) {
            var n = this;
            var r = $(t.target);
            var i = r.parent();
            var s = d["default"].isLogin();
            if (!s) {
                d["default"].login(function() {
                    n.commentTop(t)
                });
                return
            }
            if (n.submit) {
                return
            }
            n.submit = true;
            var o = {
                app: "pc",
                objectId: n.objectInfo.objectId,
                objectType: n.objectInfo.objectType,
                commentId: r.data("id"),
                type: r.text() == "置顶" ? 1 : 2
            };
            l["default"].setTop(o, function(e) {
                n.submit = false;
                if (e.code != 0) {
                    a["default"].alert({
                        target: h["default"].check("commentOpen") ? i : null,
                        hasMask: !h["default"].check("commentOpen"),
                        zIndex: 20010,
                        content: e.message
                    });
                    return
                }
                a["default"].alert({
                    target: h["default"].check("commentOpen") ? i : null,
                    hasMask: !h["default"].check("commentOpen"),
                    zIndex: 20010,
                    content: "操作成功！"
                });
                r.text(o.type == 1 ? "取消置顶" : "置顶");
                $.isFunction(n.commentTopCallback) && n.commentTopCallback(t)
            });
            return false
        },
        commentInform: function(t) {
            var n = this;
            var r = $(t.currentTarget);
            var i = r.parent();
            var s = '<div><div class="title"><span>匿名举报不会对您有任何影响，请选举举报原因：</span></div>' + '<p class="prompt">' + '<input type="radio" name="tip" value="1" id="gg"><label for="gg" class="prompt_rad">广告</label>' + '<input type="radio" name="tip" id="sq" value="2"><label for="sq" class="prompt_rad">色情</label>' + '<input type="radio" name="tip" id="mm" value="3"><label for="mm" class="prompt_rad">骚扰谩骂</label>' + '<input type="radio" name="tip" id="dy" value="4"><label for="dy" class="prompt_rad">地域攻击</label>' + '<input type="radio" name="tip" id="ey" value="5"><label for="ey" class="prompt_rad">恶意灌水</label>' + '<input type="radio" name="tip" id="qt" value="6"  checked="checked"><label for="qt" class="prompt_rad">其他</label>' + "</p>" + '<p class="prompt"><textarea class="defaultext" name="content" placeholder="请输入举报原因（至少5个字）！"></textarea></p></div>';
            new a["default"]({
                target: h["default"].check("commentOpen") ? i : null,
                hasMask: !h["default"].check("commentOpen"),
                width: 580,
                content: s,
                className: "yk-prompt-dialog yk-tip-dialog ",
                title: "举报",
                buttons: [{
                    className: "prompt-btn prompt-tip-primary",
                    name: "提交",
                    callback: function(t) {
                        t.preventDefault();
                        var s = r.data("id");
                        var o = "6";
                        var u = $(".yk-tip-dialog .defaultext").val();
                        $(".yk-tip-dialog input[name=tip]").each(function() {
                            if (this.checked) {
                                o = $(this).val()
                            }
                        });
                        var f = {
                            app: "pc",
                            objectId: n.objectInfo.objectId,
                            objectType: n.objectInfo.objectType,
                            commentId: s,
                            memo: u,
                            reason: o
                        };
                        if (!u) {
                            a["default"].alert({
                                target: h["default"].check("commentOpen") ? i : null,
                                hasMask: !h["default"].check("commentOpen"),
                                zIndex: 20010,
                                content: "请填写举报原因"
                            });
                            return false
                        }
                        l["default"].tipOffNew(f, function(e) {
                            if (e.code == "0") {
                                var t = a["default"].alert({
                                    target: h["default"].check("commentOpen") ? i : null,
                                    hasMask: !h["default"].check("commentOpen"),
                                    zIndex: 20010,
                                    content: "提交成功，请等待客服审核"
                                });
                                setTimeout(function() {
                                    t.close()
                                }, 1e3)
                            }
                        });
                        this.close()
                    }
                }, {
                    className: "prompt-btn prompt-close",
                    name: "取消",
                    callback: function(t) {
                        t.preventDefault();
                        this.close()
                    }
                }]
            });
            return false
        }
    });
    e.exports = b
}
, function(e, t) {
    e.exports = '<div class="comment-handle">\n	<%if(showUp){%>\n	<a href="javascript:;" data-id="<%=id%>" class="comment-handle-btn comment-handle-up" <%=getSpmConfig(\'top\')%> ><%=upCount || \'\'%></a>\n	<%}%>\n\n	<%if(showDown){%>\n	<a href="javascript:;" data-id="<%=id%>" class="comment-handle-btn comment-handle-down" <%=getSpmConfig(\'down\')%> ><%=downCount || \'\'%></a>\n	<%}%>\n\n	<%if(showReply){%>\n	<a href="javascript:;" data-id="<%=id%>" data-uid="<%=userId%>" class="comment-handle-btn comment-handle-reply" <%=getSpmConfig(\'commentreplyicon\')%> ><%if(replyCount>0){%>(<%=replyCount%>)<%}%></a>\n	<%}%>\n\n	<%if(showSubReply){%>\n	<a href="javascript:;" data-id="<%=id%>" data-uname="<%=userName%>" class="comment-handle-btn comment-handle-subreply">回复</a>\n	<%}%>\n	\n	<%if(canDelete && showDelete){%>\n	<a href="javascript:;" data-id="<%=id%>" class="comment-handle-btn comment-handle-delete">删除</a>\n	<%}%>\n\n	<%if(canSetTop && showSetTop){%>\n	<a href="javascript:;" data-id="<%=id%>" class="comment-handle-btn comment-handle-top"><%=isTop ? \'取消置顶\' : \'置顶\'%></a>\n	<%}%>\n\n	<%if(showInform){%>\n	<a href="javascript:;" data-id="<%=id%>" class="comment-handle-btn comment-handle-inform">举报</a>\n	<%}%>\n</div>'
}
, function(e, t, n) {
    "use strict";
    function E(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = E(r);
    var s = n(41);
    var o = E(s);
    var u = n(18);
    var a = E(u);
    var f = n(96);
    var l = E(f);
    var c = n(84);
    var h = E(c);
    var p = n(77);
    var d = E(p);
    var v = n(99);
    var m = E(v);
    var g = n(102);
    var y = E(g);
    var b = n(86);
    var w = E(b);
    var S = n(104);
    var x = n(105);
    var T = i["default"].compile(S);
    var N = i["default"].compile(x);
    var C = o["default"].extend({
        initialize: function(t) {
            this.sublist = [];
            this.parentModule = t.parentModule
        },
        clear: function() {
            this.sublist.forEach(function(e) {
                e.remove()
            });
            this.sublist = [];
            return this
        },
        textTransform: function(t, n) {
            var r = this;
            t = l["default"].escapeHtml(t);
            t = l["default"].removeRepeatAt(t, n.replyUser);
            w["default"].check("text.star", function() {
                t = l["default"].star(t, r.starLink)
            });
            w["default"].check("text.at", function() {
                t = l["default"].at(t, n.atUsers)
            });
            w["default"].check("text.ht", function() {
                t = l["default"].ht(t, n.topics)
            });
            t = l["default"].timer(t);
            t = l["default"].url(t);
            t = l["default"].face(t);
            return t
        },
        render: function(t) {
            var n = this;
            var r = $(t.el);
            if ($(".commnet-reply", r).length > 0) {
                return
            }
            var i = '<div class="comment-reply fix"><div class="comment-form-container"></div></div>';
            var s = $(i).appendTo(r);
            var o = t.objectInfo.objectId;
            var u = t.objectInfo.objectType;
            var f;
            if (w["default"].check("operate.reply")) {
                f = new d["default"]({
                    el: s.find(".comment-form-container"),
                    isReply: true,
                    submitArgs: {
                        commentId: t.commentId,
                        objectId: o,
                        objectType: u
                    },
                    faces: {
                        rangeNode: (n.parentModule || {
                            parentModule: {}
                        }).parentModule.$el
                    }
                });
                f.bind("submit:success", function(e) {
                    if (e.code != 0) {
                        return
                    }
                    if (!e.data) {
                        return
                    }
                    $(".comment-reply-list", s).prepend(N({
                        data: {
                            replies: [{
                                id: 0,
                                content: e.params.content,
                                createTime: Date.now(),
                                user: {
                                    userId: e.data.userId,
                                    userName: e.data.userName,
                                    aliasName: "我",
                                    avatarSmall: e.data.avatarMiddle,
                                    userlevel: {},
                                    isVip: true
                                }
                            }]
                        },
                        util: a["default"],
                        textTransform: n.textTransform.bind(n),
                        userDomain: w["default"].globals.userDomain,
                        getActivityName: l["default"].activityName
                    })).find(".null").remove()
                });
                f.bind("remove:success", function() {
                    s.remove()
                })
            }
            var c = new m["default"]({
                el: s,
                objectInfo: t.objectInfo,
                items: {
                    showUp: true,
                    showDown: true,
                    showSubReply: true
                },
                commentReplySub: function(t) {
                    if (!f) {
                        return
                    }
                    var n = $(t.target);
                    var r = n.data("id");
                    var i = "回复 @" + n.data("uname") + " :";
                    f.setRelyName(i);
                    f.setArgs({
                        commentId: r
                    })
                }
            });
            var h = {
                app: "pc",
                commentId: t.commentId,
                objectId: o,
                objectType: u,
                currentPage: 1,
                pageSize: 10
            };
            var p = new y["default"]({
                el: s,
                changePage: function(r) {
                    h.currentPage = r;
                    n.getSubCommentsContent(s, c, p, h, t.userId)
                }
            });
            p.changePage(1);
            n.sublist.push(s)
        },
        getSubCommentsContent: function(t, n, r, i, s) {
            var o = this;
            o.trigger("load:before", [t]);
            h["default"].replyList(i, function(e) {
                if (e.code == 0) {
                    var u = $(T({
                        data: e.data,
                        util: a["default"],
                        textTransform: o.textTransform.bind(o),
                        toolbar: n,
                        pager: r,
                        suid: s,
                        videoOwnerId: w["default"].globals.page.videoOwner,
                        allowReply: w["default"].check("operate.reply"),
                        userDomain: w["default"].globals.userDomain,
                        commentId: i.commentId,
                        getActivityName: l["default"].activityName
                    }));
                    var f = $(".comment-reply-container", t);
                    if (f.length > 0) {
                        f.replaceWith(u)
                    } else {
                        t.append(u)
                    }
                    o.trigger("load:after", [t, e.data])
                }
            })
        }
    });
    e.exports = C
}
, function(e, t, n) {
    "use strict";
    function f(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = f(r);
    var s = n(41);
    var o = f(s);
    var u = n(86);
    var a = f(u);
    var l = n(103);
    var c = i["default"].compile(l);
    var h = o["default"].extend({
        initialize: function() {},
        events: {
            "click .comment-pager a": "changePage"
        },
        changePage: function(t) {
            var n = this;
            var r = n.options.changePage;
            r && r.call(n, $(t.currentTarget).data("page"));
            return false
        },
        render: function(t) {
            return c($.extend({
                currentPage: 1,
                totalPage: 10,
                totalSize: 0,
                getSpmConfig: function(n, r) {
                    return a["default"].getCommentTestSpmConfig(n, t.commentId + "_" + r, {
                        num: r
                    })
                }
            }, t))
        }
    });
    e.exports = h
}
, function(e, t) {
    e.exports = '<div class="comment-pager fix">\n	<div class="comment-pager-state">\n		第<span><%=currentPage%></span>页<%if(totalSize > 0){%>/共<span><%=totalPage%></span>页<%}%>\n	</div>\n	<ul class="comment-pager-turn">\n		<li title="上一页">\n			<%if(totalPage > 1 && currentPage > 1){%>\n				<a data-page="<%=currentPage - 1%>" href="javascript:;">上一页</a>\n			<%}else{%>\n				<span>上一页</span>\n			<%}%>\n		</li>\n\n		<li title="下一页">\n			<%if(totalPage > 1 && totalPage > currentPage){%>\n				<a data-page="<%=currentPage + 1%>" href="javascript:;" <%=getSpmConfig(\'nextpage\', currentPage + 1)%> >下一页</a>\n			<%}else{%>\n				<span>下一页</span>\n			<%}%>\n		</li>\n	</ul>\n	<ul class="comment-pager-page">\n		<%\n			var start = currentPage - 4;\n			var end = currentPage + 5;\n\n			if(start < 1){\n				start = 1;\n			}\n\n			if(end > totalPage){\n				end = totalPage;\n			}\n		%>\n\n		<%if(start > 1){%>\n			<li><a data-page="1" href="javascript:;" <%=getSpmConfig(\'page\', 1)%> >1</a></li>\n		<%}%>\n\n		<%if(start - 1 > 1){%>\n			<li>...</li>\n		<%}%>\n\n		<%for(var i = start; i <= end; i++){%>\n			<%if(i == currentPage){%>\n				<li><span><%=i%></span></li>\n			<%}else{%>\n				<li><a data-page="<%=i%>" href="javascript:;" <%=getSpmConfig(\'page\', i)%> ><%=i%></a></li>\n			<%}%>\n		<%}%>\n\n		<%if(totalPage - end > 1){%>\n			<li>...</li>\n		<%}%>\n\n		<%if(totalPage > end){%>\n			<li><a data-page="<%=totalPage%>" href="javascript:;" <%=getSpmConfig(\'page\', totalPage)%> ><%=totalPage%></a></li>\n		<%}%>\n	</ul>\n	\n	\n</div>'
}
, function(e, t, n) {
    "use strict";
    var r = n(105);
    e.exports = '\n<div class="comment-reply-container">\n	<% var pagerHtml = data.totalPage > 1 ?\n		pager.render({ currentPage: data.currentPage, totalPage: data.totalPage, totalSize: data.totalSize, commentId: commentId }) :\n		\'\';\n	%>\n	<%==pagerHtml%>\n	<div class="comment-reply-list comment-list-box">\n		<%if(data.replies.length > 0 ){%>\n			' + r + "\n		<%}%>\n	</div>\n	<%==pagerHtml%>\n</div>\n"
}
, function(e, t) {
    e.exports = '<%data.replies.forEach(function(item,i){%>\n	<div class="comment-item">\n		<!--commentcon bg-->\n		<div class="comment-content">\n			\n			<div class="comment-user-avatar">\n				<a href="<%=userDomain%><%=item.user.userCode%>" target="_blank">\n					<img class="img-small" _hz="" src="<%=item.user.avatarSmall%>">\n				</a>\n			</div>\n			<div class="comment-section">\n				<div class="comment-user-info">\n					<a href="<%=userDomain%><%=item.user.userCode%>" target="_blank" class="<%if(item.user.userlevel && item.user.isVip){%>redname<%}%> " _hz="">\n						<%==getActivityName(item.user.userActName, item.user.color)%><%=item.user.aliasName || item.user.userName%>\n					</a>\n					<%if(videoOwnerId == item.user.userId){%>\n						<span class="comment-usertitle">频道主</span>\n					<%}else if(suid==item.user.userId){%>\n						<span class="comment-usertitle">楼主</span>\n					<%}%>\n\n					<%if(item.user.vipInfo){%>\n						<%if(item.user.vipInfo.mmid=="100002"){%>\n							<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span class="vip-level-icon level-vip<%=item.user.vipInfo.vipGrade%>"  <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%> ></span></a>\n						<%}else if(item.user.vipInfo.mmid=="100004"){%>\n							<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span class="vip-level-icon level-lvip<%=item.user.vipInfo.vipGrade%>"  <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%>></span></a>\n						<%}else if(item.user.vipInfo.mmid=="100006"){%>\n							<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span class="vip-level-icon level-lvip<%=item.user.vipInfo.vipGrade%>" <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%>></span></a>\n						<%}%>\n					<%}%>\n					<%if(item.user.userLevel && item.user.userLevel>5){%>\n						<a href="//lv.youku.com/page/grade/compare?uid=<%=item.user.userId%>" target="_blank" title="用户等级" class="user-grade-icon user-grade-lv<%=item.user.userLevel%>"></a>\n					<%}%>\n\n					<span class="comment-text"><%==textTransform(item.content,item)%></span>\n				</div>\n			</div>\n\n			<%var toolbarHtml = !toolbar ? \'\' : toolbar.render({\n				id: item.id,\n				upCount: item.upCount,\n				downCount: item.downCount,\n				userId: item.user.userId,\n				userName: item.user.userName,\n				showSubReply: allowReply\n			});%>\n			<%==toolbarHtml%>\n\n			<span class="comment-timestamp"><%=util.release(item.createTime)%></span>\n\n		</div>\n		<!--commentcon end-->\n	</div>\n<%})%>\n'
}
, function(e, t, n) {
    "use strict";
    var r = n(107);
    var i = '<%var pagerHtml= data.totalPage > 1 ? pager.render({currentPage:data.currentPage,totalPage:data.totalPage,totalSize:data.totalSize, commentId: 0}) : \'\';%>\n\n<div class="comment-pager-header">\n	<%==pagerHtml%>\n</div>\n\n<%if(data.hot.length > 0 && data.currentPage == 1){%>\n	<div class="comment-list-hot comment-list-box">\n		<div class="comment-list-head">\n			<h3 class="title">热门评论</h3>\n		</div>\n		<div class="comment-list-body">\n			<%data.hot.forEach(function(item,i){%>\n				' + r + '\n			<%});%>\n		</div>\n	</div>\n<%}%>\n\n<div class="comment-list-main comment-list-box">\n	<div class="comment-list-head" <%if(data.currentPage != 1 || data.hot.length == 0){%>style="display:none;"<%}%>>\n		<h3 class="title"><%=joinNewCommentTest ? \'大家都在聊\' : \'最新评论\'%></h3>\n	</div>\n	<div class="comment-list-body">\n		<%if(data.comment.length>0){%>\n			<%data.comment.forEach(function(item){%>\n				' + r + '\n			<%});%>\n		<%}else{%>\n			<div class="comment-empty"><h3>暂无新评论～</h3></div>\n		<%}%>\n	</div>\n</div>\n\n<div class="comment-pager-footer">\n	<%==pagerHtml%>\n</div>';
    e.exports = i
}
, function(e, t) {
    e.exports = '<div class="comment-item" data-id="<%=item.id%>">\n	<div class="comment-content">\n		<div class="comment-user-avatar">\n			<a href="<%=userDomain%><%=item.user.userCode%>" target="_blank"><img _hz="" src="<%=item.user.avatarMiddle%>"></a>\n		</div>\n		<div class="comment-section">\n			<div class="comment-user-info">\n				<a href="<%=userDomain%><%=item.user.userCode%>" class="<%if(item.user.vipInfo && [100002,100004,100006].indexOf(item.user.vipInfo.mmid) != -1){%>redname<%}%>" target="_blank">\n					<%==getActivityName(item.user.userActName, item.user.color)%><%=item.user.aliasName || item.user.userName%>\n				</a>\n				<%if(videoOwnerId == item.user.userId){%>\n					<span class="comment-usertitle">频道主</span>\n				<%}%>\n				<%if(item.user.vipInfo && [100002,100004,100006].indexOf(item.user.vipInfo.mmid) != -1){%>\n					<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank">\n						<span class="vip-level-icon" style="background: url(<%=item.user.vipInfo.icon%>);height: 22px;margin: 0;"></span>\n					</a>\n				<%}%>\n\n				<%if(item.user.userLevel && item.user.userLevel>5){%>\n					<a href="//lv.youku.com/page/grade/compare?uid=<%=item.user.userId%>" target="_blank" title="用户等级" class="user-grade-icon user-grade-lv<%=item.user.userLevel%>"></a>\n				<%}%>\n				<span class="comment-timestamp"><%=util.release(item.createTime)%></span>\n			</div>\n\n			<div class="comment-text">\n				<p>\n					<%if(item.flags && item.flags.isTop){%>\n						<i class="comment-ico comment-ico-top"></i>\n					<%}%>\n					<%==textTransform(item.content, item)%>\n				</p>\n				<%if(item.parentComment && item.parentComment.content && item.parentComment.user){%>\n					<p class="comment-source">\n						<a href="<%=userDomain%><%=item.parentComment.user.userCode%>" target="_blank"  class="<%if(item.parentComment.isVip){%>redname<%}%>"><%=item.parentComment.user.userName%></a>:\n						<%==textTransform(item.parentComment.content, item.parentComment)%>\n					</p>\n				<%}%>\n\n				<%==commentImage.render({ picList: item.picList })%>\n			</div>\n\n			<% var toolbarHtml = !toolbar ? \'\' : toolbar.render({\n				id: item.id,\n				upCount: item.upCount, \n				downCount: item.downCount,\n				replyCount: item.replyCount,\n				isTop: item.flags.isTop,\n				userId: item.user.userId, \n				userName: item.user.userName,\n				canDelete: userPermission.canDelete || loginUserInfo.yid == item.user.userId || loginUserInfo.userId == item.user.userId,\n				canSetTop: userPermission.canSetTop,\n				showReply: allowReply ? true : item.replyCount > 0\n			})%>\n			<%==toolbarHtml%>\n		</div>\n		<%if(item.flags && item.flags.isFame){%>\n			<div class="starbg"></div>\n		<%}%>\n	</div>\n</div>\n'
}
, function(e, t, n) {
    "use strict";
    var r = n(109);
    e.exports = '\n<% var pagerHtml = data.totalPage > 1 ?\n	pager.render({ currentPage: data.currentPage, totalPage: data.totalPage, totalSize: data.totalSize }) :\n	\'\';\n%>\n<%==pagerHtml%>\n<div class="comment-list-box">\n	<div class="comment-list-head comment-myreply-tab">\n		<a data-usertype="myComment" class="<%if(userType==\'myComment\'){%> active<%}%>">我收到的评论回复<%if(myComment){%>(<%=myComment%>)<%}%></a>\n		<a data-usertype="myVideoComment" class="<%if(userType==\'myVideoComment\'){%> active<%}%>">我收到的视频评论<%if(myVideoComment){%>(<%=myVideoComment%>)<%}%></a>\n	</div>\n\n	<%if(data.userComment.length>0){%>\n		<!--body begin-->\n		<div class="comment-list-body">\n			<%data.userComment.forEach(function(item,i){%>\n				<!--一条回复内容 begin-->	\n				' + r + '\n				<!--一条回复内容 end-->\n			<%});%>\n		</div>\n		<!--body end-->\n	<%}else{%>\n		<div class="comment-empty"><h3>暂无评论～</h3></div>\n	<%}%>\n</div>\n<%==pagerHtml%>\n'
}
, function(e, t) {
    e.exports = '<div class="comment-item">\n	<div class="comment-content">\n		<div class="comment-user-avatar">\n			<a href="<%=userDomain%><%=item.user.userCode%>" target="_blank"><img _hz="" src="<%=item.user.avatarMiddle%>"></a>\n		</div>\n		<div class="comment-section">\n			<div class="comment-user-info">\n				<a href="<%=userDomain%><%=item.user.userCode%>" class="<%if(item.user.vipInfo && [100002,100004,100006].indexOf(item.user.vipInfo.mmid) != -1){%>redname<%}%>" target="_blank"><%=item.user.userName%></a>\n\n				<%if(item.user.vipInfo){%>\n					<%if(item.user.vipInfo.mmid=="100002"){%>\n						<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span  <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%> class="vip-level-icon level-vip<%=item.user.vipInfo.vipGrade%>"></span></a>\n					<%}else if(item.user.vipInfo.mmid=="100004"){%>\n						<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span  <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%> class="vip-level-icon level-lvip<%=item.user.vipInfo.vipGrade%>"></span></a>\n					<%}else if(item.user.vipInfo.mmid=="100006"){%>\n						<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank"><span <%if(item.user.vipInfo.icon){%>style="background: url(<%=item.user.vipInfo.icon%>) 0px 0px no-repeat;height: 22px;"<%}%> class="vip-level-icon level-vip<%=item.user.vipInfo.vipGrade%>" ></span></a>\n					<%}%>\n				<%}%>\n\n				<%if(item.user.userLevel && item.user.userLevel>5){%>\n					<a href="//lv.youku.com/page/grade/compare?uid=<%=item.user.userId%>" target="_blank" title="用户等级" class="user-grade-icon user-grade-lv<%=item.user.userLevel%>"></a>\n				<%}%>\n				<span class="comment-timestamp"><%=util.release(item.createTime)%> </span>\n			</div>\n			<div class="comment-text">\n				<p>\n					<%==textTransform(item.content, item)%>\n				</p>\n			</div>\n			<div class="comment-section comment-myreply">\n				<div class="comment-text">\n					<%if(item.parentComment){%>\n						我的评论：<%==textTransform(item.parentComment.content, item)%>\n					<%}%>\n				</div>\n				<div class="comment-myreply-source">\n					<%if(item.videoInfo && item.videoInfo.thumburl){%>\n						<a class="source-video-img" href="//v.youku.com/v_show/id_<%=item.videoInfo.videoId%>"><img src="<%=item.videoInfo.thumburl%>" alt="视频截图"></a>\n						<%if(item.videoInfo.videoId){%>\n						<p class="source-video-name">来自视频：<a href="//v.youku.com/v_show/id_<%=item.videoInfo.videoId%>"><%=item.videoInfo.title%></a></p>\n						<%}%>\n					<%}%>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n'
}
, function(e, t) {
    e.exports = '\n<% var pagerHtml = data.totalPage > 1 ? \n	pager.render({ currentPage: data.page, totalPage: data.totalPage, totalSize: data.pageResult.totalSize }) :\n	\'\';\n%>\n<%==pagerHtml%>\n\n<%if(data.pageResult.data){%>\n	<div class="comment-list-box">\n		<div class="comment-list-body comment-list-db">\n			<%data.pageResult.data.forEach(function(item,i){%>\n				<%if(i < data.lastpagenumber){%>\n				<div class="comment-item <%if(item.islastone){%>comment_last<%}%>">\n					<div class="comment-user-info">\n						<a href="<%=item.author.alt%>" target="_blank"><%=item.author.name%></a>\n						<label><i class="comment-ico comment-ico-db"></i></label>\n					</div>\n\n					<div class="comment-text"><%=item.content%></div>\n					<div class="panel"><span class="comment-timestamp"><%=item.created_at%></span></div>\n\n				</div>\n				<%}%>\n			<%});%>\n			<%if(data.cometoDouBanUrl){%>\n				<div class="more"><a href="<%=data.cometoDouBanUrl%>" target = "_blank">去豆瓣查看更多</a></div>\n			<%}%>\n		</div>\n	</div>\n<%}else{%>\n	<div class="comment-empty"><h3>暂无豆瓣评论～</h3></div>\n<%}%>\n\n<%==pagerHtml%>\n'
}
, function(e, t, n) {
    "use strict";
    function b(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = b(r);
    var s = n(41);
    var o = b(s);
    var u = n(84);
    var a = b(u);
    var f = n(112);
    var l = b(f);
    var c = n(99);
    var h = b(c);
    var p = n(97);
    var d = b(p);
    var v = n(89);
    var m = b(v);
    var g = n(86);
    var y = b(g);
    var w = n(115);
    var E = i["default"].compile(w);
    var S = o["default"].extend({
        initialize: function(t) {
            var n = this;
            n.objectInfo = t.objectInfo;
            n.postsContent = new l["default"]({
                objectInfo: n.objectInfo
            });
            n.commentImage = new d["default"]({
                el: n.$el
            });
            n.toolbar = new h["default"]({
                el: n.$el,
                objectInfo: n.objectInfo,
                items: {
                    showUp: true,
                    showDown: true,
                    showReply: true
                },
                commentReply: function(t) {
                    n.showContent(t);
                    return false
                }
            });
            $(window).on("resize", function() {
                setTimeout(function() {
                    n.computeContentFold(true)
                }, 200)
            });
            if (t.el && t.lazyLoad !== true) {
                n.loadPosts(3)
            }
        },
        events: {
            "click .posts-fold-btn": "showContent",
            "click .posts-title a": "showContent",
            "click .posts-more a": "loadMore"
        },
        loadMore: function(t) {
            var n = this;
            var r = $(t.target).parent();
            r.addClass("posts-more-loading");
            n.loadPosts(10, "", function() {
                r.removeClass("posts-more-loading")
            })
        },
        refresh: function(t) {
            this.listType = t;
            this.lastPostId = 0;
            this.loadPosts(3, "html")
        },
        loadPosts: function(t, n, r) {
            var i = this;
            a["default"].getPosts({
                app: "pc",
                objectId: i.objectInfo.objectId,
                objectType: i.objectInfo.objectType,
                listType: i.listType || 0,
                lastPostId: i.lastPostId,
                limit: t
            }, function(e) {
                if (e.code == 0) {
                    i.lastPostId = e.data.lastPostId;
                    var t = $(">.posts-list,>.posts-more", i.$el);
                    if (t.length === 0) {
                        t = $('<div class="posts-list"></div><div class="posts-more"><a href="javascript:;">查看更多</a></div>').appendTo(i.$el)
                    }
                    t.eq(0)[n || "append"](E({
                        data: e.data.posts,
                        toolbar: i.toolbar,
                        videoOwnerId: y["default"].globals.page.videoOwner,
                        commentImage: i.commentImage,
                        escapePostsHtml: m["default"].escapePostsHtml,
                        userDomain: y["default"].globals.userDomain
                    }))
                }
                r && r();
                i.trigger("load:after", [e.data && e.data.posts])
            })
        },
        showContent: function(t) {
            this.postsContent.render($(t.target).closest(".posts-item").data("id"))
        },
        computeContentFold: function(t) {
            var n = this;
            var r = n.$el.find(".posts-text");
            var i = Math.floor(14 * 1.8);
            var s = Math.floor(r.width() / 14);
            r.each(function(e, n) {
                var r = $(n);
                if (t !== true && $(".posts-fold-btn", r).length > 0) {
                    return true
                }
                var o = r.outerHeight();
                if (r.get(0).scrollHeight - o > 1) {
                    var u = r.find(">p,>br");
                    var a;
                    r.find(".posts-fold-btn").remove();
                    u.each(function(e, t) {
                        var n = $(t);
                        var r = t.nodeName.toLowerCase();
                        if (n.position().top + (n.height() || i) < o) {
                            r === "p" && (a = n);
                            return true
                        }
                        if (r === "br") {
                            n = a
                        }
                        if (!n) {
                            return
                        }
                        var u = n.html();
                        var f = Math.floor((o - n.position().top) / i * s - 6);
                        f = Math.min(f, u.length);
                        var l = new RegExp("(.{" + f + "})(.*)");
                        n.html(u.replace(l, '$1<a href="javascript:;" data-id="" class="posts-fold-btn posts-fold-btn-show">&nbsp;&nbsp;阅读全文<br/><br/><br/><br/></a>$2'));
                        return false
                    })
                }
            })
        }
    });
    e.exports = S
}
, function(e, t, n) {
    "use strict";
    function x(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(25);
    var i = x(r);
    var s = n(41);
    var o = x(s);
    var u = n(113);
    var a = x(u);
    var f = n(24);
    var l = x(f);
    var c = n(84);
    var h = x(c);
    var p = n(99);
    var d = x(p);
    var v = n(95);
    var m = x(v);
    var g = n(77);
    var y = x(g);
    var b = n(86);
    var w = x(b);
    var E = n(90);
    var S = x(E);
    a["default"].zIndex = 2e4;
    var T = n(114);
    var N = i["default"].compile(T);
    var C = o["default"].extend({
        initialize: function(t) {
            var n = this;
            n.objectInfo = t.objectInfo;
            n.param = t || {};
            n.initCommon()
        },
        scrollForm: function() {
            var t = this;
            var n = t.form;
            if (!n) {
                return
            }
            var r = t.$el;
            r.scrollTop(r.scrollTop() + n.$el.get(0).getBoundingClientRect().top);
            n.focus()
        },
        eventsPopup: {
            "click .posts-content-popup-close": function() {
                this.popup && this.popup.remove()
            }
        },
        eventsPage: {},
        initPage: function() {
            this.$el.html('<div class="posts-cotent-loading">')
        },
        remove: function() {
            self.popup && self.popup.remove();
            self.form && self.form.remove();
            self.form = null;
            self.popup = null;
            self.$el = null
        },
        togglePlay: function(t, n) {
            $("html,body").css({
                overflow: t ? "" : "hidden"
            });
            var r = window.ykPlyr;
            if (r && $.isFunction(r.PlayerPause)) {
                r.PlayerPause(n)
            }
        },
        initPopup: function() {
            var t = this;
            var n = new a["default"];
            n.clickbackdropclose = true;
            n.fixed = true;
            n.className = "posts-content-popup";
            n.setHtml('<div class="posts-content-popup-body"><a class="iconfont posts-content-popup-close"></a><div class="posts-cotent-loading"></div></div>');
            var r = document.getElementById("movie_player");
            var i;
            n.onshow = function() {
                if (r && r.isPause) {
                    i = r.isPause()
                }
                t.togglePlay(false, true)
            }
            ;
            n.onremove = function() {
                t.togglePlay(true, i == undefined ? false : i);
                t.remove()
            }
            ;
            t.popup = n;
            t.events = t.eventsPopup;
            t.setElement($(".posts-content-popup-body", $(n.node)), true);
            $(n.node).on("click", function(e) {
                if (e.target === e.currentTarget) {
                    n && n.remove()
                }
            });
            n.showModal()
        },
        initCommon: function() {
            var t = this;
            t.userPermission = {
                canSetTop: false,
                canDelete: false
            }
        },
        render: function(t) {
            var n = this;
            n.param.el ? n.initPage() : n.initPopup();
            if (!n.$el) {
                console.error("not found contentNode");
                return
            }
            h["default"].getPostsContent({
                app: "pc",
                objectId: n.objectInfo.objectId,
                objectType: n.objectInfo.objectType,
                postId: t
            }, function(e) {
                if (e.code != 0) {
                    return
                }
                n.param.el && e.data.title && (document.title = e.data.title);
                n.toolbar = new d["default"]({
                    el: n.$el,
                    objectInfo: n.objectInfo,
                    items: {
                        showUp: true,
                        showDown: true,
                        showReply: true
                    },
                    commentReply: function() {
                        n.scrollForm();
                        return false
                    }
                });
                $(".posts-cotent-loading", n.$el).replaceWith(N({
                    data: e.data,
                    toolbar: n.toolbar,
                    videoOwnerId: w["default"].globals.page.videoOwner,
                    escapePostsHtml: n.escapePostsHtml.bind(n),
                    userDomain: w["default"].globals.userDomain
                }));
                var r = n.form = new y["default"]({
                    el: $(".posts-comment-form", n.$el),
                    submitArgs: {
                        objectId: t,
                        objectType: 2
                    },
                    picUploadId: "posts",
                    faces: {
                        rangeNode: n.$el
                    }
                });
                r.bind("submit:success", function(e) {
                    if (e.code != 0) {
                        return
                    }
                    i.add({
                        userName: e.data.userName,
                        userImage: e.data.avatarMiddle,
                        picList: e.picList,
                        content: e.params.content
                    }, function() {})
                });
                var i = new m["default"]({
                    el: $(".posts-comment-list", n.$el),
                    parentModule: n,
                    objectInfo: {
                        objectId: t,
                        objectType: 2
                    },
                    userPermission: {
                        canDelete: (S["default"].getUserInfo() || {}).userId == e.data.user.userId,
                        canSetTop: false
                    },
                    scroll: {
                        container: n.$el,
                        scrollTop: function(t) {
                            return n.$el.scrollTop() + t[0].getBoundingClientRect().top
                        }
                    }
                });
                i.load({
                    listType: 0,
                    currentPage: 1
                })
            })
        },
        escapePostsHtml: function(t) {
            var n = this;
            t = Utils.escapePostsHtml(t);
            t = n.parseActiveMark(t);
            return t
        },
        parseActiveMark: function(t) {
            var n = this;
            var r;
            t = t.replace(/\[activity\s+([^\]]+)\]/, function(e, t) {
                r = t || 0;
                return ""
            });
            if (r) {
                t = '<p class="posts-activity"></p>' + t;
                h["default"].getActivityInfo({
                    activityId: r
                }, function(e) {
                    if (e.code != 0) {
                        return
                    }
                    var t = [];
                    (e.data.roleList || []).forEach(function(e) {
                        if (!e || e.id === undefined) {
                            return
                        }
                        t.push('<span><a class="role-bgimg"  href="javascript:;" data-id="' + r + '" data-role="' + e.id + '">' + e.roleName + "</a></span>")
                    });
                    if (t.length > 0) {
                        t.push("<span>已领取昵称的人数：" + e.data.count + "</span>")
                    }
                    $(".posts-activity", n.$el).on("click", "a", function i(e) {
                        if (!S["default"].isLogin()) {
                            return S["default"].login(function() {
                                i(e)
                            })
                        }
                        var t = $(e.target);
                        h["default"].addActivityName({
                            activityId: t.data("id"),
                            roleId: t.data("role")
                        }, function(e) {
                            var t;
                            switch (e.code) {
                            case 0:
                                t = "你已经成功领取应援昵称：" + e.data + "，快来给你的爱豆应援吧。";
                                break;
                            case 5010:
                                t = "不要贪心哦，你已经领取过昵称了，直接去说些什么吧。";
                                break;
                            default:
                                t = e.message;
                                break
                            }
                            l["default"].alert({
                                zIndex: 20010,
                                content: t
                            })
                        })
                    }).html(t.join(""))
                })
            }
            return t
        }
    });
    e.exports = C
}
, function(e, t, n) {
    var r, i;
    "use strict";
    !(r = [],
    i = function() {
        function n() {
            this.destroyed = false;
            this.__popup = $("<div />").css({
                display: "none",
                position: "absolute",
                outline: 0
            }).attr("tabindex", "-1").html(this.innerHTML).appendTo("body");
            this.__backdrop = this.__mask = $("<div />").css({
                opacity: .7,
                background: "#000"
            }).append($("<iframe />").attr("frameborder", 0).css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#000",
                opacity: 0
            }));
            this.node = this.__popup[0];
            this.backdrop = this.__backdrop[0]
        }
        var e = !("minWidth"in $("html")[0].style);
        var t = !e;
        $.extend(n.prototype, {
            node: null,
            backdrop: null,
            fixed: false,
            destroyed: true,
            open: false,
            returnValue: "",
            autofocus: true,
            align: "bottom left",
            innerHTML: "",
            className: "ui-popup",
            setHtml: function(t) {
                var n = this.__popup;
                if (n) {
                    n.html(t)
                }
                return this
            },
            show: function(i) {
                if (this.destroyed) {
                    return this
                }
                var s = this.__popup;
                var o = this.__backdrop;
                this.__activeElement = this.__getActive();
                this.open = true;
                this.follow = i || this.follow;
                if (!this.__ready) {
                    s.addClass(this.className).attr("role", this.modal ? "alertdialog" : "dialog").css("position", this.fixed ? "fixed" : "absolute");
                    if (!e) {
                        $(window).on("resize", $.proxy(this.reset, this))
                    }
                    if (this.modal) {
                        var u = {
                            position: "fixed",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            userSelect: "none",
                            zIndex: this.zIndex || n.zIndex
                        };
                        s.addClass(this.className + "-modal");
                        if (!t) {
                            $.extend(u, {
                                position: "absolute",
                                width: $(window).width() + "px",
                                height: $(document).height() + "px"
                            })
                        }
                        o.css(u).attr({
                            tabindex: "0"
                        }).on("focus", $.proxy(this.focus, this));
                        this.__mask = o.clone(true).attr("style", "").insertAfter(s);
                        o.addClass(this.className + "-backdrop").insertBefore(s);
                        this.__ready = true
                    }
                    if (!s.html()) {
                        s.html(this.innerHTML)
                    }
                }
                s.addClass(this.className + "-show").show();
                o.show();
                this.reset().focus();
                this.__dispatchEvent("show");
                return this
            },
            showModal: function() {
                this.modal = true;
                return this.show.apply(this, arguments)
            },
            close: function(t) {
                if (!this.destroyed && this.open) {
                    if (t !== undefined) {
                        this.returnValue = t
                    }
                    this.__popup.hide().removeClass(this.className + "-show");
                    this.__backdrop.hide();
                    this.open = false;
                    this.blur();
                    this.__dispatchEvent("close")
                }
                return this
            },
            remove: function() {
                if (this.destroyed) {
                    return this
                }
                this.__dispatchEvent("beforeremove");
                if (n.current === this) {
                    n.current = null
                }
                this.__popup.remove();
                this.__backdrop.remove();
                this.__mask.remove();
                if (!e) {
                    $(window).off("resize", this.reset)
                }
                this.__dispatchEvent("remove");
                for (var r in this) {
                    delete this[r]
                }
                return this
            },
            reset: function() {
                var t = this.follow;
                if (t) {
                    this.__follow(t)
                } else {
                    this.__center()
                }
                this.__dispatchEvent("reset");
                return this
            },
            focus: function() {
                var t = this.node;
                var r = this.__popup;
                var i = n.current;
                var s = this.zIndex = n.zIndex++;
                if (i && i !== this) {
                    i.blur(false)
                }
                if (!$.contains(t, this.__getActive())) {
                    var o = r.find("[autofocus]")[0];
                    if (!this._autofocus && o) {
                        this._autofocus = true
                    } else {
                        o = t
                    }
                    this.__focus(o)
                }
                r.css("zIndex", s);
                n.current = this;
                r.addClass(this.className + "-focus");
                this.__dispatchEvent("focus");
                return this
            },
            blur: function() {
                var t = this.__activeElement;
                var n = arguments[0];
                if (n !== false) {
                    this.__focus(t)
                }
                this._autofocus = false;
                this.__popup.removeClass(this.className + "-focus");
                this.__dispatchEvent("blur");
                return this
            },
            addEventListener: function(t, n) {
                this.__getEventListener(t).push(n);
                return this
            },
            removeEventListener: function(t, n) {
                var r = this.__getEventListener(t);
                for (var i = 0; i < r.length; i++) {
                    if (n === r[i]) {
                        r.splice(i--, 1)
                    }
                }
                return this
            },
            __getEventListener: function(t) {
                var n = this.__listener;
                if (!n) {
                    n = this.__listener = {}
                }
                if (!n[t]) {
                    n[t] = []
                }
                return n[t]
            },
            __dispatchEvent: function(t) {
                var n = this.__getEventListener(t);
                if (this["on" + t]) {
                    this["on" + t]()
                }
                for (var r = 0; r < n.length; r++) {
                    n[r].call(this)
                }
            },
            __focus: function(t) {
                try {
                    if (this.autofocus && !/^iframe$/i.test(t.nodeName)) {
                        t.focus()
                    }
                } catch (n) {}
            },
            __getActive: function() {
                try {
                    var t = document.activeElement;
                    var n = t.contentDocument;
                    var r = n && n.activeElement || t;
                    return r
                } catch (i) {}
            },
            __center: function() {
                var t = this.__popup;
                var n = $(window);
                var r = $(document);
                var i = this.fixed;
                var s = i ? 0 : r.scrollLeft();
                var o = i ? 0 : r.scrollTop();
                var u = n.width();
                var a = n.height();
                var f = t.width();
                var l = t.height();
                var c = (u - f) / 2 + s;
                var h = (a - l) * 382 / 1e3 + o;
                var p = t[0].style;
                p.left = Math.max(parseInt(c), s) + "px";
                p.top = Math.max(parseInt(h), o) + "px"
            },
            __follow: function(t) {
                var n = t.parentNode && $(t);
                var r = this.__popup;
                if (this.__followSkin) {
                    r.removeClass(this.__followSkin)
                }
                if (n) {
                    var i = n.offset();
                    if (i.left * i.top < 0) {
                        return this.__center()
                    }
                }
                var s = this;
                var o = this.fixed;
                var u = $(window);
                var a = $(document);
                var f = $(this.rangeNode);
                var l = 0;
                var c = 0;
                var h = 0;
                var p = 0;
                var d = f.offset();
                if (d) {
                    l = d.left;
                    c = d.top;
                    p = f.width();
                    h = f.height()
                }
                var v = u.width();
                var m = u.height();
                var g = a.scrollLeft();
                var y = a.scrollTop();
                var b = r.width();
                var w = r.height();
                var E = n ? n.outerWidth() : 0;
                var S = n ? n.outerHeight() : 0;
                var x = this.__offset(t);
                var T = x.left;
                var N = x.top;
                var C = o ? T - g : T;
                var k = o ? N - y : N;
                var L = m + y;
                var A = h + c;
                var O = v + g;
                var M = p + l;
                var _ = o ? 0 : g > l ? g : l;
                var D = o ? 0 : y > c ? y : c;
                var P = _ - b + (O > M ? l < g ? M - g : p : l > g ? O - l : v);
                var H = D - w + (L > A ? c < y ? A - y : h : c > y ? L - c : m);
                var B = {};
                var j = this.align.split(" ");
                var F = this.className + "-";
                var I = {
                    top: "bottom",
                    bottom: "top",
                    left: "right",
                    right: "left"
                };
                var q = {
                    top: "top",
                    bottom: "top",
                    left: "left",
                    right: "left"
                };
                var R = [{
                    top: k - w,
                    bottom: k + S,
                    left: C - b,
                    right: C + E
                }, {
                    top: k,
                    bottom: k - w + S,
                    left: C,
                    right: C - b + E
                }];
                var U = {
                    left: C + E / 2 - b / 2,
                    top: k + S / 2 - w / 2
                };
                var z = {
                    left: [_, P],
                    top: [D, H]
                };
                $.each(j, function(e, t) {
                    if (R[e][t] > z[q[t]][1]) {
                        t = j[e] = I[t]
                    }
                    if (R[e][t] < z[q[t]][0]) {
                        j[e] = I[t]
                    }
                });
                if (!j[1]) {
                    q[j[1]] = q[j[0]] === "left" ? "top" : "left";
                    R[1][j[1]] = U[q[j[1]]]
                }
                F += j.join("-") + " " + this.className + "-follow";
                s.__followSkin = F;
                if (n) {
                    r.addClass(F)
                }
                B[q[j[0]]] = parseInt(R[0][j[0]]);
                B[q[j[1]]] = parseInt(R[1][j[1]]);
                r.css(B)
            },
            __offset: function(t) {
                var n = t.parentNode;
                var r = n ? $(t).offset() : {
                    left: t.pageX,
                    top: t.pageY
                };
                t = n ? t : t.target;
                var i = t.ownerDocument;
                var s = i.defaultView || i.parentWindow;
                if (s == window) {
                    return r
                }
                var o = s.frameElement;
                var u = $(i);
                var a = u.scrollLeft();
                var f = u.scrollTop();
                var l = $(o).offset();
                var c = l.left;
                var h = l.top;
                return {
                    left: r.left + c - a,
                    top: r.top + h - f
                }
            }
        });
        n.zIndex = 1024;
        n.current = null;
        return n
    }
    .apply(t, r),
    i !== undefined && (e.exports = i))
}
, function(e, t) {
    e.exports = '<div class="posts-content">\n	<div class="posts-item">\n		<div class="posts-title">\n			<%=data.title%>\n		</div>\n		\n		<div class="posts-userinfo posts-spacing">\n			<a href="<%=userDomain%><%=data.user.userCode%>" class="<%if(data.user.vipInfo && [100002,100004,100006].indexOf(data.user.vipInfo.mmid) != -1){%>redname<%}%>" target="_blank"><%=data.user.userName%></a>\n			<span class="posts-usertitle"><%=videoOwnerId == data.user.userId ? \'频道主\' : \'楼主\'%></span>\n			<%if(data.user.vipInfo && [100002,100004,100006].indexOf(data.user.vipInfo.mmid) != -1){%>\n				<a href="http://vip.youku.com/" title="<%=data.user.vipInfo.name%>" target="_blank">\n					<span class="vip-level-icon" style="background: url(<%=data.user.vipInfo.icon%>);height: 22px;margin: 0;"></span>\n				</a>\n			<%}%>\n\n			<%if(data.user.userLevel && data.user.userLevel>5){%>\n				<a href="http://lv.youku.com/page/grade/compare?uid=<%=data.user.userId%>" target="_blank" title="用户等级" class="user-grade-icon user-grade-lv<%=data.user.userLevel%>"></a>\n			<%}%>\n\n			<span class="posts-timestamp"><%=data.createTimeFormat.replace(\'发表于\',\'\')%></span>\n		</div>\n\n		<div class="posts-text">\n			<%==escapePostsHtml(data.content)%>\n		</div>\n\n		<div class="posts-handle fix">\n			<div class="posts-share" style="display:none;">\n				<span class="posts-share-title">分享</span>\n				<a href="javascript:;" class="posts-share-btn icon-weixin"></a>\n				<a href="javascript:;" class="posts-share-btn icon-weibo"></a>\n				<a href="javascript:;" class="posts-share-btn icon-qzone"></a>\n				<a href="javascript:;" class="posts-share-btn icon-qq"></a>\n			</div>\n\n			<% var toolbarHtml = toolbar.render({ \n				id: data.postId,\n				upCount: data.upCount, \n				downCount: data.downCount,\n				replyCount: data.commentCount, \n				userId: data.user.userId,\n				userName: data.user.userName,\n			})%>\n			<%==toolbarHtml%>\n		</div>\n	</div>\n	<div class="posts-comment">\n		<div class="posts-comment-form"></div>\n		<div class="posts-comment-list"></div>\n	</div>\n</div>'
}
, function(e, t) {
    e.exports = '<%data.forEach(function(item,i){%>\n	<div class="posts-item" data-id="<%=item.postId%>">\n\n		<div class="posts-userphoto">\n			<a href="<%=userDomain%><%=item.user.userCode%>" target="_blank">\n				<img src="<%=item.user.avatarLarge%>">\n			</a>\n		</div>\n		<div class="posts-section">\n			<div class="posts-userinfo">\n				<a href="<%=userDomain%><%=item.user.userCode%>" class="<%if(item.user.vipInfo && [100002,100004,100006].indexOf(item.user.vipInfo.mmid) != -1){%>redname<%}%>" target="_blank"><%=item.user.userName%></a>\n				<% if(videoOwnerId == item.user.userId){%>\n					<span class="posts-usertitle">频道主</span>\n				<%}%>\n				\n				<%if(item.user.vipInfo && [100002,100004,100006].indexOf(item.user.vipInfo.mmid) != -1){%>\n					<a href="http://vip.youku.com/" title="<%=item.user.vipInfo.name%>" target="_blank">\n						<span class="vip-level-icon" style="background: url(<%=item.user.vipInfo.icon%>);height: 22px;margin: 0;"></span>\n					</a>\n				<%}%>\n\n				<%if(item.user.userLevel && item.user.userLevel>5){%>\n					<a href="//lv.youku.com/page/grade/compare?uid=<%=item.user.userId%>" target="_blank" title="用户等级" class="user-grade-icon user-grade-lv<%=item.user.userLevel%>"></a>\n				<%}%>\n\n				<span class="posts-timestamp"><%=item.createTimeFormat.replace(\'发表于\',\'\')%></span>\n			</div>\n\n			<div class="posts-title posts-spacing">\n				<a href="javascript:;"><%=item.title%></a>\n			</div>\n\n			<div class="posts-text">\n				<%==escapePostsHtml(item.digest)%>\n			</div>\n\n			<div class="posts-image">\n				<%==commentImage.render({ picList: item.picList })%>\n			</div>\n\n			<%if(item.stamp){%>\n				<div class="posts-tag">\n					<img src="<%=item.stamp%>" alt="">\n				</div>\n			<%}%>\n			\n			<% var toolbarHtml = toolbar.render({ \n				id: item.postId,\n				upCount: item.upCount, \n				downCount: item.downCount,\n				replyCount: item.commentCount,\n				userId: item.user.userId,\n				userName: item.user.userName,\n			})%>\n			<%==toolbarHtml%>\n		</div>\n	</div>\n<%})%>'
}
, function(e, t, n) {
    "use strict";
    function u(e) {
        return e && e.__esModule ? e : {
            "default": e
        }
    }
    var r = n(41);
    var i = u(r);
    var s = n(75);
    var o = u(s);
    var a = i["default"].extend({
        initialize: function(t) {
            var n = this;
            var r = t.params;
            n.modelEvents(t.form, "form");
            n.dataStore = o["default"].getInstance(r)
        },
        boom: function(t, n) {
            var r = this;
            var i = $(window).scrollTop() - 222;
            var s = $("#videoCommentlist .comment-list-main");
            if (s.length > 0) {
                i = s.offset().top - 300
            }
            if (n == "png" || n == "gif") {
                var o = '<img src="' + t + '">';
                r.$egg = $('<div style="z-index:99;position:absolute;left:50%;margin-left:-430px;top:50%; margin-top:' + i + 'px;width:860px;height:444px;background:transparent;">' + o + "</div>");
                $(document.body).append(r.$egg)
            } else {
                var u = '<object type="application/x-shockwave-flash" data="' + t + '" width="100%" height="100%"><param name="wmode" value="transparent"><param name="movie" value="' + t + '" width="100%" height="100%"><embed src="' + t + '" width="100%" height="100%" border="0" align="center" wmode="transparent"></object>';
                r.$egg = $('<div style="z-index:99;position:absolute;left:50%;margin-left:-430px;top:50%; margin-top:' + i + 'px;width:860px;height:444px;background:transparent;">' + u + "</div>");
                $(document.body).append(r.$egg)
            }
            setTimeout(function() {
                r.$egg.remove()
            }, 11e3)
        },
        "{form} submit:success": function(t) {
            var n = this;
            var r = n.dataStore.get("comment");
            if (!r) {
                return
            }
            var i = r[0];
            if (i) {
                r = r[0]
            } else {
                r = r.show ? r.show : r.folder
            }
            if (r && r.content.length > 0) {
                var s = JSON.parse(r.content);
                if (!s || s.length <= 0)
                    return;
                for (var o = 0, u = s.length; o < u; o++) {
                    if (s[o].keywordContent.length <= 0)
                        continue;
                    var a = new RegExp(s[o].keywordContent.replace(",", "|"));
                    if (a.test(t.params.content)) {
                        n.boom(s[o].keywordlink, s[o].keywordtype);
                        break
                    }
                }
            }
        }
    });
    e.exports = a
}
, function(e, t) {
    e.exports = '<div class="comment-area <%=videoClass%>" <%=getSpmConfig(\'comment\')%> >\n	<div id="commentAction" class="comment-area-form"></div>\n	<div id="videocomment" class="comment-area-box">\n		<div class="comment-tab">\n			<ul class="comment-tab-left">\n				<li data-type="all" class="current comment-show">全部评论<em class="num" id="allCommentNum"></em></li>\n				<li data-type="db">豆瓣评论</li>\n				<li data-type="owner">频道主说</li>\n				<li data-type="star">明星说</li>\n			</ul>\n			<ul class="comment-tab-right">\n				<li data-type="my">我的评论消息</li>\n				<li data-type="input" <%=getSpmConfig(\'commentinput\')%> ><i class="icon-publish-comment"></i>发表评论</li>\n			</ul>\n		</div>\n\n		<div class="comment-new-tooltip" style="display:none;">\n			<a style="display:block;" charset="hz-4001208" href="javascript:;">有新评论，刷新看看</a>\n		</div>\n\n		<div class="comment-area-list">\n			<div id="videoPostslist" class="posts-list-area comment-list-box">\n				<div class="comment-list-head">\n					<h3 class="title">热门<%=isShowVideo > 0 ? \'影评\' : \'长评\'%></h3>\n				</div>\n				<div class="comment-list-body">\n				</div>\n			</div>\n			<div id=\'videoCommentlist\'></div>\n		</div>\n\n		<div class="forbid forbidden_comment" style="display:none">\n			<h3>当前视频暂不支持评论。</h3>\n		</div>\n		\n		<div id="commentPublish" class="comment-tooltip">\n			<a href="javascript:;">发表评论</a>\n		</div>\n	</div>\n</div>'
}
])
