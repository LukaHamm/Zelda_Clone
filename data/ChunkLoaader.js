import { EntityGenerator } from '../data/EntityGenerator.js';
import { Tile } from '../model/Tile.js';
import { Chunk } from '../model/Chunk.js';
class ChunkLoader {
  constructor() {
  }

  async getFile(filename) {
    try {
      const response = await fetch(filename);
      const text = await response.text();
      return text
    } catch (error) {
      console.error('Fehler beim Laden der Datei:', error);
      return null;
    }

  }

  async loadChunk(chunkid, width, height) {
    const canvasArea = width * height;
    const tileArea = canvasArea / Chunk.maxTileCount;
    const tileLength = Math.ceil(Math.max(width/Chunk.maxTileCountWidth,height/Chunk.maxTileCountHeight));

    try {
      const response = await this.getFile('/resources/chunk' + chunkid + ".csv");
      const csvData = response;
      const rows = csvData.split('\n');
  
      const tileResponse = await this.getFile('/resources/tiles.json');
      const tileJsonList = JSON.parse(tileResponse);
  
      this.tiles = Array.from({ length: Chunk.maxTileCountHeight }, () => Array(Chunk.maxTileCountWidth).fill(null));
      this.entities = [];
      const tileSet = new Set();
      for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split(',');
        columns[columns.length - 1] = columns[columns.length - 1].replaceAll("\r", "");
  
        for (let j = 0; j < columns.length; j++) {
          const x = j * tileLength;
          const y = (Math.ceil(i / 2) - i % 2) * tileLength;
  
          if (i % 2 === 0) {
            const tileData = tileJsonList.find(tileJson => tileJson.id === columns[j]);
            tileSet.add(tileData.background);
            this.tiles[(Math.ceil(i / 2) - i % 2)][j]= new Tile(x, y, tileData.background, tileLength);
          } else {
            if (columns[j] !== "0") {
              const entity = EntityGenerator.generateEntity(columns[j], x, y, 4*tileLength, 4*tileLength);
              this.entities.push(entity);
            }
          }
        }
      }
  
      return new Chunk(this.entities, 0, 0, this.tiles,tileSet,height,width,chunkid);
    } catch (error) {
      console.error("Fehler beim Laden des Chunks:", error);
      throw error;
    }
  }


  preLoad(activeChunkId,width, height){
    //removeOld Chunks
    /*
      chunk 3 chunk 4 chunk 5
      chunk 2 chunk 0000000000 chunk 1
      chunk 6 chunk 7 chunk 8
    */
    //load new Chunks
    const chunkRow =  parseInt(activeChunkId.substring(0,6));
    const chunkColumn = parseInt(activeChunkId.substring(6,activeChunkId.length -1));
    let nextChunkIds = [];
    let nextChunks = [];
    if(chunkColumn > 0){
        let newColumn = chunkColumn -1;
        nextChunkIds.push(chunkRow.toString() + newColumn.toString())
    }
    if(chunkColumn < 99999){
      let newColumn = chunkColumn +1;
      nextChunkIds.push(chunkRow.toString() + newColumn.toString())
    }
    if(chunkRow > 0){
      let newRow = chunkRow -1;
      nextChunkIds.push(newRow.toString() + chunkColumn.toString())
    }
    if(chunkRow < 99999){
      let newRow = chunkRow -1;
      nextChunkIds.push(newRow.toString() + chunkColumn.toString())
    }

    nextChunkIds.forEach(chunkId => {
      this.loadChunk(chunkId, width, height).then( loadedChunk => {
        this.calculateChunkOffset(loadedChunk,activeChunkId,chunkId,width,height);
        nextChunks.push(loadedChunk);
      })
    })
    return nextChunks;
  }
  
  calculateChunkOffset(chunk, activeChunkId, chunkid, width, height){
    const activeChunkRow =  parseInt(activeChunkId.substring(0,6));
    const activeChunkColumn = parseInt(activeChunkId.substring(6,activeChunkId.length -1));
    const chunkRow =  parseInt(chunkid.substring(0,6));
    const chunkColumn = parseInt(chunkid.substring(6,chunkid.length -1));
    const chunkOffsetyMultiplicator = activeChunkRow-chunkRow;
    const chunkOffsetxMultiplicator = chunkColumn - activeChunkColumn;
    chunk.setOffsetX(chunkOffsetxMultiplicator * width);
    chunk.setOffsetY(chunkOffsetyMultiplicator * height)
  }

  storeChunk(chunkid, chunk) {
    let chunkString = JSON.stringify(chunk)
    localStorage.setItem(chunkid, chunk);
  }
}

export { ChunkLoader }