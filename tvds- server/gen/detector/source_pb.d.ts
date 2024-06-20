// package: 
// file: detector/source.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class DetectorVideoSource extends jspb.Message { 
    getId(): number;
    setId(value: number): DetectorVideoSource;
    getUrl(): string;
    setUrl(value: string): DetectorVideoSource;
    getDetectorConfig(): string;
    setDetectorConfig(value: string): DetectorVideoSource;
    getDetection(): boolean;
    setDetection(value: boolean): DetectorVideoSource;
    getImages(): boolean;
    setImages(value: boolean): DetectorVideoSource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectorVideoSource.AsObject;
    static toObject(includeInstance: boolean, msg: DetectorVideoSource): DetectorVideoSource.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectorVideoSource, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectorVideoSource;
    static deserializeBinaryFromReader(message: DetectorVideoSource, reader: jspb.BinaryReader): DetectorVideoSource;
}

export namespace DetectorVideoSource {
    export type AsObject = {
        id: number,
        url: string,
        detectorConfig: string,
        detection: boolean,
        images: boolean,
    }
}

export class GetVideoSourceRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): GetVideoSourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVideoSourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetVideoSourceRequest): GetVideoSourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVideoSourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVideoSourceRequest;
    static deserializeBinaryFromReader(message: GetVideoSourceRequest, reader: jspb.BinaryReader): GetVideoSourceRequest;
}

export namespace GetVideoSourceRequest {
    export type AsObject = {
        id: number,
    }
}

export class GetVideoSourceResponse extends jspb.Message { 
    clearSourceList(): void;
    getSourceList(): Array<DetectorVideoSource>;
    setSourceList(value: Array<DetectorVideoSource>): GetVideoSourceResponse;
    addSource(value?: DetectorVideoSource, index?: number): DetectorVideoSource;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetVideoSourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetVideoSourceResponse): GetVideoSourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetVideoSourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetVideoSourceResponse;
    static deserializeBinaryFromReader(message: GetVideoSourceResponse, reader: jspb.BinaryReader): GetVideoSourceResponse;
}

export namespace GetVideoSourceResponse {
    export type AsObject = {
        sourceList: Array<DetectorVideoSource.AsObject>,
    }
}

export class RemoveVideoSourceRequest extends jspb.Message { 
    getId(): number;
    setId(value: number): RemoveVideoSourceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveVideoSourceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveVideoSourceRequest): RemoveVideoSourceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveVideoSourceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveVideoSourceRequest;
    static deserializeBinaryFromReader(message: RemoveVideoSourceRequest, reader: jspb.BinaryReader): RemoveVideoSourceRequest;
}

export namespace RemoveVideoSourceRequest {
    export type AsObject = {
        id: number,
    }
}

export class RemoveVideoSourceResponse extends jspb.Message { 
    getResult(): boolean;
    setResult(value: boolean): RemoveVideoSourceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveVideoSourceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveVideoSourceResponse): RemoveVideoSourceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveVideoSourceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveVideoSourceResponse;
    static deserializeBinaryFromReader(message: RemoveVideoSourceResponse, reader: jspb.BinaryReader): RemoveVideoSourceResponse;
}

export namespace RemoveVideoSourceResponse {
    export type AsObject = {
        result: boolean,
    }
}

export class Detection extends jspb.Message { 
    clearRectList(): void;
    getRectList(): Array<number>;
    setRectList(value: Array<number>): Detection;
    addRect(value: number, index?: number): number;
    getProb(): number;
    setProb(value: number): Detection;
    getClass(): number;
    setClass(value: number): Detection;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Detection.AsObject;
    static toObject(includeInstance: boolean, msg: Detection): Detection.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Detection, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Detection;
    static deserializeBinaryFromReader(message: Detection, reader: jspb.BinaryReader): Detection;
}

export namespace Detection {
    export type AsObject = {
        rectList: Array<number>,
        prob: number,
        pb_class: number,
    }
}

export class BBoxes extends jspb.Message { 

    hasPlate(): boolean;
    clearPlate(): void;
    getPlate(): Detection | undefined;
    setPlate(value?: Detection): BBoxes;

    hasVehicle(): boolean;
    clearVehicle(): void;
    getVehicle(): Detection | undefined;
    setVehicle(value?: Detection): BBoxes;
    clearPersonsList(): void;
    getPersonsList(): Array<Detection>;
    setPersonsList(value: Array<Detection>): BBoxes;
    addPersons(value?: Detection, index?: number): Detection;
    clearHeadsList(): void;
    getHeadsList(): Array<Detection>;
    setHeadsList(value: Array<Detection>): BBoxes;
    addHeads(value?: Detection, index?: number): Detection;
    clearHelmetsList(): void;
    getHelmetsList(): Array<Detection>;
    setHelmetsList(value: Array<Detection>): BBoxes;
    addHelmets(value?: Detection, index?: number): Detection;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BBoxes.AsObject;
    static toObject(includeInstance: boolean, msg: BBoxes): BBoxes.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BBoxes, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BBoxes;
    static deserializeBinaryFromReader(message: BBoxes, reader: jspb.BinaryReader): BBoxes;
}

