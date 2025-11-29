import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
    return (
        <div className="w-full py-20 mb-10" id="contact">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Build Something</h2>
                    <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                        I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                    </p>

                    <div className="space-y-4 mb-8">
                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">I'm open to:</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li className="flex items-center gap-2">
                                <span className="text-green-400">✓</span> Internship / Entry-level SDE roles
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-400">✓</span> Freelance full-stack projects
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-400">✓</span> Open-source collaborations
                            </li>
                        </ul>
                    </div>

                    <div className="flex gap-4">
                        <a href="mailto:mukundjha.mj@gmail.com" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-blue-400 transition-colors">
                            <FaEnvelope size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/mukundjha-mj/" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-blue-600 transition-colors">
                            <FaLinkedin size={24} />
                        </a>
                        <a href="https://github.com/mukundjha-mj" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-colors">
                            <FaGithub size={24} />
                        </a>
                        <a href="https://x.com/mukundjha_mj" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 hover:text-white transition-colors">
                            <FaXTwitter size={24} />
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
