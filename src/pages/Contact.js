import React from 'react'
import ContactForm from '../components/ContactForm'
import Header from '../components/Headers/Header'
const Contact = () => {
  return (
    <div className="contact-page">
      <Header
            title="Contact Us"
            backgroundOverlay="rgba(0, 0, 0, 0.5)"
            gradientBackground="linear-gradient(45deg, rgb(4, 32, 192), rgb(89, 155, 253))"
            titleFontSize="4rem"
            subtitleFontSize="1.2rem"
            animationType="slide-up"
            contentAlignment="center"
          />
      <div className="contact-form-wrapper">
        <ContactForm 
          className="contact-form"/>
      </div>
    </div>
  )
}

export default Contact