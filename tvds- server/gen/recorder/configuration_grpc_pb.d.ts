// package: 
// file: recorder/configuration.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as recorder_configuration_pb from "../recorder/configuration_pb";

interface IRecorderConfigServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    initialize: IRecorderConfigServiceService_Iinitialize;
}

interface IRecorderConfigServiceService_Iinitialize extends grpc.MethodDefinition<recorder_configuration_pb.RecorderConfigRequest, recorder_configuration_pb.RecorderConfigResponse> {
    path: "/RecorderConfigService/initialize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<recorder_configuration_pb.RecorderConfigRequest>;
    requestDeserialize: grpc.deserialize<recorder_configuration_pb.RecorderConfigRequest>;
    responseSerialize: grpc.serialize<recorder_configuration_pb.RecorderConfigResponse>;
    responseDeserialize: grpc.deserialize<recorder_configuration_pb.RecorderConfigResponse>;
}

export const RecorderConfigServiceService: IRecorderConfigServiceService;

export interface IRecorderConfigServiceServer extends grpc.UntypedServiceImplementation {
    initialize: grpc.handleUnaryCall<recorder_configuration_pb.RecorderConfigRequest, recorder_configuration_pb.RecorderConfigResponse>;
}

export interface IRecorderConfigServiceClient {
    initialize(request: recorder_configuration_pb.RecorderConfigRequest, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
    initialize(request: recorder_configuration_pb.RecorderConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
    initialize(request: recorder_configuration_pb.RecorderConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
}

export class RecorderConfigServiceClient extends grpc.Client implements IRecorderConfigServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public initialize(request: recorder_configuration_pb.RecorderConfigRequest, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
    public initialize(request: recorder_configuration_pb.RecorderConfigRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
    public initialize(request: recorder_configuration_pb.RecorderConfigRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: recorder_configuration_pb.RecorderConfigResponse) => void): grpc.ClientUnaryCall;
}
