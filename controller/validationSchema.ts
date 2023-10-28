import users from "../database/users.json";
const bodyJsonSchema = {
  type: "object",
  required: ["id", "userName", "email", "password"],
  properties: {
    id: { type: "number" },
    userName: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};
const schema = {
  body: bodyJsonSchema,
};

export default schema;
