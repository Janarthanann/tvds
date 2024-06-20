import { router } from "../../trpc";
import {
  getDetections,
  getDetection,
  updateDetection,
  trackVehicle,
} from "./detections";
import {
  listenDetectionUpdates,
  realtimeDetectionUpdates,
} from "./detection_events";
export {
  MultipleDetectionsType,
  listenDetectionUpdates,
} from "./detection_events";

export const detectionRouter = router({
  getDetections,
  getDetection,
  listenDetectionUpdates,
  realtimeDetectionUpdates,
  updateDetection,
  trackVehicle,
});
