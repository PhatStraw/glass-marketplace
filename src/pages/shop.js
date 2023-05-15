import { Box, Typography, Divider } from "@mui/material";
import HomeCard from "../components/CuratedCard";
import Feed from "../components/feed";
import SalesCard from "../components/SalesCard";
import {prisma} from "../utils/prisma-helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Shop({ items, staticFilter }) {
  const [filter, setFilter] = useState();
  const [pieces, setPieces] = useState(items);
  const router = useRouter();
  const { query } = router.query;
  useEffect(() => {
    if(query){
      onSubmit(
        {
          title: {
            search: query,
          },
        }
      );
    }
  }, [query]);
  async function onSubmit(filter) {
    const data = await fetch("/api/filter", {
      method: "POST",
      body: JSON.stringify(filter),
    });
    const newItems = await data.json();
    setPieces(newItems);
    router.push(`${router.asPath}#ids`)
  }
  return (
    <Box pt={0}>
      <Typography
        sx={{
          fontSize: "20px",
          paddingTop: 10,
          paddingLeft: 3,
          pb: 2,
          fontWeight: "bold",
        }}
        gutterBottom
      >
        Glass For Sale
      </Typography>
      <Divider />
      <HomeCard onSubmit={onSubmit} setFilter={setFilter} filter={filter} />
      <Typography
        m={1}
        sx={{ fontSize: "18px", p: 1, fontWeight: "bold" }}
        gutterBottom
      >
        Sales & Featured Collections
      </Typography>
      <SalesCard />
      <SalesCard />
      <SalesCard />
      <Feed
        items={pieces}
        staticFilter={staticFilter}
        setPieces={setPieces}
        onSubmit={onSubmit}
        setFilter={setFilter}
        filter={filter}
      />
    </Box>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  const data = await prisma.item.findMany({
    where: {
      published: true
    },
    include: {
      images: true,
    },
  });
  const items = JSON.parse(JSON.stringify(data));

  const data2 = await prisma.item.findMany({
    distinct: ["artist", "type"],
  });
  const staticFilter = JSON.parse(JSON.stringify(data2));
  return {
    props: {
      staticFilter,
      items,
    },
  };
}
