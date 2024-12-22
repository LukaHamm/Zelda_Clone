class Tile{
    constructor(x,y,background,tileLength){
        this.x=x;
        this.y=y;
        this.background=background;
        this.image = document.getElementById(background);
        this.tileLength = tileLength;
    }

    draw(ctx,dx,dy,chunkOffsetx,chunkOffsety){
        ctx.drawImage(this.image,dx*this.tileLength,dy*this.tileLength,this.tileLength,
            this.tileLength,this.x +chunkOffsetx,this.y+chunkOffsety,this.tileLength,this.tileLength);
    }

    static getTileCount(tileLength) {
        return {
            dx:Math.round(1025/tileLength),
            dy:Math.round(1025)
        }
    }
}
export {Tile}