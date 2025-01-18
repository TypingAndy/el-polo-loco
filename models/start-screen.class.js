class Startscreen extends DrawableObject {
    width = 720;
    height = 480;
  

    IMAGE_STARTSCREEN = ['img/9_intro_outro_screens/start/startscreen_1.png']
    constructor() {
        super().loadImage(this.IMAGE_STARTSCREEN);
    }
}
