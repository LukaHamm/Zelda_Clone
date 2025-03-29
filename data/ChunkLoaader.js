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


  async preLoad(activeChunkId,width, height){
    //removeOld Chunks
    /*
      chunk 3 chunk 4 chunk 5
      chunk 2 chunk 0000000000 chunk 1
      chunk 6 chunk 7 chunk 8
         +1 -1   +1 0  +1 +1
          0 -1  active 0 +1
          -1 -1  -1 0 -1 +1

    */
    //load new Chunks
    const chunkRow =  parseInt(activeChunkId.substring(0,5));
    const chunkColumn = parseInt(activeChunkId.substring(5,activeChunkId.length));
    let nextChunkIds = [];
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
      let newRow = chunkRow +1;
      nextChunkIds.push(newRow.toString() + chunkColumn.toString())
    }
    if(chunkRow < 99999 && chunkColumn < 99999){
      let newRow = chunkRow +1;
      let newColumn = chunkColumn +1;
      nextChunkIds.push(newRow.toString() + newColumn.toString())
    }

    if(chunkRow > 0 && chunkColumn < 99999){
      let newRow = chunkRow -1;
      let newColumn = chunkColumn +1;
      nextChunkIds.push(newRow.toString() + newColumn.toString())
    }

    if(chunkRow > 0 && chunkColumn > 0){
      let newRow = chunkRow -1;
      let newColumn = chunkColumn -1;
      nextChunkIds.push(newRow.toString() + newColumn.toString())
    }

    if(chunkRow < 99999 && chunkColumn > 0){
      let newRow = chunkRow +1;
      let newColumn = chunkColumn -1;
      nextChunkIds.push(newRow.toString() + newColumn.toString())
    }
    //besser await?
    nextChunkIds.push(activeChunkId)
    const chunkPromises = nextChunkIds.map(chunkId => 
      this.loadChunk(chunkId, width, height)
        .then(loadedChunk => {
          this.calculateChunkOffset(loadedChunk, activeChunkId, chunkId, width, height);
          return loadedChunk;
        })
    );
    const nextChunks = await Promise.all(chunkPromises);
    return nextChunks;
  }
  
  calculateChunkOffset(chunk, activeChunkId, chunkid, width, height){
    const activeChunkRow =  parseInt(activeChunkId.substring(0,5));
    const activeChunkColumn = parseInt(activeChunkId.substring(5,activeChunkId.length));
    const chunkRow =  parseInt(chunkid.substring(0,5));
    const chunkColumn = parseInt(chunkid.substring(5,chunkid.length));
    const chunkOffsetyMultiplicator = activeChunkRow-chunkRow;
    const chunkOffsetxMultiplicator = chunkColumn - activeChunkColumn;
    chunk.setOffsetX(chunkOffsetxMultiplicator * width);
    chunk.setOffsetY(chunkOffsetyMultiplicator * height)
  }


  async loadNext(chunks,activeChunkId,width, height, player){
    // neuer rootchunk mit default werten, absolute position des spielers verschieben
    let loadedChunks = await this.preLoad(activeChunkId,width,height);  
    let activeChunkOld = chunks.find(chunk => chunk.chunkid === activeChunkId);
    let newPlayerY = activeChunkOld.offsetx
    let addedChunks = loadedChunks.filter(chunk => {
      return !chunks.some(currentChunk => currentChunk.chunkid === chunk.chunkid);
    })
    let oldChunks = chunks.filter(chunk =>{
      return loadedChunks.some(currentChunk => currentChunk.chunkid === chunk.chunkid);
    })
    this.adjustChunkOffSet(activeChunkOld,addedChunks);
    let newChunks = addedChunks.concat(oldChunks)
    
    return newChunks;
  }


  adjustChunkOffSet(oldRootChunk, chunks) {
    const activeChunkRow =  parseInt(oldRootChunk.chunkid.substring(0,5));
    const activeChunkColumn = parseInt(oldRootChunk.chunkid.substring(5,oldRootChunk.chunkid.length));
    const relativeactiveChunkColumn = 1
    const relativeActiveChunkRow = 1
    //Überarbeiten
    /*
      unten/oben
        |       |    |
       ---   -> |    | <-
        |       |    |

    */
    let chunksLoaded = [["0","0","0"],
                        ["0","0","0"],
                        ["0","0","0"]]
    chunks.forEach(chunk => {
      const chunkRow =  parseInt(chunk.chunkid.substring(0,5));
      const chunkColumn = parseInt(chunk.chunkid.substring(5,chunk.chunkid.length));
      const chunkColumnDiffrence = chunkColumn - activeChunkColumn;
      const chunkRowDifference = chunkRow - activeChunkRow;
      const relativeChunkRow = chunkRowDifference + relativeActiveChunkRow;
      const relativeChunkColumn = chunkColumnDiffrence + relativeactiveChunkColumn;
      chunksLoaded[relativeChunkRow][relativeChunkColumn] = "-";
    });

    //check right column
    if(chunksLoaded[0][2] === "-" && chunksLoaded[1][2] === "-" && chunksLoaded[2][2] === "-"){
      chunks.forEach(chunk => {
        chunk.offsetY += oldRootChunk.offsetY
      })
    }

    //check left column
    if(chunksLoaded[0][0] === "-" && chunksLoaded[1][0] === "-" && chunksLoaded[2][0] === "-"){
      chunks.forEach(chunk => {
        chunk.offsetY += oldRootChunk.offsetY
      })
    }

    //check lower row
    if(chunksLoaded[2][0] === "-" && chunksLoaded[2][1] === "-" && chunksLoaded[2][2] === "-"){
      chunks.forEach(chunk => {
        chunk.offsetx += oldRootChunk.offsetx
      })
    }

    //chunk upper row
    if(chunksLoaded[0][0] === "-" && chunksLoaded[0][1] === "-" && chunksLoaded[0][2] === "-"){
      chunks.forEach(chunk => {
        chunk.offsetx += oldRootChunk.offsetx
      })
    }


  }

  storeChunk(chunkid, chunk) {
    let chunkString = JSON.stringify(chunk)
    localStorage.setItem(chunkid, chunk);
  }
}

export { ChunkLoader }