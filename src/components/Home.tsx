import React from "react";

interface HomeProps {
  title: string;
  body: string;
}

const Home = (props: HomeProps) => (
  <div>
    <h1>{props.title}</h1>
    <p>{props.body}</p>
  </div>
);

export default Home;
