import React from "react";
import { Tabs } from "expo-router";

import CustomTab from "../../components/CustomTab";

const agencies = [
  { name: "index" },
  { name: "pnp" },
  { name: "bfp" },
  { name: "lgu" },
];

const TabLayout = () => {
  return (
    <Tabs tabBar={(props) => <CustomTab {...props} />}>
      {agencies.map((agency, index) => (
        <Tabs.Screen
          key={index}
          name={agency.name}
          options={{
            title: agency.name !== "index" ? agency.name : "MDRRMO",
            headerShown: false,
            tabBarLabel:
              agency.name !== "index" ? agency.name.toUpperCase() : "MDRRMO",
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabLayout;
