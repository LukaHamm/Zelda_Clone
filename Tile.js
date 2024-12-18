class Tile{
    constructor(x,y,background,tileLength){
        this.x=x;
        this.y=y;
        this.image = document.getElementById(background);
        this.tileLength = tileLength;
    }

    draw(ctx,dx,dy){
        ctx.drawImage(this.image,dx*this.tileLength,dy*this.tileLength,this.tileLength,
            this.tileLength,this.x,this.y,this.tileLength,this.tileLength);
    }
}
export {Tile}