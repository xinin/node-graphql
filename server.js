const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');
// GraphQL schema
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    }

    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }

    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
    }
`);

const coursesData = [
  {
    id: 1,
    title: 'Course 1',
    author: 'Author 1',
    description: 'Description 1',
    topic: 'JS',
  },
  {
    id: 2,
    title: 'Course 2',
    author: 'Author 2',
    description: 'Description 2',
    topic: 'JS',
  },
  {
    id: 3,
    title: 'Course 3',
    author: 'Author 3',
    description: 'Description 3',
    topic: 'Python',
  }
];

const getCourse = (args) => {
  const id = args.id;
  return coursesData.filter(course => course.id === id)[0];
};

const getCourses = (args) => {
  if (args.topic) {
    const topic = args.topic;
    return coursesData.filter(course => course.topic === topic);
  }
  return coursesData;
};

const updateCourseTopic = ({ id, topic }) => {
  for (let i = 0; i < coursesData.length; i += 1) {
    if (coursesData[i].id === id) {
      coursesData[i].topic = topic;
    }
  }
  return getCourse({ id });
};
// Root resolver
const root = {
  course: getCourse,
  courses: getCourses,
  updateCourseTopic
};
// Create an express server and a GraphQL endpoint
const app = express();
app.use('/graphql', expressGraphql({
  schema,
  rootValue: root,
  graphiql: true
}));
app.listen(9000, () => console.log('Express GraphQL Server Now Running On localhost:9000/graphql'));
