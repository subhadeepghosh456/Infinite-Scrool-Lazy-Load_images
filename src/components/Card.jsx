import React, { useEffect, useRef } from "react";

const Card = ({ demo_src, actual_src, alt }) => {
  const imageRef = useRef(null);

  //console.log(imageRef);

  useEffect(() => {
    if (!imageRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          //   console.log(imageRef.current.demo_src);
          // imageRef.current.src = imageRef.current.demo;
          // console.log(entry.target);
          // console.log(entry.target.src);
          // console.log(entry.target.alt);

          const demoSrc = entry.target.getAttribute("demo");
          // console.log("this is demo", demoSrc);
          // entry.target.src = entry.target.demo;
          entry.target.src = demoSrc;

          entry.target.addEventListener("load", function () {
            entry.target.classList.remove("lazy-img");
          });
          observer.unobserve(imageRef.current);
        }
      },
      { threshold: 1 }
    );
    observer.observe(imageRef.current);
    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  return (
    <>
      <img
        className="lazy-img"
        demo={actual_src}
        src={demo_src}
        alt={alt}
        ref={imageRef}
      />
    </>
  );
};

export default Card;
