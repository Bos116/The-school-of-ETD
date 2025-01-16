import React from 'react'
import Header from '../components/Headers/Header'
import DynamicCard from '../components/DynamicCard'

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
          imgSrc="/logo512.png"
          title="Header 1"
          text="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
          label="click me"
          width="100%"
          imgWidth="50%"
          imgHeight="300px"
          className="dynamic-card"
        />
        <DynamicCard
          imgSrc="/logo512.png"
          title="Header 1"
          text="Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum"
          label="click me"
          width="100%"
          imgWidth="50%"
          imgHeight="300px"
          className="dynamic-card"
        />
        </div>
  )
}

export default Home