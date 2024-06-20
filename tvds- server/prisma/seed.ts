const { PrismaClient }= require ("@prisma/client");
// import { hashPassword } from "../src/util";
// import { user } from "./data";

const prisma = new PrismaClient();

const exectuteQuery = async () => {
  await prisma.$transaction(async (tx) => {
    // const hash = await hashPassword(user[0].password);
    // await tx.user.create({
    //   data: {
    //     isActive: true,
    //     name: user[0].username,
    //     password: hash,
    //     passwordChangeAt: new Date(),
    //   },
    // });

    // await tx.tagType.createMany({
    //   data: ["Blacklisted", "stolen"].map((name) => ({ name })),
    // });
    await tx.user.create({
  
      data: {name:"Sakthivel",isActive:true,password:"Sakthivel",passwordChangeAt:new Date()}
    })
  });
};

exectuteQuery()
  .then(() => {
    console.log("Seed finished successfully");
  })
  .catch((err) => {
    console.log("Error while migrating from seed data", err);
  });
