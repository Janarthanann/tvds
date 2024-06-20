// package: 
// file: recorder/image.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as recorder_image_pb from "../recorder/image_pb";

interface IImageService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    retrieveImages: IImageService_IretrieveImages;
    deleteImages: IImageService_IdeleteImages;
    deleteVideos: IImageService_IdeleteVideos;
}

interface IImageService_IretrieveImages extends grpc.MethodDefinition<recorder_image_pb.InputMsg, recorder_image_pb.ImageResponse> {
    path: "/Image/retrieveImages";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_image_pb.InputMsg>;
    requestDeserialize: grpc.deserialize<recorder_image_pb.InputMsg>;
    responseSerialize: grpc.serialize<recorder_image_pb.ImageResponse>;
    responseDeserialize: grpc.deserialize<recorder_image_pb.ImageResponse>;
}
interface IImageService_IdeleteImages extends grpc.MethodDefinition<recorder_image_pb.InputMsg, recorder_image_pb.BooleanDeleteResponse> {
    path: "/Image/deleteImages";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_image_pb.InputMsg>;
    requestDeserialize: grpc.deserialize<recorder_image_pb.InputMsg>;
    responseSerialize: grpc.serialize<recorder_image_pb.BooleanDeleteResponse>;
    responseDeserialize: grpc.deserialize<recorder_image_pb.BooleanDeleteResponse>;
}
interface IImageService_IdeleteVideos extends grpc.MethodDefinition<recorder_image_pb.InputMsg, recorder_image_pb.BooleanDeleteResponse> {
    path: "/Image/deleteVideos";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_image_pb.InputMsg>;
    requestDeserialize: grpc.deserialize<recorder_image_pb.InputMsg>;
    responseSerialize: grpc.serialize<recorder_image_pb.BooleanDeleteResponse>;
    responseDeserialize: grpc.deserialize<recorder_image_pb.BooleanDeleteResponse>;
}

export const ImageService: IImageService;

export interface IImageServer extends grpc.UntypedServiceImplementation {
    retrieveImages: grpc.handleUnaryCall<recorder_image_pb.InputMsg, recorder_image_pb.ImageResponse>;
    deleteImages: grpc.handleUnaryCall<recorder_image_pb.InputMsg, recorder_image_pb.BooleanDeleteResponse>;
    deleteVideos: grpc.handleUnaryCall<recorder_image_pb.InputMsg, recorder_image_pb.BooleanDeleteResponse>;
}

export interface IImageClient {
    retrieveImages(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    retrieveImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    retrieveImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    deleteImages(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    deleteImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    deleteImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    deleteVideos(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    deleteVideos(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    deleteVideos(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
}

export class ImageClient extends grpc.Client implements IImageClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public retrieveImages(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public retrieveImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public retrieveImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.ImageResponse) => void): grpc.ClientUnaryCall;
    public deleteImages(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    public deleteImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    public deleteImages(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    public deleteVideos(request: recorder_image_pb.InputMsg, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    public deleteVideos(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
    public deleteVideos(request: recorder_image_pb.InputMsg, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_image_pb.BooleanDeleteResponse) => void): grpc.ClientUnaryCall;
}
