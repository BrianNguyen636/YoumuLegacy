class RoomManager {
    constructor() {
        this.map = ASSET_MANAGER.getAsset("./room.png");

        this.boxes = [];
        this.boxes.push(new BoundingBox(215,650,850,150));
        this.boxes.push(new BoundingBox(0,450,215,350));
        this.boxes.push(new BoundingBox(1065,450,215,350));
        this.boxes.push(new BoundingBox(315,0,850,100));
        this.boxes.push(new BoundingBox(0,0,315,200));
        this.boxes.push(new BoundingBox(965,0,315,200));
    }


}