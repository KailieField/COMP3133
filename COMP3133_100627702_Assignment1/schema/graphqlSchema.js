const { buildSchema } = require('graphql')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Employee = require('../models/Employee')

const graphqlSchema = buildSchema(`

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
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String
        ): Employee
        updateEmployeeByEid(
            eid: ID!,
            first_name: String!,
            last_name: String!,
            email: String,
            gender: String,
            designation: String!,
            salary: Float!,
            date_of_joining: String!,
            department: String!,
            employee_photo: String       
        ): Employee
        deleteEmployeeByEid(eid: ID!): String
    }
`);

const queryHandlers = {


// -- Resolvers and Validations --
    login: async ({ username, password }) => {

        if (!username || username.trim().length === 0){
            throw new Error("USERNAME IS REQUIRED.")
        }

        if (!password || password.trim().length === 0){
            throw new Error("PASSWORD IS REQUIRED.")
        }

        const user = await User.findOne({ username })
        
        if(!user) throw new Error('USER CAN NOT BE FOUND.')

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) throw new Error('INVALID CREDENTIALS.')

        return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    },

    signup: async ({ username, email, password }) => {

        if (!username || username.trim().length < 4){
            throw new Error("USERNAME MUST BE 4 CHARACTERS.")
        }

        if (!email || !email.includes("@") || !email.includes(".")) {
            throw new Error("INVALID. MUST HAVE @")
        }

        if (!password || password.length < 6){
            throw new Error("PASSWORD MUST BE > 6 CHARS.")
        }

        const userExists = await User.findOne({ Sor: [{ username }, { email }] })
        if(userExists) {
            throw new Error("USER ALREADY EXISTS.")
        }

        const hashedPass = await bcrypt.hash(password, 12)

        const user = new User({ username, email, password: hashedPass })

        return await user.save()

    },

    getAllEmployees: async () => await Employee.find(),

    searchEmployeesByEid: async ({ eid }) => await Employee.findById(eid ),

    searchEmployees: async ({ designation, department }) => {

        const query = {}

        if (designation) query.designation = designation

        if (department) query.department = department

        return await Employee.find(query)

    },

    addEmployee: async (args) => {

        if(!first_name || first_name.trim().length < 1){
            throw new Error("FIRST NAME MUST BE LONGER THAN 1 CHARS.")
        }

        if(!last_name || last_name.trim().length < 1){
            throw new Error("FIRST NAME MUST BE LONGER THAN 1 CHARS.")
        }

        if(!last_name || last_name.trim().length < 1){
            throw new Error("LAST NAME MUST BE LONGER THAN 1 CHARS.")
        }

        if(!designation || designation.trim().length < 1){
            throw new Error("DESIGNATION MUST BE LONGER THAN 1 CHARS.")
        }

        if(!department || department.trim().length < 1){
            throw new Error("DEPARTMENT MUST BE LONGER THAN 1 CHARS.")
        }

        if(!salary || salary < 1000){
            throw new Error("SALARY MUST BE > 1000.")
        }

        if (email){
            if (!email.includes("@") || !email.includes(".")){
                throw new Error("INVALID. MUST HAVE @")
            }

            const employeeExists = await Employee.findOne({ email });
            if (employeeExists){
                throw new Error("EMPLOYEE EXISTS.")
            }
        }

        const employee = new Employee(args)
        
        return await employee.save()

    },

    updateEmployeeByEid: async ({ eid, ...args }) => {

        const employee = await Employee.findById(eid)
        if (!employee) throw new Error("EMPLOYEE CAN NOT BE FOUND.")

        if (args.first_name && args.first_name.trim().length < 1){
            throw new Error("FIRST NAME MUST BE LONGER THAN 2 CHARS.")
        }

        if (args.last_name && args.last_name.trim().length < 1){
            throw new Error("LAST NAME MUST BE LONGER THAN 2 CHARS.")
        }

        if (args.email){
            if (!args.email.includes("@") || !args.email.includes(".")){
                throw new Error("INVALID. MUST HAVE @")
            }
        }

        if(args.salary && args.salary < 1000){
            throw new Error("SALARY MUST BE > 1000.")
        }

        if(args.date_of_joining && isNaN(Date.parse(args.date_of_joining))){
            throw new Error("INVALIDE DATE.")
        }

        return await Employee.findByIdAndUpdate(eid, args, { new: true });

    },

    deleteEmployeeByEid: async ({ eid }) => {

        const employee = await Employee.findByid(eid)
        if(!employee){
            throw new Error("EMPLOYEE NOT CAN NOT BE FOUND.")
        }

        await Employee.findByIdAndDelete(eid);
        
        return 'EMPLOYEE DETELED FROM DATABASE.'
    },


};

module.exports = {
    graphqlSchema,
    queryHandlers,
};
