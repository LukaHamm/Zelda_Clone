class Map {
    constructor(){
        this.gameArea = [[]]
        
    }

    generateGameArea(){
        //Ground
        for(let i = 0;i<500;i++){
            for(let j=0;j<500;j++){
                this.gameArea.push(0)
            }
        }
    }

    generateTrees(){
        
    }

}