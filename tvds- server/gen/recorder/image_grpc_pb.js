// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var recorder_image_pb = require('../recorder/image_pb.js');

function serialize_BooleanDeleteResponse(arg) {
  if (!(arg instanceof recorder_image_pb.BooleanDeleteResponse)) {
    throw new Error('Expected argument of type BooleanDeleteResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_BooleanDeleteResponse(buffer_arg) {
  return recorder_image_pb.BooleanDeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ImageResponse(arg) {
  if (!(arg instanceof recorder_image_pb.ImageResponse)) {
    throw new Error('Expected argument of type ImageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ImageResponse(buffer_arg) {
  return recorder_image_pb.ImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_InputMsg(arg) {
  if (!(arg instanceof recorder_image_pb.InputMsg)) {
    throw new Error('Expected argument of type InputMsg');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_InputMsg(buffer_arg) {
  return recorder_image_pb.InputMsg.deserializeBinary(new Uint8Array(buffer_arg));
}


var ImageService = exports.ImageService = {
  retrieveImages: {
    path: '/Image/retrieveImages',
    requestStream: false,
    responseStream: false,
    requestType: recorder_image_pb.InputMsg,
    responseType: recorder_image_pb.ImageResponse,
    requestSerialize: serialize_InputMsg,
    requestDeserialize: deserialize_InputMsg,
    responseSerialize: serialize_ImageResponse,
    responseDeserialize: deserialize_ImageResponse,
  },
  deleteImages: {
    path: '/Image/deleteImages',
    requestStream: false,
    responseStream: false,
    requestType: recorder_image_pb.InputMsg,
    responseType: recorder_image_pb.BooleanDeleteResponse,
    requestSerialize: serialize_InputMsg,
    requestDeserialize: deserialize_InputMsg,
    responseSerialize: serialize_BooleanDeleteResponse,
    responseDeserialize: deserialize_BooleanDeleteResponse,
  },
  deleteVideos: {
    path: '/Image/deleteVideos',
    requestStream: false,
    responseStream: false,
    requestType: recorder_image_pb.InputMsg,
    responseType: recorder_image_pb.BooleanDeleteResponse,
    requestSerialize: serialize_InputMsg,
    requestDeserialize: deserialize_InputMsg,
    responseSerialize: serialize_BooleanDeleteResponse,
    responseDeserialize: deserialize_BooleanDeleteResponse,
  },
};

exports.ImageClient = grpc.makeGenericClientConstructor(ImageService);
