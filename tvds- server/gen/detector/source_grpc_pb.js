// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var detector_source_pb = require('../detector/source_pb.js');

function serialize_DetectorVideoSource(arg) {
  if (!(arg instanceof detector_source_pb.DetectorVideoSource)) {
    throw new Error('Expected argument of type DetectorVideoSource');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DetectorVideoSource(buffer_arg) {
  return detector_source_pb.DetectorVideoSource.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetVideoSourceRequest(arg) {
  if (!(arg instanceof detector_source_pb.GetVideoSourceRequest)) {
    throw new Error('Expected argument of type GetVideoSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetVideoSourceRequest(buffer_arg) {
  return detector_source_pb.GetVideoSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetVideoSourceResponse(arg) {
  if (!(arg instanceof detector_source_pb.GetVideoSourceResponse)) {
    throw new Error('Expected argument of type GetVideoSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetVideoSourceResponse(buffer_arg) {
  return detector_source_pb.GetVideoSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveVideoSourceRequest(arg) {
  if (!(arg instanceof detector_source_pb.RemoveVideoSourceRequest)) {
    throw new Error('Expected argument of type RemoveVideoSourceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveVideoSourceRequest(buffer_arg) {
  return detector_source_pb.RemoveVideoSourceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_RemoveVideoSourceResponse(arg) {
  if (!(arg instanceof detector_source_pb.RemoveVideoSourceResponse)) {
    throw new Error('Expected argument of type RemoveVideoSourceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_RemoveVideoSourceResponse(buffer_arg) {
  return detector_source_pb.RemoveVideoSourceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SubscribeDetectionsInput(arg) {
  if (!(arg instanceof detector_source_pb.SubscribeDetectionsInput)) {
    throw new Error('Expected argument of type SubscribeDetectionsInput');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SubscribeDetectionsInput(buffer_arg) {
  return detector_source_pb.SubscribeDetectionsInput.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SubscribeDetectionsResponse(arg) {
  if (!(arg instanceof detector_source_pb.SubscribeDetectionsResponse)) {
    throw new Error('Expected argument of type SubscribeDetectionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SubscribeDetectionsResponse(buffer_arg) {
  return detector_source_pb.SubscribeDetectionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var VideoSourcesService = exports.VideoSourcesService = {
  getSources: {
    path: '/VideoSources/getSources',
    requestStream: false,
    responseStream: false,
    requestType: detector_source_pb.GetVideoSourceRequest,
    responseType: detector_source_pb.GetVideoSourceResponse,
    requestSerialize: serialize_GetVideoSourceRequest,
    requestDeserialize: deserialize_GetVideoSourceRequest,
    responseSerialize: serialize_GetVideoSourceResponse,
    responseDeserialize: deserialize_GetVideoSourceResponse,
  },
  addSource: {
    path: '/VideoSources/addSource',
    requestStream: false,
    responseStream: false,
    requestType: detector_source_pb.DetectorVideoSource,
    responseType: detector_source_pb.DetectorVideoSource,
    requestSerialize: serialize_DetectorVideoSource,
    requestDeserialize: deserialize_DetectorVideoSource,
    responseSerialize: serialize_DetectorVideoSource,
    responseDeserialize: deserialize_DetectorVideoSource,
  },
  updateSource: {
    path: '/VideoSources/updateSource',
    requestStream: false,
    responseStream: false,
    requestType: detector_source_pb.DetectorVideoSource,
    responseType: detector_source_pb.DetectorVideoSource,
    requestSerialize: serialize_DetectorVideoSource,
    requestDeserialize: deserialize_DetectorVideoSource,
    responseSerialize: serialize_DetectorVideoSource,
    responseDeserialize: deserialize_DetectorVideoSource,
  },
  removeSource: {
    path: '/VideoSources/removeSource',
    requestStream: false,
    responseStream: false,
    requestType: detector_source_pb.RemoveVideoSourceRequest,
    responseType: detector_source_pb.RemoveVideoSourceResponse,
    requestSerialize: serialize_RemoveVideoSourceRequest,
    requestDeserialize: deserialize_RemoveVideoSourceRequest,
    responseSerialize: serialize_RemoveVideoSourceResponse,
    responseDeserialize: deserialize_RemoveVideoSourceResponse,
  },
  subscribeDetections: {
    path: '/VideoSources/subscribeDetections',
    requestStream: false,
    responseStream: true,
    requestType: detector_source_pb.SubscribeDetectionsInput,
    responseType: detector_source_pb.SubscribeDetectionsResponse,
    requestSerialize: serialize_SubscribeDetectionsInput,
    requestDeserialize: deserialize_SubscribeDetectionsInput,
    responseSerialize: serialize_SubscribeDetectionsResponse,
    responseDeserialize: deserialize_SubscribeDetectionsResponse,
  },
};

exports.VideoSourcesClient = grpc.makeGenericClientConstructor(VideoSourcesService);
