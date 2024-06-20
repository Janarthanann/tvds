// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var recorder_configuration_pb = require('../recorder/configuration_pb.js');

function serialize_RecorderConfigRequest(arg) {
  if (!(arg instanceof recorder_configuration_pb.RecorderConfigRequest)) {
    throw new Error('Expected argument of type RecorderConfigRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RecorderConfigRequest(buffer_arg) {
  return recorder_configuration_pb.RecorderConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RecorderConfigResponse(arg) {
  if (!(arg instanceof recorder_configuration_pb.RecorderConfigResponse)) {
    throw new Error('Expected argument of type RecorderConfigResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RecorderConfigResponse(buffer_arg) {
  return recorder_configuration_pb.RecorderConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var RecorderConfigServiceService = exports.RecorderConfigServiceService = {
  initialize: {
    path: '/RecorderConfigService/initialize',
    requestStream: false,
    responseStream: false,
    requestType: recorder_configuration_pb.RecorderConfigRequest,
    responseType: recorder_configuration_pb.RecorderConfigResponse,
    requestSerialize: serialize_RecorderConfigRequest,
    requestDeserialize: deserialize_RecorderConfigRequest,
    responseSerialize: serialize_RecorderConfigResponse,
    responseDeserialize: deserialize_RecorderConfigResponse,
  },
};

exports.RecorderConfigServiceClient = grpc.makeGenericClientConstructor(RecorderConfigServiceService);
