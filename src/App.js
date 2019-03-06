  import React, { Component } from 'react';
  import './App.css';
  import slides from './Slides'

  function Carousel(props) {
    return (
      <section>{props.children}</section>
    )
  }

  // class Slides extends Component {

  //   render () {
  //     return (
  //       <ul className="c-carousel" {...this.props} />
  //     )
  //   }
  // }

  function Slides(props) {
    return (
      <ul className="c-carousel" {...props} />
    )
  }

  class Slide extends Component {

    // prepare the component
    constructor () {
      super ()
      this.state = {
        width: window.innerWidth
      }
    }

    updateDimensions = () => {
      this.setState({
        width: window.innerWidth
      })
    }

    // mount / unmount
    componentDidMount () {
      window.addEventListener('resize', this.updateDimensions)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.updateDimensions)
    }

    render () {
      const { index, count, image, title, duration, maturityRating, categories } = this.props
      const { width } = this.state

      const styles = {
        backgroundImage: `url(${image})`,
        width: `${width / count}px`,
        flexBasis: `${width / count * 2}px`
      }

      console.log('index:', index, 'count', count, 'windowWidth', width)

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
  }

  function App() {

    return (
      <Carousel>
      <h1 className="o-h1">NETFLIX ORIGINALS</h1>
        <Slides>
          {slides.map((image, index) => (
            <Slide
              id={`image-${index}`}
              key={index}
              index={index}
              count={slides.length}
              image={image.img}
              title={image.title}
              {...image}
            />
          ))}
        </Slides>
      </Carousel>
    )
  }

  export default App;
