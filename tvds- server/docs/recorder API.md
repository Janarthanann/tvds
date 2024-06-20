# Recorder chaining APIs
These APIs make calls to the recorder's APIs and mostly provide the same functionality as the recorder. The APIs presented here essentially specify what is required from the recorder to facilitate their operation. To distinguish between the two types of APIs, we refer to the APIs required here as downstream APIs and the APIs required by the recorder as upstream APIs.
"Get image" and "get video" are HTTP routes to provide the data.

# Get images
This should get list of all the images which are store for a particular video source in a particular duration.
```typescript
interface Input {
  id: number;
  from: number;
  to: number;
}
```
The output of this will be an array of ImageInfo objects, each containing information about an image specified in the API request, sorted in ascending order based on the time of capture.

```typescript
type Output = ImageInfo[];

interface ImageInfo {
  time: number;
  detections: Object;
}
```
`time` provided here can be presented to `Get image` API to fetch the actual image. The time here is based on the time format which we get from Date.now().

# Get image
This is HTTP route and does not depend on tRPC as this contains only binary data of the image. The parameters are provided in the query part of the URL:

```
/video?id=1&time=1
```
The time needs to be obtained from the "get images" API.
The `id` and the `time` are number and the time here is based on the time format which we get from Date.now().

# Delete images
This API deletes all the images in the specified time duration for the specified video ID.

```typescript
interface Input {
  id: number;
  from: number;
  to: number;
}
```

# Get video
This is HTTP route and does not depend on tRPC as this contains only binary data of the video.
```
/video?id=1&from=1&to=2
```
The time here is based on the time format which we get from Date.now().

# Delete video
This API deletes all the video in the specified time duration for the specified video ID.

```typescript
interface Input {
  id: number;
  from: number;
  to: number;
}
```
