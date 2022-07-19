import bcrypt from "bcryptjs"
const user = [
    {
        name: "Admin User",
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: "sumit sharma",
        email: 'sumit@example.com',
        password: bcrypt.hashSync('12345', 10),

    },
    {
        name: "amit sharma",
        email: 'amit@example.com',
        password: bcrypt.hashSync('12345', 10),

    },
    {
        name: "sapna sharma",
        email: 'sapna@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
]
export default user;