// package: 
// file: recorder/image.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class InputMsg extends jspb.Message { 
    getId(): number;
    setId(value: number): InputMsg;
    getFrom(): string;
    setFrom(value: string): InputMsg;
    getTo(): string;
    setTo(value: string): InputMsg;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): InputMsg.AsObject;
    static toObject(includeInstance: boolean, msg: InputMsg): InputMsg.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: InputMsg, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): InputMsg;
    static deserializeBinaryFromReader(message: InputMsg, reader: jspb.BinaryReader): InputMsg;
}

export namespace InputMsg {
    export type AsObject = {
        id: number,
        from: string,
        to: string,
    }
}

export class Data extends jspb.Message { 
    getTime(): string;
    setTime(value: string): Data;
    getDetections(): string;
    setDetections(value: string): Data;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Data.AsObject;
    static toObject(includeInstance: boolean, msg: Data): Data.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Data, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Data;
    static deserializeBinaryFromReader(message: Data, reader: jspb.BinaryReader): Data;
}

export namespace Data {
    export type AsObject = {
        time: string,
        detections: string,
    }
}

export class ImageResponse extends jspb.Message { 
    clearDataList(): void;
    getDataList(): Array<Data>;
    setDataList(value: Array<Data>): ImageResponse;
    addData(value?: Data, index?: number): Data;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ImageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ImageResponse): ImageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ImageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ImageResponse;
    static deserializeBinaryFromReader(message: ImageResponse, reader: jspb.BinaryReader): ImageResponse;
}

export namespace ImageResponse {
    export type AsObject = {
        dataList: Array<Data.AsObject>,
    }
}

export class BooleanDeleteResponse extends jspb.Message { 
    getIsdeleted(): boolean;
    setIsdeleted(value: boolean): BooleanDeleteResponse;
    getResponse(): string;
    setResponse(value: string): BooleanDeleteResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BooleanDeleteResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BooleanDeleteResponse): BooleanDeleteResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BooleanDeleteResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BooleanDeleteResponse;
    static deserializeBinaryFromReader(message: BooleanDeleteResponse, reader: jspb.BinaryReader): BooleanDeleteResponse;
}

export namespace BooleanDeleteResponse {
    export type AsObject = {
        isdeleted: boolean,
        response: string,
    }
}
