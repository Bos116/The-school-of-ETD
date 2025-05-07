import React from 'react'
import Header from '../components/Headers/Header'
import DynamicCard from '../components/DynamicCard'
import ImageOne from "../components/images/images.jpeg"
import ImageTwo from '../components/images/image1.png'
const Home = () => {
  return (
    <div style={{ paddingTop: "70px" }}>
      <Header
      title="Welcome to The School of engineering"
      subtitle="Dive into a world of knowledge with our AI-powered engineering quiz platform. Whether you’re a student, a professional, or just curious, test your skills across disciplines, get instant feedback, and challenge yourself to grow all in one interactive hub built for future engineers."
      backgroundImage=""
      buttonText="Learn More"
      buttonLink="/learn-more"
      backgroundOverlay="rgba(0, 0, 0, 0.5)"
      gradientBackground="linear-gradient(45deg, rgb(4, 32, 192), rgb(89, 155, 253))"
      titleFontSize="4rem"
      subtitleFontSize="1.2rem"
      animationType="slide-up"
      videoBackground=""
      contentAlignment="center"
      buttons={[
        { text: 'Take our Quiz', link: '/quiz', bgColor: '#007BFF', textColor: '#f9f9f9' },
        { text: 'Contact Us', link: '/contact', bgColor: '#007BFF', textColor: '#f9f9f9' }
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
          onButtonClick={() => window.open("https://www.canterbury.ac.uk/", "_blank")}
        />
        <DynamicCard
          imgSrc={ImageOne}
          title="Our Courses"
          text="Find the course that fits your future. All our undergraduate, postgraduate, full-time, part-time, apprenticeships, and short courses are designed to meet real-world needs. "
          label="View our courses"
          width="100%"
          imgWidth="100%"
          imgHeight="auto"
          className="dynamic-card-two"
          onButtonClick={() => window.open("https://www.canterbury.ac.uk/study-here/subject-areas", "_blank")}
        />
        </div>
  )
}

export default Home