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
              const entity = EntityGenerator.generateEntity(columns[j], x, y, width, height);
              this.entities.push(entity);
            }
          }
        }
      }
  
      return new Chunk(this.entities, 0, 0, this.tiles,tileSet);
    } catch (error) {
      console.error("Fehler beim Laden des Chunks:", error);
      throw error;
    }
  }
  


  storeChunk(chunkid, chunk) {
    let chunkString = JSON.stringify(chunk)
    localStorage.setItem(chunkid, chunk);
  }
}

export { ChunkLoader }