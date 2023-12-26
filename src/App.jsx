import "./App.css";
import { useState, useEffect, useRef } from "react";
import Card from "./components/Card";

export default function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [firstTime, setFirstTime] = useState(true);
  const loadingRef = useRef(null);

  async function getPhotos() {
    const data = await fetch(
      `https://api.unsplash.com/photos?page=${page}&&client_id=0C36WvjLgwZ-uFay25wvCbJQ1jQW67xqM1FVQV5gn28`
    );
    const response = await data.json();
    setFirstTime(false);
    //  console.log(response);
    setImages((images) => [...images, ...response]);
  }

  useEffect(() => {
    getPhotos();
  }, [page]);

  useEffect(() => {
    if (!loadingRef.current) return;
    const observer = new IntersectionObserver(
      ([entries]) => {
        if (entries.isIntersecting && !firstTime) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(loadingRef.current);

    return () => {
      if (loadingRef.current) observer.unobserve(loadingRef.current);
    };
  }, [images]);

  return (
    <div className="App">
      <h1>Infinite Scrool</h1>
      <div className="image_container">
        {images.map((image, index) => {
          return (
            <div className="image" key={index}>
              <Card
                demo_src="https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg"
                actual_src={image.urls.regular}
                alt={image.alt_description}
                index={index}
              />
            </div>
          );
        })}
      </div>

      <div className="loading" ref={loadingRef}>
        Loading...
      </div>
    </div>
  );
}
