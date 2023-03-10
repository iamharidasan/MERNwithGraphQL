const { projects, clients } = require("../sampleData")
const Project = require("../models/Project")
const Client = require("../models/Client")
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLSchema,
} = require("graphql")

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    phone: {
      type: GraphQLString,
    },
    /* projects: {
      type: GraphQLList(ProjectType),
      resolve(parent) {
        return projects.filter((project) => project.clientId === parent.id)
      },
    }, */
  }),
})

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    clientId: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    client: {
      type: ClientType,
      resolve(parent) {
        return Client.findById(parent.clientId)
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    projects: {
      type: GraphQLList(ProjectType),
      resolve() {
        return Project.find()
      },
    },
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)
      },
    },
    clients: {
      type: GraphQLList(ClientType),
      resolve() {
        return Client.find()
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id)
      },
    },
  },
})

module.exports = new GraphQLSchema({ query: RootQuery })
