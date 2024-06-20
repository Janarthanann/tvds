// package: 
// file: recorder/configuration.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class RecorderConfigRequest extends jspb.Message { 
    getConfiguration(): string;
    setConfiguration(value: string): RecorderConfigRequest;
    getForce(): boolean;
    setForce(value: boolean): RecorderConfigRequest;
    getUrl(): string;
    setUrl(value: string): RecorderConfigRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecorderConfigRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RecorderConfigRequest): RecorderConfigRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RecorderConfigRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecorderConfigRequest;
    static deserializeBinaryFromReader(message: RecorderConfigRequest, reader: jspb.BinaryReader): RecorderConfigRequest;
}

export namespace RecorderConfigRequest {
    export type AsObject = {
        configuration: string,
        force: boolean,
        url: string,
    }
}

export class RecorderConfigResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): RecorderConfigResponse;
    getMessage(): string;
    setMessage(value: string): RecorderConfigResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecorderConfigResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RecorderConfigResponse): RecorderConfigResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RecorderConfigResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecorderConfigResponse;
    static deserializeBinaryFromReader(message: RecorderConfigResponse, reader: jspb.BinaryReader): RecorderConfigResponse;
}

export namespace RecorderConfigResponse {
    export type AsObject = {
        success: boolean,
        message: string,
    }
}
