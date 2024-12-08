import { EntityGenerator } from './EntityGenerator.js';
import { Tile } from './Tile.js';
class ChunkLoader {
    constructor(){
        this.fs = require('fs');
    }

    loadChunk(chunkid, width, height){
        const canvasArea = width*height;
        const tileArea = canvasArea/200;
        const tileLength = Math.sqrt(tileArea);
        const csvData = this.fs.readFileSync('chunk' + chunkid, 'utf8');
        const rows = csvData.split('\n');
        const tileJsonList = JSON.parse(this.fs.readFileSync('tiles.json','utf-8'));
        this.tiles = [];
        this.entities = [];
        for (let i = 0; i < rows.length; i++) {
            const columns = rows[i].split(',');
            for (let j = 0; j < columns.length; j++) {
              const x=j*tileLength;
              const y=(Math.ceil(i/2)-i%2)*tileLength;
              if(i %2 === 0){
                const tileData = tileJsonList.filter(tileJson => tileJson.id===columns[j]);
                this.tiles.push(new Tile(x,y,tileData.background));
              }else{
                const entity = EntityGenerator.generateEntity(x,y,width,height);
                this.entities.push(entity);
              }
            }
          }
          return new Chunk(this.entities,0,0,this.tiles);
    }


    storeChunk(chunkid, chunk){
        let chunkString = JSON.stringify(chunk)
        localStorage.setItem(chunkid,chunk);
    }
}