export namespace BBoxes {
    export type AsObject = {
        plate?: Detection.AsObject,
        vehicle?: Detection.AsObject,
        personsList: Array<Detection.AsObject>,
        headsList: Array<Detection.AsObject>,
        helmetsList: Array<Detection.AsObject>,
    }
}

export class DetectionGroup extends jspb.Message { 
    getId(): number;
    setId(value: number): DetectionGroup;
    getVehicleNumber(): string;
    setVehicleNumber(value: string): DetectionGroup;
    getVehicleType(): string;
    setVehicleType(value: string): DetectionGroup;

    hasBboxes(): boolean;
    clearBboxes(): void;
    getBboxes(): BBoxes | undefined;
    setBboxes(value?: BBoxes): DetectionGroup;
    getPlateImage(): string;
    setPlateImage(value: string): DetectionGroup;
    clearViolationList(): void;
    getViolationList(): Array<string>;
    setViolationList(value: Array<string>): DetectionGroup;
    addViolation(value: string, index?: number): string;
    getTime(): string;
    setTime(value: string): DetectionGroup;
    getStatus(): string;
    setStatus(value: string): DetectionGroup;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectionGroup.AsObject;
    static toObject(includeInstance: boolean, msg: DetectionGroup): DetectionGroup.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectionGroup, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectionGroup;
    static deserializeBinaryFromReader(message: DetectionGroup, reader: jspb.BinaryReader): DetectionGroup;
}

export namespace DetectionGroup {
    export type AsObject = {
        id: number,
        vehicleNumber: string,
        vehicleType: string,
        bboxes?: BBoxes.AsObject,
        plateImage: string,
        violationList: Array<string>,
        time: string,
        status: string,
    }
}

export class VideoSourceOverview extends jspb.Message { 
    getId(): number;
    setId(value: number): VideoSourceOverview;
    getImage(): string;
    setImage(value: string): VideoSourceOverview;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VideoSourceOverview.AsObject;
    static toObject(includeInstance: boolean, msg: VideoSourceOverview): VideoSourceOverview.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VideoSourceOverview, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VideoSourceOverview;
    static deserializeBinaryFromReader(message: VideoSourceOverview, reader: jspb.BinaryReader): VideoSourceOverview;
}

export namespace VideoSourceOverview {
    export type AsObject = {
        id: number,
        image: string,
    }
}

export class DetectionNotificationMessage extends jspb.Message { 
    getId(): number;
    setId(value: number): DetectionNotificationMessage;
    getFrameImage(): string;
    setFrameImage(value: string): DetectionNotificationMessage;
    clearOverviewImageList(): void;
    getOverviewImageList(): Array<VideoSourceOverview>;
    setOverviewImageList(value: Array<VideoSourceOverview>): DetectionNotificationMessage;
    addOverviewImage(value?: VideoSourceOverview, index?: number): VideoSourceOverview;
    clearDetectionList(): void;
    getDetectionList(): Array<DetectionGroup>;
    setDetectionList(value: Array<DetectionGroup>): DetectionNotificationMessage;
    addDetection(value?: DetectionGroup, index?: number): DetectionGroup;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DetectionNotificationMessage.AsObject;
    static toObject(includeInstance: boolean, msg: DetectionNotificationMessage): DetectionNotificationMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DetectionNotificationMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DetectionNotificationMessage;
    static deserializeBinaryFromReader(message: DetectionNotificationMessage, reader: jspb.BinaryReader): DetectionNotificationMessage;
}

export namespace DetectionNotificationMessage {
    export type AsObject = {
        id: number,
        frameImage: string,
        overviewImageList: Array<VideoSourceOverview.AsObject>,
        detectionList: Array<DetectionGroup.AsObject>,
    }
}

export class Event extends jspb.Message { 
    getId(): number;
    setId(value: number): Event;
    getEvent(): string;
    setEvent(value: string): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        id: number,
        event: string,
    }
}

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class SubscribeDetectionsInput extends jspb.Message { 
    getSourceId(): number;
    setSourceId(value: number): SubscribeDetectionsInput;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeDetectionsInput.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeDetectionsInput): SubscribeDetectionsInput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeDetectionsInput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeDetectionsInput;
    static deserializeBinaryFromReader(message: SubscribeDetectionsInput, reader: jspb.BinaryReader): SubscribeDetectionsInput;
}

export namespace SubscribeDetectionsInput {
    export type AsObject = {
        sourceId: number,
    }
}

export class SubscribeDetectionsResponse extends jspb.Message { 
    clearResponseList(): void;
    getResponseList(): Array<DetectionNotificationMessage>;
    setResponseList(value: Array<DetectionNotificationMessage>): SubscribeDetectionsResponse;
    addResponse(value?: DetectionNotificationMessage, index?: number): DetectionNotificationMessage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeDetectionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeDetectionsResponse): SubscribeDetectionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeDetectionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeDetectionsResponse;
    static deserializeBinaryFromReader(message: SubscribeDetectionsResponse, reader: jspb.BinaryReader): SubscribeDetectionsResponse;
}

export namespace SubscribeDetectionsResponse {
    export type AsObject = {
        responseList: Array<DetectionNotificationMessage.AsObject>,
    }
}
