import React from 'react'
import Header from '../components/Headers/Header'
import DynamicCard from '../components/DynamicCard'
import ImageOne from "../components/images/images.jpeg"
import ImageTwo from '../components/images/image1.png'
const Home = () => {
  return (
    <div>
      <Header
      title="Welcome to The School of engineering"
      subtitle="Welcome to the home of engineering!!"
      backgroundImage=""
      buttonText="Learn More"
      buttonLink="/learn-more"
      backgroundOverlay="rgba(0, 0, 0, 0.5)"
      gradientBackground="linear-gradient(45deg, rgba(255, 0, 150, 0.7), rgba(0, 204, 255, 0.7))"
      titleFontSize="4rem"
      subtitleFontSize="1.8rem"
      animationType="slide-up"
      videoBackground=""
      contentAlignment="center"
      buttons={[
        { text: 'Get Started', link: '/get-started', bgColor: '#ffc107', textColor: '#212529' },
        { text: 'Contact Us', link: '/contact', bgColor: '#ffc107', textColor: '#212529' }
    ]}/>
        <DynamicCard
          imgSrc={ImageTwo}
          title="Why Christ Church University?"
          text="We've grouped our courses into subject areas to help you find your perfect course. Search all our subject areas below."
          label="Visit Christ church website"
          width="100%"
          imgWidth="100%"
          imgHeight="auto"
          className="dynamic-card"
        />
        <DynamicCard
          imgSrc={ImageOne}
          title="Our Courses"
          text="Find the course that fits your future. All our undergraduate, postgraduate, full-time, part-time, apprenticeships, and short courses are designed to meet real-world needs. "
          label="click me"
          width="100%"
          imgWidth="100%"
          imgHeight="auto"
          className="dynamic-card-two"
        />
        </div>
  )
}

export default Home