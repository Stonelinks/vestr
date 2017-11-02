import jsfeat from "face-detector-polyfill/src/lib/jsfeat";
import bbfFaceCascade from "face-detector-polyfill/src/lib/bbf_face";
import moment from "moment";

export default class FaceDetector {
  constructor(canvas) {
    jsfeat.bbf.prepare_cascade(bbfFaceCascade);

    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.imgU8 = null;

    this.lastWidth = -1;
    this.lastHeight = -1;
  }

  async detect(image) {
    const {canvas, ctx} = this
    // const W = image.naturalWidth || image.width;
    // const H = image.naturalHeight || image.height;
    // const maxWorkSize = 640;
    // const scale = Math.min(maxWorkSize / W, maxWorkSize / H);

    // canvas.width = W * scale
    // canvas.height = H * scale;
    // canvas.width = W;
    // canvas.height = H;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    let start = moment();
    await ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
    // console.warn(`drew image ${moment().from(start)}`);

    start = moment();
    const imageData = await ctx.getImageData(
      0,
      0,
      canvasWidth,
      canvasHeight
    );
    // console.warn(`read back image data ${moment().from(start)}`);

    start = moment();
    if (canvasWidth !== this.lastWidth || canvasHeight !== this.lastHeight) {
      this.imgU8 = new jsfeat.matrix_t(
        canvasWidth,
        canvasHeight,
        jsfeat.U8_t | jsfeat.C1_t
      );
      this.lastWidth = canvasWidth;
      this.lastHeight = canvasHeight;
    }

    jsfeat.imgproc.grayscale(
      imageData.data,
      canvasWidth,
      canvasHeight,
      this.imgU8
    );

    // possible options
    // jsfeat.imgproc.equalize_histogram(imgU8, imgU8)

    const pyr = jsfeat.bbf.build_pyramid(this.imgU8, 24 * 2, 24 * 2, 4);
    let rects = jsfeat.bbf.detect(pyr, bbfFaceCascade);
    rects = jsfeat.bbf.group_rectangles(rects, 1);

    // sort
    const topResults = rects.sort(
      (recA, recB) => recB.confidence - recA.confidence
    );

    // scale
    // const scaledResults = topResults.map(res => ({
    //   x: res.x / scale,
    //   y: res.y / scale,
    //   width: res.width / scale,
    //   height: res.height / scale
    // }));
    const scaledResults = topResults;

    // console.warn(`detected faces ${moment().from(start)}`);

    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "#0f0";
    for (var i = 0; i < scaledResults.length; i++) {
      ctx.rect(scaledResults[i].x, scaledResults[i].y, scaledResults[i].width, scaledResults[i].height);
      // ctx.fillRect(faces[i].x, faces[i].y, faces[i].width, faces[i].height);
    }

    // ctx.fillRect(0, 0, 100, 100);
    //
    // ctx.fillRect(100, 100, 10, 100);
    ctx.stroke();


    return {
     faces: scaledResults,
     ctx: ctx
    }
  }
}
