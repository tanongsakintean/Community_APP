import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import "../assets/css/Sidebar.css";

function SideItem({ Title, Icon, Img }) {
  const [status, setStatus] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setStatus(true)}
      onMouseLeave={() => setStatus(false)}
      whileHover={{ width: 230 + Title.length * 2 }}
      initial={{ opacity: 0, scale: 0.5, width: 100 }}
      animate={{ opacity: 1, scale: 1 }}
      className="px-3 bg-white  shadow-md mt-5 rounded-full"
    >
      <Link to="/" className="flex items-center p-3   ">
        <div className="w-auto">
          {Icon == "home" && <FaHome className="text-4xl text-[#6264f1]" />}
          {Icon == "profile" && (
            <img src={Img} className="  w-10 rounded-[50px]" />
          )}
        </div>
        <div className="ml-5 ">
          {status && (
            <motion.p
              initial={{
                opacity: 0,
                scale: 0.5,
                fontWeight: 800,
                marginLeft: -100,
              }}
              animate={{ opacity: 1, scale: 1, marginLeft: 0 }}
            >
              {Title}
            </motion.p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export default SideItem;
