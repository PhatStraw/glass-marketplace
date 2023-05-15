const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const algoliasearch = require("algoliasearch");

const fetchDataFromDatabase = async () => {
  const data = await prisma.item.findMany({
    where: {
      published: true,
    },
    include: {
      images: true,
    },
  });
  const items = JSON.parse(JSON.stringify(data));
  return items;
};

const records = fetchDataFromDatabase();

let items = [];
let exist = []
records.then(function (result) {
    console.log("result",result)
  result.map((i) => {
    if(!exist.includes(i.title)){
        items.push({
          query: i.title,
          popularity: 0
        });
        exist.push(i.title)
    }
    if(!exist.includes(i.artist)){
        items.push({
            query: i.artist,
            popularity: 0
        });
        exist.push(i.artist)
    }
  });
  console.log("items",items)
  const client = algoliasearch("Y22DSFGSTV", process.env.ALGOLIA_ADMIN_KEY);
  const index = client.initIndex("headies_query_suggestions");

  index.saveObjects(items, { autoGenerateObjectIDIfNotExist: true });
});
