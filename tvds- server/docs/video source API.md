# Video source data format
```typescript
interface VideoSource {
  id: number;
  url: string;
  relatedSourcesId: number[];

  // recorder related info
  recorderId: number;
  images: boolean;
  video: boolean;
  recorderSync: SyncStatus;

  // detector related info
  detectorId?: number;
  detection: boolean;
  detectorConfig?: string;
  detectorSync: SyncStatus;

  // non-functional data
  name: string;
  latitude: number;
  longitude: number;
  location: string;
  position?: string;
  city?: string;
}

enum SyncStatus {
    ADD,
    UPDATE,
    REMOVE,
    SYNCED,
}
```

# Video source statuses
There are eight possible statuses for a video source:

1. **Everything disabled:** `{ images: false, video: false, detectorId: null, detection: false, detectorConfig: null }` in the input interface.
2. **Detection alone is enabled:** `{ images: false, video: false, detectorId: number, detection: true, detectorConfig: string }` in the input interface.
3. **Detection and recording images:** `{ images: true, video: false, detectorId: number, detection: true, detectorConfig: string }` in the input interface.
4. **Detection and recording video:** `{ images: false, video: true, detectorId: number, detection: true, detectorConfig: string }` in the input interface.
5. **Recording images and video:** This generally implies that the images are required by some related video source. This has `{ images: true, video: true, detectorId: number, detection: false, detectorConfig: null}` in the input interface.
6. **Recording images alone:** This generally implies that the images are required by some related video source. This has `{ images: true, video: false, detectorId: number, detection: false, detectorConfig: null}` in the input interface.
7. **Recording video alone:** This generally implies that the video is required by some related video source. This has `{ images: false, video: true, detectorId: null, detection: false, detectorConfig: null}` in the input interface.
8. **Detection and recording images as well as video:** `{ images: true, video: true, detectorId: number, detection: false, detectorConfig: string}` in the input interface.

# Video source APIs
## List all the video sources
This should fetch all the video sources. This will facilitate the UI to list all the video sources with their information and allow the user to sync if any sync is pending as well as edit the information.

## Add video source
This should take all of the video source information in the API request and add a database entry for them. Please note that this API must not sync to the actual detector and recorder.

API request validation conditions:
1. `detectorId` can't be made `null` when either `detection` is added as `true` or `images` is added as `true`.
2. `detectorConfig` is a string which needs to be a valid JSON which can be validated by Zod in a later stage of the project.

`SyncStatus` cases:
1. When `detectorId` is not `null`, mark `detectorSync` as `SyncStatus.ADD`.
2. When `detectorId` is `null`, mark `detectorSync` to `SyncStatus.SYNCED`.
3. When any of the recorder fields are updated, mark `recorderSync` to `SyncStatus.ADD`.

## Update video source
This should allow to edit and update all of the fields and mark synced fields. This API should not sync to the actual detector and recorder.

API request validation conditions:
1. `recorderId` and `detectorId` can't be changed. However `detectorId` should be allowed:
* to be made `null`, only if the previous `detectorSync` was either `SyncStatus.ADD` or `SyncStatus.SYNCED`.
* to be changed from `null` to a specific ID, only if the previous `detectorSync` was `SyncStatus.SYNCED`.
2. `detectorId` can't be made `null` when either `detection` is updated to  `true` or `images` is updated to `true`.
3. `detectorConfig` is a string which needs to be a valid JSON which can be validated by Zod in a later stage of the project.

`SyncStatus` cases:
1. When any of the detector fields are updated, mark `detectorSync` as `SyncStatus.UPDATE`.
2. When `detectorId` updated to `null`, mark `detectorSync` to `SyncStatus.REMOVE`.
3. When any of the recorder fields are updated, mark `recorderSync` to `SyncStatus.UPDATE`.

## Sync video source
This should try to update the actual detector and recorder with the provided information earlier. This API should not modify anything in the database except for the synced fields. If recorder and/or detectors are synced, this should mark respective synced field immediately as described below.

Sync logic steps:
1. Check `detectorSync`, if it is:
* `SyncStatus.ADD`, call add video source API on detector.
* `SyncStatus.UPDATE`, call update video source API on detector.
* `SyncStatus.REMOVE`, call remove video source API on detector.
2. If the previous API succeeds, mark `detectorSync` as `SyncStatus.SYNCED` and continue. If it fails, continue without any update. But keep the error message for the API response.
3. Check `recorderSync`, if it is:
* `SyncStatus.ADD`, call add video source API on detector..
* `SyncStatus.UPDATE`, call update video source API on detector.
4. If the previous API succeeds, mark `recorderSync` as `SyncStatus.SYNCED`. If it fails, continue without any update. But keep the error message for the API response.
