const graphql = require('graphql');
const {  
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const _ = require('lodash');

const Notification = require('../models/notification.model');
const Report = require('../models/report.model');
const User = require('../models/user.model');


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        role: { type: GraphQLString },
        reports: {
            type: new GraphQLList(ReportType),
            resolve(parent, args) {
                return Report.find({userId: parent.id});
                // return _.filter(reports, {userId: parent.id});
            }
        }
    })
});

const ReportType = new GraphQLObjectType({
    name: 'Report',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: {
            type: UserType,
            resolve(parent, args) {
                // console.log(parent);
                // return _.find(users, { id: parent.userId });
                return User.findById(parent.userId);
            }
        }
    })
});


const NotificationType = new GraphQLObjectType({
    name: 'Notification',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        content: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () =>  ({
        report: {
            type: ReportType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
               return Report.findById(args.id);
            }
        },
        reports: {
            type: new GraphQLList(ReportType),
            resolve(parent, args) {
                return Report.find({});
            }
        },

        user: {
            type: UserType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
               // return _.find(users, { id: args.id });
               return User.findById(args.id);
            }
        },

        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                // return users;
                return User.find({});
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
              username: { type: new GraphQLNonNull(GraphQLString) },
              role: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve( parent, args ) {
              let user = new User({
                username: args.username,
                role: args.role
              });
      
              return user.save();
            }
        },
        addReport: {
            type: ReportType,
            args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              type: { type: new GraphQLNonNull(GraphQLString) },
              content: { type: new GraphQLNonNull(GraphQLString) },
              userId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve( parent, args ) {
              let report = new Report({
                name: args.name,
                type: args.type,
                content: args.content,
                userId: args.userId
              });
      
              return report.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

