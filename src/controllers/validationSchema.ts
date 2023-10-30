import users from "../database/users.json";
const bodyJsonSchema = {
  type: "object",
  required: [ "userName", "email", "password"],
  properties: {
    userName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};
const schema = {
  body: bodyJsonSchema,
};

export default schema;
