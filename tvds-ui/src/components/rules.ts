import { Rule } from "antd/lib/form";
// import { phoneRegex } from "./phoneInput";

function createRulesMap<T extends { [name: string]: Rule }>(rule: T) {
  return rule;
}

function uploadRequired(rule: unknown, value: null | unknown) {
  if (value === null) {
    return Promise.reject("This upload is required");
  }
  return Promise.resolve();
}

export const rules = createRulesMap({
  required: {
    required: true,
    message: "Please fill the field",
  },
  url:{
    pattern: new RegExp("((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"),
    message: "This field must be a valid url.",
  },
  uploadRequired: {
    validator: uploadRequired,
  },
  email: { type: "email", message: "Enter a valid email!" },
  latitude: {
    pattern: new RegExp("^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$"),
    message: "Invalid Latitude",
  },
  longitude:{
    pattern: new RegExp("^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$"),
    message: "Invalid Longitude"
  },
  pan: {
    pattern: new RegExp("[A-Z]{5}[0-9]{4}[A-Z]{1}"),
    message: "Invalid PAN number",
  },
//   phoneNumber: {
//     pattern: phoneRegex,
//     message: "Invalid phone number",
//   },
  number: {
    pattern: new RegExp("[0-9]"),
    message: "Invalid number",
  },
  upiId: {
    // eslint-disable-next-line prettier/prettier
    pattern: new RegExp("[/^\w.+@\w+$/]"),
    message: "Invalid UPI id",
  },
});

export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};
