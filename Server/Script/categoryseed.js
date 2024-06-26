import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main(){
    const seedingData = [
        {name: 'ELECTRONICS'},
        {name: 'FURNITURE'},
        {name: 'HOME APPLIANCES'},
        {name: 'SPORTING GOODS'},
        {name: 'OUTDOOR'}
    ];

    const existingCategories = await prisma.category.findMany();

    if (existingCategories.length > 0){
        console.log('Rows exists.')
        return;
    }
    
    await prisma.category.createMany({
        data: seedingData
    });

    console.log(`Seeding Successful: Data Inserted`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })