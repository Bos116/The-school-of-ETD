import React, { useState } from "react";
import emailjs from "@emailjs/browser"
const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        category: "",
        message: "",
        images: [],
    });

    const [imagePreviews, setImagePreviews] = useState([]);

    // Available categories
    const categories = ["General Inquiry", "Feedback", "Support", "Partnership", "Other"];

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file selection for image uploads
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData({ ...formData, images: files });

        // Generate image previews
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setImagePreviews(previewUrls);
    };

    // Handle form submission
    const SendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, e.target, process.env.REACT_APP_PUBLIC_KEY)
        // Simulating form submission
        console.log("Form Submitted:", formData);

        alert("Your message has been sent!");
        
        // Clear form
        setFormData({
            name: "",
            email: "",
            category: "",
            message: "",
            images: [],
        });
        setImagePreviews([]);
    };

    return (
        <div style={{ maxWidth: "600px", margin: "auto", padding: "20px", border: "1px solid #ddd", borderRadius: "10px", background: "#f9f9f9" }}>
            <h2>📞 Contact Us</h2>
            <form onSubmit={SendEmail} style={{ display: "flex", flexDirection: "column" }}>
                
                {/* Name */}
                <label>Name:</label>
                <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "8px", marginBottom: "10px", borderRadius: "5px" }} 
                />

                {/* Email */}
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "8px", marginBottom: "10px", borderRadius: "5px" }} 
                />

                {/* Category Dropdown */}
                <label>Category:</label>
                <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "8px", marginBottom: "10px", borderRadius: "5px" }}>
                    <option value="">Select a Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                {/* Message */}
                <label>Message:</label>
                <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: "8px", marginBottom: "10px", borderRadius: "5px", height: "100px" }} 
                ></textarea>

                {/* Image Upload */}
                <label>Upload Images:</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    multiple 
                    onChange={handleFileChange} 
                    style={{ marginBottom: "10px" }} 
                />

                {/* Image Previews */}
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "10px" }}>
                    {imagePreviews.map((src, index) => (
                        <img key={index} src={src} alt={`Upload Preview ${index}`} style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }} />
                    ))}
                </div>

                {/* Submit Button */}
                <button type="submit" style={{ padding: "10px", background: "blue", color: "white", borderRadius: "5px", cursor: "pointer" }}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default ContactForm;