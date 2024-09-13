import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
function Contact() {
  return <> 
   <Navbar/>
   <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4" >Let Get To Know About Us :v </h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold">Soo Hello guys</h2>
        <p>If you want to contact us, you can see below. we are ready to listen and fix it</p>
      </section>

      <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-semibold">Contact Information!</h3>
          <p><strong>Address:</strong>110/1-4 Pracha Chuen Road, Lak Si District, Bangkok, Thailand</p>
          <p><strong>Phone:</strong> +66 92 959 6758</p>
          <p><strong>Email:</strong> BuzzblenOfficial@gmail.com</p>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">if you want to know more let's follow us</h3>
            <ul className="flex space-x-4 mt-2">
              <li><a href="https://facebook.com/Buzzblen.official" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com/Buzzblen.official" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com/Buzzblen.official" target="_blank" rel="noopener noreferrer">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold">Send Us a Message</h3>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
              <input
                type="text"
                id="name"
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="Buzzblen"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
              <input
                type="email"
                id="email"
                className="w-full mt-2 p-2 border rounded-lg"
                placeholder="BuzzblenOfficial@gmail.com"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium">Your Message</label>
              <textarea
                id="message"
                className="w-full mt-2 p-2 border rounded-lg"
                rows="5"
                placeholder="Tell me what you want ..."
                required
              ></textarea>
            </div>
            <button
              type="SEND"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Optional: Embed a map */}
      <section className="mb-6">
        <h3 className="text-xl font-semibold">and this is my whole world</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3163.056708923877!2d-122.08424968469135!3d37.42199977982526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5d93d4162b1%3A0x4a36b8b6c8960!2sGoogleplex!5e0!3m2!1sen!2sus!4v1632172940037!5m2!1sen!2sus"
          width="100%"
          height="400"
          allowFullScreen=""
          loading="lazy"
          title="and this is my whole world"
        ></iframe>
      </section>
    </div>
 
  
  </>
}

export default Contact 