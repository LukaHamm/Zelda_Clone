import { WalkingPattern } from "../controls/WalkingPattern.js";
class MovementPatternBuilder {
    
    setMovmentType(type){
        this.type=type;
        return this;
    }

    setRadius(radius){
        this.radius=radius;
        return this;
    }

    setSpeed(speed){
        this.speed = speed;
        return this;
    }

    setEntity(entity){
        this.entity=entity
    }


    build(){
         switch (this.type) {
            case "walkingPattern":
                return new WalkingPattern(this.entity,this.radius,this.speed)
            default:
                throw new Error("Ubekannter movement pattern typ: " + this.type);
    
         }
        }
    

}

export {MovementPatternBuilder}