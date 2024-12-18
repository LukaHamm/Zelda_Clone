import { EntityGenerator } from './EntityGenerator.js';
import { Tile } from './Tile.js';
import { Chunk } from './Chunk.js';
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
    const tileArea = canvasArea / 200;
    const tileLength = Math.round(Math.sqrt(tileArea));
  
    try {
      const response = await this.getFile('chunk' + chunkid + ".csv");
      const csvData = response;
      const rows = csvData.split('\n');
  
      const tileResponse = await this.getFile('tiles.json');
      const tileJsonList = JSON.parse(tileResponse);
  
      this.tiles = [];
      this.entities = [];
  
      for (let i = 0; i < rows.length; i++) {
        const columns = rows[i].split(',');
        columns[columns.length - 1] = columns[columns.length - 1].replaceAll("\r", "");
  
        for (let j = 0; j < columns.length; j++) {
          const x = j * tileLength;
          const y = (Math.ceil(i / 2) - i % 2) * tileLength;
  
          if (i % 2 === 0) {
            const tileData = tileJsonList.find(tileJson => tileJson.id === columns[j]);
            this.tiles.push(new Tile(x, y, tileData.background, tileLength));
          } else {
            if (columns[j] !== "0") {
              const entity = EntityGenerator.generateEntity(columns[j], x, y, width, height);
              this.entities.push(entity);
            }
          }
        }
      }
  
      return new Chunk(this.entities, 0, 0, this.tiles);
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