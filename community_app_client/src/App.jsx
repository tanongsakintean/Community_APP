import React, { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Post from "./components/Post";
import { baseUrl } from "./constants/constant";
import Axios from "axios";
import PreviewModal from "./components/PreviewModal";
import PreviewModalEdit from "./components/PreviewModalEdit";
import ModalEdit from "./components/ModalEdit";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    Axios.get(baseUrl + "/api_getPost.php").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Modal />
      <PreviewModal />
      <PreviewModalEdit />
      <ModalEdit />
      {posts.map((data) => (
        <Post
          key={data[0]}
          post_id={data[0]}
          user_id={data[1]}
          caption={data[2]}
          Img={data[3]}
          Likes={data[4]}
          Date={data[5]}
          Name={data[10] + " " + data[11]}
          Profile={data[12]}
        />
      ))}
    </div>
  );
}

export default App;
