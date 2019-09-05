(function () {
    'use strict';

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        class MainStageUI extends Laya.Scene {
            constructor() { super(); }
            createChildren() {
                super.createChildren();
                this.loadScene("MainStage");
            }
        }
        ui.MainStageUI = MainStageUI;
        REG("ui.MainStageUI", MainStageUI);
    })(ui || (ui = {}));

    class MainStage extends ui.MainStageUI {
        constructor() { super(); }
        onEnable() {
        }
        onDisable() {
        }
    }

    class Adaptation extends Laya.Script {
        constructor() {
            super();
            this.stage_width = 640;
            this.stage_height = 1136;
            this.browser_scale_last = 1;
            this.first_setpos = false;
            Laya.init(this.stage_width, this.stage_height);
            Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
            Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
            Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
            Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
        }
        onEnable() {
            this.root = this.owner;
        }
        resetRootPos() {
            if (this.root != null) {
                var tempX = 0;
                var tempY = 0;
                var tempWidth = Math.abs(Laya.stage.width - this.stage_width);
                tempX = tempWidth / 2;
                var tempHeight = Math.abs(Laya.stage.height - this.stage_height);
                tempY = tempHeight / 2;
                if (tempX != 0 || tempY != 0) {
                    this.root.pos(tempX, tempY);
                }
            }
        }
        resize() {
            var browser_scale = Laya.Browser.width / Laya.Browser.height;
            var stage_scale = this.stage_width / this.stage_height;
            if (this.browser_scale_last != browser_scale) {
                this.browser_scale_last = browser_scale;
                if (browser_scale > stage_scale) {
                    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
                }
                else {
                    Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
                }
                console.log("Browser.width", Laya.Browser.width);
                console.log("Browser.height", Laya.Browser.height);
                console.log("stage.width", Laya.stage.width);
                console.log("stage.height", Laya.stage.height);
                console.log("html canvas width", Laya.Render.canvas.getAttribute("width"));
                console.log("html canvas height", Laya.Render.canvas.getAttribute("height"));
                console.log("browser_scale", browser_scale);
                console.log("stage_scale", stage_scale);
            }
            this.resetRootPos();
        }
        onDisable() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/MainStage.ts", MainStage);
            reg("script/Adaptation.ts", Adaptation);
        }
    }
    GameConfig.width = 640;
    GameConfig.height = 1136;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "MainStage.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
