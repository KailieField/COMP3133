const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Employee = require('../models/Employee')

module.exports = buildSchema(`

    type User {

        _id: ID!
        username: String!
        email: String!
        created_at: String
        updated_at: String
    
    }
    
    type Employee {
        
        _id: ID!
        first_name: String!
        last_name: String!
        email: String
        gender: String
        destignation: String!
        salary: Float!
        date_of_joinig: String!
        department: String!
        employee_photo: String
        created_at: String
        updated_at: String

    }

    type Query {

    login(username: String!, password: String!): String
    getAllEmployees: [Employee!]
    searchEmployeeByEid(eid: ID!): Employee
    searchEmployees(designation: String, department: String): [Employee!]

    }

    type Mutation {

        signup(username: String!, email: String!, password: String!): User
        addEmployee(
            first_name: String!,
            last_name: String!,
            email: String,
            gender: String,
            destignation: String!,
            salary: Float!,
            date_of_joinig: String!,
            department: String!,
            employee_photo: String
        ): Employee
        updateEmployeeByEid(
            eid: ID!,
            first_name: String!,
            last_name: String!,
            email: String,
            gender: String,
            destignation: String!,
            salary: Float!,
            date_of_joinig: String!,
            department: String!,
            employee_photo: String       
        ): Employee
        deleteEmployeeByEid(eid: ID!): String
    }
`);

const queryHandlers = {

    login: async ({ username, password }) => {

        const user = await User.findOne({ username })
        
        if(!user) throw new Error('USER CAN NOT BE FOUND.')

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new Error('INVALID CREDENTIALS.')

        return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    },

    signup: async ({ username, email, password }) => {

        const hashedPass = await bcrypt.hash(password, 12)

        const user = new User({ username, email, password: hashedPass })

        return await user.save()

    },

    getAllEmployees: async () => await Employee.find(),

    searchAllEmployeesByEid: async () => await Employee.findOne({ eid }),
    
    searchEmployees: async ({ designation, department }) => {

        const query = {}

        if (designation) query.designation = designation

        if (department) query.department = department

        return await Employee.find(query)

    },

    addEmployee: async (args) => {

        const employee = new Employee(args)
        
        return await employee.save()

    },

    updateEmployeeByEid: async ({ eid, ...args }) => {

        return await Employee.findByIdAndUpdate(eid, args, { new: true });

    },

    deleteEmployeeByEid: async ({ eid }) => {

        await Employee.findByIdAndDelete(eid);
        
        return 'EMPLOYEE DETELED FROM DATABASE.'
    },


};

module.exports.guerylHandlers = queryHandlers;
