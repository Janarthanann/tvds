import express, { Request, Response } from "express";
import { Prisma } from "../../prisma";
import axios from "axios";

const router = express.Router();

// get image from recorder
router.get("/image", async (request: Request, res: Response) => {
  const prisma = Prisma.getInstance();

  const { id: sourceId, time } = request.query as {
    id?: string;
    time?: string;
  };

  if (!sourceId || !time) {
    res.status(400).json({ success: false, message: "id or time is missing!" });
    return;
  }

  try {
    const videoSource = await prisma.videoSource.findUnique({
      where: { id: +sourceId },
      include: { recorder: { select: { url2: true } } },
    });

    if (!videoSource) {
      res
        .status(404)
        .json({ success: false, message: "video source not found!" });
      return;
    }

    const recorderExpressURL = videoSource.recorder.url2;

    const queryParams = new URLSearchParams();
    queryParams.append("id", sourceId);
    queryParams.append("time", time);
    const imageUrl = new URL(
      "/recorder/image",
      `http://${recorderExpressURL}/`,
    );
    // console.log("Image URL : ", imageUrl);
    try {
      const response = await axios.get(imageUrl.toString(), {
        params: {
          id: sourceId,
          time: time,
        },
        responseType: "stream",
        headers: {
          "Content-Type": "image/jpeg",
        },
      });

      res.set(response.headers);
      response.data.pipe(res); // pipe the response data to the client
    } catch (error) {
      console.error("Error in HTTP FETCH request: Get image API: ", error);
      res.status(400).json({
        success: false,
        error: (error as Error)?.message || "Unknown error",
      });
      return;
    }
  } catch (error) {
    console.error("Error in Get image API: ", error);
    res.status(500).json({
      success: false,
      error: (error as Error)?.message || "Unknown error",
    });
    return;
  }
});

export default router;
