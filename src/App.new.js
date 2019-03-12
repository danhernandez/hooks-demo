  import React, { useState, useEffect } from 'react';
  import slides from './Slides'

  function Carousel(props) {
    return (
      <section className="o-wrapper">{props.children}</section>
    )
  }

  function Slides(props) {
    return (
      <ul className="c-carousel" {...props} />
    )
  }

  function handleSize (itemsToShow) {
    if (itemsToShow.isSmall) {
      return 125
    } else if (itemsToShow.isMedium) {
      return 205
    } else if (itemsToShow.isLarge) {
      return 255
    }
  }

  function Slide(props) {
      const { itemsToShow, image, title, duration, maturityRating, categories } = props

      const styles = {
        backgroundImage: `url(${image})`,
        width: `${handleSize(itemsToShow)}px`,
        flexBasis: `${handleSize(itemsToShow)}px`,
        height: `${(handleSize(itemsToShow) * 2) - 10}px`
      }

      return (
        <li
          style={{...styles}}
          className="c-carousel__slide"
        >
          <span className="slide__inner">
            {title}
            {maturityRating}
            {duration}
            {categories}
          </span>
        </li>
      )
  }

  function useMedia(query) {
    let [matches, setMatches] = useState(
      window.matchMedia(query).matches
    );

    useEffect(
      () => {
        let media = window.matchMedia(query)

        if (media.matches !== matches) {
          setMatches(media.matches)
        }

        let listener = () => setMatches(media.matches)
        media.addListener(listener)
        return () => media.removeListener(listener)
    }, [query])

    return matches
  }

  function App() {

    let small = useMedia("(max-width: 600px)");
    let medium = useMedia("(min-width: 601px) and (max-width: 1023px)");
    let large = useMedia("(min-width: 1024px)");

    return (
      <Carousel>
        <h1 className="o-h1">NETFLIX ORIGINALS</h1>
          <Slides>
            {slides.map((item, index) => (
              <Slide
                id={`image-${index}`}
                key={index}
                index={index}
                itemsToShow={{isSmall: small, isMedium: medium, isLarge: large}}
                image={item.img}
                {...item}
              />
            ))}
          </Slides>
        </Carousel>
    )
  }

  export default App;
