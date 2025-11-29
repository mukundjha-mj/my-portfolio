import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
    return (
        <div className="w-full py-12 mb-10" id="contact">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get In Touch</h2>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
                    <p className="text-gray-400 mb-8">
                        I'm currently open to new opportunities and collaborations.
                        Whether you have a question or just want to say hi, feel free to reach out!
                    </p>

                    <div className="flex flex-col gap-4">
                        <a href="mailto:mukundjha.mj@gmail.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
                            <FaEnvelope className="text-xl text-blue-400" />
                            <span>mukundjha.mj@gmail.com</span>
                        </a>
                        <a href="https://www.linkedin.com/in/mukundjha-mj/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
                            <FaLinkedin className="text-xl text-blue-600" />
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/mukundjha-mj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
                            <FaGithub className="text-xl" />
                            <span>GitHub</span>
                        </a>
                        <a href="https://x.com/mukundjha_mj" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10">
                            <FaXTwitter className="text-xl" />
                            <span>X (Twitter)</span>
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                >
                    <form className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                            <textarea
                                id="message"
                                rows="4"
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                placeholder="Your message..."
                            ></textarea>
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors mt-2"
                        >
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
