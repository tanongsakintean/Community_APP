import React from "react";
import SideItem from "./SideItem";
function Sidebar() {
  return (
    <div className=" absolute z-10">
      <SideItem Icon="home" Title="HOME PAGE" Img="" />
      <SideItem
        Icon="profile"
        Title="Tanongsak Intean"
        Img="https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/310288206_1134574717143216_7064336675534090111_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEoU4LMv3Zc88KyLJqv-zp5yaQxLHU0VfnJpDEsdTRV-abmd0zod5qgmPbzeEnHAmLoA4Zmw6oNnXvhqCPbSZSe&_nc_ohc=ko24c24BEQYAX8cCQW7&tn=XtamN5pPwi3ZABha&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT93ac1nUq8roijuUOBBrAolcpe6rittVZGlY_PunxtcqA&oe=6359078A"
      />
      <SideItem
        Icon="profile"
        Title="Admin super"
        Img="https://scontent.fbkk5-8.fna.fbcdn.net/v/t39.30808-6/310288206_1134574717143216_7064336675534090111_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeEoU4LMv3Zc88KyLJqv-zp5yaQxLHU0VfnJpDEsdTRV-abmd0zod5qgmPbzeEnHAmLoA4Zmw6oNnXvhqCPbSZSe&_nc_ohc=ko24c24BEQYAX8cCQW7&tn=XtamN5pPwi3ZABha&_nc_ht=scontent.fbkk5-8.fna&oh=00_AT93ac1nUq8roijuUOBBrAolcpe6rittVZGlY_PunxtcqA&oe=6359078A"
      />
    </div>
  );
}

export default Sidebar;
