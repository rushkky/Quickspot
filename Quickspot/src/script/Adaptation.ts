export default class Adaptation extends Laya.Script {
    stage_width : number = 640;
    stage_height : number = 1136;
    browser_scale_last : number = 1;
    first_setpos : boolean = false;
    root : Laya.Sprite;
    constructor() { 
        super();
        Laya.init(this.stage_width, this.stage_height);
        // 设置stage属性
        //Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL
        Laya.stage.on(Laya.Event.RESIZE, this, this.resize);
    }

    onEnable(): void {
        this.root = this.owner as Laya.Sprite;
    }
    private resetRootPos()
    {
        if(this.root != null)
        {
            var tempX = 0;
            var tempY = 0;
            var tempWidth  = Math.abs(Laya.stage.width - this.stage_width);
            tempX = tempWidth / 2;
            var tempHeight  = Math.abs(Laya.stage.height - this.stage_height);
            tempY = tempHeight / 2;
            if(tempX != 0 || tempY != 0)
            {
                this.root.pos(tempX,tempY);
            }
        }
    }

    private resize() {

        var browser_scale = Laya.Browser.width / Laya.Browser.height;
        var stage_scale = this.stage_width / this.stage_height;
        if(this.browser_scale_last != browser_scale)
        {
            this.browser_scale_last = browser_scale;
            if(browser_scale > stage_scale)
            {
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
            }
            else
            {
                Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
            }
            console.log("Browser.width",Laya.Browser.width);
            console.log("Browser.height",Laya.Browser.height);
            console.log("stage.width",Laya.stage.width);
            console.log("stage.height",Laya.stage.height);
            console.log("html canvas width",Laya.Render.canvas.getAttribute("width"));
            console.log("html canvas height",Laya.Render.canvas.getAttribute("height"));
            console.log("browser_scale",browser_scale);
            console.log("stage_scale",stage_scale);
        }
        this.resetRootPos();
    }

    onDisable(): void {
    }
}